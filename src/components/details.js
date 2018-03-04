import React, { Component } from 'react';

export default class Details extends Component{
  render(){
    const {clickedRepo , readmeUrl, updateView } = this.props;
    return(
      <div className= 'details-list'>
        <div className='card'>
          <div className="card-body">
          <h3>Repository Details</h3>
            <ul>
              <li><p className= 'details-headers'>Repository Name:</p> {clickedRepo.name}</li>
              <li><p className= 'details-headers'>User Name:</p> {clickedRepo.owner.login}</li>
              <li><p className= 'details-headers'>Url:</p> <a href= {clickedRepo.html_url} target='_blank'>{clickedRepo.html_url}</a></li>
              <li><p className= 'details-headers'>Language:</p> {clickedRepo.language}</li>
              <li><p className= 'details-headers'>Forks:</p> {clickedRepo.forks}</li>
              {clickedRepo.description &&
                <li><p className= 'details-headers'>Description:</p> {clickedRepo.description}</li>
              }
              <li><p className= 'details-headers'>Open Issues:</p> {clickedRepo.open_issues}</li>
              {readmeUrl &&
                <li><p className= 'details-headers'>Readme Url: </p><a href= {readmeUrl} target='_blank'>{readmeUrl}</a></li>
              }
            </ul>
          </div>
        </div>
        <span className='back-button' onClick= {updateView}>Back to list</span>
      </div>
    )
  }
}
