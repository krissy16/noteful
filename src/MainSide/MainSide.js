import React from 'react'
import { NavLink } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class MainSide extends React.Component{
    static contextType = NotefulContext;
    render(){
        const folder = this.context.folders.map(folder => 
            <li key={folder.id} className='folder'><NavLink  to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
        );
        return(
            <nav className='sidebar'>
                <ul className='folder-list'>
                    {folder}
                </ul>
                <button className='add-folder button' onClick={()=>{this.props.history.push('/addFolder')}}>Add Folder</button>
            </nav>
        )
    }
}

export default MainSide
