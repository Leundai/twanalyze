import os
import requests
import json
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv

load_dotenv()

### Input: api_name (str)
### Returns the corresponding key/endpoint for the inputted API name 
def process_env(api_name):
    if api_name == "search_tweets_api":
        return os.environ.get("bearer_token")
    elif api_name == "azure":
        return os.environ.get("subscription_key"), os.environ.get("endpoint")
    else:
        return None

### Input: data_input (list), call_name (str) 
### Returns the constructed url used for the GET request for the Twitter API. Url constructed is based on call_name. 
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
        url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={}&trim_user=true&exclude_replies=true&include_rts=false&count={}".format(
            data_input[0], data_input[1]
        )

    return url

### Input: bearer_token (str), url (str)
### Authenticates with the Twitter API using the token and url 
def twitter_auth_and_connect(bearer_token, url):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    response = requests.request("GET", url, headers=headers)

    return response.json()

### Input: key (str), endpoint (str)
### Authenticates with the Azure API using the key and endpoint 
def authenticate_client(key, endpoint):
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
        endpoint=endpoint,
        credential=ta_credential,
    )
    return text_analytics_client

### Input: client (TextAnalyticsClient), documents (json)
### Calls Azure Text Analytic API and returns the sentimental score in the given json structured input (documents )
def sentiment_analysis_example(client, documents):

    response = client.analyze_sentiment(documents=documents)

    # For Debugging Purposes 
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

### Input: headers (list), kind_of_search (str)
### Performs a sentimental analysis utilizing the Twitter/Azure API and returns a json structured response 
def analyze(headers, kind_of_search):

    ### Authenticate on Twitter and return if username is invalid or empty tweets 
    url = create_twitter_url_req([headers[0], headers[1]], kind_of_search)
    res_json = twitter_auth_and_connect(process_env("search_tweets_api"), url)
    
    ### Error check 
    if res_json["meta"]["result_count"] == 0 : 
        print("Failed request")
        return "200 Error"

    ### Authenticate on Azure and run through sentimental analysis 
    key, endpoint = process_env("azure")
    client = authenticate_client(key, endpoint)

    ### Formulate the Final Response JSON structure 
    final_response = {
        "name": res_json["includes"]["users"][0]["name"],
        "username": headers[0],
        "profile_picture": res_json["includes"]["users"][0]["profile_image_url"],
        "tweets": [],
    }
    
    positive_avg = 0
    neutral_avg = 0
    negative_avg = 0

    for tweet in res_json["data"]:
        ### Checks if given tweet is a retweet or starts with a link 
        if tweet["text"][0:2] == "RT" or tweet["text"][0:4] == "http" or tweet["text"][0:5] == "https": 
            continue 

        arr = [tweet["text"]]
        score = sentiment_analysis_example(client, arr)
        # print(score)
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
