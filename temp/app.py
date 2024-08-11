# app.py

from flask import Flask, jsonify, send_from_directory
import json

app = Flask(__name__)

@app.route('/api/questions', methods=['GET'])
def get_questions():
    with open('questions.json') as file:
        questions = json.load(file)
    return jsonify(questions)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
