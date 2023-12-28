import React from 'react'
import ImageSlider from '../../Components/imageSlider/ImageSlider'
import Feeds from '../../Components/feeds/Feeds'

function Popular() {
  return (
    <div style={{backgroundColor:"#dadada"}}>
       <ImageSlider /> 
       <Feeds />
    </div>
  )
}

export default Popular