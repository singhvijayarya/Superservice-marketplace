// import React from 'react'
// import Home from './Home'
// const Layout3 = () => {
//   return (
//     <div>
//       <div className='Layout h-full w-full'>
//         <div className='py-[10vh] '>
//         <div className='font-bold text-4xl ml-[10vw]'>Active Services</div>
//             <div className='top flex flex-row mt-[4vh] justify-center gap-[4vw]'>
//             <div className='card w-[16vw]   h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\mechenics.jpg' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Mechanics Service</p>
//                 <p>Services starting at $10</p>
//                 </a>
//             </div>
//             </div>
//             <div className='card w-[16vw]   h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\furniter.jpeg' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Furniture Service</p>
//                 <p>Services starting at $90</p>
//                 </a>
//             </div>
//             </div>
//             <div className='card w-[16vw]   h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\ItSer.jpg' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Computer Services</p>
//                 <p>Services starting at $140</p>
//                 </a>
//             </div>
//             </div>
//             <div className='card w-[16vw]  h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\homes.jpeg' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Home Service</p>
//                 <p>Services starting at $30</p>
//                 </a>
//             </div>
//             </div>
//         </div>
//         <div className='down flex flex-row mt-[6vh] justify-center  gap-[4vw]'>
//             <div className='card w-[16vw]   h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\personalser.jpeg' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Personal service</p>
//                 <p>Services starting at $4</p>
//                 </a>
//             </div>
//             </div>
//             <div className='card w-[16vw]  h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\healths.jpeg' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Health Service</p>
//                 <p>Services starting at $35</p>
//                 </a>
//             </div>
//             </div>
//             <div className='card w-[16vw]  h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\electri.jpeg' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Electrical Service</p>
//                 <p>Services starting at $70</p>
//                 </a>
//             </div>
//             </div>
//             <div className='card w-[16vw]  h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden '>
//             <div className='card-top w-[100%] h-[70%]  '>
//                 <img href='' src='src\assets\foodSer.avif' />
//             </div>
//             <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//                 <a href="#">
//                 <p className='mt-[8px] text-[1vw] font-medium'>Food Service</p>
//                 <p>Services starting at $120</p>
//                 </a>
//             </div>
//             </div>
//         </div>

//       </div>
//     </div>
//     </div>
//   )
// }

// export default Layout3

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ACCESS_TOKEN } from '../constants'; // Make sure path is correct
// import { useNavigate } from 'react-router-dom';

// const Layout3 = () => {
//   const [seekerProfile, setSeekerProfile] = useState(null);
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSeekerProfile = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/seeker-profile/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setSeekerProfile(res.data);
//       } catch (err) {
//         console.error("Seeker fetch error:", err);
//       }
//     };

//     const fetchProviders = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/providers/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProviders(res.data);
//       } catch (err) {
//         console.error("Provider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeekerProfile();
//     fetchProviders();
//   }, []);

//   const renderProviderCards = (providerList) => {
//     return providerList.map((provider, index) => (
//       <div key={index} className='card w-[16vw] h-[32vh] bg-[#d5d5de] rounded-[15px] overflow-hidden'>
//         <div className='card-top w-[100%] h-[70%]'>
//           <img src={provider.profile_picture || 'src/assets/default.jpg'} alt={provider.service_type} />
//         </div>
//         <div className='card-bottom w-[100%] flex flex-col items-center text-center'>
//           <a href="#">
//             <p className='mt-[8px] text-[1vw] font-medium'>{provider.service_type}</p>
//             <p>Services starting at ${provider.price || '50'}</p>
//           </a>
//         </div>
//       </div>
//     ));
//   };

//   if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

//   // Filter logic: match by exact address and split by status
//   const nearbyProviders = providers.filter(
//     (provider) => provider.address === seekerProfile?.address
//   );

//   const activeProviders = nearbyProviders.filter((p) => p.status === 'active');
//   const inactiveProviders = nearbyProviders.filter((p) => p.status !== 'active');

//   return (
//     <div className='Layout h-full w-full'>
//       <div className='py-[10vh]'>
//         <div className='font-bold text-4xl ml-[10vw]'>Active Services</div>

