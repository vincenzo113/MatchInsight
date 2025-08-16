import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Radar, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import '../style/SquadDetailsScreen.css'; 

// Registrazione Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const SquadDetailScreen = () => {
    const { teamName: encodedTeamName } = useParams();
    const [squadDetails, setSquadDetails] = useState({});
    
    useEffect(() => {
        if (!encodedTeamName) return;
        fetch('http://127.0.0.1:5000/api/team/' + encodeURIComponent(encodedTeamName))
            .then(response => response.json())
            .then(data => setSquadDetails(data))
            .catch(error => console.error("Error fetching squad details:", error));
    }, [encodedTeamName]);

    return (
        <div className="squad-detail-container">
            <h1>Dettagli Squadra</h1>
            <h2>{encodedTeamName}</h2>
            <h3>Statistiche Globali 2024</h3>

            <div className="charts-container">
                <div className="radar-chart">
                   <Radar
  data={{
    labels: ['Vittorie', 'Pareggi', 'Sconfitte', 'Goal Fatti', 'Goal Subiti'],
    datasets: [
      {
        label: encodedTeamName,
        data: [
          squadDetails.vittorie_totali || 0,
          squadDetails.pareggi_totali || 0,
          squadDetails.sconfitte_totali || 0,
          squadDetails.goal_fatti_totali || 0,
          squadDetails.goal_subiti_totali || 0
        ],
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.8)',
        pointBorderColor: 'rgba(34, 202, 236, 1)',
        pointHoverBackgroundColor: 'rgba(34, 202, 236, 1)',
        pointHoverBorderColor: '#fff'
      }
    ]
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255,255,255,0.2)' // linee dei raggi visibili su sfondo scuro
        },
        grid: {
          color: 'rgba(255,255,255,0.1)' // cerchi della griglia
        },
        pointLabels: {
          color: '#ffffff', // etichette dei punti
          font: { size: 14 }
        },
        ticks: {
          color: '#ffffff', // numeri della scala se abilitati
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff' // legenda visibile su sfondo scuro
        }
      },
      tooltip: {
        bodyColor: '#ffffff',
        titleColor: '#22caec',
        backgroundColor: 'rgba(0,0,0,0.7)'
      }
    }
  }}
/>
                </div>

                <div className="bar-chart">
                    <Bar
                        data={{
                            labels: ['Casa', 'Trasferta'],
                            datasets: [
                                {
                                    label: 'Goal Fatti',
                                    data: [squadDetails.goal_fatti_casa || 0, squadDetails.goal_fatti_fuori || 0],
                                    backgroundColor: 'rgba(34, 202, 236, 0.5)',
                                    borderColor: 'rgba(34, 202, 236, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Goal Subiti',
                                    data: [squadDetails.goal_subiti_casa || 0, squadDetails.goal_subiti_fuori || 0],
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Statistiche Casa vs Trasferta' }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SquadDetailScreen;