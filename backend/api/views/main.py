from flask import Blueprint, request, jsonify
from api.models import db, Person, User, Email
from api.core import create_response, serialize_list, logger
from api.analysis.sentiment import analyze

main = Blueprint("main", __name__)  # initialize blueprint


# function that is called when you visit /
@main.route("/")
def index():
    # you are now in the current application context with the main.route decorator
    # access the logger with the logger from api.core and uses the standard logging module
    # try using ipdb here :) you can inject yourself
    logger.info("Hello World!")
    return "Hello World!"


# function that is called when you visit /persons
@main.route("/persons", methods=["GET"])
def get_persons():
    persons = Person.objects()
    return create_response(data={"persons": persons})


# function that is called when you visit /tweets
@main.route("/tweets", methods=["GET"])
def get_tweets():
    tweets = User.objects()
    print(tweets)
    return create_response(data={"tweets": tweets})


# POST request for /persons
@main.route("/persons", methods=["POST"])
def create_person():
    data = request.get_json(force=True)
    logger.info("Data recieved: %s", data)
    if "name" not in data:
        msg = "No name provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)
    if "emails" not in data:
        msg = "No email provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)

    #  create MongoEngine objects
    new_person = Person(name=data["name"])
    for email in data["emails"]:
        email_obj = Email(email=email)
        new_person.emails.append(email_obj)
    new_person.save()

    return create_response(
        message=f"Successfully created person {new_person.name} with id: {new_person.id}"
    )

# POST request for /tweets
@main.route("/tweets", methods=["POST"])
def create_tweet():
    data = request.get_json(force=True)
    logger.info("Data recieved: %s", data)

    #  create MongoEngine objects
    new_user = User(name=data["name"], username=data["username"], profile_picture=data["profile_picture"])

    for tweet in data["tweets"]:
        tweet_obj = User.Tweet(text=tweet["text"], likes=tweet["likes"], retweets=tweet["retweets"], time_created=tweet["time_created"])
        sentiment_obj = User.Tweet.Sentiment(score=tweet["sentiment"]["score"])
        magnitude_ref = tweet["sentiment"]["magnitude"]
        magnitude_obj = User.Tweet.Sentiment.Magnitude(
            positive=magnitude_ref["positive"],
            neutral=magnitude_ref["neutral"],
            negative=magnitude_ref["negative"])
        sentiment_obj["magnitude"] = magnitude_obj
        tweet_obj["sentiment"] = sentiment_obj
        new_user.tweets.append(tweet_obj)

    new_user.save()

    return create_response(
        message=f"Successfully created person {new_user.name} with id: {new_user.username}"
    )

# GET Request for twitter sentiment timeline
@main.route("/sentiment-tweets", methods=["GET"])
def get_newsfeed():

    username = request.args.get("username", default="Minecraft", type=str)
    max_tweets = request.args.get("max_tweets", default=10, type=int)

    if max_tweets < 10:
        max_tweets = 10

    ### Calls Sentimental analysis function using recent_search Twitter API call. 
    ### Future improvements can include different API calls/usage 
    headers = [username, max_tweets]
    analysis = analyze(headers, "recent_search")
    return create_response(
        message=f"Successfully sent sentiment analyzed tweets", data=analysis
    )
