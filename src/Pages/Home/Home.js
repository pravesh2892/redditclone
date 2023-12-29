import React from 'react'
import Rightbar from '../../Components/Rightbar/Rightbar'
import './Home.css'
import Feeds from '../../Components/feeds/Feeds'
import Stick from '../Popular/Stick'

function Home() {
  return (
    <div className="reddit_clone-app">
      <div className="reddit_clone-app_right_section">
            <Rightbar  />
            </div>
            <div className="reddit_clone-app_add_post">
            
            <Feeds />
            </div>
         
    </div>
  )
}

export default Home;