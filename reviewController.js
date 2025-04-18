import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  const { movie, rating, review } = req.body;
  if (!movie || !rating || !review) {
    return res.status(400).send("All fields required");
  }
  const newReview = new Review({ movie, rating, review });
  await newReview.save();
  res.send(newReview);
};

export const getReviews = async (req, res) => {
  const { rating, sort } = req.query;
  let filter = {};
  if (rating) filter.rating = rating;
  const sortObj = { createdAt: sort === "asc" ? 1 : -1 };
  const reviews = await Review.find(filter).sort(sortObj);
  res.send(reviews);
};
