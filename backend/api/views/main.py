from flask import Blueprint, request, jsonify
from api.models import db, Person, Email
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


# POST request for /persons
@main.route("/persons", methods=["POST"])
def create_person():
    data = request.get_json()

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
