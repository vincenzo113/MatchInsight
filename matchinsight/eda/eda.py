import pandas as pd

# Carica il dataset delle partite finite
df_finished = pd.read_csv("../data/finished_matches.csv")

# -------------------------
# 1️⃣ Colonne aggiuntive nel df_finished (per partita)
# -------------------------
df_finished['goal_diff'] = df_finished['home_score'] - df_finished['away_score']
df_finished['result'] = df_finished.apply(
    lambda row: 'H' if row['home_score'] > row['away_score']
    else ('A' if row['home_score'] < row['away_score'] else 'D'),
    axis=1
)

# -------------------------
# 2️⃣ Aggregazioni per squadra (df_team_stats)
# -------------------------

# Vittorie
home_wins_count = df_finished[df_finished['result'] == 'H'].groupby('home_team').size().rename("vittorie_casa")
away_wins_count = df_finished[df_finished['result'] == 'A'].groupby('away_team').size().rename("vittorie_fuori")
total_wins_count = home_wins_count.add(away_wins_count, fill_value=0)

# Pareggi
home_draws = df_finished[df_finished['result'] == 'D'].groupby('home_team').size().rename("pareggi_casa")
away_draws = df_finished[df_finished['result'] == 'D'].groupby('away_team').size().rename("pareggi_fuori")
total_draws = home_draws.add(away_draws, fill_value=0)

# Sconfitte
home_losses = df_finished[df_finished['result'] == 'A'].groupby('home_team').size().rename("sconfitte_casa")
away_losses = df_finished[df_finished['result'] == 'H'].groupby('away_team').size().rename("sconfitte_fuori")
total_losses = home_losses.add(away_losses, fill_value=0)

# Gol fatti
goals_home = df_finished.groupby('home_team')['home_score'].sum().rename("goal_fatti_casa")
goals_away = df_finished.groupby('away_team')['away_score'].sum().rename("goal_fatti_fuori")
total_goals = goals_home.add(goals_away, fill_value=0).rename("goal_fatti_totali")

# Gol subiti
goals_conceded_home = df_finished.groupby('home_team')['away_score'].sum().rename("goal_subiti_casa")
goals_conceded_away = df_finished.groupby('away_team')['home_score'].sum().rename("goal_subiti_fuori")
total_goals_conceded = goals_conceded_home.add(goals_conceded_away, fill_value=0).rename("goal_subiti_totali")

# Differenza reti
goal_difference = total_goals - total_goals_conceded
goal_difference = goal_difference.rename("diff_reti")

# -------------------------
# 3️⃣ Creazione tabella aggregata df_team_stats
# -------------------------
df_team_stats = pd.DataFrame({
    "vittorie_casa": home_wins_count,
    "vittorie_fuori": away_wins_count,
    "vittorie_totali": total_wins_count,
    "pareggi_casa": home_draws,
    "pareggi_fuori": away_draws,
    "pareggi_totali": total_draws,
    "sconfitte_casa": home_losses,
    "sconfitte_fuori": away_losses,
    "sconfitte_totali": total_losses,
    "goal_fatti_casa": goals_home,
    "goal_fatti_fuori": goals_away,
    "goal_fatti_totali": total_goals,
    "goal_subiti_casa": goals_conceded_home,
    "goal_subiti_fuori": goals_conceded_away,
    "goal_subiti_totali": total_goals_conceded,
    "diff_reti": goal_difference
}).fillna(0).astype(int)

# Medie
#media gol fatti
total_partite = df_finished.groupby("home_team").size()
df_team_stats['media_goal_fatti'] = df_team_stats['goal_fatti_totali'] / total_partite
#media goal subiti
df_team_stats['media_goal_subiti'] = df_team_stats['goal_subiti_totali'] / total_partite



df_model = df_finished \
    .merge(df_team_stats, left_on='home_team', right_index=True, how='left', suffixes=('', '_home')) \
    .merge(df_team_stats, left_on='away_team', right_index=True, how='left', suffixes=('_home', '_away'))





# -------------------------
# 4️⃣ Salvataggio
# -------------------------
df_model.to_csv("../data/model.csv", index=False)
df_team_stats.to_csv("../data/team_stats.csv")