//         <div className='top flex flex-row mt-[4vh] justify-center gap-[4vw]'>
//           {activeProviders.length > 0 ? (
//             renderProviderCards(activeProviders)
//           ) : (
//             <p className="text-gray-600">No active providers near your address.</p>
//           )}
//         </div>

//         <div className='font-bold text-4xl ml-[10vw] mt-[6vh]'>Inactive Services</div>
//         <div className='down flex flex-row mt-[4vh] justify-center gap-[4vw]'>
//           {inactiveProviders.length > 0 ? (
//             renderProviderCards(inactiveProviders)
//           ) : (
//             <p className="text-gray-600">No inactive providers near your address.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout3;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ACCESS_TOKEN } from '../constants';
// import { useNavigate } from 'react-router-dom';

// const Layout3 = () => {
//   const [seekerProfile, setSeekerProfile] = useState(null);
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSeekerProfile = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/seeker-profile/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSeekerProfile(res.data);
//       } catch (err) {
//         console.error("Seeker fetch error:", err);
//       }
//     };

//     const fetchProviders = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/providers/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProviders(res.data);
//       } catch (err) {
//         console.error("Provider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeekerProfile();
//     fetchProviders();
//   }, []);

//   const handleHire = async (provider) => {
//     try {
//       const token = localStorage.getItem(ACCESS_TOKEN);
//       const seekerUsername = seekerProfile.username;
//       const providerUsername = provider.username;

//       if (!seekerUsername || !providerUsername) {
//         alert("Missing user information.");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:8001/api/book-provider/",
//         {
//           seeker: seekerUsername,
//           provider: providerUsername,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Provider booked successfully!");
//     } catch (err) {
//       console.error("Booking error:", err);
//       alert("Booking failed: " + (err.response?.data?.error || "Unknown error"));
//     }
//   };

//   const renderProviderCards = (providerList) => {
//     return providerList.map((provider, index) => (
//       <div
//         key={index}
//         className='card w-[16vw] h-[40vh] bg-[#d5d5de] rounded-[15px] overflow-hidden flex flex-col justify-between shadow-lg'
//       >
//         <div className='card-top w-full h-[60%]'>
//           <img
//             src={provider.profile_picture || 'src/assets/default.jpg'}
//             alt={provider.service_type}
//             className='w-full h-full object-cover'
//           />
//         </div>
//         <div className='card-bottom p-2 text-center'>
//           <p className='text-[1vw] font-semibold'>{provider.service_type}</p>
//           <p className='text-sm'>Services starting at ${provider.price || '50'}</p>
//           <button
//             className='mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-full'
//             onClick={() => handleHire(provider)}
//           >
//             Hire
//           </button>
//         </div>
//       </div>
//     ));
//   };

//   if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

//   const nearbyProviders = providers.filter(
//     (provider) => provider.address === seekerProfile?.address
//   );

//   const activeProviders = nearbyProviders.filter((p) => p.status === 'active');
//   const inactiveProviders = nearbyProviders.filter((p) => p.status !== 'active');

//   return (
//     <div className='Layout min-h-screen w-full bg-gray-100'>
//       <div className='py-[10vh] px-[5vw]'>
//         <div className='font-bold text-4xl mb-[4vh]'>Active Services</div>
//         <div className='flex flex-wrap gap-[2vw] justify-center'>
//           {activeProviders.length > 0 ? (
//             renderProviderCards(activeProviders)
//           ) : (
//             <p className="text-gray-600">No active providers near your address.</p>
//           )}
//         </div>

//         <div className='font-bold text-4xl mt-[8vh] mb-[4vh]'>Inactive Services</div>
//         <div className='flex flex-wrap gap-[2vw] justify-center'>
//           {inactiveProviders.length > 0 ? (
//             renderProviderCards(inactiveProviders)
//           ) : (
//             <p className="text-gray-600">No inactive providers near your address.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout3;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ACCESS_TOKEN } from '../constants';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Card, Avatar, Button, Tag, Skeleton, Empty } from 'antd';
// import {
//   UserOutlined,
//   StarOutlined,
//   EnvironmentOutlined,
//   DollarOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined
// } from '@ant-design/icons';

