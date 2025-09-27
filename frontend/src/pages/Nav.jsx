// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN } from "../constants";
// import DefaultAvatar from "../assets/Profile.png";

// const Nav = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [profilePic, setProfilePic] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const userData = localStorage.getItem("user");
//       const userRole = localStorage.getItem("role");
//       const profileImage = localStorage.getItem("profilePic");

//       if (userData && userData !== "undefined") {
//         setUser(JSON.parse(userData));
//       }

//       if (userRole && userRole !== "undefined") {
//         setRole(userRole);
//       }

//       if (profileImage && profileImage !== "undefined") {
//         setProfilePic(profileImage);
//       }
//     } catch (error) {
//       console.error("❌ Error reading from localStorage:", error);
//       localStorage.removeItem("user");
//     }
//   }, []);

//   const handleRoleClick = (role) => {
//     setDropdownOpen(false);
//     if (role === "seeker") {
//       navigate("/SeekerForm");
//     } else {
//       navigate("/ProviderForm");
//     }
//   };

//   const handleProfileClick = () => {
//     if (!role) {
//       // No role selected yet → Show dropdown
//       setDropdownOpen(!dropdownOpen);
//     } else if (role && profilePic) {
//       // Role and Profile Pic available → go to dashboard
//       if (role === "seeker") {
//         navigate("/SeekerDashboard");
//       } else if (role === "provider") {
//         navigate("/ProviderDashboard");
//       }
//     } else {
//       // Role is selected, but no form filled → show form
//       if (role === "seeker") {
//         navigate("/SeekerForm");
//       } else if (role === "provider") {
//         navigate("/ProviderForm");
//       }
//     }
//   };

//   const handleHireClick = () => {
//     if (role === "seeker") {
//       navigate("/providers");
//     } else {
//       alert("Please switch to seeker role to hire providers");
//     }
//   };

//   const avatar = profilePic || DefaultAvatar;

//   return (
//     <div className="w-full flex justify-around pl-14 bg-[#d5d5de]">
//       <div className="logo py-2">
//         <img
//           onClick={() => navigate("/")}
//           className="hover:cursor-pointer ml-5 mt-[-15px] w-[20vw]"
//           src="src/assets/SLogo.png"
//           alt="Logo"
//         />
//       </div>

//       <div className="link flex space-x-12 items-center">
//         <div className="font-medium cs hover:text-yellow-500">
//           <a href="/">Home</a>
//         </div>
//         <div className="font-medium cs hover:text-yellow-500">
//           <a href="/">Services</a>
//         </div>
//         <div className="font-medium cs hover:text-yellow-500">
//           <a href="/">Services</a>
//         </div>
//         <div className="font-medium cs hover:text-yellow-500">
//           <a href="/">Contact</a>
//         </div>

        // {localStorage.getItem(ACCESS_TOKEN) && role === "seeker" && (
        //   <div className="Login_btn">
        //     <button  onClick={handleHireClick}>
        //       Hire / Filter
        //     </button>
        //   </div>
        // )}


//         {!localStorage.getItem(ACCESS_TOKEN) ? (
//           <>
//             <div>
//               <a className="font-medium cs hover:text-yellow-500" href="/login">
//                 Login/
//               </a>
//               <a
//                 className="font-medium cs hover:text-yellow-500"
//                 href="/register"
//               >
//                 Register
//               </a>
//             </div>
//           </>
//         ) : (
//           <div className="relative">
//             <img
//               src={avatar}
//               alt="Profile"
//               className="w-20 h-20 rounded-full cursor-pointer"
//               onClick={handleProfileClick}
//             />

