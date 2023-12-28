import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; 
import './ImageSlider.css'; 
import image1 from '../../Assets/image-1.jpg';
import image2 from '../../Assets/image-2.jpg';
import image3 from '../../Assets/image-3.jpg';
import image4 from '../../Assets/image-4.jpg';
import image5 from '../../Assets/image-5.jpg';
import image6 from '../../Assets/image-6.jpg';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  
  function ImageSlider() {
    const carouselOptions = {
      responsive: responsive,
      autoPlay: false,
      infinite: true,
      autoPlaySpeed: 3000,
      keyBoardControl: true,
      customTransition: "transform 500ms ease-in-out",
      removeArrowOnDeviceType: ["tablet", "mobile"],
    };

   
  
    return (
      <div className="largerCarousel">
        <Carousel {...carouselOptions}>
          <div className='swiper-slide-carousel'>
            <img className="large-slider-img" src={image1} alt="winter" />
            <h2 >SA dominant vs IND on Day 3</h2>
            <p >Big lead for South Africa! What do you think? Can India at least save this Test match?</p>
            <div className='user-bottom'>
            <img src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"  alt="r/coys icon"/>
            <span class="font-bold mr-2xs ml-xs">r/IndiaCricket</span>
            <span class="text-coolgray-350"> and more</span>
            </div>
          </div>
          <div className='swiper-slide-carousel'>
            <img className="large-slider-img" src={image2} alt="shrits" />
            <h2 >Man City beat Everton 3-1</h2>
            <p >[Top Stories] - Everton 1-3 Manchester City: Pep Guardiola and Sean Dyche question football laws | BBC</p>
            <div className='user-bottom'>
            <img src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"  alt="r/coys icon"/>
            <span class="font-bold mr-2xs ml-xs">r/coys</span>
            <span class="text-coolgray-350"> and more</span>
            </div>
          </div>
          <div className='swiper-slide-carousel'>
            <img className="large-slider-img" src={image3} alt="t-shirts" />
            <h2 >Apple watch ban halted</h2>
            <p >Apple Watch ban temporarily paused</p>
            <div className='user-bottom'>
            <img src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"  alt="r/coys icon"/>
            <span class="font-bold mr-2xs ml-xs">r/apple</span>
            <span class="text-coolgray-350"> and more</span>
            </div>
          </div>
          <div className='swiper-slide-carousel'>
            <img className="large-slider-img" src={image4} alt="joggers" />
            <h2 >Salaar at box office</h2>
            <p >Box office after 5 days</p>
            <div className='user-bottom'>
            <img src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"  alt="r/coys icon"/>
            <span class="font-bold mr-2xs ml-xs">r/boxOffice</span>
            <span class="text-coolgray-350"> and more</span>
            </div>
          </div>
          <div className='swiper-slide-carousel'>
            <img className="large-slider-img" src={image5} alt="joggers" />
            <h2 >Prime Video to show ads</h2>
            <p >Amazon Prime Video will start showing ads on January 29th / Movies and TV shows on Amazon’s streaming service will start getting broken up with ads in January — unless you’re willing to pony up an extra fee ($2.99) each month.</p>
            <div className='user-bottom'>
            <img src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"  alt="r/coys icon"/>
            <span class="font-bold mr-2xs ml-xs">r/primeVideo</span>
            <span class="text-coolgray-350"> and more</span>
            </div>
          </div>
          <div className='swiper-slide-carousel'>
            <img className="large-slider-img" src={image6} alt="joggers" />
            <h2 >NYT sues OpenAI &amp; Microsoft</h2>
            <p >The New York Times sues OpenAI and Microsoft for copyright infringement</p>
            <div className='user-bottom'>
            <img src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"  alt="r/coys icon"/>
            <span class="font-bold mr-2xs ml-xs">r/microSoft</span>
            <span class="text-coolgray-350"> and more</span>
            </div>
          </div>
        </Carousel>
      </div>
   
    );
  }
  
  export default ImageSlider;