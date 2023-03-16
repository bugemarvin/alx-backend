#!/usr/bin/env python3
'''
creating a localization
'''
from flask_babel import Babel
from flask import Flask, render_template, request


class Config:
    '''
    creating languages
    'en' 'fr'
    '''
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'
    LANGUAGES = ["en", "fr"]


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)
'''
app configs and calls
'''


@babel.localeselector
def get_locale():
    '''
    determining the best language
    '''
    return request.accept_languages.best_match(app.config['LANGUAGES']) or 'en'


@app.route('/')
@app.route('/templates/3-index.html')
def index() -> str:
    '''
    view web page in accordance with locale
    '''
    return render_template('3-index.html')
