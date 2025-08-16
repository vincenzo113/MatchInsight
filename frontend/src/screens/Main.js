import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SquadCard from "../components/SquadCard";
import '../style/MainScreen.css'; // Importa il file CSS

const Main = () => {
    const navigation = useNavigate();
    const [squads, setSquads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://127.0.0.1:5000/api/teams2024')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSquads(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching team data:", error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    // Componente per le particelle animate (opzionale)
    const ParticlesBackground = () => (
        <div className="particles">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 15}s`,
                        animationDuration: `${15 + Math.random() * 10}s`
                    }}
                />
            ))}
        </div>
    );

    if (error) {
        return (
            <div className="main-container">
                <div className="main-header">
                    <h1 className="main-title">Errore</h1>
                    <p className="main-subtitle">
                        Si è verificato un errore nel caricamento dei dati: {error}
                    </p>
                </div>
                <div className="back-button-container">
                    <button 
                        className="back-button" 
                        onClick={() => navigation('/')}
                    >
                        ← Torna Indietro
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="main-container">
            {/* Particelle animate di sfondo (opzionale - rimuovi se preferisci) */}
            <ParticlesBackground />
            
            {/* Header principale */}
            <div className="main-header">
                <h1 className="main-title">Serie A 2024</h1>
                <p className="main-subtitle">
                    Esplora le statistiche complete di tutte le squadre della Serie A. 
                    Clicca su una squadra per visualizzare i dettagli approfonditi.
                </p>
            </div>

            {/* Container principale */}
            <div className="teams-container">
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Caricamento squadre...</p>
                    </div>
                ) : (
                    <>
                        <div className="teams-grid">
                            {squads.map((squad, index) => (
                                <div key={index} className="team-card-wrapper">
                                    <SquadCard teamName={squad} />
                                </div>
                            ))}
                        </div>
                        
                        <div className="back-button-container">
                            <button 
                                className="back-button" 
                                onClick={() => navigation('/')}
                            >
                                ← Torna Indietro
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}







export default Main;