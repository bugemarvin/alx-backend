#!/usr/bin/env python3
'''
seting up flask
'''


from flask import Flask


app = Flask(__name__)


@app.route('/')
@app.route('/templates/0-index.html')

def index():
    return "Hello world"