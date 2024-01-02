import React, { useContext } from 'react';
import { MyContext } from '../../Utils/MyContext';
import Feed from '../../Components/feeds/Feed';
import './SearchPage.css'

function SearchPage() {
  const { search } = useContext(MyContext);

  return (
    <>
      <div className="feeds" style={{ paddingTop: '80px', marginTop: '0px' }}>
        {search?.data?.length ? (
          search.data.map((fed) => <Feed fed={fed} key={fed._id} />)
        ) : (
          <div className="flex mt-md p-md bg-neutral-background-weak" >
      <img  src="https://www.redditstatic.com/shreddit/assets/telescope-snoo.svg"></img>
      <div className='text'>
        <div class="text-neutral-content font-semibold text-16 xs:text-18 mb-xs">
          Hm... we couldn’t find any results 
        </div>
        <div class="text-second-line">
          Double-check your spelling or try different keywords to adjust your search
        </div>
      </div>
  </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;

