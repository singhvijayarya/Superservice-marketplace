// // // import React from 'react'
// // // import Home from './Home'
// // // const Layout1 = () => {
  
// // //   return (
// // //   <>
// // //     <div className="Layou1 my-20">
// // //     <div id="heading">
// // //         <div className="bounding">
// // //             <h1 className="boundingelem">TRUSTED</h1>
// // //         </div>

// // //         <div className="block-text">
// // //              <div className="bounding">
// // //             <h1 className="boundingelem" id="send">SERVICES</h1>
// // //              </div>
// // //                 <div className="bounding">
// // //             <h5 className="boundingelem">100% Multi Super Services Provider--</h5>
// // //              </div>
// // //         </div>
// // //     </div>

// // //     <div id="heading2">
// // //         <div class="bounding">
// // //         <h5 class="boundingelem">available for Everyone</h5>
// // //         </div>
// // //         <div class="bounding">
// // //         <h5 class="boundingelem"> Seeker And Provider</h5>
// // //         </div>
// // //     </div>
// // //      <div id="landing-foot">
// // //         <a href="/helpmain">Help Center<img src="src\assets\arrow.png"/></a>
// // //         <a href="learn.html">Comunity Discuss<img src="src\assets\arrow.png"/></a>
// // //         <div id="iconset">
// // //             <div class="circle"><img src="src\assets\down.png"/></div>
// // //             <div class="circle"><img src="src\assets\down.png"/></div>
// // //     </div> 
// // //     </div>
// // //     </div>

// // //   </>
// // //   )
// // // }

// // // export default Layout1


// import React, { useRef, useEffect } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// const Layout1 = () => {
//   const componentRef = useRef(null)
  
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger)
    
//     const ctx = gsap.context(() => {
//       // Text reveal animation
//       gsap.from(".bounding-element", {
//         y: 60,
//         opacity: 0,
//         duration: 1.6,
//         ease: "power3.out",
//         stagger: 0.12,
//         scrollTrigger: {
//           trigger: componentRef.current,
//           start: "top 85%",
//           toggleActions: "play none none none"
//         }
//       })

//       // Footer elements animation
//       gsap.from(".footer-element", {
//         y: 30,
//         opacity: 0,
//         duration: 1.2,
//         ease: "back.out(1.2)",
//         stagger: 0.15,
//         scrollTrigger: {
//           trigger: "#landing-foot",
//           start: "top 90%",
//           toggleActions: "play none none none"
//         }
//       })

//       // Continuous subtle animation for circles
//       gsap.to(".circle", {
//         y: 5,
//         duration: 3.5,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut"
//       })

//     }, componentRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <div 
//       className="layout1 mt-80"
//       ref={componentRef}
//     >
//       {/* Main Heading */}
//       <div id="heading">
//         <div className="bounding">
//           <h1 className="boundingelem bounding-element main-heading">
//             TRUSTED
//           </h1>
//         </div>

//         <div className="block-text">
//           <div className="bounding">
//             <h1 className="bounding-element boundingelem main-heading send-heading"id="send">
//               SERVICES
//             </h1>
//           </div>
//           <div className="bounding">
//             <h5 className="boundingelem bounding-element sub-text">
//               100% Multi Super Services Provider
//             </h5>
//           </div>
//         </div>
//       </div>

//       {/* Sub Heading */}
//       <div id="heading2">
//         <div className="bounding">
//           <h5 className="boundingelem bounding-element small-text">
//             available for Everyone
//           </h5>
//         </div>
//         <div className="bounding">
//           <h5 className="boundingelem bounding-element small-text">
//             Seeker And Provider
//           </h5>
//         </div>
//       </div>
      
//       {/* Footer */}
//       <div id="landing-foot">
//         <a 
//           href="/helpmain" 
//           className="footer-element footer-link"
//         >
//           Help Center
//           <img 
//             src="src/assets/arrow.png" 
//             className="arrow-icon" 
//             alt="arrow"
//           />
//         </a>
        
//         <a 
//           href="learn.html" 
//           className="footer-element footer-link"
//         >
//           Community Discuss
//           <img 
//             src="src/assets/arrow.png" 
//             className="arrow-icon" 
//             alt="arrow"
//           />
//         </a>
        
//         <div id="iconset" className="footer-element">
//           <div className="circle">
//             <img src="src/assets/down.png" alt="down" />
//           </div>
//           <div className="circle">
//             <img src="src/assets/down.png" alt="down" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Layout1

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Layout1 = () => {
  const componentRef = useRef(null)
  const footerRef = useRef(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.from(".bounding-element", {
        y: 60,
        opacity: 0,
        duration: 2.5,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      })

      // Footer elements animation - CHANGED THIS SECTION
      const footerElements = gsap.utils.toArray(".footer-element")
      footerElements.forEach(el => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 4,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: componentRef.current,
            start: "top bottom-=70",
            toggleActions: "play none none none"
          }
        })
      })

      // Continuous subtle animation for circles
      gsap.to(".circle", {
        y: 5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

    }, componentRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      className="layout1 mt-80"
      ref={componentRef}
    >
      {/* Main Heading */}
      <div id="heading">
        <div className="bounding">
          <h1 className="boundingelem bounding-element main-heading">
            TRUSTED
          </h1>
        </div>

        <div className="block-text">
          <div className="bounding">
            <h1 className="bounding-element boundingelem main-heading send-heading" id="send">
              SERVICES
            </h1>
          </div>
          <div className="bounding">
            <h5 className="boundingelem bounding-element sub-text">
              100% Multi Super Services Provider
            </h5>
          </div>
        </div>
      </div>

      {/* Sub Heading */}
      <div id="heading2">
        <div className="bounding">
          <h5 className="boundingelem bounding-element small-text">
            available for Everyone
          </h5>
        </div>
        <div className="bounding">
          <h5 className="boundingelem bounding-element small-text">
            Seeker And Provider
          </h5>
        </div>
      </div>
      
      {/* Footer - Added ref here */}
      <div id="landing-foot" ref={footerRef}>
        <a 
          href="/helpmain" 
          className="footer-element footer-link"
        >
          Help Center
          <img 
            src="src/assets/arrow.png" 
            className="arrow-icon" 
            alt="arrow"
          />
        </a>
        
        <a 
          href="learn.html" 
          className="footer-element footer-link"
        >
          Community Discuss
          <img 
            src="src/assets/arrow.png" 
            className="arrow-icon" 
            alt="arrow"
          />
        </a>
        
        <div id="iconset" className="footer-element">
          <div className="circle">
            <img src="src/assets/down.png" alt="down" />
          </div>
          <div className="circle">
            <img src="src/assets/down.png" alt="down" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout1