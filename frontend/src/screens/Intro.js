import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../style/Intro.css';

function Intro() {
    const navigation = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger delle animazioni dopo il mount del componente
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    // Componente per gli elementi fluttuanti
    const FloatingElements = () => (
        <div className="floating-elements">
            {[...Array(30)].map((_, i) => (
                <div 
                    key={i}
                    className="floating-element"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 20}s`,
                        animationDuration: `${20 + Math.random() * 15}s`
                    }}
                />
            ))}
        </div>
    );

    // Gestione del click sui bottoni con effetti
    const handleNavigation = (path) => {
        // Piccola animazione prima della navigazione
        const buttons = document.querySelectorAll('.intro-header button');
        buttons.forEach(btn => {
            btn.style.transform = 'scale(0.95)';
            btn.style.opacity = '0.7';
        });

        setTimeout(() => {
            navigation(path);
        }, 150);
    };

    return (
        <div className="intro-container">
            {/* Elementi fluttuanti di sfondo */}
            <FloatingElements />
            
            <header className={`intro-header ${isLoaded ? 'loaded' : ''}`}>
                <h1>
                    MatchInsight
                </h1>
                
                <h2>
                    Analisi e statistiche delle partite 2024
                </h2>
                
                <p>
                    Scopri statistiche dettagliate, previsioni avanzate e risultati 
                    delle partite in tempo reale. La tua fonte definitiva per 
                    l'analisi calcistica professionale.
                </p>
                
                <div className="buttons-container">
                    <button 
                        onClick={() => handleNavigation('/main')}
                        aria-label="Visualizza statistiche Serie A 2024/2025"
                    >
                        📊 Vedi le statistiche della Serie A 2024/2025
                    </button>
                    
                    <button 
                        onClick={() => handleNavigation('/prevision')}
                        aria-label="Scopri previsioni stagione corrente"
                    >
                        🔮 Scopri i possibili esiti della stagione corrente
                    </button>
                </div>
            </header>
        </div>
    );
}

export default Intro;