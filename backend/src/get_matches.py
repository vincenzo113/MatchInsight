import requests
import pandas as pd
import os
from dotenv import load_dotenv

def get_matches(url , headers):
    matches = []
    response  = requests.get(url, headers=headers)
    data = response.json()
    for match in data['matches']:
        matches.append({
            "date": match['utcDate'],
            "home_team": match['homeTeam']['name'],
            "away_team": match['awayTeam']['name'],
            "home_score": match['score']['fullTime']['home'],
            "away_score": match['score']['fullTime']['away'],
            "status": match['status']
        })

    df = pd.DataFrame(matches)
    return df



load_dotenv()

API_KEY = os.getenv("API_KEY")

headers = {"X-Auth-Token": API_KEY}
#url endpoint
url_finished = "https://api.football-data.org/v4/competitions/SA/matches?season=2024"
url_timed = "https://api.football-data.org/v4/competitions/SA/matches?season=2025"
df_finished = get_matches(url_finished, headers)
df_timed = get_matches(url_timed, headers)
df_timed.to_csv("../data/timed_matches.csv", index=False)
df_finished.to_csv("../data/finished_matches.csv", index=False)