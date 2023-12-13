import React ,{useContext, useEffect, useState} from 'react'
import { MyContext } from "../../Utils/MyContext";
import Feed from '../../Components/feeds/Feed'

function SearchPage() {
    const {  search } = useContext(MyContext);
    console.log("search reasult in searchPage1", search)
  
  return (
    <>
     <div className="feeds">
     {search?.data?.map((fed) => (
        <Feed fed={fed} key={fed._id} />
        
      ))}
      </div>
    </>
  )
}

export default SearchPage