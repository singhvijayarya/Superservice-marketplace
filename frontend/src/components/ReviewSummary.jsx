import React, { useEffect, useState } from 'react';

const ReviewSummary = ({ username }) => {
  const [summary, setSummary] = useState({ average_rating: 0, total_reviews: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviewSummary = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/review/${username}/summary/`);

        // Check for 404 or non-JSON HTML error page
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch review summary');
          } else {
            throw new Error('Unexpected error (non-JSON response)');
          }
        }

        // Valid response
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        console.error("Error fetching review summary:", err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewSummary();
  }, [username]);

  if (loading) return <p className="text-gray-500">Loading review summary...</p>;
  if (error) return <p className="text-red-500">⚠️ {error}</p>;

  return (
    <div className="p-4 text-center bg-white rounded shadow mt-4">
      <h3 className="text-xl font-bold mb-2">⭐ Provider Rating</h3>
      <div className="text-yellow-500 text-2xl mb-1">
        {'★'.repeat(Math.round(summary.average_rating))}{'☆'.repeat(5 - Math.round(summary.average_rating))}
      </div>
      <p className="text-gray-700 font-medium">
        Average Rating: <span className="font-bold">{summary.average_rating.toFixed(1)}</span>
        {' '}({summary.total_reviews} reviews)
      </p>
    </div>
  );
};

export default ReviewSummary;
