import React from 'react';


class Main extends React.Component{
    render(){
        return(
            <>
                {this.props.children[0]}
            </>
        )
    }
}

export default Main
