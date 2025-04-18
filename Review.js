import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movie: String,
  rating: Number,
  review: String,
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
