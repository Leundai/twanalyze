import os
import requests
import json
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv

load_dotenv()


def process_env(api_name):
    if api_name == "search_tweets_api":
        return os.environ.get("bearer_token")
    elif api_name == "azure":
        return os.environ.get("subscription_key"), os.environ.get("endpoint")
    else:
        return None


def create_twitter_url_req(data_input, call_name):

    if call_name == "recent_search":
        mrf = "max_results={}".format(data_input[1])
        q = "query=from:{}".format(data_input[0])
        url = "https://api.twitter.com/2/tweets/search/recent?{}&{}&tweet.fields=created_at,public_metrics&expansions=author_id&user.fields=name,profile_image_url".format(
            mrf, q
        )
    elif call_name == "get_tweet":
        url = "https://api.twitter.com/2/tweets?ids={}&tweet.fields=created_at,in_reply_to_user_id&expansions=author_id,in_reply_to_user_id".format(
            data_input[0]
        )
    elif call_name == "get_timeline":
        url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={}&count={}".format(
            data_input[0], mrf
        )

    return url


def twitter_auth_and_connect(bearer_token, url):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    response = requests.request("GET", url, headers=headers)
    return response.json()


def authenticate_client(key, endpoint):
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
        endpoint=endpoint,
        credential=ta_credential,
    )
    return text_analytics_client


def sentiment_analysis_example(client, documents):

    response = client.analyze_sentiment(documents=documents)

    # For Debugging
    # print("Document Sentiment: {}".format(response.sentiment))
    # print("Overall scores: positive={0:.2f}; neutral={1:.2f}; negative={2:.2f} \n".format(
    #     response.confidence_scores.positive,
    #     response.confidence_scores.neutral,
    #     response.confidence_scores.negative,
    # ))
    # for idx, sentence in enumerate(response.sentences):
    #     print("Sentence: {}".format(sentence.text))
    #     print("Sentence {} sentiment: {}".format(idx+1, sentence.sentiment))
    #     print("Sentence score:\nPositive={0:.2f}\nNeutral={1:.2f}\nNegative={2:.2f}\n".format(
    #         sentence.confidence_scores.positive,
    #         sentence.confidence_scores.neutral,
    #         sentence.confidence_scores.negative,
    #     ))

    return response


def analyze(headers, kind_of_search):
    url = create_twitter_url_req([headers[0], headers[1]], kind_of_search)
    # bearer_token = process_yaml("search_tweets_api")
    res_json = twitter_auth_and_connect(process_env("search_tweets_api"), url)

    key, endpoint = process_env("azure")
    # TODO IF CAN"T FIND TWEETS OR USERS THERE IS AN ERROR
    final_response = {
        "name": res_json["includes"]["users"][0]["name"],
        "username": headers[0],
        "profile_picture": res_json["includes"]["users"][0]["profile_image_url"],
        "tweets": [],
    }
    client = authenticate_client(key, endpoint)


    positive_avg = 0
    neutral_avg = 0
    negative_avg = 0

    for tweet in res_json["data"]:
        arr = [tweet["text"]]
        score = sentiment_analysis_example(client, arr)
        metrics = tweet["public_metrics"]
        final_response["tweets"].append(
            {
                "text": tweet["text"],
                "likes": metrics["like_count"],
                "retweets": metrics["retweet_count"],
                "time_created": tweet["created_at"],
                "sentiment": {
                    "score": score[0].sentiment,
                    "magnitude": {
                        "positive": score[0].confidence_scores.positive,
                        "neutral": score[0].confidence_scores.neutral,
                        "negative": score[0].confidence_scores.negative,
                    },
                },
            }
        )
        positive_avg += score[0].confidence_scores.positive
        neutral_avg += score[0].confidence_scores.neutral
        negative_avg += score[0].confidence_scores.negative
    positive_avg /= headers[1]
    neutral_avg /= headers[1]
    negative_avg /= headers[1]

    final_response["average_sentiment"] = {
        "positive": positive_avg,
        "neutral": neutral_avg,
        "negative": negative_avg
    }
    return final_response
