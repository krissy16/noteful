import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css'
import dummy from './dummy-store';

import Header from './Header/Header';
import MainSide from './MainSide/MainSide';
import NoteSide from './NoteSide/NoteSide';
import HomeMain from './HomeMain/HomeMain';
import NoteMain from './NoteMain/NoteMain';

class App extends React.Component {
  renderSidebar(){
    return(
      <Switch>
        <Route exact path='/' render={() => 
          <MainSide 
            folders={dummy.folders}/>
        }/>
        <Route path='/folder/:folderId' render={(routerProps) => 
          <MainSide 
            folders={dummy.folders}/>
        }/>
        <Route path='/note/:noteId' render={(routerProps) => {
          const folderId = dummy.notes.filter(note => note.id === routerProps.match.params.noteId)[0].folderId;
          const folderName = dummy.folders.filter(folder => folder.id === folderId)[0].name;
          return <NoteSide {...routerProps} folderName={folderName}/>
        }}/>
      </Switch>)
  }
  renderMain(){
    return(
      <Switch>
       <Route exact path='/' render={() => 
              <HomeMain notes={dummy.notes}/>
            }/>
            <Route path='/folder/:folderId' render={(routerProps) => 
              <HomeMain {...routerProps}
                notes={dummy.notes.filter(note => note.folderId === routerProps.match.params.folderId)} />
            }/>
            <Route path='/note/:noteId' render={(routerProps)=>
              <NoteMain noteInfo={dummy.notes.filter(note => note.id === routerProps.match.params.noteId)[0]}/>
            }/>
            <Route render={()=> <p>Page not Found</p>} />
      </Switch>

    )
  }
  render(){
    return (
      <main className='App'>
        <Header />
        <main className='main-content'>
          {this.renderSidebar()}
          {this.renderMain()}
        </main>
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