// const Layout3 = () => {
//   const [seekerProfile, setSeekerProfile] = useState(null);
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSeekerProfile = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/seeker-profile/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSeekerProfile(res.data);
//       } catch (err) {
//         console.error("Seeker fetch error:", err);
//       }
//     };

//     const fetchProviders = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/providers/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProviders(res.data);
//       } catch (err) {
//         console.error("Provider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeekerProfile();
//     fetchProviders();
//   }, []);

//   const handleHire = async (provider) => {
//     try {
//       const token = localStorage.getItem(ACCESS_TOKEN);
//       const seekerUsername = seekerProfile.username;
//       const providerUsername = provider.username;

//       if (!seekerUsername || !providerUsername) {
//         alert("Missing user information.");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:8001/api/book-provider/",
//         {
//           seeker: seekerUsername,
//           provider: providerUsername,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Provider booked successfully!");
//     } catch (err) {
//       console.error("Booking error:", err);
//       alert("Booking failed: " + (err.response?.data?.error || "Unknown error"));
//     }
//   };

//   const renderProviderCards = (providerList, isActive) => {
//     return providerList.map((provider, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//         whileHover={{
//           y: -10,
//           boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
//         }}
//       >
//         <Card
//           className="w-[280px] h-[380px] rounded-2xl overflow-hidden border-none backdrop-filter backdrop-blur-lg bg-white/70 shadow-xl hover:shadow-2xl transition-all duration-300"
//           cover={
//             <div className="h-[180px] overflow-hidden relative">
//               <img
//                 src={provider.profile_picture || 'src/assets/default.jpg'}
//                 alt={provider.service_type}
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//               />
//               <Tag
//                 color={isActive ? "green" : "orange"}
//                 className="absolute top-2 right-2 flex items-center gap-1"
//               >
//                 {isActive ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
//                 {isActive ? "Active" : "Inactive"}
//               </Tag>
//             </div>
//           }
//         >
//           <div className="flex flex-col h-[140px] justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                 <UserOutlined className="text-blue-500" />
//                 {provider.service_type}
//               </h3>
//               <div className="flex items-center mt-2 gap-2 text-gray-600">
//                 <EnvironmentOutlined />
//                 <span className="text-sm">{provider.address}</span>
//               </div>
//               <div className="flex items-center mt-1 gap-2 text-gray-600">
//                 <DollarOutlined />
//                 <span className="text-sm">Starts at ${provider.price || '50'}</span>
//               </div>
//             </div>
//             <motion.div whileTap={{ scale: 0.95 }}>
//               <Button
//                 type="primary"
//                 shape="round"
//                 icon={<StarOutlined />}
//                 className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 border-none hover:shadow-lg"
//                 onClick={() => handleHire(provider)}
//               >
//                 Hire Now
//               </Button>
//             </motion.div>
//           </div>
//         </Card>
//       </motion.div>
//     ));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Card className="w-full max-w-md" loading>
//           <Skeleton active avatar paragraph={{ rows: 4 }} />
//         </Card>
//       </div>
//     );
//   }

//   const nearbyProviders = providers.filter(
//     (provider) => provider.address === seekerProfile?.address
//   );

//   const activeProviders = nearbyProviders.filter((p) => p.status === 'active');
//   const inactiveProviders = nearbyProviders.filter((p) => p.status !== 'active');

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold text-gray-800 mb-8"
//         >
//           Available Services
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-12"
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
//               <CheckCircleOutlined className="text-green-500" />
//               Active Services
//             </h2>
//             <Tag color="green" className="text-sm">
//               {activeProviders.length} available
//             </Tag>
//           </div>

//           <AnimatePresence>
//             {activeProviders.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {renderProviderCards(activeProviders, true)}
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Empty
//                   image={Empty.PRESENTED_IMAGE_SIMPLE}
//                   description={
//                     <span className="text-gray-500">
//                       No active providers near your address
//                     </span>
//                   }
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
//               <ClockCircleOutlined className="text-orange-500" />
//               Inactive Services
//             </h2>
//             <Tag color="orange" className="text-sm">
//               {inactiveProviders.length} available
//             </Tag>
//           </div>

