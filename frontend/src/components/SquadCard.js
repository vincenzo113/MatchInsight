import React from "react";
import { Link } from "react-router-dom";

const SquadCard = ({ teamName }) => {
    return (
        <Link to={`/squad/${encodeURIComponent(teamName)}`} className="squad-card-link">
            <div className="squad-card">
                <h3>{teamName}</h3>
            </div>
        </Link>
    );
}

export default SquadCard;
