import React from 'react';

import Note from '../Note/Note';

class HomeMain extends React.Component{
    filterNotes(){
        let notes = this.props.data.notes;
        if(this.props.folder !== ''){
            notes = notes.filter(note => note.folderId === this.props.folder);
        }
        return notes.map(note => 
                <Note key={note.id} noteInfo={note}/>);
    }
    render(){
        return(
            <ul className='note-list'>
               {this.filterNotes()}
            </ul>
        )
    }
}

export default HomeMain