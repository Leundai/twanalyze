import requests 
import pandas as pd 
import json
import ast
import yaml 
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

def process_yaml(api_name) : 
    with open("config.yaml") as file : 
        data = yaml.safe_load(file) 

        if api_name == "search_tweets_api" : 
            return data[api_name]["bearer_token"]
        elif api_name == "azure" : 
            return data[api_name]["subscription_key"], data[api_name]["endpoint"]
        else : 
            return None 

def create_twitter_url_req (data_input, call_name ) : 

    if call_name == "recent_search" : 
        mrf = "max_results={}".format(data_input[1])
        q = "query=from:{}".format(data_input[0])
        url = "https://api.twitter.com/2/tweets/search/recent?{}&{}".format( mrf, q)

    elif call_name == "get_tweet" : 
        url = "https://api.twitter.com/2/tweets?ids={}&tweet.fields=created_at,in_reply_to_user_id&expansions=author_id,in_reply_to_user_id".format(data_input[0])

    return url 

def twitter_auth_and_connect(bearer_token, url) : 
    headers = {"Authorization" : "Bearer {}".format(bearer_token) }
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
    response = client.analyze_sentiment(documents = documents)[0]

    print("Document Sentiment: {}".format(response.sentiment))
    print("Overall scores: positive={0:.2f}; neutral={1:.2f}; negative={2:.2f} \n".format(
        response.confidence_scores.positive,
        response.confidence_scores.neutral,
        response.confidence_scores.negative,
    ))
    for idx, sentence in enumerate(response.sentences):
        print("Sentence: {}".format(sentence.text))
        print("Sentence {} sentiment: {}".format(idx+1, sentence.sentiment))
        print("Sentence score:\nPositive={0:.2f}\nNeutral={1:.2f}\nNegative={2:.2f}\n".format(
            sentence.confidence_scores.positive,
            sentence.confidence_scores.neutral,
            sentence.confidence_scores.negative,
        ))

    return response 


def main() : 
    #url = create_twitter_url_req(["jessicagarson", 10], "recent_search" )
    url = create_twitter_url_req(["1228393702244134912"], "get_tweet")
    bearer_token = process_yaml("search_tweets_api") 
    res_json = twitter_auth_and_connect(bearer_token, url)
    
    key, endpoint = process_yaml("azure") 

    client = authenticate_client(key, endpoint)          
    score = sentiment_analysis_example(client, res_json['data'])

if __name__ == "__main__" : 
    main() 
