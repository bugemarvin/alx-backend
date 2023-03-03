#!/usr/bin/env python3
'''
adding bable config languages
'''

from flask import Flask
from flask import render_template
from flask_babel import Babel


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


@app.route('/')
@app.route('/templates/1-index.html')
def index() -> str:
    return render_template('1-index.html')
