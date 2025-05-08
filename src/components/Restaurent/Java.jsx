  
import { Star, Wifi, Car, Bed, UtensilsCrossed } from "lucide-react";
import map from "../../assets/img/map.png";
import java from "../../assets/img/java.png";
import java2 from "../../assets/img/java2.png";
import java1 from "../../assets/img/java1.png";
import java3 from "../../assets/img/java3.png";
import { MdCoffee } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";

const Java = () => {
  return (
    <div className='w-full mx-auto px-4 sm:px-6 md:px-12 p-4 mb-8'>
      <h1 className='text-xl sm:text-2xl font-bold text-blue-800 pb-2 mb-4'>
        Java House Kigali Heights
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-4'>
        <div className='col-span-1 sm:col-span-2 sm:row-span-2'>
          <img
            src={java}
            alt='Hotel Exterior'
            className='w-full h-auto object-cover rounded-lg sm:h-full'
          />
        </div>
        <div>
          <img
            src={java2}
            alt='Hotel Room'
            className='w-full h-64 object-cover rounded-lg'
          />
        </div>
        <div>
          <img
            src={java1}
            alt='Hotel Room'
            className='w-full h-64 object-cover rounded-lg'
          />
        </div>
        <div>
          <img
            src={java3}
            alt='Hotel Interior'
            className='w-full h-64 object-cover rounded-lg'
          />
        </div>

        {/* Desktop Features/Amenities Layout */}
        <div className='grid grid-cols-2 gap-4 mb-8'>
          <div className='flex items-center gap-2'>
            <div className='bg-[#20497F] text-white p-2 rounded-full'>
              <MdCoffee size={20} />
            </div>
            <span>Coofee</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-[#20497F] text-white p-2 rounded-full'>
              <Car size={20} />
            </div>
            <span>Free parking</span>
          </div>

          <div className='flex items-center gap-2'>
            <div className='bg-[#20497F] text-white p-2 rounded-full'>
              <UtensilsCrossed size={20} />
            </div>
            <span>Restaurant</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-[#20497F] text-white p-2 rounded-full'>
              <Wifi size={20} />
            </div>
            <span>Free Wifi</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 mb-6 sm:-mt-2'>
        <button className='bg-gray-100 text-black px-4 py-2 rounded-full w-full sm:w-auto'>
          <FaDollarSign />
        </button>
        <button className='bg-[#20497F] text-white px-4 py-2 rounded-full w-full sm:w-auto'>
          View our Menu
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-16'>
        {/* Left Column - Location */}
        <div>
          <h3 className='font-medium mb-2'>Location</h3>
          <div className='w-full h-64 bg-gray-200 rounded-lg border'>
            <img
              src={map}
              alt='Hotel Location'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
        </div>

        {/* Middle Column - Opening Hours */}
        <div>
          <h3 className='font-medium mb-2'>Our opening hours</h3>
          <div className='space-y-3 md:mr-16'>
            <div className='flex justify-between'>
              <span>Monday</span>
              <span>09:00 AM - 12:00 AM</span>
            </div>
            <div className='flex justify-between'>
              <span>Tuesday</span>
              <span>08:00 AM - 02:00 AM</span>
            </div>
            <div className='flex justify-between'>
              <span>Wednesday</span>
              <span>09:00 AM - 12:30 AM</span>
            </div>
            <div className='flex justify-between'>
              <span>Thursday</span>
              <span>10:00 AM - 12:00 AM</span>
            </div>
            <div className='flex justify-between'>
              <span>Friday</span>
              <span>09:00 AM - 11:30 PM</span>
            </div>
            <div className='flex justify-between'>
              <span>Saturday</span>
              <span>10:00 AM - 03:00 AM</span>
            </div>
            <div className='flex justify-between'>
              <span>Sunday</span>
              <span>11:00 AM - 04:00 AM</span>
            </div>
          </div>
        </div>

        {/* Right Column - Ratings */}
        <div className='mt-8 md:mt-0'>
          <div className='flex justify-between mb-2'>
            <h3 className='font-medium'>
              Overall rating{" "}
              <span className='text-gray-600'>(250 reviews)</span>
            </h3>
          </div>

          <div className='flex gap-1 mb-4'>
            <Star className='text-blue-800 fill-blue-800' size={20} />
            <Star className='text-blue-800 fill-blue-800' size={20} />
            <Star className='text-blue-800 fill-blue-800' size={20} />
            <Star className='text-blue-800 fill-blue-800' size={20} />
            <Star className='text-gray-300' size={20} />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='w-12'>5 stars</span>
              <div className='flex-1 bg-gray-200 rounded-full h-2'>
                <div className='bg-[#20497F] h-2 rounded-full w-[90%]'></div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-12'>4 stars</span>
              <div className='flex-1 bg-gray-200 rounded-full h-2'>
                <div className='bg-[#20497F] h-2 rounded-full w-[40%]'></div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-12'>3 stars</span>
              <div className='flex-1 bg-gray-200 rounded-full h-2'>
                <div className='bg-[#20497F] h-2 rounded-full w-[30%]'></div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-12'>2 stars</span>
              <div className='flex-1 bg-gray-200 rounded-full h-2'>
                <div className='bg-[#20497F] h-2 rounded-full w-[20%]'></div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-12'>1 star</span>
              <div className='flex-1 bg-gray-200 rounded-full h-2'>
                <div className='bg-[#20497F] h-2 rounded-full w-[5%]'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Java;