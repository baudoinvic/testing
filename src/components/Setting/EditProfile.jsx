
import React from 'react';
import { User, MessageSquare } from "lucide-react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";

const EditProfile = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    let token = localStorage.getItem("token");
    axios({
      url: " https://8d28-2c0f-2a80-2609-7c10-00-c93.ngrok-free.app/api/profile/dashboard",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();


    let token = localStorage.getItem("token");
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
   
    };

    axios({
      method: "PUT",
      url: `https://8d28-2c0f-2a80-2609-7c10-00-c93.ngrok-free.app/api/profile/dashboard/update`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        toast.success("user is successfully edited");
        setTimeout(() => {
          navigate("");
        }, 3000);
      })

      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      })

     
  };
  

  return (
    <div className="flex flex-col md:flex-row w-full bg-white mt-6 md:mt-16 px-4 md:px-16">
      {/* Left Sidebar */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-200">
        <div className="flex flex-col items-center p-8">
          {/* Profile Image */}
          <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <div className="text-blue-800">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 20C33.3726 20 28 25.3726 28 32C28 38.6274 33.3726 44 40 44C46.6274 44 52 38.6274 52 32C52 25.3726 46.6274 20 40 20ZM40 20C33.3726 20 28 25.3726 28 32C28 38.6274 33.3726 44 40 44C46.6274 44 52 38.6274 52 32C52 25.3726 46.6274 20 40 20Z" stroke="#1E4784" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.6667 66.6667C18.6667 54.6667 28.0001 44.9999 40 44.9999C52.0001 44.9999 61.3334 54.6667 61.3334 66.6667" stroke="#1E4784" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Name */}
          <h2 className="text-lg font-medium">John Doe</h2>

          {/* Location */}
        
          {/* Add Photo Button */}
          <button className="flex items-center text-sm text-gray-800 mb-8 mt-4">
            <svg width="16" height="16" className="mr-2" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 13.3333V8M8 8V2.66667M8 8H13.3333M8 8H2.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Photo
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-4 pb-6">
          <Link to="/overview">
          <div className="flex items-center py-3 px-4 bg-blue-50 rounded-md mb-2 text-gray-700">
            <User size={18} className="mr-3" />
            <span>Profile Overview</span>
          </div>
          </Link>
          
          <Link to="/view">
          <div className="flex items-center py-3 px-4 text-gray-700">
            <MessageSquare size={18} className="mr-3" />
            <span>Reviews</span>
          </div>
          </Link>
         
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold mb-2">Edit Profile</h1>
          <p className="text-gray-500 mb-8">This information will be displayed publicly be careful what you share</p>

          <h2 className="text-gray-700 mb-4">Personal Information</h2>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Firstname"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Active since"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Lastname"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Gender"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Age group"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-10 gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-600">
              Cancel
            </button>
            <button className="px-6 py-2 bg-[#20497F] text-white rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;



