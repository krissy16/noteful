import React from 'react';
import NotefulContext from '../NotefulContext'

class NoteSide extends React.Component{
    static contextType = NotefulContext;
    render(){
        let folderId = this.context.notes.filter(note => note.id === this.props.match.params.noteId)[0];
        folderId = folderId ? folderId.folderId : '';
        let folderName = this.context.folders.filter(folder => folder.id === folderId)[0]
        folderName = folderName? folderName.name : '';
        return(
            <nav className='sidebar'>
                <button className='go-back button' onClick={ e => this.props.history.goBack()}>Go Back</button>
                <p>{folderName}</p>  
            </nav>          
        )
    }
}

export default NoteSide