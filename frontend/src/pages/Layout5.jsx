import React from 'react'
import Home from './Home'
const Layout5 = () => {
  return (
    <div>
      <div class="layout5"> 
            <div class="layout5-left"> 
                <div class="left1">
                    <h3>MISSION</h3>
                    <h3>PRODUCT</h3>
                    <h3>BLOG</h3>
                    <h3>FAQ</h3>
                </div>
                <div class="left2">
                    <h4>CONTACT</h4>
                    <h4>PRIVACY POLICY</h4>
                    <h4>TERMS</h4>
                </div>
            </div>
            <div class="layout5-right">
                <h3>Feedback</h3>

                  <input type="text" placeholder="E-mail"/>
                  <button class="sub">Submit</button>
              </div>
            <div class="copy">
                <h1>
                    &copy; 2024 BY CODER
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Layout5
