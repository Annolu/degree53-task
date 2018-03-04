import React, { Component } from 'react';

export default class List extends Component{
  render(){
    const {serverData} = this.props;
    return(
      <div>
        <h3>Repositories</h3>
        <ul>
          {serverData.items.map((item, i)=>{
          return <li key={i}>
            <div className='card'>
              <div className="card-body">
                <span className="repo-name" onClick= {e => {
                  e.preventDefault();
                  this.props.onclick(item)
                }}>{item.name}</span>
                {item.owner.login &&
                  <p className='username'>by: {item.owner.login}</p>
                }
              </div>
            </div>
          </li>
          })}
        </ul>
      </div>
    )
  }
}
