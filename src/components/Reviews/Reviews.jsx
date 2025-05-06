

import { useState, useEffect } from "react";
import axios from "axios";
import avatar1 from '../../assets/img/avatar1.png';
import avatar2 from '../../assets/img/avatar2.png';
import avatar3 from '../../assets/img/avatar3.png';
import coffee from '../../assets/img/coffee.png';
import ecobank from '../../assets/img/ecobank.png';
import gym from '../../assets/img/gym.png';

const Reviews = () => {
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Hardcoded reviews from the original code
  

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      try {
        const response = await axios({
          url: "http://192.168.1.238:3000/api/review/recent",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Reviews API response:", response.data);
        
        // Check if we have valid data
        if (response.data && response.data.reviews && response.data.reviews.length > 0) {
          setDynamicReviews(response.data.reviews);
          setUsingFallback(false);
        } else {
          console.log("No reviews found in API response, using fallback data");
          setUsingFallback(true);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Function to render a review - different structure based on source
  const renderReview = (review, isFromApi) => {
    if (isFromApi) {
      // API review format
      return (
        <div key={review.id} className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <img 
              src={`https://ui-avatars.com/api/?name=User${review.user_id}&background=random`} 
              alt={`User ${review.user_id}`} 
              className="w-10 h-10 rounded-full mr-3" 
            />
            <span className="font-medium">User {review.user_id}</span>
            <div className="ml-auto flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < review.rating ? "text-black" : "text-gray-300"}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          
          {/* Review Image */}
          {review.images && review.images.length > 0 && (
            <div className="mb-4">
              <img 
                src={`http://192.168.1.238:3000/${review.images[0].image_url}`}
                alt="Review" 
                className="w-full h-48 object-cover rounded"
               
              />
            </div>
          )}
          
          <p className="text-gray-800">{review.review}</p>
        </div>
      );
    } 
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="mb-16 mt-24">
      <h2 className="text-2xl font-bold text-center mb-8">Recent Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        {usingFallback ? (
          // Use fallback reviews
          fallbackReviews.map(review => renderReview(review, false))
        ) : (
         
          dynamicReviews.slice(0, 3).map(review => renderReview(review, true))
        )}
      </div>
      
      <div className="text-center mt-8">
        <button className="text-blue-600 font-medium">More Reviews</button>
      </div>
    </div>
  );
};

export default Reviews;