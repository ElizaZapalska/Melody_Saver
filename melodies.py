from flask import Flask, request, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class MelodyCatalog():
  melodies = {}

  def add(self, melody):
    self.melodies[melody.title] = melody

  def delete(self, title):
    self.melodies.pop(title, None)

  def getAll(self):
    return [melody.json() for melody in self.melodies.values()]

class Melody():

    def __init__(self, title, melody):
        self.title = title
        self.melody = melody

    def json(self):
        return {'title': self.title, 'melody': self.melody}


catalog = MelodyCatalog()

@app.route('/melodies', methods=['GET'])
def getAllMelodies():
  return jsonify(catalog.getAll())

@app.route('/melodies', methods=['POST'])
def addMelody():
  data = request.get_json()
  melody = Melody(data['title'], data['melody'])
  catalog.add(melody)
  return ('', 201)

@app.route('/melodies', methods=['DELETE'])
def removeMelody():
  data = request.get_json()
  catalog.delete(data['title'])
  return ('', 200)