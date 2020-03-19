import React from 'react';
import { NavLink } from 'react-router-dom';

class Note extends React.Component{
    render(){
            let date = new Date(this.props.noteInfo.modified);
        return(
            <li className='note-item'>
                <NavLink  to={`/note/${this.props.noteInfo.id}`}>
                    <h2>{this.props.noteInfo.name}</h2>
                </NavLink>
                <p className='date'>Date modified on {date.toDateString()}</p>
                <button className='delete'>Delete Note</button>
            </li>
        )
    }
}

export default Note