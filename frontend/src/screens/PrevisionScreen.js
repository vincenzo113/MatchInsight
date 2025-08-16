import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import MatchCard from "../components/MatchCard";
import '../style/PrevisionScreen.css';
import { formatDate } from "../utils/Formatter";
const PrevisionScreen = () => {
  const [matches, setMatches] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/prediction2025')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMatches(data);
      });
  }, []);

  // Estrae tutte le squadre
  const teams = Array.from(
    new Set(matches.flatMap(m => [m.home_team, m.away_team]))
  );

  const dates = Array.from(
    new Set(matches
      .filter(m => m.date) // Filtra solo le partite che hanno una data
      .map(m => formatDate(m.date)) // Estrae le date
    )
  ) // Ordina le date

  // Applica entrambi i filtri
  const filteredMatches = matches.filter(match => {
    const teamMatch = selectedTeam === "all" || 
                     match.home_team === selectedTeam || 
                     match.away_team === selectedTeam;
    
    const dateMatch = selectedDate === "all" || 
                     formatDate(match.date) === selectedDate;

    return teamMatch && dateMatch;
  });

  return (
    <div className="prevision-container">
      <h1>Previsioni per la Stagione 2025/2026</h1>
      
      <div className="filter-bar">
        {/* Filtro per squadra */}
        <div className="filter-group">
          <label>Filtra per squadra:</label>
          <select 
            value={selectedTeam} 
            onChange={e => setSelectedTeam(e.target.value)}
          >
            <option value="all">Tutte</option>
            {teams.map((team, idx) => (
              <option key={idx} value={team}>{team}</option>
            ))}
          </select>
        </div>

        {/* Filtro per data */}
        <div className="filter-group">
          <label>Filtra per data:</label>
          <select 
            value={selectedDate} 
            onChange={e => setSelectedDate(e.target.value)}
          >
            <option value="all">Tutte le date</option>
            {dates.map((date, idx) => (
              <option key={idx} value={date}>
                {/* Puoi formattare la data qui se necessario */}
                {date}
              </option>
            ))}
          </select>
        </div>

        {/* Pulsante reset filtri (opzionale) */}
        <button 
          className="reset-filters-btn"
          onClick={() => {
            setSelectedTeam("all");
            setSelectedDate("all");
          }}
        >
          Reset Filtri
        </button>
      </div>

      <div className="matches-list">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))
        ) : (
          <div className="no-matches">
            Nessuna partita trovata con i filtri selezionati
          </div>
        )}
      </div>
    </div>
  );
};

export default PrevisionScreen;