import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  constructor() {
    super()
    this.state = {
      input: ""
    }
  }

  updateInput = e => this.setState({ input: e.target.value })

  filter = () => this.props.filter(this.state.input)

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input 
            value={this.state.input}
            placeholder="Search Your Feed"
            onChange={this.updateInput}
          />

          <SearchIcon 
            id="Search__icon"
            onClick={this.filter}
          />
        </div>
        
      </section>
    )
  }
}