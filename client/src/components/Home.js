import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      posts:[],
      selectedValue: '',
      deletionSuccess: false
    };
  }
  
  componentDidMount(){
    this.retrievePost();
  }

  retrievePost(){
    axios.get("http://localhost:8000/posts").then(res=>{
      if(res.data.success){
        this.setState({
          posts:res.data.existingPosts
        });
        console.log(this.state.posts);
      }
    });
  }

  resetAlert = () => {
    this.setState({ deletionSuccess: false });
  };

  //delete post
  handleButtonClick = (event) => {
    const buttonValue = event.target.value;
    this.setState({ selectedValue: buttonValue });
  };


  deleteConfirmClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/post/delete/${this.state.selectedValue}`);
      if (response.data.success) {
        this.retrievePost();
        this.setState({ deletionSuccess: true });
        console.log("Delete success");
      }
    } catch (error) {
      console.log("Error occurred during deletion.");
    }
  };
  

  render() {
    const { deletionSuccess } = this.state;

    return (
      <div className="container">

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Delete Post</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Are you sure want to delete post? <b>Topic = {this.state.selectedValue}</b></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onClick={this.deleteConfirmClick} data-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {deletionSuccess && (
          <div class="alert alert-success" role="alert">
            <strong className="mx-2">Success!</strong> Delete successfull!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.resetAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        )}

        <p>All Posts</p>
        <table className="table">
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Topic</th>
              <th scope='col'>Description</th>
              <th scope='col'>Post Category</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index)=>(
              <tr>
                <td scope='row'>{index+1}</td>
                <td>
                    <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>{posts.topic}</a>
                    
                </td>
                <td>{posts.description}</td>
                <td>{posts.postCategory}</td>
                <td>
                  <a className='btn btn-warning' href={`/edit/${posts._id}`}><i className='fas fa-edit'></i>&nbsp;Edit</a>
                  &nbsp;
                  <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.handleButtonClick} value={posts._id}><i className='far fa-trash-alt'></i>&nbsp;Delete</button>  
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
      </div>
    )
  }
}
