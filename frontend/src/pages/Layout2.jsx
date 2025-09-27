// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Home from './Home'
// import { ACCESS_TOKEN } from '../constants';
// // const SearchBar = () => {

// const Layout2 = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
    
//     const handleSearch = async () => {
//       const token = localStorage.getItem(ACCESS_TOKEN);
      
//       if (!token) {
//         alert("You're not logged in. Please log in to search.");
//         return;
//       }
    
//       if (!searchQuery.trim()) {
//         alert("Please enter a valid search query.");
//         return;
//       }
    
//       try {
//         const response = await axios.post(
//           "http://localhost:8001/api/smart-search/",
//           { query: searchQuery },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
    
//         const providers = response.data;
    
//         if (!providers || providers.length === 0) {
//           alert("No matching providers found. Please provide more information.");
//           return;
//         }
    
//         console.log("Providers found:", providers);
//         navigate("/search-results", { state: { providers } });
    
//       } catch (error) {
//         console.error("Search error:", error);
    
//         if (error.response?.status === 401) {
//           alert("Unauthorized. Please log in again.");
//         } else {
//           alert("No matching providers found. Please provide more information to help find service providers.");
//         }
//       }
//     };
    
//   return (
//     <div className='w-full h-full bg-[#d5d5de]'>
//       <div className="layout2_right">
       

//       <div className="search_bar_container flex justify-center">
//       <input
//         type="text"
//         id="searchInput"
//         placeholder="Describe your need (e.g., 'AC repair in Mumbai tomorrow')"
//         className="searchInput"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//       />
//       <button
//         type="button"
//         className="btn"
//         onClick={handleSearch}
//       >
//         🔍
//       </button>
//     </div>
//       {error && <div className="text-red-500 text-center mt-2">{error}</div>}
//       </div>
   

      // <div className='icons  '>
      //   <div className='first  justify-center flex flex-row gap-20'>
      //     <div className='first-one'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\personal.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Personal</h2></a>
      //     </div>
      //     <div className='first-second'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\home.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Home</h2></a>
      //     </div>
      //     <div className='first-third'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\health.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Health</h2></a>
      //     </div>
      //     <div className='first-four'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\food.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Food</h2></a>
      //     </div>
      //     <div className='first-five'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\transport.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Transpoart</h2></a>
      //     </div>
      //     <div className='first-six'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\shop.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Shop</h2></a>
      //     </div>
      //     </div>
      //   <div className='Second  flex flex-row justify-center gap-20'>
      //     <div className='Second-one'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\Education.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Education</h2></a>
      //     </div>
      //     <div className='Second-second'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\plumber.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Plumber</h2></a>
      //     </div>
      //     <div className='Second-third'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\Event.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Event</h2></a>
      //     </div>
      //     <div className='Second-four'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\business.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Business</h2></a>
      //     </div>
      //     <div className='Second-five'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\kid.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Kid</h2></a>
      //     </div>
      //     <div className='Second-six'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\Saftey.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Saftey</h2></a>
      //     </div>
      //     </div>
      //   <div className='Third flex  flex-row justify-center gap-20'>
      //     <div className='Third-one'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\furniture.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Furniture</h2></a>
      //     </div>
      //     <div className='Third-second'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\administrative.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Adminstrative</h2></a>
      //     </div>
      //     <div className='Third-third'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\electrician.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Electrician</h2></a>
      //     </div>
      //     <div className='Third-four'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\guide.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Guidence</h2></a>
      //     </div>
      //     <div className='Third-five'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\mechanic.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Mechanic</h2></a>
      //     </div>
      //     <div className='Third-six'>
      //     <div className='container glass'>
      //     <a href="http://"><img src='src\assets\tool.png' /></a>
      //     </div>
      //   <a href="http://"><h2 className='items'>Tool</h2></a>
      //     </div>

      //     </div>
      //   </div>
      // </div>


//   )
// }

// export default Layout2


      
import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import 'speech-recognition-polyfill';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


