#!/usr/bin/env python3
"""defining langs
"""

from flask_babel import Babel, _
from flask import render_template, Flask, request


class Config:
    """config file
    """
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'
    LANGUAGES = ["en", "fr"]


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """language pref
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
@app.route('/templates/3-index.html')
def index() -> str:
    """Display content
    """
    return render_template('3-index.html')
