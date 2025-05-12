
import React, { useState, useEffect } from "react";
import { Building2, Star, MapPin } from "lucide-react";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

const Hotels = () => {
  const id = 3;
  const [open, setOpen] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("recommended");
  const [filterLabel, setFilterLabel] = useState("Recommended");

  const fetchInstitutions = async (filter = null) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let endpoint = `http://192.168.1.238:3000/api/institutions/${id}`;

      if (filter === "rating") {
        endpoint = `http://192.168.1.238:3000/api/search/rating/${id}`;
        setActiveFilter("rating");
        setFilterLabel("Highest Rated");
      } else if (filter === "review") {
        endpoint = `http://192.168.1.238:3000/api/search/review/${id}`;
        setActiveFilter("review");
        setFilterLabel("Most Reviewed");
      } else {
        setActiveFilter("recommended");
        setFilterLabel("Recommended");
      }

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInstitutions(res.data?.institutions || []);
    } catch (err) {
      console.error("Error fetching institutions", err);
      setError("Failed to load institutions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const FilterPopup = () => {
    return (
      <div className='fixed inset-0 z-50 flex ml-10 mt-16'>
        <div className='bg-white shadow-lg w-64 h-[90vh] flex flex-col'>
          <div className='p-4 space-y-6 overflow-y-auto flex-1'>
            <h2 className='text-lg font-semibold'>Filters</h2>

            <div className='space-y-2'>
              <h3 className='font-medium'>Price</h3>
              <input type='range' className='w-full' />
            </div>

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
              </div>
            </div>

            <div className='space-y-2'>
              <h3 className='font-medium'>Category</h3>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='hotels'
                    name='category'
                    className='mr-2'
                  />
                  <label htmlFor='hotels'>Hotels</label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='resorts'
                    name='category'
                    className='mr-2'
                  />
                  <label htmlFor='resorts'>Resorts</label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='guesthouses'
                    name='category'
                    className='mr-2'
                  />
                  <label htmlFor='guesthouses'>Guest Houses</label>
                </div>
              </div>
            </div>
          </div>

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

        <div className='flex-1' onClick={() => setShowFilterPopup(false)}></div>
      </div>
    );
  };

  const API_BASE_URL = "http://192.168.1.238:3000/";
  return (
    <div className='container mx-auto px-4 py-8'>
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

      {showFilterPopup && <FilterPopup />}

      <div className='flex justify-between items-center mb-6'>
        <div>
          <p className='text-sm text-gray-600'>Hotels</p>
          <h1 className='text-2xl font-bold'>
            {activeFilter === "rating"
              ? "Highest Rated Hotels in Kigali"
              : activeFilter === "review"
              ? "Most Reviewed Hotels in Kigali"
              : "Best Hotels in the Kigali City Area"}
          </h1>
        </div>
        <div className='relative'>
          <button
            className='flex items-center gap-1 font-medium'
            onClick={() => setOpen(!open)}
          >
            {filterLabel}
            <IoMdArrowDropdown />
          </button>

          {open && (
            <div className='absolute right-0 bg-white shadow p-2 mt-1 text-sm z-10 w-40'>
              <div
                className={`hover:bg-gray-100 cursor-pointer p-2 ${
                  activeFilter === "recommended" ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  setOpen(false);
                  fetchInstitutions();
                }}
              >
                Recommended
              </div>
              <div
                className={`hover:bg-gray-100 cursor-pointer p-2 ${
                  activeFilter === "rating" ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  setOpen(false);
                  fetchInstitutions("rating");
                }}
              >
                Highest Rated
              </div>
              <div
                className={`hover:bg-gray-100 cursor-pointer p-2 ${
                  activeFilter === "review" ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  setOpen(false);
                  fetchInstitutions("review");
                }}
              >
                Most Reviewed
              </div>
            </div>
          )}
        </div>
      </div>

      {(activeFilter === "rating" || activeFilter === "review") && (
        <div className='mb-4 flex'>
          <div className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center'>
            {activeFilter === "rating" ? "Highest Rated" : "Most Reviewed"}
            <button
              className='ml-2 text-blue-600 hover:text-blue-800'
              onClick={() => fetchInstitutions()}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {loading && <div className='text-center py-10'>Loading hotels...</div>}
      {error && <div className='text-center py-10 text-red-600'>{error}</div>}

      <div className='space-y-8 cursor-pointer'>
        {institutions?.map((institution) => {
          const isOpen = isInstitutionOpen(institution.hours || []);
          let imageUrl = "/api/placeholder/400/320";

          if (institution.image) {
            imageUrl = `${API_BASE_URL}${institution.image.image_url}`;
          }

          return (
            <Link
              to={`/hotels/${institution.id}`}
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

                  {activeFilter === "rating" && (
                    <div className='mb-2'>
                      <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium'>
                        Top Rated
                      </span>
                    </div>
                  )}

                  {activeFilter === "review" && (
                    <div className='mb-2'>
                      <span className='bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium'>
                        Most Reviewed
                      </span>
                    </div>
                  )}

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

      {!loading && institutions.length === 0 && (
        <div className='text-center py-10'>No hotels found</div>
      )}

      <div className='mt-10 mb-6'>
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