//           <AnimatePresence>
//             {inactiveProviders.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {renderProviderCards(inactiveProviders, false)}
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Empty
//                   image={Empty.PRESENTED_IMAGE_SIMPLE}
//                   description={
//                     <span className="text-gray-500">
//                       No inactive providers near your address
//                     </span>
//                   }
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Layout3;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { ACCESS_TOKEN } from '../constants';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Card, Avatar, Button, Tag, Skeleton, Empty } from 'antd';
// import {
//   UserOutlined,
//   StarOutlined,
//   EnvironmentOutlined,
//   DollarOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   LeftOutlined,
//   RightOutlined
// } from '@ant-design/icons';

// const Layout3 = () => {
//   const [seekerProfile, setSeekerProfile] = useState(null);
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const activeRef = useRef(null);
//   const inactiveRef = useRef(null);

//   useEffect(() => {
//     const fetchSeekerProfile = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/seeker-profile/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSeekerProfile(res.data);
//       } catch (err) {
//         console.error("Seeker fetch error:", err);
//       }
//     };

//     const fetchProviders = async () => {
//       try {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         const res = await axios.get("http://localhost:8001/api/providers/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProviders(res.data);
//       } catch (err) {
//         console.error("Provider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeekerProfile();
//     fetchProviders();
//   }, []);

//   const handleHire = async (provider) => {
//     try {
//       const token = localStorage.getItem(ACCESS_TOKEN);
//       const seekerUsername = seekerProfile.username;
//       const providerUsername = provider.username;

//       if (!seekerUsername || !providerUsername) {
//         alert("Missing user information.");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:8001/api/book-provider/",
//         {
//           seeker: seekerUsername,
//           provider: providerUsername,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Provider booked successfully!");
//     } catch (err) {
//       console.error("Booking error:", err);
//       alert("Booking failed: " + (err.response?.data?.error || "Unknown error"));
//     }
//   };

//   const scroll = (ref, direction) => {
//     if (ref.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const renderProviderCards = (providerList, isActive) => {
//     return providerList.map((provider, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//         whileHover={{
//           y: -10,
//           boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
//         }}
//         className="flex-shrink-0 mx-2" // Added margin and flex-shrink for carousel
//       >
//         <Card
//           className="w-[280px] h-[380px] rounded-2xl overflow-hidden border-none backdrop-filter backdrop-blur-lg bg-white/70 shadow-xl hover:shadow-2xl transition-all duration-300"
//           cover={
//             <div className="h-[180px] overflow-hidden relative">
//               <img
//                 src={provider.profile_picture || 'src/assets/default.jpg'}
//                 alt={provider.service_type}
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//               />
//               <Tag
//                 color={isActive ? "green" : "orange"}
//                 className="absolute top-2 right-2 flex items-center gap-1"
//               >
//                 {isActive ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
//                 {isActive ? "Active" : "Inactive"}
//               </Tag>
//             </div>
//           }
//         >
//           <div className="flex flex-col h-[140px] justify-between">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                 <UserOutlined className="text-blue-500" />
//                 {provider.service_type}
//               </h3>
//               <div className="flex items-center mt-2 gap-2 text-gray-600">
//                 <EnvironmentOutlined />
//                 <span className="text-sm">{provider.address}</span>
//               </div>
//               <div className="flex items-center mt-1 gap-2 text-gray-600">
//                 <DollarOutlined />
//                 <span className="text-sm">Starts at ${provider.price || '50'}</span>
//               </div>
//             </div>
//             <motion.div whileTap={{ scale: 0.95 }}>
//               <Button
//                 type="primary"
//                 shape="round"
//                 icon={<StarOutlined />}
//                 className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 border-none hover:shadow-lg"
//                 onClick={() => handleHire(provider)}
//               >
//                 Hire Now
//               </Button>
//             </motion.div>
//           </div>
//         </Card>
//       </motion.div>
//     ));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Card className="w-full max-w-md" loading>
//           <Skeleton active avatar paragraph={{ rows: 4 }} />
//         </Card>
//       </div>
//     );
//   }

