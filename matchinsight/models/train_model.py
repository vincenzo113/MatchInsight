import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import joblib

# Carico il dataset
model = pd.read_csv("../data/model.csv")

# Squadre comuni tra la stagione 2022/23 e 2024/25
squadre_comuni = [
    "Atalanta BC", "Bologna","ACF Fiorentina", "Genoa CFC", "FC Internazionale Milano", "Juventus FC", "SS Lazio",
    "US Lecce", "AC Milan", "SSC Napoli", "AS Roma", "Torino FC", "Udinese Calcio", "Hellas Verona FC"
]

# Filtra il dataset per includere solo le partite tra squadre comuni
model_filtered = model[
    model['home_team'].isin(squadre_comuni) &
    model['away_team'].isin(squadre_comuni)
]

# Separazione delle variabili indipendenti e dipendenti
X = model_filtered.drop(columns=["result", "home_score", "away_score", "date"])
y = model_filtered["result"]

# One-hot encoding per le colonne categoriali
categorical_cols = ['home_team', 'away_team', 'status']
X_encoded = pd.get_dummies(X, columns=categorical_cols)

# Divisione del dataset in training e test
X_train, X_test, y_train, y_test = train_test_split(
    X_encoded, y, test_size=0.2, random_state=42
)
columns_train = X_encoded.columns.tolist()
joblib.dump(columns_train, "../models/columns_train.pkl")
# Creazione e addestramento del classificatore
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)

# Predizioni e valutazione del modello
y_pred = clf.predict(X_test)
print("Accuratezza:", accuracy_score(y_test, y_pred))
print("Matrice di confusione:\n", confusion_matrix(y_test, y_pred))

# Salvataggio del modello addestrato
joblib.dump(clf, "../models/model.pkl")