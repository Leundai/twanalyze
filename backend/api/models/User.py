from api.core import Mixin
from .base import db
from flask_mongoengine import Document
from mongoengine import *


class User(Document, Mixin):
    """User Collection."""

    class Tweet(EmbeddedDocument, Mixin):

        class Sentiment(EmbeddedDocument, Mixin):
            score = FloatField(required=True)
            magnitude = FloatField(required=True)

        class ReplySentiment(EmbeddedDocument, Mixin):
            score = FloatField(required=True)
            magnitude = FloatField(required=True)

        class Reply(EmbeddedDocument, Mixin):
            name = StringField(required=True)
            username = StringField(required=True)
            text = StringField(required=True)
            likes = IntField(required=True)
            retweets = IntField(required=True)
            time_created = StringField(required=True)

        text = StringField(required=True)
        likes = IntField(required=True)
        retweets = IntField(required=True)
        time_created = StringField(required=True)
        sentiment = EmbeddedDocumentField(Sentiment)
        reply_sentiment = EmbeddedDocumentField(ReplySentiment)
        replies = ListField(EmbeddedDocumentField(Reply))

    name = StringField(required=True)
    username = StringField(required=True)
    profile_picture = StringField(required=True)
    tweets = ListField(EmbeddedDocumentField(Tweet))

    def __repr__(self):
        return f"<User id:{self.name} \n username:{self.username}>"
