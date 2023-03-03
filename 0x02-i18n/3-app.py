#!/usr/bin/env python3
'''
creating a localization
'''

from flask_babel import Babel, _
from flask import render_template, Flask, request


class Config:
    '''
    creating languages
    '''
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'
    LANGUAGES = ["en", "fr"]


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    '''
    determining the best language
    '''
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route("/")
@app.route("/templates/3-index.html")
def index() -> str:
    '''
    view web page in accordance with locale
    '''
    return render_template('3-index.html')