//   const nearbyProviders = providers.filter(
//     (provider) => provider.address === seekerProfile?.address
//   );

//   const activeProviders = nearbyProviders.filter((p) => p.status === 'active');
//   const inactiveProviders = nearbyProviders.filter((p) => p.status !== 'active');

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold text-gray-800 mb-8"
//         >
//           Available Services
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-12"
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
//               <CheckCircleOutlined className="text-green-500" />
//               Active Services
//             </h2>
//             <Tag color="green" className="text-sm">
//               {activeProviders.length} available
//             </Tag>
//           </div>

//           <AnimatePresence>
//             {activeProviders.length > 0 ? (
//               <div className="relative">
//                 <button
//                   onClick={() => scroll(activeRef, 'left')}
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
//                 >
//                   <LeftOutlined className="text-lg text-gray-700" />
//                 </button>
//                 <div
//                   ref={activeRef}
//                   className="flex overflow-x-auto py-4 scrollbar-hide" // Hide scrollbar but keep functionality
//                   style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                   <div className="flex">
//                     {renderProviderCards(activeProviders, true)}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => scroll(activeRef, 'right')}
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
//                 >
//                   <RightOutlined className="text-lg text-gray-700" />
//                 </button>
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Empty
//                   image={Empty.PRESENTED_IMAGE_SIMPLE}
//                   description={
//                     <span className="text-gray-500">
//                       No active providers near your address
//                     </span>
//                   }
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
//               <ClockCircleOutlined className="text-orange-500" />
//               Inactive Services
//             </h2>
//             <Tag color="orange" className="text-sm">
//               {inactiveProviders.length} available
//             </Tag>
//           </div>

