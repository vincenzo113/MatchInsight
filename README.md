# MatchInsight ⚽🔮

## Welcome to MatchInsight!

If you're here, you probably want to **bet on matches without leaving it to chance**. You're in the right place! MatchInsight is your virtual ally that **predicts the outcomes of Serie A 2025/2026 matches** using historical data, team statistics, and a machine learning model.

At the end of the process, you get a **ready-to-use CSV** with the matches of the 2025/2026 season and the predicted result: **H (home win), D (draw), A (away win)**. The results CSV has already been produced and is called `output.csv`.

## How MatchInsight Works

MatchInsight works by first collecting historical data and team statistics, such as goals scored, goals conceded, points, league positions, and more. It then filters only the teams that will play in the 2025/2026 season to ensure predictions are relevant.

The data goes through smart preprocessing: teams and match status are converted into numerical features using one-hot encoding, and the dataset columns are aligned to match those used in training. Then, a RandomForest model predicts the result of each match.

The final output is a clean CSV containing all matches and the predicted result for each.The result is already available as **output_predictions_season2025.csv**

## Requirements

Python 3.9+ and the following libraries are needed:

- pandas
- scikit-learn
- joblib

## Sample Output

| **home_team** | **away_team** | **predicted_result** |
|---------------|---------------|---------------------|
| Milan         | Juventus      | H                   |
| Lazio         | Inter         | D                   |

## Fun Note for Bettors 😎

This is not a magic wand, but a helpful statistical guide. The model uses only historical data and patterns, giving you informed predictions. Use the results to make smarter choices… and maybe win a few more bets!
