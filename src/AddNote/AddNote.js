import React from 'react'
import NotefulContext from '../NotefulContext'
import Validation from '../Validation';

class AddNote extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            folder: "",
            name: "",
            content: "",
            showValidation: false
        }
      }
      
    static contextType = NotefulContext;

    updateState(value, stateName) {
        this.setState({
            [stateName]: value,
            showValidation: true
        });
    }
    
    handleSubmit(e){
        e.preventDefault();
        const data = {
            content: this.state.content.trim(),
            folder_id: this.state.folder,
            note_title: this.state.name.trim()
        }
        this.postNote(data)  
    }

    validateForm(){
        return this.validateName() || this.validateFolder() || this.validateContent();
    }

    validateName(){
        if(!this.state.name.trim())
            return 'Please name your note'
    }

    validateFolder(){
        if(this.state.folder === "")
            return 'Please choose a folder'
    }

    validateContent(){
        if(!this.state.content.trim())
            return 'Please describe your note'
        else if(this.state.content.length < 100)
            return 'The description should be at least 100 characters long'
    }

    postNote(data){
        fetch(`${config.API_ENDPOINT}/api/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then( data => {
          this.context.addNote(data);
          this.props.history.push('/');
        })
        .catch(error => console.log({ error }));  
    }

    render(){
        const folders = this.context.folders.map(folder => 
            <option key={folder.id} value={folder.id}>{folder.folder_name}</option>
        );
        const validationError = this.validateForm();
        return(
            <>
                <nav className='sidebar'>
                    <button className='go-back button' onClick={ e => this.props.history.goBack()}>Cancel</button>
                </nav>
                
                <form className="noteForm form">
                    <label htmlFor="folder">Folder: </label>
                    <select id="folder" value={this.state.folder} onChange={e => this.updateState(e.target.value, "folder")}>
                        <option disabled hidden value="">Please Choose a Folder</option>
                        {folders}
                    </select>
                    <label htmlFor="noteName">Note Name: </label>
                    <input type="text" id="noteName" onChange={e => this.updateState(e.target.value,"name")}/>
                    <label htmlFor="content">Note Content:</label>
                    <textarea id="content" onChange={e => this.updateState(e.target.value, "content")}/>
                    <button type="submit" className="submit button" onClick={e => this.handleSubmit(e)} disabled={validationError}>Submit</button>
                </form>

                {this.state.showValidation ? (validationError ? <Validation message={validationError}/> : <></>) : <></>}
            </>
        )
    }
}

export default AddNote