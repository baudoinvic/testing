

import React, { useState, useEffect } from "react";
import { User, MessageSquare } from "lucide-react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import { FaPen } from "react-icons/fa";

const EditProfile = () => {
  const ip = import.meta.env.VITE_IP;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    age_group: "",
    address: "",
    added_at: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User not authenticated!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios({
        url: `http://${ip}:3000/api/profile/dashboard`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setUserData({
        first_name: data.user.first_name || "",
        last_name: data.user.last_name || "",
        email: data.user.email || "",
        phone_number: data.user.phone_number || "",
        gender: data.user.gender || "",
        age_group: data.user.age_group || "",
        address: data.user.address || "",
        added_at: new Date(data.user.added_at).toLocaleDateString() || "",
      });

      console.log("Fetched user data:", data);
    
      if (data.profile_image && data.profile_image.length > 0) {
        setProfileImage(data.profile_image[0]?.image_url);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);

      
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    const token = localStorage.getItem("token");
   

    try {
      const response = await axios({
        method: "PUT",
        url: `http://${ip}:3000/api/profile/update_image`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrl = `http://${ip}:3000/${response.data.profile_image}`;
      setProfileImage(imageUrl);
      toast.success("Profile image updated");
     
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const data = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone_number: userData.phone_number,
      gender: userData.gender,
      age_group: userData.age_group,
      address: userData.address,
    };

    try {
      await axios({
        method: "PUT",
        url: `http://${ip}:3000/api/profile/dashboard/update`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile successfully updated");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col md:flex-row w-full bg-white mt-6 md:mt-16 px-4 md:px-16'>
      {/* Left Sidebar */}
      <div className='w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-200'>
        <div className='flex flex-col items-center p-8'>
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

          {/* Name */}
          <h2 className='text-lg font-medium'>
            {userData.first_name} {userData.last_name}
          </h2>

          <div className='flex items-center space-x-6 mb-8 mt-4'>
            <Link
              to='/profile'
              className='flex items-center text-sm text-gray-800 cursor-pointer'
            >
              <FaPen />
              <span className='ml-2'>Edit Profile</span>
            </Link>

            <label className='flex items-center text-sm text-gray-800 cursor-pointer'>
              <IoIosAddCircleOutline />
              Add Photo
              <input
                type='file'
                className='hidden'
                accept='image/*'
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Menu Items */}
        <div className='px-4 pb-6 ml-8 '>
          <Link to='/overview'>
            <div className='flex items-center py-3 px-4 text-gray-700'>
              <User size={18} className='mr-3' />
              <span>Profile Overview</span>
            </div>
          </Link>

          <Link to='/view'>
            <div className='flex items-center py-3 px-4 text-gray-700'>
              <MessageSquare size={18} className='mr-3' />
              <span>Reviews</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-4 md:p-8'>
        <form onSubmit={handleSubmit} className='max-w-3xl'>
          <h1 className='text-2xl font-semibold mb-2'>Edit Profile</h1>
          <p className='text-gray-500 mb-8'>
            This information will be displayed publicly be careful what you
            share
          </p>

          <h2 className='text-gray-700 mb-4'>Personal Information</h2>

          {/* Form Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <input
                type='text'
                name='first_name'
                placeholder='Firstname'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={userData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Active since'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100'
                value={userData.added_at}
                readOnly
              />
            </div>
            <div>
              <input
                type='text'
                name='last_name'
                placeholder='Lastname'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={userData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type='text'
                name='phone_number'
                placeholder='Phone Number'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={userData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                name='gender'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={userData.gender}
                onChange={handleChange}
                required
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
                <option value='Prefer not to say'>Prefer not to say</option>
              </select>
            </div>
            <div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <select
                name='age_group'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={userData.age_group}
                onChange={handleChange}
              >
                <option value=''>Select Age Group</option>
                <option value='18-24'>18-24</option>
                <option value='25-34'>25-34</option>
                <option value='35-44'>35-44</option>
                <option value='45-54'>45-54</option>
               
              </select>
            </div>
            <div>
              <input
                type='text'
                name='address'
                placeholder='Location'
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                value={userData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className='flex justify-end mt-10 gap-4'>
            <Link to='/profile'>
              <button
                type='button'
                className='px-6 py-2 border border-gray-300 rounded-md text-gray-600'
              >
                Cancel
              </button>
            </Link>
            <button
              type='submit'
              className='px-6 py-2 bg-[#20497F] text-white rounded-md'
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProfile;


