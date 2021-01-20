from flask import Flask, render_template, request
import json
from fuzzywuzzy import fuzz
import textwrap

def create_app(test_config=None):
    # creates & configures app
    app = Flask(__name__, instance_relative_config=True)
    
    # a simple page that says hello
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/', methods=['POST'])
    def results():
        text = request.form['inputTxt']
        line = get_best_line(text)
        output = "INPUT : " + text + "CLOSEST MATCH : " + line['line_text']
        output += "SPEAKER : " + line['speaker'] + 'SEASON : ' + str(line['season']) + 'EPISODE : ' + str(line['episode'])
        response = get_response(line)['line_text']
        return render_template('index.html', message=response)

    return app

def get_best_line(text):
    with open('flaskr/static/office-script.json') as f:
        data = json.load(f)
        bestLine = data[0]
        bestRatio = fuzz.ratio(text, bestLine['line_text'])

        for line in data:
            theLine = str(line['line_text'])
            ratio = fuzz.ratio(text, theLine)

            if ratio > bestRatio:
                bestLine = line
                bestRatio = ratio

        return bestLine
 
# Given a line, returns the next one
def get_response(line):
    with open('flaskr/static/office-script.json') as f:
        data = json.load(f)
        # The id gives the next elements index.
        id = line['id']
        return data[id]