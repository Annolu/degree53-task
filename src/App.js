import React, { Component } from 'react';
import './App.css';
import Details from './components/details';
import List from './components/list';

class App extends Component {
  constructor(){
    super();
    this.state= {
      serverData: {},
      searchedString: '',
      clickedRepo: undefined,
      readmeUrl: undefined,
      listView: true
    }
  }

  //fetch data with string searched
  onSubmit = (e)=>{
    {!this.state.searchedString== '' &&
    fetch(`https://api.github.com/search/repositories?q=${this.state.searchedString}`)
      .then((res) => {
       return res.json();})
      .then((data) => {
       this.setState({
         serverData: data,
         listView: true
       })
    })
    }
  }

  //Update state with string searched
  onChange= (event) => {
    this.setState({
      searchedString : event.target.value
    })
  }

  //Update state with clicked repo
  onclick= (item) => {
    this.setState({
      clickedRepo: item,
      listView: false
    })

    this.fetchReadme(item.url)
  }

  //Fetch readme file
  fetchReadme = (url) => {
    fetch(url+'/readme')
      .then((res) => {
       // Get the result
       return res.json()})
      .then((data) => {
       this.setState({
         readmeUrl: data.html_url
       })
    })
  }

  //update state with current view
  updateView = () => {
    this.setState({
      listView: true
    })
  }

  render() {
    const { serverData, searchedString, clickedRepo, readmeUrl, listView} = this.state;
    return (
      <div className="App container">
        <h1>Search Github Repositories</h1>
        <form onSubmit= {e => {
          e.preventDefault();
          this.onSubmit(e)
        }}>
          <div className="form-group">
            <label>Repository Name</label>
            <input className="form-control" type='text' name='searchedString' value={searchedString} onChange= {this.onChange}/>
          </div>
          <button className='btn btn-primary btn-block' type='submit'>Search</button>
        </form>
        {serverData.total_count== 0 &&
          <h2>No Repositories Found</h2>
        }
        {(listView && serverData.items && serverData.items.length > 0) &&
        <List serverData={serverData} onclick={this.onclick}/>}
        {clickedRepo && !listView && <Details clickedRepo={clickedRepo} listView={listView} readmeUrl={readmeUrl} updateView= {this.updateView} />}
      </div>
    );
  }
}

export default App;
