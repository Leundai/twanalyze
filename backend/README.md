# Twanalyze Flask Backend

This is based off of [Flask Boilerplate](https://github.com/tko22/flask-boilerplate) and also [Mentee](https://github.com/hack4impact-uiuc/mentee), but repurposed for MongoDB using MongoEngine. 

We use [black](https://github.com/ambv/black) for code formatting, and [mypy](http://mypy-lang.org/) for optional static typing.

## Remote Database Setup
Create a `.env` file in this folder with the contents:
```
MONGO_USER=[DB username]
MONGO_PASSWORD=[DB password]
MONGO_DB=twanalyze
MONGO_HOST=[host uri]
```
Replace the `[xxx]` with your own credentials.

### Server Setup **Start Reading From Here**

Make sure you have [Python3](https://realpython.com/installing-python/) and `pip3` installed.

Start your virtual environment:

```
$ pip3 install virtualenv
$ virtualenv venv
$ source venv/bin/activate
```
Now, install the python dependencies and run the server:
```
(venv) $ pip install -r requirements.txt
(venv) $ pip install -r requirements-dev.txt
(venv) $ python manage.py runserver
```

To exit the virtual environment:
```
(venv) $ deactivate
$
```

### Verifying

Install [Postman](https://www.getpostman.com/downloads/) or your app of choice for testing API calls, and [Compass](https://www.mongodb.com/download-center/compass) to view the contents of the database.

## Repository Contents

- `api/views/` - Holds files that define your endpoints
- `api/models/` - Holds files that defines your database schema
- `api/__init__.py` - What is initially ran when you start your application
- `api/utils.py` - utility functions and classes - explained [here](https://github.com/tko22/flask-boilerplate/wiki/Conventions)
- `api/core.py` - includes core functionality including error handlers and logger
- `tests/` - Folder holding tests

#### Others

- `manage.py` - Command line interface that allows you to perform common functions with a command
- `requirements.txt` - A list of python package dependencies the application requires
- `runtime.txt` & `Procfile` - configuration for Heroku

### MISC

If you're annoyed by the **pycache** files

```
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf
```

### Additional Documentation

- [Flask](http://flask.pocoo.org/) - Flask Documentation
- [Flask Tutorial](http://flask.pocoo.org/docs/1.0/tutorial/) - great tutorial. Many patterns used here were pulled from there.
- [Heroku](https://devcenter.heroku.com/articles/getting-started-with-python#introduction) - Deployment using Heroku
- [Learn Python](https://www.learnpython.org/) - Learning Python3
- [REST API](http://www.restapitutorial.com/lessons/restquicktips.html) - tips on making an API Restful
- [MongoDB](http://mongoengine.org/)
