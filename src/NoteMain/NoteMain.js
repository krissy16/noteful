import React from 'react';
import NotefulContext from '../NotefulContext'

import Note from '../Note/Note';

class NoteMain extends React.Component{
    static contextType = NotefulContext;
    render(){
        const noteInfo=this.context.notes.filter(note => note.id.toString() === this.props.match.params.noteId)[0] || '';
        return(
            <>
            <ul className='note-list'>
                <Note noteInfo={noteInfo} onDeleteNote={() => {this.props.history.replace('/')}}/>
                <li>
                    <p className='content'>{noteInfo.content}</p>
                </li>
            </ul>
            </>
        )
    }
}

export default NoteMain