//images
import PersonalIcon from '../assets/personal.png';
import HomeIcon from '../assets/home.png';
import HealthIcon from '../assets/health.png';
import FoodIcon from '../assets/food.png';
import TransportIcon from '../assets/transport.png';
import ShopIcon from '../assets/shop.png';
import EducationIcon from '../assets/Education.png';
import PlumberIcon from '../assets/plumber.png';
import EventIcon from '../assets/Event.png';
import BusinessIcon from '../assets/business.png';
import KidIcon from '../assets/kid.png';
import SafetyIcon from '../assets/Saftey.png';
import FurnitureIcon from '../assets/furniture.png';
import AdministrativeIcon from '../assets/administrative.png';
import ElectricianIcon from '../assets/electrician.png';
import GuideIcon from '../assets/guide.png';
import MechanicIcon from '../assets/mechanic.png';
// import ToolIcon from '../assets/tool.png';
import ToolIcon from "../assets/tool.png"
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Layout2 = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [voiceError, setVoiceError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window) {
        const speechRecognition = new window.webkitSpeechRecognition();
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;
        speechRecognition.lang = 'en-US';
        
        speechRecognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(prev => prev + (prev ? ' ' : '') + transcript);
          setIsListening(false);
          setVoiceError(null);
        };
        
        speechRecognition.onerror = (event) => {
          console.error('Voice recognition error:', event.error);
          setVoiceError('Voice input failed. Please try again.');
          setIsListening(false);
        };
        
        speechRecognition.onend = () => {
          if (isListening) {
            setIsListening(false);
          }
        };
        
        setRecognition(speechRecognition);
      } else {
        setVoiceError('Voice search not supported in your browser');
      }
    }, []);

    const handleSearch = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      
      if (!token) {
        alert("You're not logged in. Please log in to search.");
        return;
      }
    
      if (!searchQuery.trim()) {
        alert("Please enter a valid search query.");
        return;
      }
    
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8001/api/smart-search/",
          { query: searchQuery },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        const providers = response.data;
    
        if (!providers || providers.length === 0) {
          alert("No matching providers found. Please provide more information.");
          return;
        }
    
        console.log("Providers found:", providers);
        navigate("/search-results", { state: { providers } });
    
      } catch (error) {
        console.error("Search error:", error);
    
        if (error.response?.status === 401) {
          alert("Unauthorized. Please log in again.");
        } else {
          alert("No matching providers found. Please provide more information to help find service providers.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const toggleVoiceSearch = () => {
      if (!recognition) return;
      
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        try {
          recognition.start();
          setIsListening(true);
          setVoiceError(null);
        } catch (err) {
          setVoiceError('Could not start microphone. Please check permissions.');
        }
      }
    };

    const gridRef = useRef();
    const containersRef = useRef([]);
    const listenersRef = useRef([]);

  const items = [
    // First Row
    { img: PersonalIcon, title: 'Personal' },
    { img: HomeIcon, title: 'Home' },
    { img: HealthIcon, title: 'Health' },
    { img: FoodIcon, title: 'Food' },
    { img: TransportIcon, title: 'Transport' },
    { img: ShopIcon, title: 'Shop' },
    
    // Second Row
    { img: EducationIcon, title: 'Education' },
    { img: PlumberIcon, title: 'Plumber' },
    { img: EventIcon, title: 'Event' },
    { img: BusinessIcon, title: 'Business' },
    { img: KidIcon, title: 'Kid' },
    { img: SafetyIcon, title: 'Safety' },
    
    // Third Row
    { img: FurnitureIcon, title: 'Furniture' },
    { img: AdministrativeIcon, title: 'Adminstrv' },
    { img: ElectricianIcon, title: 'Electrician' },
    { img: GuideIcon, title: 'Guidance' },
    { img: MechanicIcon, title: 'Mechanic' },
    { img: ToolIcon, title: 'Tool' }
  ];

  // Mouse enter handler
  const handleMouseEnter = (container) => {
    gsap.to(container, {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(container.querySelector('img'), {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(container.nextElementSibling, {
      color: "#4f46e5",
      duration: 0.3
    });
  };

  // Mouse leave handler
  const handleMouseLeave = (container) => {
    gsap.to(container, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(container.querySelector('img'), {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(container.nextElementSibling, {
      color: "#1f2937",
      duration: 0.3
    });
  };

  useEffect(() => {
    // GSAP Loading Animation
    gsap.from(".icon-container", {
      duration: 1,
      y: 50,
      opacity: 1,
      stagger: {
        amount: 0.5,
        grid: "auto",
        from: "center"
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Add event listeners and track them
    containersRef.current.forEach(container => {
      if (container) {
        const enterHandler = () => handleMouseEnter(container);
        const leaveHandler = () => handleMouseLeave(container);
        
        container.addEventListener('mouseenter', enterHandler);
        container.addEventListener('mouseleave', leaveHandler);
        
        // Store references for cleanup
        listenersRef.current.push({
          container,
          enterHandler,
          leaveHandler
        });
      }
    });

    // Cleanup function
    return () => {
      listenersRef.current.forEach(({ container, enterHandler, leaveHandler }) => {
        if (container) {
          container.removeEventListener('mouseenter', enterHandler);
          container.removeEventListener('mouseleave', leaveHandler);
        }
      });
      listenersRef.current = []; // Clear the array
    };
  }, []);

  // Add container refs
  const addToRefs = (el) => {
    if (el && !containersRef.current.includes(el)) {
      containersRef.current.push(el);
    }
  };


  return (
    <div className='w-full h-full bg-[#d5d5de]'>
      <div className="layout2_right">
        <div className="search_bar_container flex justify-center relative">
          <div className={`search-wrapper ${isListening ? 'listening' : ''}`}>
            <input
              type="text"
              id="searchInput"
              placeholder="Describe your need or speak your search"
              className="searchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            
            {/* <AnimatePresence>
              {(searchQuery.length > 0 || isListening) && (
                <motion.button
                  className={`voice-btn ${isListening ? 'active' : ''}`}
                  onClick={toggleVoiceSearch}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={isListening ? 'Stop listening' : 'Voice search'}
                >
                  {isListening ? (
                    <div className="pulse-animation">🎤</div>
                  ) : (
                    '🎤'
                  )}
                </motion.button>
              )}
            </AnimatePresence> */}

            <AnimatePresence>
              <motion.button
                className={`voice-btn ${isListening ? 'active' : ''}`}
                onClick={toggleVoiceSearch}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={isListening ? 'Stop listening' : 'Voice search'}
              >
                {isListening ? (
                  <div className="pulse-animation">🎤</div>
                ) : (
                  '🎤'
                )}
              </motion.button>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="btn"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : '🔍'}
          </button>
        </div>

        {voiceError && (
          <motion.div 
            className="voice-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {voiceError}
          </motion.div>
        )}

        {isListening && (
          <motion.div 
            className="voice-feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Listening... Speak now
          </motion.div>
        )}

        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </div>
      {/* <div className='icons  '>
        <div className='first  justify-center flex flex-row gap-20'>
          <div className='first-one'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\personal.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Personal</h2></a>
          </div>
          <div className='first-second'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\home.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Home</h2></a>
          </div>
          <div className='first-third'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\health.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Health</h2></a>
          </div>
          <div className='first-four'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\food.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Food</h2></a>
          </div>
          <div className='first-five'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\transport.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Transpoart</h2></a>
          </div>
          <div className='first-six'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\shop.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Shop</h2></a>
          </div>
          </div>
        <div className='Second  flex flex-row justify-center gap-20'>
          <div className='Second-one'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\Education.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Education</h2></a>
          </div>
          <div className='Second-second'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\plumber.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Plumber</h2></a>
          </div>
          <div className='Second-third'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\Event.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Event</h2></a>
          </div>
          <div className='Second-four'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\business.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Business</h2></a>
          </div>
          <div className='Second-five'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\kid.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Kid</h2></a>
          </div>
          <div className='Second-six'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\Saftey.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Saftey</h2></a>
          </div>
          </div>
        <div className='Third flex  flex-row justify-center gap-20'>
          <div className='Third-one'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\furniture.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Furniture</h2></a>
          </div>
          <div className='Third-second'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\administrative.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Adminstrative</h2></a>
          </div>
          <div className='Third-third'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\electrician.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Electrician</h2></a>
          </div>
          <div className='Third-four'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\guide.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Guidence</h2></a>
          </div>
          <div className='Third-five'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\mechanic.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Mechanic</h2></a>
          </div>
          <div className='Third-six'>
          <div className='container glass'>
          <a href="http://"><img src='src\assets\tool.png' /></a>
          </div>
        <a href="http://"><h2 className='items'>Tool</h2></a>
          </div>

          </div>
        </div> */}

      {/* <div ref={gridRef} className="icons py-2 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#d5d5de] to-[#d5d5de]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-0 gap-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div 
                ref={addToRefs}
                className="icon-container glass p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-md bg-white/30 transition-all duration-300 hover:shadow-xl hover:bg-white/40"
              >
                <a href="#">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-16 h-16 mx-auto object-contain transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/64?text=Icon';
                    }}
                  />
                </a>
              </div>
              <a href="#">
                <h2 className="items mt-3 text-lg font-medium text-gray-800 text-center transition-colors duration-300">
                  {item.title}
                </h2>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div> */}



      <div ref={gridRef} className="icons py-2 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#d5d5de] to-[#d5d5de]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-0 gap-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div 
                ref={addToRefs}
                className="icon-container glass p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-md bg-white/30 transition-all duration-300"
              >
                <a href="#">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-16 h-16 mx-auto object-contain"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/64?text=Icon';
                    }}
                  />
                </a>
              </div>
              <a href="#">
                <h2 className="items mt-3 text-lg font-medium text-gray-800 text-center">
                  {item.title}
                </h2>
              </a>
            </div>
          ))}
        </div>
      </div>

      </div>
      </div>

  )
}

export default Layout2;