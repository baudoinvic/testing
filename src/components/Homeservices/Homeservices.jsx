



import React, { useState, useEffect } from 'react';
import { Star, MapPin } from 'lucide-react';
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import { Link } from 'react-router-dom';

const Homeservices = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://192.168.1.238:3000/api/institutions/5",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(res.data);
        setInstitutions(res.data?.institutions || []);
      } catch (err) {
        console.error("Error fetching banks", err);
        setError("Failed to load banks");
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  function isInstitutionOpen(hours) {
    const now = new Date();
    const day = now.toLocaleString("en-US", { weekday: "long" });
    const currentTime = now.toTimeString().slice(0, 5);

    const today = hours?.find((h) => h.day_of_week === day);
    if (!today) return false;

    const open = today.open_time;
    const close = today.close_time;

    if (close < open) {
      return currentTime >= open || currentTime <= close;
    }

    return currentTime >= open && currentTime <= close;
  }

  // Render star ratings
  const renderStars = (rating) => {
    if (!rating)
      return Array(5)
        .fill()
        .map((_, i) => <Star key={i} className='text-gray-300 w-5 h-5' />);

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <Star key={i} fill='currentColor' className='text-gray-900 w-5 h-5' />
        );
      } else {
        stars.push(<Star key={i} className='text-gray-300 w-5 h-5' />);
      }
    }
    return stars;
  };

  // Pagination component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className='flex items-center justify-center gap-2'>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  // Left-aligned Filter Popup Component
  const FilterPopup = () => {
    return (
      <div className='fixed inset-0 z-50 flex ml-10 mt-16'>
        <div className='bg-white shadow-lg w-64 h-[90vh] flex flex-col'>
          {/* Scrollable content */}
          <div className='p-4 space-y-6 overflow-y-auto flex-1'>
            <h2 className='text-lg font-semibold'>Filters</h2>

            {/* Price Range */}
            <div className='space-y-2'>
              <h3 className='font-medium'>Price</h3>
              <input type='range' className='w-full' />
            </div>

            {/* Suggested Filters */}
            <div className='space-y-2'>
              <h3 className='font-medium'>Suggested</h3>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <input type='checkbox' id='openNow' className='mr-2' />
                  <label htmlFor='openNow'>Open Now</label>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' id='acceptsCards' className='mr-2' />
                  <label htmlFor='acceptsCards'>Accepts Credit Cards</label>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' id='price' className='mr-2' />
                  <label htmlFor='price'>Price</label>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' id='atm' className='mr-2' />
                  <label htmlFor='atm'>24/7 ATM</label>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' id='onlineBanking' className='mr-2' />
                  <label htmlFor='onlineBanking'>Online Banking</label>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className='space-y-2'>
              <h3 className='font-medium'>Category</h3>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='commercial'
                    name='category'
                    className='mr-2'
                  />
                  <label htmlFor='commercial'>Commercial Banks</label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='investment'
                    name='category'
                    className='mr-2'
                  />
                  <label htmlFor='investment'>Investment Banks</label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='retail'
                    name='category'
                    className='mr-2'
                  />
                  <label htmlFor='retail'>Retail Banks</label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='credit'
                    name='category'
                    className='mr-2'
                  />
                  <label htmlFor='credit'>Credit Unions</label>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className='border-t border-gray-200'>
            <div className='flex'>
              <button
                className='flex-1 p-4 text-blue-600 font-medium'
                onClick={() => setShowFilterPopup(false)}
              >
                Cancel
              </button>
              <button
                className='flex-1 p-4 bg-blue-600 text-white font-medium'
                onClick={() => setShowFilterPopup(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div className='flex-1' onClick={() => setShowFilterPopup(false)}></div>
      </div>
    );
  };

  // Base URL for image paths
  const API_BASE_URL = "http://192.168.1.238:3000/";

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Filter options */}
      <div className='flex flex-wrap gap-2 mb-6'>
        <button
          className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm'
          onClick={() => setShowFilterPopup(true)}
        >
          <IoMdMenu />
          <span className='font-medium'>All</span>
        </button>
        <button className='flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm'>
          <span className='font-medium'>Price</span>
        </button>
        <button className='flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm'>
          <span className='font-medium'>Accepts credit cards</span>
        </button>
        <button className='flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm'>
          <span className='font-medium'>Good for kids</span>
        </button>
        <button className='flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm'>
          <span className='font-medium'>Free Wi-Fi</span>
        </button>
      </div>

      {/* Show Filter Popup when button is clicked */}
      {showFilterPopup && <FilterPopup />}

      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <p className='text-sm text-gray-600'>Home Services</p>
          <h1 className='text-2xl font-bold'>
            We deliver Home services
          </h1>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>sort:</span>
          <button className='flex items-center gap-1 font-medium'>
            Recommended
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {loading && <div className='text-center py-10'>Loading Home services...</div>}
      {error && <div className='text-center py-10 text-red-600'>{error}</div>}

      {/* home services listings */}

      <div className='space-y-8 cursor-pointer'>
        {institutions?.map((institution) => {
          const isOpen = isInstitutionOpen(institution.hours || []);
          let imageUrl = "/api/placeholder/400/320";

          if (institution.image) {
            imageUrl = `${API_BASE_URL}${institution.image.image_url}`;
          }

          return (
            <Link
              to={`/homeservices/${institution.id}`}
              key={institution.id || institution.name}
              className='block mb-6 overflow-hidden border rounded-lg transition-transform transform hover:scale-102 hover:shadow-lg'
            >
              <div className='flex flex-col md:flex-row p-0'>
                <div className='md:w-64 h-48 md:h-auto flex-shrink-0'>
                  <img
                    src={imageUrl}
                    alt={`${institution.name}`}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/320";
                      console.log("Image failed to load:", imageUrl);
                    }}
                  />
                </div>
                <div className='p-6 flex-grow'>
                  <h2 className='text-xl text-blue-800 mb-2'>
                    {institution.name}
                  </h2>
                  <p className='font-medium mb-2 text-green-600'>
                    {isOpen ? "Open now" : "Closed now"}
                  </p>
                  <div className='flex items-center mb-2'>
                    {renderStars(institution.avgRating)}
                    <span className='ml-2 text-gray-700'>
                      {institution.avgRating || "No rating"}
                    </span>
                    <span className='ml-2 text-gray-700'>
                      ({institution.totalReview || 0} Reviews)
                    </span>
                  </div>
                  <p className='text-gray-700 mb-4'>
                    {institution.description?.length > 200
                      ? `${institution.description.substring(0, 200)}... `
                      : institution.description}
                    {institution.description?.length > 200 && (
                      <span className='text-blue-600'>more</span>
                    )}
                  </p>
                  <p className='text-gray-600 flex items-center'>
                    <MapPin className='w-4 h-4 mr-1' /> {institution.location}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty state */}
      {!loading && institutions.length === 0 && (
        <div className='text-center py-10'>No homeservice found</div>
      )}

      {/* Pagination */}
      {institutions.length > 0 && (
        <div className='mt-10 mb-6'>
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default Homeservices;
