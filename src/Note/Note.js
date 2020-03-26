import React from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'


class Note extends React.Component{
    static contextType = NotefulContext;
    static defaultProps ={
        onDeleteNote: () => {},
      }

    deleteNote(noteId, callback){
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then( data => {
          callback(noteId)
        this.props.onDeleteNote();
        })
        .catch(error => console.log({ error }));
    }
    render(){
            let date = new Date(this.props.noteInfo.modified);
        return(
            <NotefulContext.Consumer>
      {(context) => (
            <li className='note-item'>
                <NavLink  to={`/note/${this.props.noteInfo.id}`}>
                    <h2>{this.props.noteInfo.name}</h2>
                </NavLink>
                <p className='date'>Date modified on {date.toDateString()}</p>
                <button className='delete' onClick={()=> {this.deleteNote(this.props.noteInfo.id, this.context.deleteNote)}}>Delete Note</button>
            </li>
    )}</NotefulContext.Consumer>)
    }
}

Note.propTypes ={
  onDeleteNote: PropTypes.func.isRequired,
  noteInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })
};

export default Note

