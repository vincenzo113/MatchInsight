from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

def load_csv(path):
    df = pd.read_csv(path)
    return df


@app.route('/api/stats2024', methods=["GET"])
def stats_2024():
    df = load_csv("data/team_stats.csv")
    return jsonify(df.to_dict(orient='records'))  # Converte DataFrame in JSON

@app.route('/api/prediction2025', methods=["GET"])
def prediction_2025():
    df = load_csv("data/output_predictions_season2025.csv")
    return jsonify(df.to_dict(orient='records'))


@app.route('/api/teams2024', methods=["GET"])
def teams_2024():
    df = pd.read_csv("data/team_stats.csv" , index_col=0 , header = 0)
    team_names = df.index.tolist()  # Ottiene i nomi delle squadre
    return jsonify(team_names)


@app.route('/api/team/<team_name>', methods=["GET"])
def team_stats(team_name):
    df = pd.read_csv("data/team_stats.csv", index_col=0, header=0)
    return jsonify(df.loc[team_name].to_dict())  # Restituisce le statistiche della squadra specificata