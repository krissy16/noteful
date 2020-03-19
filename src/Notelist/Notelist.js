import React from 'react';

import Note from '../Note/Note';

class Notelist extends React.Component{
    render(){
        const notes = this.props.data.notes.map(note => 
            <Note key={note.id} noteInfo={note}/>);
        return(
            <ul className='note-list'>
               {notes}
            </ul>
        )
    }
}

export default Notelist