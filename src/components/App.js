import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

const url = "https://practiceapi.devmountain.com/api/posts";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPost = this.filterPost.bind(this)
  }
  
  componentDidMount() {
    axios.get(url)
    .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log("An error occured while fetching the posts! Error: ", err))
  }

  updatePost(id, text) {
    axios.put(url +`?id=${id}`, { text })
    .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log("error: ", err))
  }

  deletePost(id) {
    axios.delete(url +`?id=${id}`)
    .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log(`An error occured while deleting post ${id}: `, err))
  }

  createPost(text) {
    axios.post(url, { text })
    .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log(`An error occured while creating post: `, err))
  }

  filterPost(text) {
    axios.get(encodeURI(url +`/filter?text=${text}`))
    .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log(`An error occured while searching for "${text}"! `, err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header 
          filter={this.filterPost}
        />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
          />

          { 
            posts.map((post, i) => 
              <Post 
                key={post.id}
                text={post.text}
                date={post.date}
                updatePostFn={this.updatePost}
                id={post.id}
                deletePostFn={this.deletePost}
              />
            )
          }
          
        </section>
      </div>
    );
  }
}

export default App;
