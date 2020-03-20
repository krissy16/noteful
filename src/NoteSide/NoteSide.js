import React from 'react';

class NoteSide extends React.Component{
    render(){
        return(
            <nav className='sidebar'>
                <button className='go-back' onClick={ e => this.props.history.goBack()}>Go Back</button>
                <p>{this.props.folderName}</p>  
            </nav>          
        )
    }
}

export default NoteSide