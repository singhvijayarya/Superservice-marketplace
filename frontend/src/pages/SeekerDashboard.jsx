import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/track.png";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Avatar, Tag, Button, message, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

const SeekerDashboard = () => {
  // ... [All existing state and logic remains exactly the same] ...
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  // Fetch seeker profile (existing logic unchanged)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const res = await axios.get("http://localhost:8001/api/seeker-profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Could not load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch bookings (existing logic unchanged)
  useEffect(() => {
    if (!profile) return;

    const fetchBookings = async () => {
      try {
        const seekerUsername = profile.username;
        const res = await axios.get(`http://localhost:8001/api/get-bookings/?seeker=${seekerUsername}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [profile]);

  // Handle booking cancellation (existing logic unchanged)
  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        throw new Error("Authorization token missing");
      }

      await axios.delete(`http://localhost:8001/api/cancel-booking/${bookingId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(bookings.filter(b => b.id !== bookingId));
      message.success("Booking cancelled successfully!");
    } catch (err) {
      message.error("Failed to cancel booking");
      console.error("Error cancelling booking:", err);
    }
  };

  // Redirect to tracking (existing logic unchanged)
  const handleTrackingRedirect = (bookingUsername) => {
    navigate(`/Tracking/${bookingUsername}`);
  };

  // Status tag colors
  const getStatusTagColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'gold';
      case 'confirmed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'blue';
    }
  };

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="p-6 rounded-2xl bg-white bg-opacity-80 backdrop-blur-lg shadow-xl text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
          className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Profile Section - updated to remove deprecated props */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="relative overflow-hidden rounded-2xl shadow-lg bg-white"
        >
          <Card
            title={
              <motion.div 
                className="text-2xl font-bold text-center text-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your Profile
              </motion.div>
            }
            styles={{
              header: { borderBottom: 'none' },
              body: { padding: 0 }
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 p-6">

              {/* ... [Rest of profile section remains the same] ... */}
              <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Avatar
                    src={profile.profile_picture}
                    size={120}
                    className="border-4 border-white shadow-lg"
                    icon={<UserOutlined />}
                  />
                </motion.div>

                <div className="space-y-4 text-lg flex-1">
                  <motion.div 
                    variants={fadeIn}
                    className="flex items-center gap-4 p-3 bg-white bg-opacity-30 rounded-xl backdrop-blur-sm"
                  >
                    <UserOutlined className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600">Username</p>
                      <p className="font-semibold">{profile.username}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={fadeIn}
                    className="flex items-center gap-4 p-3 bg-white bg-opacity-30 rounded-xl backdrop-blur-sm"
                  >
                    <MailOutlined className="text-purple-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{profile.email}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={fadeIn}
                    className="flex items-center gap-4 p-3 bg-white bg-opacity-30 rounded-xl backdrop-blur-sm"
                  >
                    <PhoneOutlined className="text-green-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold">{profile.phone}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={fadeIn}
                    className="flex items-center gap-4 p-3 bg-white bg-opacity-30 rounded-xl backdrop-blur-sm"
                  >
                    <HomeOutlined className="text-orange-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-semibold">{profile.address}</p>
                    </div>
                  </motion.div>
                </div>
            </div>
          </Card>
        </motion.div>

        {/* Bookings Section - IMPROVED VISIBILITY */}
        {/* <motion.div 
          variants={containerVariants}
          className="space-y-6 opacity-1" 
        >
          <motion.h2 
            variants={fadeIn}
            className="text-2xl font-bold text-gray-800 pl-2"
          >
            <Divider orientation="left" orientationMargin={0}>
              Your Bookings
            </Divider>
          </motion.h2>

          <AnimatePresence>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <Card
                    styles={{
                      body: { padding: '24px' }
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                          <UserOutlined className="text-indigo-500 text-lg" />
                          <div>
                            <p className="text-sm text-gray-600">Provider</p>
                            <p className="font-semibold text-gray-800">{booking.provider}</p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-center">
                          <Tag 
                            color={getStatusTagColor(booking.status)} 
                            className="text-sm font-medium px-3 py-1 rounded-full"
                          >
                            {booking.status}
                          </Tag>
                          {booking.date && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <CalendarOutlined />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4 mt-4">
                          <Button
                            danger
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleCancelBooking(booking.id)}
                            className="flex items-center gap-2"
                            shape="round"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="primary"
                            icon={<InfoCircleOutlined />}
                            onClick={() => handleTrackingRedirect(booking.id)}
                            className="flex items-center gap-2"
                            shape="round"
                          >
                            Details
                          </Button>
                        </div>
                      </div>

                      <div 
                        className="flex-shrink-0 cursor-pointer self-center"
                        onClick={() => handleTrackingRedirect(booking.provider)}
                      >
                        <Avatar
                          src={DefaultAvatar}
                          size={100}
                          className="border-2 border-white shadow-md"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-8 text-center">
                  <CalendarOutlined className="text-4xl text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
                  <p className="text-gray-500">You haven't made any bookings yet</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
 */}

<motion.div 
  initial={{ opacity: 1 }}
  animate={{ opacity: 1 }}
  className="space-y-6"
>
  <motion.h2 
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }} 
    className="text-2xl font-bold text-gray-800 pl-2"
  >
    <Divider orientation="left" orientationMargin={0}>
      Your Bookings
    </Divider>
  </motion.h2>

  <AnimatePresence>
    {bookings.length > 0 ? (
      bookings.map((booking) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <Card
            styles={{
              body: { padding: '24px' }
            }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <UserOutlined className="text-indigo-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-600">Provider</p>
                    <p className="font-semibold text-gray-800">{booking.provider}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Tag 
                    color={getStatusTagColor(booking.status)} 
                    className="text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {booking.status}
                  </Tag>
                  {booking.date && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarOutlined />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <Button
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleCancelBooking(booking.id)}
                    className="flex items-center gap-2"
                    shape="round"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    icon={<InfoCircleOutlined />}
                    onClick={() => handleTrackingRedirect(booking.id)}
                    className="flex items-center gap-2"
                    shape="round"
                  >
                    Details
                  </Button>
                </div>
              </div>

              <div 
                className="flex-shrink-0 cursor-pointer self-center"
                onClick={() => handleTrackingRedirect(booking.provider)}
              >
                <Avatar
                  src={DefaultAvatar}
                  size={100}
                  className="border-2 border-white shadow-md"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      ))
    ) : (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
      >
        <div className="p-8 text-center">
          <CalendarOutlined className="text-4xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
          <p className="text-gray-500">You haven't made any bookings yet</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>

      </motion.div>
    </div>
  );
};

export default SeekerDashboard;