//           <AnimatePresence>
//             {inactiveProviders.length > 0 ? (
//               <div className="relative">
//                 <button
//                   onClick={() => scroll(inactiveRef, 'left')}
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
//                 >
//                   <LeftOutlined className="text-lg text-gray-700" />
//                 </button>
//                 <div
//                   ref={inactiveRef}
//                   className="flex overflow-x-auto py-4 scrollbar-hide"
//                   style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                   <div className="flex">
//                     {renderProviderCards(inactiveProviders, false)}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => scroll(inactiveRef, 'right')}
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
//                 >
//                   <RightOutlined className="text-lg text-gray-700" />
//                 </button>
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Empty
//                   image={Empty.PRESENTED_IMAGE_SIMPLE}
//                   description={
//                     <span className="text-gray-500">
//                       No inactive providers near your address
//                     </span>
//                   }
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Layout3;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Avatar, Button, Tag, Skeleton, Empty } from "antd";
import {
  UserOutlined,
  StarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const Layout3 = () => {
  const [seekerProfile, setSeekerProfile] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const activeRef = useRef(null);
  const inactiveRef = useRef(null);

  useEffect(() => {
    const fetchSeekerProfile = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const res = await axios.get(
          "http://localhost:8001/api/seeker-profile/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSeekerProfile(res.data);
      } catch (err) {
        console.error("Seeker fetch error:", err);
      }
    };

    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const res = await axios.get("http://localhost:8001/api/providers/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProviders(res.data);
      } catch (err) {
        console.error("Provider fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekerProfile();
    fetchProviders();
  }, []);

  const handleHire = async (provider) => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const seekerUsername = seekerProfile.username;
      const providerUsername = provider.username;

      if (!seekerUsername || !providerUsername) {
        alert("Missing user information.");
        return;
      }

      const res = await axios.post(
        "http://localhost:8001/api/book-provider/",
        {
          seeker: seekerUsername,
          provider: providerUsername,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Provider booked successfully!");
    } catch (err) {
      console.error("Booking error:", err);
      alert(
        "Booking failed: " + (err.response?.data?.error || "Unknown error")
      );
    }
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const renderProviderCards = (providerList, isActive) => {
    return providerList.map((provider, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex-shrink-0 mx-3 my-2" // Added margin for better spacing
      >
        <motion.div
          whileHover={{
            y: -10,
            height: 400, // Slightly increase height on hover
            transition: { duration: 0.3 },
          }}
          className="relative"
        >
          <Card
            className="w-[280px] h-[340px] rounded-2xl overflow-hidden border-none backdrop-filter backdrop-blur-lg bg-white/70 shadow-xl hover:shadow-2xl transition-all duration-300"
            cover={
              <div className="h-[180px] overflow-hidden relative">
                <img
                  src={provider.profile_picture || "src/assets/default.jpg"}
                  alt={provider.role}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* <Tag 
                  color={provider.status =="online" ? "green" : "orange"} 
                  className="absolute z-50 top-2 right-2 flex ab items-center gap-1"
                >
                  {provider.status =="online" ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                  {provider.status == "online" ? "online" : "offline"}
                </Tag> */}
                <div className="absolute top-2 right-2 z-50">
                  <Tag
                    color={
                      provider.status?.toLowerCase() === "online"
                        ? "green"
                        : "orange"
                    }
                    icon={
                      provider.status?.toLowerCase() === "online" ? (
                        <CheckCircleOutlined />
                      ) : (
                        <ClockCircleOutlined />
                      )
                    }
                  >
                    {provider.status?.toLowerCase() === "online"
                      ? "Online"
                      : "Offline"}
                  </Tag>
                </div>
              </div>
            }
            bodyStyle={{ padding: "15px", backgroundColor: "#d5d5de" }}
          >
            <div className="flex flex-col h-[120px] justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <UserOutlined className="text-blue-500" />
                  {provider.role}
                </h3>
                <div className="flex items-center mt-2 gap-2 text-gray-600">
                  <EnvironmentOutlined />
                  <span className="text-sm">{provider.address}</span>
                </div>
                <div className="flex items-center mt-1 gap-2 text-gray-600">
                  <DollarOutlined />
                  <span className="text-sm">
                    Starts at ${provider.price || "50"}
                  </span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-0 right-0 px-4"
              >
                <Button
                  type="primary"
                  shape="round"
                  icon={<StarOutlined />}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 border-none hover:shadow-lg"
                  onClick={() => handleHire(provider)}
                >
                  Hire Now
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md" loading>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  const nearbyProviders = providers.filter(
    (provider) => provider.address === seekerProfile?.address
  );

  const activeProviders = nearbyProviders.filter((p) => p.status === "online");
  const inactiveProviders = nearbyProviders.filter(
    (p) => p.status !== "online"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-8"
        >
          Available Services
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              Active Services
            </h2>
            <Tag color="green" className="text-sm">
              {activeProviders.length} available
            </Tag>
          </div>

          <AnimatePresence>
            {activeProviders.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() => scroll(activeRef, "left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <LeftOutlined className="text-lg text-gray-700" />
                </button>
                <div
                  ref={activeRef}
                  className="flex overflow-x-auto py-4 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex">
                    {renderProviderCards(activeProviders, true)}
                  </div>
                </div>
                <button
                  onClick={() => scroll(activeRef, "right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <RightOutlined className="text-lg text-gray-700" />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-gray-500">
                      No active providers near your address
                    </span>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
              <ClockCircleOutlined className="text-orange-500" />
              Inactive Services
            </h2>
            <Tag color="orange" className="text-sm">
              {inactiveProviders.length} available
            </Tag>
          </div>

          <AnimatePresence>
            {inactiveProviders.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() => scroll(inactiveRef, "left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <LeftOutlined className="text-lg text-gray-700" />
                </button>
                <div
                  ref={inactiveRef}
                  className="flex overflow-x-auto py-4 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex">
                    {renderProviderCards(inactiveProviders, false)}
                  </div>
                </div>
                <button
                  onClick={() => scroll(inactiveRef, "right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <RightOutlined className="text-lg text-gray-700" />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-gray-500">
                      No inactive providers near your address
                    </span>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Layout3;
