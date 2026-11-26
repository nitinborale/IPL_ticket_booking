
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/hero.jsx";
import MatchCard from "./components/Matchcard.jsx";
import "./App.css";

function App() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = [
    {
      id: 1,
      team1: "RCB",
      team2: "CSK",
      date: "10 December 2026",
      venue: "Bengaluru"
    },
    {
      id: 2,
      team1: "MI",
      team2: "KKR",
      date: "12 December 2026",
      venue: "Mumbai"
    },
    {
      id: 3,
      team1: "SRH",
      team2: "GT",
      date: "15 December 2026",
      venue: "Hyderabad"
    }
  ];

  return (
    <div>
      <Navbar />
      <Hero />

      <h1 className="section-title" id="matches">
        Upcoming Matches
      </h1>

      <div className="matches-container">
        {matches.map((match) => (
          <div key={match.id}>
            <MatchCard
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
            />

            <button
              className="select-btn"
              onClick={() => setSelectedMatch(match.id)}
            >
              {selectedMatch === match.id
                ? "Selected"
                : "Select Match"}
            </button>
          </div>
        ))}
      </div>

      {selectedMatch !== null && (
        <h3 className="selected-message">
          You selected match number {selectedMatch}
        </h3>
      )}
    </div>
  );
}

export default App;
