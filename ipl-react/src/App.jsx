
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/hero.jsx";
import MatchCard from "./components/Matchcard.jsx";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch matches from Supabase
  const fetchMatches = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id");

    if (error) {
      console.error("Error fetching matches:", error.message);
      setMessage("Unable to load matches: " + error.message);
    } else {
      setMatches(data);
    }

    setLoading(false);
  };

  // Fetch matches when component loads
  useEffect(() => {
    fetchMatches();

    // Realtime subscription
    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches"
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Select a match
  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    setMessage("");
  };

  // Book tickets
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedMatch) {
      setMessage("Please select a match.");
      return;
    }

    if (!customerName.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    const numberOfSeats = Number(seats);

    if (
      !Number.isInteger(numberOfSeats) ||
      numberOfSeats < 1 ||
      numberOfSeats > selectedMatch.available_seats
    ) {
      setMessage("Invalid number of seats.");
      return;
    }

    setMessage("Processing booking...");

    // Insert booking into database
    const { error: bookingError } = await supabase
      .from("bookings")
     .insert([
  {
    match_id: selectedMatch.id,
    customer_name: customerName.trim(),
    user_name: customerName.trim(),
    match_title: `${selectedMatch.team1} vs ${selectedMatch.team2}`,
    seats: seats,
    tickets: seats,
    total_price: 500 * seats
  }
]);

    if (bookingError) {
      setMessage("Booking failed: " + bookingError.message);
      return;
    }

    // Update available seats
    const remainingSeats =
      selectedMatch.available_seats - numberOfSeats;

    const { data, error: updateError } = await supabase
      .from("matches")
      .update({
        available_seats: remainingSeats
      })
      .eq("id", selectedMatch.id)
      .eq("available_seats", selectedMatch.available_seats)
      .select();

    if (updateError || !data || data.length === 0) {
      // Remove the booking if seat update fails
      await supabase
        .from("bookings")
        .delete()
        .eq("match_id", selectedMatch.id)
        .eq("customer_name", customerName.trim())
        .eq("seats", numberOfSeats);

      setMessage(
        "Seats may have changed. Please refresh and try again."
      );
      await fetchMatches();
      return;
    }

    setMessage("Booking successful! Your tickets are booked.");

    setCustomerName("");
    setSeats(1);
    setSelectedMatch(null);

    await fetchMatches();
  };

  return (
    <div>
      <Navbar />
      <Hero />

      <h1 className="section-title" id="matches">
        Upcoming Matches
      </h1>

      {loading && <p>Loading matches...</p>}

      {!loading && matches.length === 0 && (
        <p>No matches available.</p>
      )}

      <div className="matches-container">
        {matches.map((match) => (
          <div key={match.id}>
            <MatchCard
              team1={match.team1}
              team2={match.team2}
              date={match.match_date
                ? new Date(match.match_date).toLocaleString()
                : "Date not available"}
              venue={match.venue}
            />

            <p>
              Available Seats: {match.available_seats}
            </p>

            <button
              className="select-btn"
              onClick={() => handleSelectMatch(match)}
            >
              {selectedMatch?.id === match.id
                ? "Selected"
                : "Select Match"}
            </button>
          </div>
        ))}
      </div>

      {selectedMatch && (
        <div className="booking-section">
          <h2>Book Your IPL Tickets</h2>

          <h3>
            {selectedMatch.team1} vs {selectedMatch.team2}
          </h3>

          <form onSubmit={handleBooking}>
            <input
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />

            <br /><br />

            <label>Number of Tickets:</label>

            <input
              type="number"
              min="1"
              max={selectedMatch.available_seats}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              required
            />

            <br /><br />

            <button type="submit" className="select-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      )}

      {message && (
        <h3 className="selected-message">
          {message}
        </h3>
      )}
    </div>
  );
}

export default App;
