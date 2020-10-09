import requests 
import pandas as pd 
import json
import ast
import yaml 

def process_yaml() : 
    with open("config.yaml") as file : 
        data = yaml.safe_load(file) 
        return data["search_tweets_api"]["bearer_token"]

def create_twitter_url_req (handle, num_result, call_name) : 

    if call_name == "recent_search" : 
        mrf = "max_results={}".format(num_result)
        q = "query=from:{}".format(handle)
        url = "https://api.twitter.com/2/tweets/search/recent?{}&{}".format( mrf, q)

    return url 

def twitter_auth_and_connect(bearer_token, url) : 
    headers = {"Authorization" : "Bearer {}".format(bearer_token) }
    response = requests.request("GET", url, headers=headers)
    return response.json() 

def main() : 
    url = create_twitter_url_req("jessicagarson", 10, "recent_search" )
    bearer_token = process_yaml() 
    res_json = twitter_auth_and_connect(bearer_token, url)
    print(res_json)

if __name__ == "__main__" : 
    main() 
