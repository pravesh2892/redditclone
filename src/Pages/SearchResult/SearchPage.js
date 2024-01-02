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
          <p className="not-found-message">No data found</p>
        )}
      </div>
    </>
  );
}

export default SearchPage;

