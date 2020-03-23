import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css'

import Header from './Header/Header';
import MainSide from './MainSide/MainSide';
import NoteSide from './NoteSide/NoteSide';
import HomeMain from './HomeMain/HomeMain';
import NoteMain from './NoteMain/NoteMain';
import NotefulContext from './NotefulContext';

class App extends React.Component {
  state={
    folders: [],
    notes: [],
    error: null
  }
  
  componentDidMount(){
    fetch('http://localhost:9090/folders')
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
      fetch('http://localhost:9090/notes')
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

  renderSidebar(){
    return(
      <>
        <Route exact path='/' component={MainSide}/>
        <Route path='/folder/:folderId' component={MainSide}/>
        <Route path='/note/:noteId' component={NoteSide}/>
      </>
      )
  }
  renderMain(){
    return(
      <Switch>
        <Route exact path='/' component={HomeMain}/>
        <Route path='/folder/:folderId' component={HomeMain}/>
        <Route path='/note/:noteId' component={NoteMain}/>
        <Route render={()=> <p>Page not Found</p>} />
      </Switch>
    ) 
  }

  render(){
    const contextValue={
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
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
