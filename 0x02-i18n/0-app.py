#!/usr/bin/env python3
'''
seting up flask
'''


from flask import Flask
from flask import render_template


app = Flask(__name__)


@app.route('/')
@app.route('/templates/0-index.html')
def index():
    '''
    linking to 0-index.html
    '''
    return render_template('0-index.html', title='Welcome to Holberton')
