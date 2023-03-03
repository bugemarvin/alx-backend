#!/usr/bin/env python3
'''
creating a localization
'''

from flask_babel import Babel
from flask import render_template, Flask, request


app = Flask(__name__)
babel = Babel(app)


class Config:
    '''
    creating languages
    'en' 'fr'
    '''
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'
    LANGUAGES = ["en", "fr"]


@babel.localeselector
def get_locale():
    '''
    determining the best language
    '''
    return request.accept_languages.best_match(app.config.from_object(Config))


@app.route("/")
@app.route("/templates/2-index.html")
def index() -> str:
    '''
    view web page in accordance with locale
    '''
    return render_template('2-index.html')
