import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css'
import dummy from './dummy-store';

import Header from './Header/Header';
import MainSide from './MainSide/MainSide';
import NoteSide from './NoteSide/NoteSide';
import HomeMain from './HomeMain/HomeMain';
import NoteMain from './NoteMain/NoteMain';
import NotefulContext from './NotefulContext';

class App extends React.Component {
  state={
    folders: dummy.folders,
    notes: dummy.notes,
    error: null
  }

  deleteNote(){
    
  }

  renderSidebar(){
    return(
      <Switch>
        <Route exact path='/' render={() => 
          <MainSide />
        }/>
        <Route path='/folder/:folderId' render={() => 
          <MainSide 
            folders={this.state.folders}/>
        }/>
        <Route path='/note/:noteId' render={(routerProps) => {
          const folderId = this.state.notes.filter(note => note.id === routerProps.match.params.noteId)[0].folderId;
          const folderName = this.state.folders.filter(folder => folder.id === folderId)[0].name;
          return <NoteSide {...routerProps} folderName={folderName}/>
        }}/>
      </Switch>)
  }
  renderMain(){
    return(
      <Switch>
        <Route exact path='/' render={() => 
          <HomeMain notes={this.state.notes}/>
        }/>
        <Route path='/folder/:folderId' render={(routerProps) => 
          <HomeMain 
            notes={this.state.notes.filter(note => note.folderId === routerProps.match.params.folderId)} />
        }/>
        <Route path='/note/:noteId' render={(routerProps)=>
          <NoteMain noteInfo={this.state.notes.filter(note => note.id === routerProps.match.params.noteId)[0]}/>
        }/>
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


/*

import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

<Sidebar>
            <Route exact path='/' render={(routerProps) => 
              <MainSide data={dummy} folderClick={(folderId) => this.onFolderClick(folderId)}/>
            }/>
            <Route path='/folder/:folder-id' render={(routerProps) => 
              <MainSide {...routerProps} data={dummy} folderClick={(folderId) => this.onFolderClick(folderId)}/>
            }/>
            <Route path='note/:note-id' component={NoteSide}/>
          </Sidebar>
          <Main>
            <Route exact path='/' render={() => 
              <HomeMain data={dummy} folder={this.state.selectedFolderId}/>
            }/>
            <Route path='/folder/:folder-id' render={() => 
              <HomeMain data={dummy} folder={this.state.selectedFolderId}/>
            }/>
            <Route path='note/:note-id' component={NoteMain}/>
          </Main>
*/