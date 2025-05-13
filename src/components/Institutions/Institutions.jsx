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
    const fetchInstitutions = async () => {
      try {
    
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://${ip}:3000/api/search?q=q&page=1&pageSize=5`,
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

        // Redirect based on institution type
        switch (institution.type?.toLowerCase()) {
          case "bank":
            navigate(`/banks/${id}`, { replace: true });
            break;
          case "hotel":
            navigate(`/hotels/${id}`, { replace: true });
            break;
          case "restaurant":
          case "restaurent":
            navigate(`/restaurents/${id}`, { replace: true });
            break;
          case "hospital":
            navigate(`/hospitals/${id}`, { replace: true });
            break;
          case "homeservice":
            navigate(`/homeservices/${id}`, { replace: true });
            break;
          default:
            // If type not recognized, you can either:
            setError(`Unknown institution type: ${institution.type}`);
            setLoading(false);
            break;
        }
      } catch (err) {
        console.error("Error fetching institution details:", err);
        setError(err.message || "Failed to load institution details");
        setLoading(false);
      }
    };

    fetchInstitutions();
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

  return null; // Should not reach here as we should navigate away
};

export default Institutions;
