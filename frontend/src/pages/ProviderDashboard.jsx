


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { ACCESS_TOKEN } from "../constants";
// import OnlineToggle from "./OnlineToggle";
// import ReviewRatForm from "../components/ReviewRatForm";
// import ReviewSummary from "../components/ReviewSummary ";
// import DefaultAvatar from "../assets/track.png";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, Avatar, Tag, Skeleton } from "antd";
// import { UserOutlined, PhoneOutlined, HomeOutlined, ClockCircleOutlined } from '@ant-design/icons';
// import { gsap } from "gsap";

// import CallNotifications from './CallNotifications';
// import VideoCallButton from './VideoCallButton';



// const ProviderDashboard = () => {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const profileRef = useRef(null);
//   const bookingsRef = useRef(null);

//   // Animate after data loaded
//   useEffect(() => {
//     if (!profile) return;

//     // Check if profileRef.current exists before animating
//     if (profileRef.current) {
//       gsap.from(profileRef.current, {
//         duration: 0.8,
//         y: 50,
//         opacity: 0,
//         ease: "back.out(1.7)",
//       });
//     }

//     // Check if bookingsRef.current exists and has children before animating
//     if (bookings.length > 0 && bookingsRef.current && bookingsRef.current.querySelectorAll(".booking-card").length > 0) {
//       gsap.from(bookingsRef.current.querySelectorAll(".booking-card"), {
//         duration: 0.6,
//         x: -30,
//         opacity: 0,
//         stagger: 0.15,
//         delay: 0.5,
//         ease: "power2.out",
//       });
//     }
//   }, [profile, bookings]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/provider-profile/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfile(res.data);
//         await fetchBookings(res.data.username);
//       } catch (err) {
//         console.error("Fetch error:", err.response?.data || err.message);
//         setError(err.response?.data?.error || "Could not load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const fetchBookings = async (providerUsername) => {
//     try {
//       const res = await axios.get(`http://localhost:8001/api/get-bookings/?provider=${providerUsername}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
//         },
//       });
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     }
//   };

//   const handleTrackingRedirect = (bookingUsername) => {
//     navigate(`/Tracking/${bookingUsername}`);
//   };

//   if (error) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="text-red-500 text-center mt-10 p-4 bg-red-50 rounded-lg max-w-md mx-auto"
//       >
//         ⚠️ {error}
//       </motion.div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Card className="w-full max-w-md" loading>
//           <Skeleton active avatar paragraph={{ rows: 4 }} />
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
//     >
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Profile Card */}
//         <motion.div
//           ref={profileRef}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           whileHover={{ y: -5 }}
//           className="backdrop-blur-lg bg-white/80 p-8 rounded-2xl shadow-xl border border-white/30"
//         >


//           {/* ... rest of your profile card JSX remains the same ... */}
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="flex flex-col items-center">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="mb-4"
//               >
//                 <Avatar
//                   src={profile.profile_picture}
//                   size={128}
//                   icon={<UserOutlined />}
//                   className="border-4 border-blue-400 shadow-md"
//                 />
//               </motion.div>
//               <OnlineToggle
//                 username={profile.username}
//                 initialStatus={profile.status}
//                 className="mt-4"
//               />
//             </div>

//             <div className="flex-1 space-y-6">
//               <h2 className="text-3xl font-bold text-gray-800">
//                 {profile.username}
//                 <span className="ml-5">
//                   <Tag color="blue" className="text-sm">
//                     {profile.role}
//                   </Tag>
//                 </span>
//               </h2>

//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <PhoneOutlined className="text-blue-500 mr-3 text-lg" />
//                   <span className="text-gray-700">{profile.phone}</span>
//                 </div>
//                 <div className="flex items-start">
//                   <HomeOutlined className="text-blue-500 mr-3 text-lg mt-1" />
//                   <span className="text-gray-700">{profile.address}</span>
//                 </div>
//               </div>

//               <ReviewSummary username={profile.username} />

//               {profile.username && (
//                 <ReviewRatForm username={profile.username} />
//               )}
//             </div>
//           </div>

//         </motion.div>

//         {/* Bookings */}
//         <div ref={bookingsRef}>
//           <AnimatePresence>
//             {bookings.length > 0 ? (
//               <motion.div
//                 key="bookings"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="space-y-6"
//               >
//                 {/* ... rest of your bookings JSX remains the same ... */}

