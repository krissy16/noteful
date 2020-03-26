import React from 'react';
import PropTypes from 'prop-types'

function Validation(props){
    if(props.message) {
        return (
          <div className="error">{props.message}</div>
        );
      }
    
      return <></>
}

Validation.propTypes ={
  message: PropTypes.string
};

export default Validation