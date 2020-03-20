import React from 'react';

import Note from '../Note/Note';

class HomeMain extends React.Component{
    render(){
        const notes = this.props.notes.map(note => 
                 <Note key={note.id} noteInfo={note}/>);
        return(
            <ul className='note-list'>
               {notes}
                <li>
                    <button className='add-note'>Add Note</button>
                </li>
            </ul>
        )
    }
}

export default HomeMain