//                 <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//                   <ClockCircleOutlined className="mr-2 text-purple-500" />
//                   Your Bookings
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {bookings.map((booking) => (
//                     <motion.div
//                       key={booking.id}
//                       initial={{ opacity: 0, x: -30 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.6 }}
//                       whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
//                       className="booking-card backdrop-blur-sm bg-white/70 p-6 rounded-xl shadow-md border border-white/30 cursor-pointer"
//                       onClick={() => handleTrackingRedirect(booking.seeker)}
//                     >
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <h3 className="font-semibold text-lg text-gray-800">{booking.seeker}</h3>
//                           <Tag
//                             color={booking.status === 'completed' ? 'green' : 'orange'}
//                             className="mt-2"
//                           >
//                             {booking.status}
//                           </Tag>
//                         </div>
//                         <motion.img
//                           whileHover={{ rotate: 5 }}
//                           src={DefaultAvatar}
//                           alt="Tracking"
//                           className="w-16 h-16 object-cover rounded-xl"
//                         />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>


//               </motion.div>
//             ) : (
//               <motion.div
//                 key="no-bookings"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-center py-12"
//               >
//                 {/* ... no bookings message JSX remains the same ... */}
//                 <div className="max-w-md mx-auto p-8 bg-white/80 rounded-xl shadow-sm border border-white/30">
//                   <p className="text-gray-600 text-lg">
//                     No bookings yet. Your services will appear here when booked.
//                   </p>
//                 </div>




//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProviderDashboard;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import OnlineToggle from "./OnlineToggle";
import ReviewRatForm from "../components/ReviewRatForm";
import ReviewSummary from "../components/ReviewSummary";
import DefaultAvatar from "../assets/track.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Avatar, Tag, Skeleton } from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { gsap } from "gsap";
import CallNotifications from "./CallNotifications";
import VideoCallButton from "./VideoCallButton";

const ProviderDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [callHistory, setCallHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const bookingsRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const res = await axios.get("http://localhost:8001/api/provider-profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          }, 
        });
        setProfile(res.data);
        await fetchBookings(res.data.username);
        await fetchCallHistory();
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Could not load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fetchBookings = async (providerUsername) => {
    try {
      const res = await axios.get(`http://localhost:8001/api/get-bookings/?provider=${providerUsername}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchCallHistory = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await axios.get("http://localhost:8000/api/call-history/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCallHistory(res.data);
    } catch (err) {
      console.error("Error fetching call history:", err);
    }
  };

  const handleTrackingRedirect = (bookingUsername) => {
    navigate(`/Tracking/${bookingUsername}`);
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center mt-10 p-4 bg-red-50 rounded-lg max-w-md mx-auto"
      >
        ⚠️ {error}
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md" loading>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Card */}
        <motion.div
          ref={profileRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -5 }}
          className="backdrop-blur-lg bg-white/80 p-8 rounded-2xl shadow-xl border border-white/30"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-4"
              >
                <Avatar
                  src={profile.profile_picture}
                  size={128}
                  icon={<UserOutlined />}
                  className="border-4 border-blue-400 shadow-md"
                />
              </motion.div>
              <OnlineToggle
                username={profile.username}
                initialStatus={profile.status}
                className="mt-4"
              />
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {profile.username}
                <span className="ml-5">
                  <Tag color="blue" className="text-sm">
                    {profile.role}
                  </Tag>
                </span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <PhoneOutlined className="text-blue-500 mr-3 text-lg" />
                  <span className="text-gray-700">{profile.phone}</span>
                </div>
                <div className="flex items-start">
                  <HomeOutlined className="text-blue-500 mr-3 text-lg mt-1" />
                  <span className="text-gray-700">{profile.address}</span>
                </div>
              </div>

              <ReviewSummary username={profile.username} />

              {profile.username && (
                <ReviewRatForm username={profile.username} />
              )}

              <VideoCallButton providerUsername={profile.username} />
            </div>
          </div>
        </motion.div>

        {/* Call Notifications */}
        {callHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CallNotifications calls={callHistory} />
          </motion.div>
        )}

        {/* Bookings */}
        <div ref={bookingsRef}>
          <AnimatePresence>
            {bookings.length > 0 ? (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <ClockCircleOutlined className="mr-2 text-purple-500" />
                  Your Bookings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      className="booking-card backdrop-blur-sm bg-white/70 p-6 rounded-xl shadow-md border border-white/30 cursor-pointer"
                      onClick={() => handleTrackingRedirect(booking.seeker)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{booking.seeker}</h3>
                          <Tag
                            color={booking.status === 'completed' ? 'green' : 'orange'}
                            className="mt-2"
                          >
                            {booking.status}
                          </Tag>
                        </div>
                        <motion.img
                          whileHover={{ rotate: 5 }}
                          src={DefaultAvatar}
                          alt="Tracking"
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="no-bookings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center py-12"
              >
                <div className="max-w-md mx-auto p-8 bg-white/80 rounded-xl shadow-sm border border-white/30">
                  <p className="text-gray-600 text-lg">
                    No bookings yet. Your services will appear here when booked.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}; 

export default ProviderDashboard;