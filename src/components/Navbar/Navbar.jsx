

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.jpeg';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };

  const navItems = [
    {
      title: 'Food Drinks',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Restaurants', path: '/restaurent' },
        { label: 'Bakeries', path: '/bakeries' },
        { label: 'Fast Food', path: '/food' }
      ]
    },
    {
      title: 'Financial Services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Banks', path: '/bank' },
        { label: 'Tax Services', path: '/tax' },
        { label: 'Accountants', path: '/accountant' }
      ]
    },
    {
      title: 'Hotels/Travel',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Hotels', path: '/hotels' },
        { label: 'Tours', path: '/tours' },
        { label: 'Hostels', path: '/hostels' }
      ]
    },
    {
      title: 'Health/Medical',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Hospitals', path: '/hospitals' },
        { label: 'Clinics', path: '/clinics' },
        { label: 'Pharmacies', path: '/pharmacies' }
      ]
    },
    {
      title: 'More',
      hasDropdown: true,
      dropdownItems: []
    }
  ];

  useEffect(() => {
    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    const tokenCheckInterval = setInterval(checkAuthStatus, 60000);
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      clearInterval(tokenCheckInterval);
    };
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000;
        if (Date.now() >= expirationTime) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Murakoze Logo" className="h-10" />
            </Link>
          </div>

          {/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="p-2 bg-[#20497F] text-white rounded">
              <Search className="h-5 w-5" />
            </button>
          </div> */}
           <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
      <button onClick={toggleInput} className="p-2 bg-[#20497F] text-white rounded">
        <Search className="h-5 w-5" />
      </button>

      {showInput && (
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
        />
      )}
    </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  className="px-3 py-2 text-sm font-medium text-gray-700 flex items-center hover:text-[#0046AD]"
                  onClick={() => toggleDropdown(index)}
                >
                  {item.title}
                  {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </button>
                {item.hasDropdown && activeDropdown === index && item.dropdownItems.length > 0 && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
            <Link to="/review" className="px-4 py-2 text-[#0046AD] border border-[#0046AD] rounded hover:bg-blue-50 text-sm font-medium">
              Write a Review
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="flex items-center px-4 py-2 text-[#0046AD] border border-[#0046AD] rounded hover:bg-blue-50 text-sm font-medium"
                  onClick={() => toggleDropdown('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  My Account
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'profile' && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                    <Link to="/overview" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-[#0046AD] border border-[#0046AD] rounded hover:bg-blue-50 text-sm font-medium">
                  Log In
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-[#20497F] text-white rounded hover:bg-blue-700 text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item, index) => (
            <div key={index}>
              <button
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 flex items-center justify-between hover:bg-gray-50"
                onClick={() => toggleDropdown(index)}
              >
                {item.title}
                {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              {activeDropdown === index && item.dropdownItems.length > 0 && (
                <div className="pl-4 pr-2 py-2 bg-gray-50">
                  {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <Link
                      key={dropdownIndex}
                      to={dropdownItem.path}
                      className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-y-3 flex-col">
              <Link to="/review" className="w-full px-4 py-2 text-[#0046AD] border border-[#0046AD] rounded hover:bg-blue-50 text-sm font-medium text-center">
                Write a Review
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="w-full px-4 py-2 text-[#0046AD] border border-[#0046AD] rounded hover:bg-blue-50 text-sm font-medium text-center">
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-[#20497F] text-white rounded hover:bg-blue-700 text-sm font-medium text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full px-4 py-2 text-[#0046AD] border border-[#0046AD] rounded hover:bg-blue-50 text-sm font-medium text-center">
                    Log In
                  </Link>
                  <Link to="/signup" className="w-full px-4 py-2 bg-[#20497F] text-white rounded hover:bg-blue-700 text-sm font-medium text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