//             {/* Show role selection only if role is not selected */}
//             {dropdownOpen && !role && (
//               <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50 p-4">
//                 <h3 className="text-center mb-2 font-bold text-gray-700">
//                   Select Role
//                 </h3>
//                 <button
//                   onClick={() => handleRoleClick("seeker")}
//                   className="w-full cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600"
//                 >
//                   Service Seeker / Customer
//                 </button>
//                 <button
//                   onClick={() => handleRoleClick("provider")}
//                   className="w-full cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Service Provider / Vendor
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Nav;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import DefaultAvatar from "../assets/Profile.png";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    
    try {
      const userData = localStorage.getItem("user");
      const userRole = localStorage.getItem("role");
      const profileImage = localStorage.getItem("profilePic");

      if (userData && userData !== "undefined") {
        setUser(JSON.parse(userData));
      }

      if (userRole && userRole !== "undefined") {
        setRole(userRole);
      }

      if (profileImage && profileImage !== "undefined") {
        setProfilePic(profileImage);
      }
    } catch (error) {
      console.error("❌ Error reading from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const handleRoleClick = (role) => {
    setDropdownOpen(false);
    if (role === "seeker") {
      navigate("/SeekerForm");
    } else {
      navigate("/ProviderForm");
    }
  };

  const handleProfileClick = () => {
    if (!role) {
      setDropdownOpen(!dropdownOpen);
    } else if (role && profilePic) {
      if (role === "seeker") {
        navigate("/SeekerDashboard");
      } else if (role === "provider") {
        navigate("/ProviderDashboard");
      }
    } else {
      if (role === "seeker") {
        navigate("/SeekerForm");
      } else if (role === "provider") {
        navigate("/ProviderForm");
      }
    }
  };

  const handleHireClick = () => {
    if (role === "seeker") {
      navigate("/providers");
    } else {
      alert("Please switch to seeker role to hire providers");
    }
  };

  const avatar = profilePic || DefaultAvatar;

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 2
          }}
          className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <motion.div 
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src="src/assets/SLogo.png"
                  alt="Logo"
                  className="h-24 w-auto"
                />
               
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <div className="flex space-x-8">
                  <motion.a 
                    href="/" 
                    className="text-lg font-medium text-gray-700 hover:text-indigo-600 px-1"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Home
                  </motion.a>
                  <motion.a 
                    href="/" 
                    className="text-lg font-medium text-gray-700 hover:text-indigo-600 px-1"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Services
                  </motion.a>
                  <motion.a 
                    href="/" 
                    className="text-lg font-medium text-gray-700 hover:text-indigo-600 px-1"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Blogs
                  </motion.a>
                  <motion.a 
                    href="/" 
                    className="text-lg font-medium text-gray-700 hover:text-indigo-600 px-1"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Contact
                  </motion.a>
                </div>

                {/* Hire/Filter Button (untouched as requested) */}
                {localStorage.getItem(ACCESS_TOKEN) && role === "seeker" && (
          <div className="Login_btn">
            <button  onClick={handleHireClick}>
              Hire / Filter
            </button>
          </div>
        )}

                {/* Auth Section */}
                {!localStorage.getItem(ACCESS_TOKEN) ? (
                  <motion.div className="flex items-center space-x-4 ml-6">
                    <motion.a
                      href="/login"
                      className="text-lg font-medium text-indigo-600 hover:text-indigo-800 px-4 py-2"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Login
                    </motion.a>
                    <motion.a
                      href="/register"
                      className="text-lg font-medium bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Register
                    </motion.a>
                  </motion.div>
                ) : (
                  <motion.div className="relative ml-6">
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      <img
                        src={avatar}
                        alt="Profile"
                        className="w-14 h-14 rounded-full cursor-pointer border-2 border-gray-400 hover:border-indigo-500"
                        onClick={handleProfileClick}
                      />
                      {user && (
                        <span className="ml-2 text-lg font-medium text-gray-700">
                          {user.name || user.email.split('@')[0]}
                        </span>
                      )}
                    </motion.div>

                    <AnimatePresence>
                      {dropdownOpen && !role && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-200"
                        >
                          <div className="px-5 py-3 border-b border-gray-100">
                            <p className="text-lg font-semibold text-gray-800">Select Your Role</p>
                          </div>
                          <div className="p-2">
                            <motion.button
                              onClick={() => handleRoleClick("seeker")}
                              className="w-full text-left px-4 py-3 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-lg mb-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Service Seeker / Customer
                            </motion.button>
                            <motion.button
                              onClick={() => handleRoleClick("provider")}
                              className="w-full text-left px-4 py-3 text-lg text-white bg-green-500 hover:bg-green-600 rounded-lg"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Service Provider / Vendor
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Mobile menu button */}
              <motion.div 
                className="md:hidden flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open menu</span>
                  {mobileMenuOpen ? (
                    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white shadow-lg overflow-hidden"
              >
                <div className="px-6 pt-2 pb-4 space-y-2">
                  <motion.a
                    href="/"
                    className="block text-xl font-medium text-gray-700 hover:text-indigo-600 px-3 py-3"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Home
                  </motion.a>
                  <motion.a
                    href="/"
                    className="block text-xl font-medium text-gray-700 hover:text-indigo-600 px-3 py-3"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Services
                  </motion.a>
                  <motion.a
                    href="/"
                    className="block text-xl font-medium text-gray-700 hover:text-indigo-600 px-3 py-3"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Blogs
                  </motion.a>
                  <motion.a
                    href="/"
                    className="block text-xl font-medium text-gray-700 hover:text-indigo-600 px-3 py-3"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Contact
                  </motion.a>
                  
                  {/* {localStorage.getItem(ACCESS_TOKEN) && role === "seeker" && (
                    <motion.button
                      onClick={() => {
                        handleHireClick();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-xl font-medium text-gray-700 hover:text-indigo-600 px-3 py-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Hire / Filter
                    </motion.button>
                  )} */}
                  {localStorage.getItem(ACCESS_TOKEN) && role === "seeker" && (
          <div className="Login_btn">
            <button  onClick={handleHireClick}>
              Hire / Filter
            </button>
          </div>
        )}

                  {!localStorage.getItem(ACCESS_TOKEN) ? (
                    <motion.div 
                      className="pt-4 space-y-3 border-t border-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.a
                        href="/login"
                        className="block text-xl font-medium text-indigo-600 hover:text-indigo-800 px-3 py-3"
                        onClick={() => setMobileMenuOpen(false)}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Login
                      </motion.a>
                      <motion.a
                        href="/register"
                        className="block text-xl font-medium bg-indigo-600 text-white px-6 py-3 rounded-lg text-center hover:bg-indigo-700"
                        onClick={() => setMobileMenuOpen(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Register
                      </motion.a>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="pt-4 border-t border-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div 
                        className="flex items-center px-3 py-3 cursor-pointer"
                        onClick={() => {
                          handleProfileClick();
                          setMobileMenuOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          src={avatar}
                          alt="Profile"
                          className="w-16 h-16 rounded-full border-2 border-gray-400"
                        />
                        {user && (
                          <span className="ml-3 text-xl font-medium text-gray-700">
                            {user.name || user.email.split('@')[0]}
                          </span>
                        )}
                      </motion.div>

                      {!role && (
                        <motion.div 
                          className="mt-2 space-y-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <motion.button
                            onClick={() => {
                              handleRoleClick("seeker");
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-lg text-white bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Service Seeker
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              handleRoleClick("provider");
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-lg text-white bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Service Provider
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Nav;