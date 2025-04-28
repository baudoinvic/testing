


import Detail from "../Imageslider/Detail";
import slider1 from '../../assets/img/slider1.png';
import slider2 from '../../assets/img/slider2.png';
import slider3 from '../../assets/img/slider3.png';
import slider4 from '../../assets/img/slider4.png';
import ecobank from '../../assets/img/ecobank.png';
import coffee from '../../assets/img/coffee.png';
import gym from '../../assets/img/gym.png';
import avatar1 from '../../assets/img/avatar1.png';
import avatar2 from '../../assets/img/avatar2.png';
import avatar3 from '../../assets/img/avatar3.png';
import { Utensils, Building2, Hotel, Building, Home as HomeIcon, MoreHorizontal } from 'lucide-react';
import scan from '../../assets/img/scan.png';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [category, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = () => {
    let token = localStorage.getItem("token");
    axios({
      url: "https://48cc-2c0f-2a80-2609-7c10-00-c93.ngrok-free.app/api/institutions/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const allCategories = response.data;
        setCategories(allCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const slides = [
    {
      image: slider1,
      title: "Bank With Ease",
      buttonText: "Banks",
    },
    {
      image: slider2,
      title: "Grab A Bite",
      buttonText: "Restaurants",
    },
    {
      image: slider3,
      title: "Your Health Matters",
      buttonText: "Hospitals",
    },
    {
      image: slider4,
      title: "Find a place to Stay",
      buttonText: "Hotels",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Food/drinks",
      icon: <Utensils size={48} className="text-blue-800" />,
      path: "/restaurent"
    },
    {
      id: 2,
      name: "Financial Services",
      icon: <Building2 size={48} className="text-blue-800" />,
      path: "/bank"
    },
    {
      id: 3,
      name: "Hotels/Travel",
      icon: <Hotel size={48} className="text-blue-800" />,
      path: "/hotels"
    },
    {
      id: 4,
      name: "Health/Medical",
      icon: <Building size={48} className="text-blue-800" />,
      path: "/hospital"
    },
    {
      id: 5,
      name: "Home Services",
      icon: <HomeIcon size={48} className="text-blue-800" />,
      path: "/home-services"
    },
    {
      id: 6,
      name: "More",
      icon: <MoreHorizontal size={48} className="text-blue-800" />,
      path: "/more-categories"
    },
  ];

  // Handle category click to navigate to the correct page with ID
  const handleCategoryClick = (category) => {
    if (category.path) {
      navigate(`${category.path}/${category.id}`);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Detail slides={slides} />
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16" style={{ marginTop: '-10%' }}>
          <h2 className="text-2xl font-bold text-center mb-8">Recent Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {/* Review 1 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img src={avatar1} alt="Aline W." className="w-10 h-10 rounded-full mr-3" />
                <span className="font-medium">Aline W.</span>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <img src={coffee} alt="Coffee" className="w-full h-48 object-cover" />
              </div>
              <p className="text-gray-800">
                The cappuccino here is top-notch, and the ambiance is perfect for remote work. Highly recommend!
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img src={avatar2} alt="Ella J." className="w-10 h-10 rounded-full mr-3" />
                <span className="font-medium">Ella J.</span>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <img src={ecobank} alt="Ecobank" className="w-full h-48 object-cover" />
              </div>
              <p className="text-gray-800">
                I had an issue with my bank account, and the staff was incredibly patient and helpful. A bit of a wait, but worth it!
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img src={avatar3} alt="Rick S." className="w-10 h-10 rounded-full mr-3" />
                <span className="font-medium">Rick S.</span>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <img src={gym} alt="Gym" className="w-full h-48 object-cover" />
              </div>
              <p className="text-gray-800">
                Good equipment, but it gets too packed in the evenings. Morning sessions are better.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="text-blue-600 font-medium">More Reviews</button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="bg-blue-50 rounded-lg p-8 flex flex-col items-center justify-center h-60 cursor-pointer transition-transform hover:scale-105"
              >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-lg font-medium text-center">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* QR Section */}
        <div className="mb-12">
          <div className="relative w-full py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden rounded-[32px]">
            <div className="absolute inset-0 z-0">
              <img src={scan} alt="Background" className="w-full h-full object-cover opacity-90" />
            </div>
            <div className="relative z-10 text-center px-4">
              <p className="text-lg mb-2">Make Your Voice Heard!</p>
              <h2 className="text-3xl font-bold mb-12">
                Download Murakoze today and start making a difference!
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                {/* Android QR */}
                <div className="flex flex-col items-center">
                  <p className="text-xl mb-4">Android</p>
                  <div className="bg-white p-3 rounded-lg">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://play.google.com/store/apps/murakoze"
                      alt="Android QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                {/* iOS QR */}
                <div className="flex flex-col items-center">
                  <p className="text-xl mb-4">iOS</p>
                  <div className="bg-white p-3 rounded-lg">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://apps.apple.com/us/app/murakoze"
                      alt="iOS QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;


