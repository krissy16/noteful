import React from 'react';

function Validation(props){
    if(props.message) {
        return (
          <div className="error">{props.message}</div>
        );
      }
    
      return <></>
}

export default Validation