import React from 'react';
import { Route, Switch } from 'react-router-dom';
import config from './config'
import './App.css'

import Header from './Header/Header';
import MainSide from './MainSide/MainSide';
import NoteSide from './NoteSide/NoteSide';
import HomeMain from './HomeMain/HomeMain';
import NoteMain from './NoteMain/NoteMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotefulContext from './NotefulContext';
import ErrorCatcher from './ErrorCatcher';

class App extends React.Component {
  state={
    folders: [],
    notes: [],
    error: null
  }
  
  componentDidMount(){
    fetch(`${config.API_ENDPOINT}/api/folders`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then((data) => this.setState({
        folders: data
      }))
      .catch(error => this.setState({ error }));
      fetch(`${config.API_ENDPOINT}/api/notes`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then((data) => this.setState({
        notes: data
      }))
      .catch(error => this.setState({ error }));
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter( note => 
        note.id !== noteId
      )
    this.setState({
      notes: newNotes,
      error: null
    });
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ]
    })
  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ]
    })
  }

  renderSidebar(){
    return(
      <>
        <ErrorCatcher message='sidebar' styling='sidebar'>
          <Route exact path='/' component={MainSide}/>
          <Route path='/folder/:folderId' component={MainSide}/>
          <Route path='/note/:noteId' component={NoteSide}/>
        </ErrorCatcher>
      </>
      )
  }
  renderMain(){
    return(
      <ErrorCatcher message='page' styling='note-list'>
        <Switch>
          <Route exact path='/' component={HomeMain}/>
          <Route path='/folder/:folderId' component={HomeMain}/>
          <Route path='/note/:noteId' component={NoteMain}/>
          <Route path='/addNote' component={AddNote}/>
          <Route path='/addFolder' component={AddFolder}/>
          <Route render={()=> <p>Page not Found</p>} />
        </Switch>
      </ErrorCatcher>
    ) 
  }

  render(){
    const contextValue={
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder
    }
    return (
      <main className='App'>
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <main className='main-content'>
            {this.renderSidebar()}
            {this.renderMain()}
          </main>
        </NotefulContext.Provider>
      </main>
    )
  }
}

export default App;
