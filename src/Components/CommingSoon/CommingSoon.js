import React from 'react'
import not from '../../Assets/not.gif'

function CommingSoon() {
    return (
        <div style={{position:"relative"}}>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginLeft:"550px",
              paddingTop:"60px",
              color:"#0F1A1C"
            }}
          >
             <img src={not} style={{width:"40%"}}  />
            <h2 style={{marginTop:"20px", marginLeft:"-45px"}}>We are working on something amazing.</h2>
            <h2 style={{ marginTop: "10px" , marginLeft:"70px"}}>Till then stay tuned</h2>
           
          </div>
        </div>
      );
}

export default CommingSoon