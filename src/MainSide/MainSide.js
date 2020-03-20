import React from 'react'
import { NavLink } from 'react-router-dom';

class MainSide extends React.Component{
    render(){
        const folder = this.props.folders.map(folder => 
            <li key={folder.id} className='folder'><NavLink  to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
        );
        return(
            <nav className='sidebar'>
                <ul className='folder-list'>
                    {folder}
                </ul>
                <button className='add-folder'>Add Folder</button>
            </nav>
        )
    }
}

export default MainSide
