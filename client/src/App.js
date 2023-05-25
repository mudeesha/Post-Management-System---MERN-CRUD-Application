import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreatePost from './components/CreatePost'
import Home from './components/Home'
import PostDetails from './components/PostDetails'
import NavBar from './components/NavBar'
import EditPost from './components/editPost';



export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <NavBar/>
          <Routes>
            <Route path="/" exact element={<Home/>}></Route>
            <Route path="/add" element={<CreatePost/>}></Route>
            <Route path="/edit/:id" element={<EditPost/>}></Route>
            <Route path="/post/:id" element={<PostDetails/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
