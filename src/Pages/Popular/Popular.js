import React from 'react'
import ImageSlider from '../../Components/imageSlider/ImageSlider'
import Feeds from '../../Components/feeds/Feeds'

function Popular() {
  return (
    <div style={{backgroundColor:"#dadada"}}>
       <ImageSlider /> 
       <hr style={{marginTop:"20px", color:"#0000001a", marginLeft:"283px", marginRight:"408px"}}/>
       <Feeds showStick={false} />
    </div>
  )
}

export default Popular