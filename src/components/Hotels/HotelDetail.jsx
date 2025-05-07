

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Wifi, Car, Bed, UtensilsCrossed, Waves, X, MapPin, Phone, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const HotelDetail = () => {
  const { id } = useParams(); 
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showServicesPopup, setShowServicesPopup] = useState(false);

  const openServicesPopup = () => {
    setShowServicesPopup(true);
  };

  const closeServicesPopup = () => {
    setShowServicesPopup(false);
  };

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://192.168.1.238:3000/api/institutions/5/view", {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        console.log(res.data); 
    
        setInstitution(res.data?.institution);
      } catch (err) {
        console.error("Error fetching institutions", err);
        setError("Failed to load institutions");
      } finally {
        setLoading(false);
      }
    };
  
    fetchInstitutions();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="text-blue-800 fill-blue-800" size={20} />);
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={20} />);
      }
    }
    return stars;
  };
  
  // Base URL for image paths
  const API_BASE_URL = "http://192.168.1.238:3000/";

  if (loading) return <div className="w-full mx-auto px-4 sm:px-6 md:px-12 p-4 mb-8 text-center">Loading hotel details...</div>;
  if (error) return <div className="w-full mx-auto px-4 sm:px-6 md:px-12 p-4 mb-8 text-center text-red-500">{error}</div>;
  if (!institution) return <div className="w-full mx-auto px-4 sm:px-6 md:px-12 p-4 mb-8 text-center">Hotel not found</div>;

  // Calculate average rating from reviews
  const calculateAvgRating = () => {
    if (!institution.reviews || institution.reviews.length === 0) return 0;
    const sum = institution.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / institution.reviews.length;
  };
  
  const avgRating = calculateAvgRating();
  
  // Get the first image or use placeholder
  let mainImageUrl = "/api/placeholder/800/400";
  if (institution.images && institution.images.length > 0) {
    mainImageUrl = `${API_BASE_URL}${institution.images[0].image_url}`;
  }

  // Get other images for gallery
  const galleryImages = institution.images && institution.images.length > 1 ? 
    institution.images.slice(1, 4) : [];

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-12 p-4 mb-8">
      {/* Back button */}
      <Link to="/hotels" className="flex items-center text-blue-600 mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Hotels
      </Link>

      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold text-blue-800 pb-2 mb-4">{institution.name}</h1>

      {/* Image Gallery - Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        <div className="col-span-1 sm:col-span-2 sm:row-span-2">
          <img 
            src={mainImageUrl}
            alt="Hotel Exterior" 
            className="w-full h-auto object-cover rounded-lg sm:h-full"
            onError={(e) => {
              e.target.src = "/api/placeholder/800/400";
            }}
          />
        </div>
        
        {galleryImages.map((image, index) => (
          <div key={index}>
            <img 
              src={`${API_BASE_URL}${image.image_url}`}
              alt="Hotel Room"
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/300";
              }}
            />
          </div>
        ))}
        
        {/* Fill remaining slots if not enough images */}
        {galleryImages.length < 3 && Array.from({ length: 3 - galleryImages.length }).map((_, index) => (
          <div key={`placeholder-${index}`}>
            <img 
              src="/api/placeholder/400/300"
              alt="Hotel Room"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
            {/* Desktop Features/Amenities Layout */}
      <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#20497F] text-white p-2 rounded-full">
              <Waves size={20} />
            </div>
            <span>Swimming pool</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#20497F] text-white p-2 rounded-full">
              <Car size={20} />
            </div>
            <span>Free parking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#20497F] text-white p-2 rounded-full">
              <Bed size={20} />
            </div>
            <span>King Size Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#20497F] text-white p-2 rounded-full">
              <UtensilsCrossed size={20} />
            </div>
            <span>Restaurant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#20497F] text-white p-2 rounded-full">
              <Wifi size={20} />
            </div>
            <span>Free Wifi</span>
          </div>
        </div>
      </div>

        

      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:-mt-2">
        <button className="bg-[#20497F] text-white px-4 py-2 rounded-full w-full sm:w-auto">
          Visit the Page
        </button>
        <button 
          className="bg-[#20497F] text-white px-4 py-2 rounded-full w-full sm:w-auto"
          onClick={openServicesPopup}
        >
          View our Services
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-16">
        {/* Left Column - Location */}
        <div>
          <h3 className="font-medium mb-2">Location</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg border">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <MapPin size={48} />
              <p className="ml-2">{institution.address || "Address not available"}</p>
            </div>
          </div>
          {institution.phone_number && (
            <div className="mt-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-gray-500" />
              <p className="text-gray-700">{institution.phone_number}</p>
            </div>
          )}
        </div>

        {/* Middle Column - Opening Hours */}
        <div>
          <h3 className="font-medium mb-2">Our opening hours</h3>
          <div className="space-y-3 md:mr-16">
            <div className="flex justify-between">
              <span>Monday</span>
              <span>09:00 AM - 12:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Tuesday</span>
              <span>08:00 AM - 02:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Wednesday</span>
              <span>09:00 AM - 12:30 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Thursday</span>
              <span>10:00 AM - 12:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Friday</span>
              <span>09:00 AM - 11:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 03:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>11:00 AM - 04:00 AM</span>
            </div>
          </div>
        </div>

        {/* Right Column - Ratings */}
        <div className="mt-8 md:mt-0">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">
              Overall rating <span className="text-gray-600">({institution.reviews?.length || 0} reviews)</span>
            </h3>
          </div>

          <div className="flex gap-1 mb-4">
            {renderStars(avgRating)}
          </div>

          <div className="space-y-2">
            {/* Rating distribution - you can replace this with actual data if available */}
            <div className="flex items-center gap-2">
              <span className="w-12">5 stars</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-[#20497F] h-2 rounded-full w-[90%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12">4 stars</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-[#20497F] h-2 rounded-full w-[40%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12">3 stars</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-[#20497F] h-2 rounded-full w-[30%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12">2 stars</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-[#20497F] h-2 rounded-full w-[20%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12">1 star</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-[#20497F] h-2 rounded-full w-[5%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="mt-8">
        <h3 className="font-medium mb-2">About {institution.name}</h3>
        <p className="text-gray-700">{institution.description || "No description available."}</p>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="font-medium mb-4">Guest Reviews</h3>
        {institution.reviews && institution.reviews.length > 0 ? (
          <div className="space-y-4">
            {institution.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">User #{review.user_id}</p>
                    <div className="flex items-center">
                      {renderStars(review.rating || 0)}
                      <span className="text-sm text-gray-500 ml-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
      
      {/* Services Popup */}
      {showServicesPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeServicesPopup} 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-700 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4 sm:mb-6 pr-8">Dinning</h2>
            
            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="font-medium">Sokoni Restaurant</div>
                <div className="text-gray-600 text-sm sm:text-base">Monday and Sunday</div>
                <div className="text-sm sm:text-base">12:30PM - 2:30PM</div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="font-medium">Milima Restaurant</div>
                <div className="text-gray-600 text-sm sm:text-base">Monday and Saturday</div>
                <div className="text-sm sm:text-base">6:30AM - 12:30AM</div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="font-medium">The executive lounge</div>
                <div className="text-gray-600 text-sm sm:text-base">Monday and Wednesday</div>
                <div className="text-sm sm:text-base">6:30AM - 12:30AM</div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 sm:mb-6">Meeting</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="font-medium">Conference room</div>
                <div className="text-gray-600 text-sm sm:text-base">Friday and Saturday</div>
                <div className="text-sm sm:text-base">12:30PM - 2:30PM</div>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="font-medium">Request for a proposal</div>
                <div className="text-gray-600 text-sm sm:text-base">Monday and Friday</div>
                <div className="text-sm sm:text-base">6:30AM - 12:30AM</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;