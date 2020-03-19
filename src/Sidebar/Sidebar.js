import React from 'react';

class Sidebar extends React.Component{
    render(){
       return(
        <>
            {this.props.children[0]}
        </>
       )
    }
}

export default Sidebar


