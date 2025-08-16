import pandas as pd
import joblib

# Carico i dataset
df_future = pd.read_csv("../data/timed_matches.csv")
df_team_stats = pd.read_csv("../data/team_stats.csv", index_col=0)

# Squadre comuni al training
squadre_comuni = [
    "Atalanta BC", "Bologna","ACF Fiorentina", "Genoa CFC", "FC Internazionale Milano",
    "Juventus FC", "SS Lazio", "US Lecce", "AC Milan", "SSC Napoli",
    "AS Roma", "Torino FC", "Udinese Calcio", "Hellas Verona FC"
]

# Filtra solo le partite tra squadre presenti nel training
df_future = df_future[
    df_future['home_team'].isin(squadre_comuni) &
    df_future['away_team'].isin(squadre_comuni)
]

# Merge statistiche squadre
df_future = df_future.merge(
    df_team_stats, left_on='home_team', right_index=True, how='left', suffixes=('', '_home')
)
df_future = df_future.merge(
    df_team_stats, left_on='away_team', right_index=True, how='left', suffixes=('_home', '_away')
)

# One-hot encoding per colonne categoriche
categorical_cols = ['home_team', 'away_team', 'status']
X_future = pd.get_dummies(df_future, columns=categorical_cols)

# Carica modello e colonne di training
clf = joblib.load("./model.pkl")
columns_train = joblib.load("./columns_train.pkl")  # lista colonne salvata durante il training

# Allinea le colonne di X_future con quelle del training
for col in columns_train:
    if col not in X_future.columns:
        X_future[col] = 0  # aggiungi colonne mancanti con zero
X_future = X_future[columns_train]  # ordina e rimuove eventuali colonne extra

# Predizioni
y_future_pred = clf.predict(X_future)
y_future_prob = clf.predict_proba(X_future)

# Salvataggio risultati
df_future['predicted_result'] = y_future_pred


output = df_future[['home_team','away_team','predicted_result','date']]

output.to_csv("../data/output_predictions_season2025.csv", index=False)