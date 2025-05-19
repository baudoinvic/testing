
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Institutions = () => {
  const ip = import.meta.env.VITE_IP;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://${ip}:3000/api/institutions/${id}/view`,
          // `http://${ip}:3000/api/search?q=q&page=1`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const institution = response.data?.institution;

        if (!institution) {
          setError("Institution not found");
          setLoading(false);
          return;
        }

      } catch (err) {
        console.error("Error fetching institution:", err);
        setError(err.message || "Failed to load institution details");
        setLoading(false);
      }
    };

    fetchInstitution();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#20497F]'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center px-4'>
        <h2 className='text-2xl font-bold text-red-600 mb-4'>Error</h2>
        <p className='text-gray-700 text-center'>{error}</p>
        <button
          onClick={() => navigate("/")}
          className='mt-6 px-4 py-2 bg-[#20497F] text-white rounded hover:bg-blue-700'
        >
          Return to Home
        </button>
      </div>
    );
  }

  return null;
};

export default Institutions;
