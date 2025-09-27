import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const ReviewRatForm = ({ username }) => {
  const [formData, setFormData] = useState({
    subject: '',
    review: '',
    rating: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem(ACCESS_TOKEN);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRatingClick = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rating < 1 || formData.rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8001/api/review/${username}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, provider: username }), // send provider user too
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Something went wrong");
      }

      setSuccess("Review submitted successfully!");
      setFormData({ subject: '', review: '', rating: 0 });
      setError('');
    } catch (err) {
      setError(err.message || "Submission failed");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`w-6 h-6 cursor-pointer  ${
                formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Review Title</label>
          <input
            name="subject"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Great experience!"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Review Text</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="w-full p-2 border rounded resize-none h-24"
            placeholder="Write your review here..."
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewRatForm;
