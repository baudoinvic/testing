
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { User, MessageSquare } from "lucide-react";
import axios from 'axios';
import { LuUserRound } from "react-icons/lu";

const Review = () => {
  const ip = import.meta.env.VITE_IP;
  const [userData, setUserData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const [profileImage, setProfileImage] = useState(null);

  // Fetch user reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://${ip}:3000/api/review/recent`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User reviews:", res.data);
        setReviews(res.data?.reviews || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews", err);
        setError("Failed to load reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Fetch user data to make sure the first name and last name are displaying correctly

  const fetchUserData = () => {
    let token = localStorage.getItem("token");
    axios({
      url: `http://${ip}:3000/api/profile/dashboard`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { first_name, last_name } = response.data.user;
        setUserData({ first_name, last_name });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6'>
        {/* Profile Section */}
        <div className='mt-8'>
          <div className='flex flex-col items-center p-2 '>
            {/* Profile Image */}
            <div className='w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden'>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='text-blue-800'>
                  <LuUserRound className='text-5xl' />
                </div>
              )}
            </div>

            <h2 className='text-lg font-medium'>
              {userData.first_name} {userData.last_name}
            </h2>
            <div className='flex items-center space-x-6 mb-8 mt-4'>
              <Link to='/profile'>
                <div className='flex items-center text-sm text-gray-800 cursor-pointer'>
                  <FaPen />
                  <span className='ml-2'>Edit Profile</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Menu Items */}
          <div className='px-4 pb-6'>
            <Link to='/overview'>
              <div className='flex items-center py-3 px-4 bg-blue-50 rounded-md mb-2 text-gray-700'>
                <User size={18} className='mr-3' />
                <span>Profile Overview</span>
              </div>
            </Link>

            <div className='flex items-center py-3 px-4 text-gray-700'>
              <MessageSquare size={18} className='mr-3' />
              <span>Reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          {/* Header */}
          <h1 className='text-2xl font-bold mb-4'>Reviews</h1>

          {/* Filter Bar */}
          <div className='flex gap-4 mb-6'>
            <div className='bg-blue-50 px-4 py-2 rounded-lg'>
              <span>Newest First ▼</span>
            </div>
            <div className='bg-blue-50 px-4 py-2 rounded-lg'>
              <span>Categories ▼</span>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className='text-center py-8'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto'></div>
              <p className='mt-4 text-gray-600'>Loading reviews...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className='bg-red-50 p-4 rounded-lg text-red-700'>
              <p>{error}</p>
              <button
                className='mt-2 text-blue-700 underline'
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {/* Review Cards */}
          {!loading && !error && reviews.length > 0 && (
            <div className='space-y-6'>
              {reviews.map((review, index) => (
                <div
                  key={review.id || index}
                  className='bg-blue-50 p-6 rounded-lg'
                >
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white'>
                      {review.institution_name
                        ? review.institution_name.substring(0, 2).toUpperCase()
                        : ""}
                    </div>

                    <div className='flex-1'>
                      <h3 className='font-bold'>
                        {review.institution_name || "Java House Kigali Heights"}
                        
                      </h3>
                      <p className='text-gray-600 text-sm'>
                        {review.institution_location ||
                          "Kigali Heights, KG 7 Ave, Kigali, Rwanda"}
                      </p>

                      {/* Rating */}
                      <div className='flex items-center gap-2 my-2'>
                        <div className='flex'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className='text-yellow-400'>
                              {i < (review.rating || 4) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className='text-gray-600 text-sm'>
                          {review.created_at
                            ? formatDate(review.created_at)
                            : "April 20th, 2025"}
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className='text-gray-700 mb-4'>
                        {review.review ||
                          "Great spot for brunch or casual meetings. Their cappuccino hits just right and the breakfast platter is a chef's kiss."}
                      </p>

                      {/* Review Images */}
                      <div className='flex gap-2'>
                        {review.images && review.images.length > 0 ? (
                          review.images.slice(0, 2).map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className='w-48 h-34 rounded-lg overflow-hidden'
                            >
                              <img
                                src={`http://192.168.1.238:3000/${image.image_url}`}
                                alt={`Review image ${imgIndex + 1}`}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;