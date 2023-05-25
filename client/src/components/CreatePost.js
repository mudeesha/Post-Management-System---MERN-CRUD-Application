import React, {useState } from 'react';
import axios from 'axios';
import {Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
    const navigate = useNavigate();

    const [post, createPost] = useState({
        topic:"",
        description:"",
        postCategory:""
    });
    
    const [deletionSuccess, setDeletionSuccess] = useState(false);

    const {topic, description, postCategory} = post;
    
   
    
    const data={
        "topic": topic,
        "description": description,
        "postCategory": postCategory
    
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
            console.log(data);
            const response = await axios.post("http://localhost:8000/post/save",data);
            if (response.data.success) {
                createPost({
                    topic:"",
                    description:"",
                    postCategory:""
                });
                setDeletionSuccess(true);
                
            }
            else{
                console.log("error");
            }
        
        
    };
    
    
  return (
    <div>

        {/* Success Alert */}
        {deletionSuccess && (
          <div class="alert alert-success" role="alert">
          <strong className="mx-2">Success!</strong> Created a Post successfully.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => navigate('/')}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        )}

        <Form onSubmit={onSubmit}>
            <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Form.Control type="text" name='topic' value={topic} onChange={(e) => createPost({ ...post, topic: e.target.value })} placeholder="Enter the Topic" />
            </Form.Group>

            <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='description' value={description} onChange={(e) => createPost({ ...post, description: e.target.value })} placeholder="Enter the Description" required />
            </Form.Group>

            <Form.Group>
            <Form.Label>Post Category</Form.Label>
            <Form.Control type="text" name='postCategory' value={postCategory} onChange={(e) => createPost({ ...post, postCategory: e.target.value })} placeholder="Enter the Post Category" />
            </Form.Group>

            <Button variant="secondary" onClick={() => navigate('/')}>
            Cancel
            </Button>
            <Button className='btn' variant="primary" type="submit">
            Save
            </Button>
        </Form>
    </div>
  )
}

