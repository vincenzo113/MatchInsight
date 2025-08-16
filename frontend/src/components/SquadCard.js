import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style/SquadCard.css'; // Importa il file CSS per gli stili del card
import milanLogo from '../assets/milan.png';
import monzaLogo from '../assets/monza.png';
import fiorentinaLogo from '../assets/fiorentina.png';
import romaLogo from '../assets/roma.png';
import interLogo from '../assets/inter.png';
import juventusLogo from '../assets/juventus.png';
import napoliLogo from '../assets/napoli.png';
import atalantaLogo from '../assets/atalanta.png';
import lazioLogo from '../assets/lazio.png';
import torinoLogo from '../assets/torino.png';
import bolognaLogo from '../assets/bologna.png';
import genoaLogo from '../assets/genoa.png';
import veronaLogo from '../assets/verona.png';
import cagliariLogo from '../assets/cagliari.png';
import empoliLogo from '../assets/empoli.png';
import lecceLogo from '../assets/lecce.png';
import udineseLogo from '../assets/udinese.png';
import veneziaLogo from '../assets/venezia.png';
import parmaLogo from '../assets/parma.png';
import comoLogo from '../assets/como.png';



export const teamLogos = {
        'AC Milan': milanLogo,
        'AC Monza': monzaLogo,
        'ACF Fiorentina': fiorentinaLogo,
        'AS Roma': romaLogo,
        'Atalanta BC': atalantaLogo,
        'Bologna FC 1909': bolognaLogo,
        'Cagliari Calcio': cagliariLogo,
        'Como 1907': comoLogo,
        'Empoli FC': empoliLogo,
        'FC Internazionale Milano': interLogo,
        'Genoa CFC': genoaLogo,
        'Hellas Verona FC': veronaLogo,
        'Juventus FC': juventusLogo,
        'Parma Calcio 1913': parmaLogo,
        'SS Lazio': lazioLogo,
        'SSC Napoli': napoliLogo,
        'Torino FC': torinoLogo,
        'US Lecce': lecceLogo,
        'Udinese Calcio': udineseLogo,
        'Venezia FC': veneziaLogo
    };

const SquadCard = ({ teamName }) => {
    const [logoError, setLogoError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cardClass, setCardClass] = useState('');

    // Mapping dei loghi delle squadre (URLs reali dei loghi)
    

    // Squadre considerate "big teams" per effetti speciali
    const bigTeams = ['Juventus', 'Inter', 'Milan', 'Napoli', 'Roma', 'Lazio', 'Atalanta', 'Fiorentina'];

    useEffect(() => {
        // Determina la classe CSS basata sul tipo di squadra
        if (bigTeams.includes(teamName)) {
            setCardClass('big-team');
        }
        
        // Simula un piccolo delay per l'animazione
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, [teamName]);

    // Gestisce l'errore di caricamento del logo
    const handleLogoError = () => {
        setLogoError(true);
        setIsLoading(false);
    };

    // Gestisce il caricamento completato del logo
    const handleLogoLoad = () => {
        setIsLoading(false);
    };

    // Genera le iniziali del team per il fallback
    const getTeamInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    // Ottiene l'URL del logo o null se non disponibile
    const getLogoUrl = () => {
        return teamLogos[teamName] || null;
    };

    // Renderizza il logo o il fallback
    const renderLogo = () => {
        const logoUrl = getLogoUrl();
        
        if (isLoading) {
            return <div className="squad-logo-loading"></div>;
        }
        
        if (!logoUrl || logoError) {
            return (
                <div className="squad-logo-fallback">
                    {getTeamInitials(teamName)}
                </div>
            );
        }
        
        return (
            <img 
                src={logoUrl}
                alt={`Logo ${teamName}`}
                className="squad-logo"
                onError={handleLogoError}
                onLoad={handleLogoLoad}
                loading="lazy"
            />
        );
    };

    return (
        <Link 
            to={`/squad/${encodeURIComponent(teamName)}`} 
            className="squad-card-link"
            aria-label={`Visualizza dettagli ${teamName}`}
        >
            <div className={`squad-card ${cardClass}`}>
                <div className="squad-logo-container">
                    {renderLogo()}
                </div>
                
                <div className="squad-info-section">
                    <h3 className="squad-name">{teamName}</h3>
                    <p className="squad-info">Serie A 2024/25</p>
                </div>
            </div>
        </Link>
    );
};

export default SquadCard;