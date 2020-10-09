import json

def sanitize(obj):
    valid_fields = {'text', 'user', 'retweet_count', 'favorite_count'}
    new_obj = {}
    for field in valid_fields:
        if field in obj:
            new_obj[field] = obj[field]
    return new_obj

# test code
with open('../../tests/sample_tweet.txt') as f:
    d = json.load(f)
    sanitized = sanitize(d)
    print(sanitized)