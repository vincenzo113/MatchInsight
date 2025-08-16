import React from "react";
import { useNavigate } from 'react-router-dom';
import '../style/Intro.css'; // Creiamo un file CSS separato

function Intro() {
    const navigation = useNavigate();

    return (
        <div className="intro-container">
            <header className="intro-header">
                <h1>Benvenuto su MatchInsight</h1>
                <h2>Analisi e statistiche delle partite 2024</h2>
                <p>Scopri statistiche dettagliate, previsioni e risultati delle partite in tempo reale.</p>
                <button onClick={() => navigation('/main')}>Vedi le statistiche della serie A 2024/2025</button>
                <button onClick={() => navigation('/main2025')}>Scopri i possibili esiti della stagione corrente</button>
            </header>
        </div>
    );
}

export default Intro;