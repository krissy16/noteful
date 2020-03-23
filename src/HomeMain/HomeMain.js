import React from 'react';

import NotefulContext from '../NotefulContext'

import Note from '../Note/Note';

class HomeMain extends React.Component{
    static contextType = NotefulContext;
    render(){
        let notes = this.props.match.params.folderId ? this.context.notes.filter(note => note.folderId === this.props.match.params.folderId) : this.context.notes
        notes = notes.map(note => 
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