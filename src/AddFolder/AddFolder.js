import React from 'react'
import NotefulContext from '../NotefulContext'
import config from '../config'


class AddFolder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    static contextType = NotefulContext;
    
    updateName(name) {
        this.setState({
            name: name
        });
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.postFolder();
    }

    postFolder(){
        fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({folder_name: this.state.name})
          })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then( data => {
          this.context.addFolder(data);
          this.props.history.push('/');
        })
        .catch(error => console.log({ error }));   
    }

    render(){
        return(
            <>
                <nav className='sidebar'>
                    <button className='go-back button' onClick={ e => this.props.history.goBack()}>Cancel</button>
                </nav>
                
                <form className="folderForm form">
                    <label htmlFor="folderName">Folder Name: </label>
                    <input 
                        type="text" 
                        id="folderName" 
                        name="folderName" 
                        onChange={e => this.updateName(e.target.value)}
                        required/>
                    <button 
                        type="submit" 
                        className="submit button" 
                        disabled= {!this.state.name.trim()}
                        onClick={e => this.handleSubmit(e)}>Submit</button>
                </form>
                
            </>
        )
    }
}

export default AddFolder