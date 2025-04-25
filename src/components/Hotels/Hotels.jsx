
import React, { useState } from 'react';
import { Building2, Star, MapPin } from 'lucide-react';
import mariot from '../../assets/img/mariot.jpg';
import serena from '../../assets/img/serena.jpg';
import radison from '../../assets/img/radison.png';
import legacy from '../../assets/img/legacy.jpg';
import { Link } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";

const Hotels = () => {
  // State for filter popup
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  
  const hotels = [
    {
      id: 1,
      name: "Mariot Hotel",
      img: mariot,
      Link: "/mariot",
      rating: 4.0,
      reviews: 320,
      hours: "open until 23:00pm",
      location: "KG 790 Av 640 St",
      description: "I booked a 'luxury suite' at the Mariot Hotel, expecting a pampering getaway. What I got was... well, let's just say 'grand' was the only word that didn't apply. The 'majestic' view from my window? A dumpster overflowing with what I can only assume were the remnants of a week-long fish buffet. The 'luxury",
    },
    {
      id: 2,
      name: "Serena Hotel kigali",
      img: serena,
      Link: "/serena",
      rating: 4.0,
      reviews: 245,
      hours: "open until 18:00pm",
      location: "KG 320 Av 540 St",
      description: "I booked a 'luxury suite' at the Mariot Hotel, expecting a pampering getaway. What I got was... well, let's just say 'grand' was the only word that didn't apply. The 'majestic' view from my window? A dumpster overflowing with what I can only assume were the remnants of a week-long fish buffet. The 'luxury",
    },
    {
      id: 3,
      name: "Radison Hotel Blue kigali",
      img: radison,
      Link: "/radison",
      rating: 4.2,
      reviews: 280,
      hours: "open until 17:30pm",
      location: "KG 674 Av 520 St",
      description: "I booked a 'luxury suite' at the Mariot Hotel, expecting a pampering getaway. What I got was... well, let's just say 'grand' was the only word that didn't apply. The 'majestic' view from my window? A dumpster overflowing with what I can only assume were the remnants of a week-long fish buffet. The 'luxury",
    },
    {
      id: 4,
      name: "Grand Legacy Hotel",
      img: legacy,
      Link: "/legacy",
      rating: 3.8,
      reviews: 195,
      hours: "open until 16:30pm",
      location: "KG 250 Av 420 St",
      description: "I booked a 'luxury suite' at the Mariot Hotel, expecting a pampering getaway. What I got was... well, let's just say 'grand' was the only word that didn't apply. The 'majestic' view from my window? A dumpster overflowing with what I can only assume were the remnants of a week-long fish buffet. The 'luxury",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} fill="currentColor" className="text-gray-900 w-5 h-5" />);
      } else {
        stars.push(<Star key={i} className="text-gray-300 w-5 h-5" />);
      }
    }
    return stars;
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Left-aligned Filter Popup Component
  const FilterPopup = () => {
    return (
      <div className="fixed inset-0 z-50 flex ml-10 mt-16">
      <div className="bg-white shadow-lg w-64 h-[90vh] flex flex-col">
        
        {/* Scrollable content */}
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          <h2 className="text-lg font-semibold">Filters</h2>
    
          {/* Price Range */}
          <div className="space-y-2">
            <h3 className="font-medium">Price</h3>
            <input type="range" className="w-full" />
          </div>
    
          {/* Suggested Filters */}
          <div className="space-y-2">
            <h3 className="font-medium">Suggested</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="openNow" className="mr-2" />
                <label htmlFor="openNow">Open Now</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="acceptsCards" className="mr-2" />
                <label htmlFor="acceptsCards">Accepts Credit Cards</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="price" className="mr-2" />
                <label htmlFor="price">Price</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="dogsAllowed" className="mr-2" />
                <label htmlFor="dogsAllowed">Dogs Allowed</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="openLate" className="mr-2" />
                <label htmlFor="openLate">Open Now</label>
              </div>
            </div>
          </div>
    
          {/* Category */}
          <div className="space-y-2">
            <h3 className="font-medium">Category</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="radio" id="commercial" name="category" className="mr-2" />
                <label htmlFor="commercial">Commercial Banks</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="investment" name="category" className="mr-2" />
                <label htmlFor="investment">Investment Banks</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="retail" name="category" className="mr-2" />
                <label htmlFor="retail">Retail Banks</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="credit" name="category" className="mr-2" />
                <label htmlFor="credit">Credit Unions</label>
              </div>
            </div>
          </div>
        </div>
    
        {/* Buttons - NOT fixed, always inside the box */}
        <div className="border-t border-gray-200">
          <div className="flex">
            <button 
              className="flex-1 p-4 text-blue-600 font-medium" 
              onClick={() => setShowFilterPopup(false)}
            >
              Cancel
            </button>
            <button 
              className="flex-1 p-4 bg-blue-600 text-white font-medium"
              onClick={() => setShowFilterPopup(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    
      {/* Overlay */}
      <div 
        className="flex-1 " 
        onClick={() => setShowFilterPopup(false)}
      ></div>
    </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter options */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm"
          onClick={() => setShowFilterPopup(true)}
        >
          <IoMdMenu />
          <span className="font-medium">All</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm">
          <span className="font-medium">Price</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm">
          <span className="font-medium">Accepts credit cards</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm">
          <span className="font-medium">Good for kids</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm">
          <span className="font-medium">Free Wi-Fi</span>
        </button>
      </div>

      {/* Show Filter Popup when button is clicked */}
      {showFilterPopup && <FilterPopup />}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">Restaurants</p>
          <h1 className="text-2xl font-bold">Best restaurants in the Kigali City Area</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort:</span>
          <button className="flex items-center gap-1 font-medium">
            Recommended
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

     

<div className="space-y-8 cursor-pointer">
  {hotels.map((hotel) => (
    <Link to={hotel.Link} key={hotel.id} className="block">
      <div className="overflow-hidden border rounded-lg transition-transform transform hover:scale-102 hover:shadow-lg p-2">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
            <img
              src={hotel.img}
              alt={`${hotel.name} Logo`}
              className="w-full h-full object-cover bg-blue-800 rounded-md"
            />
          </div>
          <div className="p-2 flex-grow space-y-2">
            <h2 className="text-xl font-medium text-blue-800">{hotel.name}</h2>
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(hotel.rating)}</div>
              <span className="text-gray-700">{hotel.rating}</span>
              <span className="text-gray-500">({hotel.reviews} reviews)</span>
            </div>
            <p className="font-medium text-sm text-gray-600">Hours: {hotel.hours}</p>
            <p className="text-gray-700 text-sm">
              {hotel.description} <span className="text-blue-600">... more</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>


      {/* Pagination */}
      <div className="mt-10 mb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Hotels;

