import React from 'react';

import Note from '../Note/Note';

class NoteMain extends React.Component{
    render(){
        return(
            <>
            <ul className='note-list'>
                <Note noteInfo={this.props.noteInfo}/>
                <li>
                    <p className='content'>{this.props.noteInfo.content}</p>
                </li>
            </ul>
            </>
        )
    }
}

export default NoteMain