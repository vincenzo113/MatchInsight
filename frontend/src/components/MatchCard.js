import React from "react";
import { useState } from "react";
import { teamLogos } from "./SquadCard";
import '../style/MatchCard.css'; // Importa il file CSS
import { formatDate } from "../utils/Formatter";
import { formatName } from "../utils/Formatter";

const MatchCard = ({ match }) => {
  const [isHovered, setIsHovered] = useState(false);

  function getMatchResult() {
    if (match['predicted_result'] === 'D') return "Pareggio"
    if (match['predicted_result'] === 'H') return "Vittoria Casa";
    if (match['predicted_result'] === 'A') return "Vittoria Ospite";
  };

  // Rimuovo la funzione getResultClass() per evitare colori diversi
  // Ora tutte le card avranno lo stesso stile
  
  // Determina l'icona del risultato (mantengo le icone per chiarezza)
  const getResultIcon = () => {
    const result = getMatchResult();
    if (result === "Vittoria Casa") return "🏆";
    if (result === "Vittoria Ospite") return "🏆";
    if (result === "Pareggio") return "🤝";
    return "⚽";
  };

  return (
    <div
      className="match-card neutral-style" // Uso solo una classe neutra
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header con data/ora se disponibile */}
      {match.date && (
        <div className="match-header">
          <span className="match-date">{formatDate(match.date)}</span>
          {match.time && <span className="match-time">{match.time}</span>}
        </div>
      )}

      {/* Container principale del match */}
      <div className="match-content">
        {/* Squadra di casa */}
        <div className="team home-team">
          <div className="team-logo-container">
            <img
              src={teamLogos[match.home_team]}
              alt={`${match.home_team} logo`}
              className="team-logo"
            />
          </div>
          {/* Nome della squadra di casa */}
          <span className="team-name">{formatName(match.home_team) || "Casa"}</span>
          {match.homeGoals !== undefined && (
            <span className="team-score">{match.homeGoals}</span>
          )}
        </div>

        {/* Sezione centrale con risultato */}
        <div className="match-center">
          <div className="result-badge">
            <span className="result-icon">{getResultIcon()}</span>
            <span className="result-text">{getMatchResult()}</span>
          </div>
          {/* Rimuovo l'indicatore colorato del risultato */}
          {/* 
          <div className="result-indicator">
            <div className={`indicator-dot ${getResultClass()}`}></div>
          </div>
          */}
        </div>

        {/* Squadra in trasferta */}
        <div className="team away-team">
          <div className="team-logo-container">
            <img
              src={teamLogos[match.away_team]}
              alt={`${match.away_team} logo`}
              className="team-logo"
            />
          </div>
          <span className="team-name">{formatName(match.away_team) || "Trasferta"}</span>
          {match.awayGoals !== undefined && (
            <span className="team-score">{match.awayGoals}</span>
          )}
        </div>
      </div>

      {/* Effetto hover */}
      <div className={`hover-overlay ${isHovered ? 'active' : ''}`}></div>
    </div>
  );
};

export default MatchCard;