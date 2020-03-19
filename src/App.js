import React from 'react';
import { Route } from 'react-router-dom';

import './App.css'
import dummy from './dummy-store';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import MainSide from './MainSide/MainSide';
import NoteSide from './NoteSide/NoteSide';
import HomeMain from './HomeMain/HomeMain';
import NoteMain from './NoteMain/NoteMain';

class App extends React.Component {
  state={
    selectedFolderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1'
  };
  onFolderClick(folderId){
    if(this.state.selectedFolderId === folderId){
      this.setState({
        selectedFolderId: ''
      });
    }
    else{
      this.setState({
        selectedFolderId: folderId
      });
    }
  }
  clearFolder(){
    this.setState({
      selectedFolderId: ''
    });
  }
  render(){
    return (
      <main className='App'>
        <Header />
        <main className='main-content'>
          <Sidebar>
            <Route exact path='/' render={(routerProps) => 
              <MainSide data={dummy} folderClick={(folderId) => this.onFolderClick(folderId)}/>
            }/>
            <Route path='/folder/:folder-id' render={(routerProps) => 
              <MainSide data={dummy} folderClick={(folderId) => this.onFolderClick(folderId)}/>
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
        </main>
      </main>
    )
  }
}

export default App;
