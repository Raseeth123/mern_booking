import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    fetchReviews();
  }, [filter, sort]);

  const fetchReviews = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filter) queryParams.append("rating", filter);
      queryParams.append("sort", sort);

      const res = await fetch(`http://localhost:5000/api/reviews?${queryParams}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movie || !review || rating < 1 || rating > 5) {
      return alert("Fill all fields properly");
    }
    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie, rating, review }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setMovie("");
      setRating(1);
      setReview("");
      fetchReviews();
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="container">
      <h2>Movie Review System</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Movie Name"
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rating-input"
          required
        />
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="filters">
        <div className="filter-group">
          <label>Filter by Rating: </label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="">All</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort: </label>
          <select onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>

      <div className="reviews-container">
        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <h4 className="movie-title">{r.movie}</h4>
            <p className="rating">⭐ {r.rating}/5</p>
            <p className="review-text">{r.review}</p>
            <small className="review-date">{new Date(r.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;