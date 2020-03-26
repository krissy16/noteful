import React from 'react'
import PropTypes from 'prop-types'

class ErrorCatcher extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
    static getDerivedStateFromError(error) {
        return { hasError: true };
      }
    render() {
        if (this.state.hasError) {      
          return (
          <h2 className={this.props.styling}>There was an error with the {this.props.message}</h2>
          );
        }
        return this.props.children;
      }  
}

ErrorCatcher.propTypes ={
  message: PropTypes.string.isRequired,
  styling: PropTypes.string.isRequired,
};

export default ErrorCatcher