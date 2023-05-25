import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom"
import {Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function EditPost() {
    let {id}  = useParams();

    const navigate = useNavigate();
    const [deletionSuccess, setDeletionSuccess] = useState(false);

    useEffect(() => {
        fetchData(id);
      }, [id]);


    const [state, setState] = useState({
        r_topic: null,
        r_description: null,
        r_postCategory: null
      });
    
    const fetchData = async (id) => {
        
        const res = await axios.get(`http://localhost:8000/post/${id}`);
            if (res.data.success) {
                console.log("success");
                
                setState({
                    ...state,
                    r_topic: res.data.post.topic,
                    r_description: res.data.post.description,
                    r_postCategory: res.data.post.postCategory
                  });
                
            }
            else{
                console.log("error");
            }
    };

    
    const {r_topic, r_description, r_postCategory} = state;
   
    const data={
        
        "topic": r_topic,
        "description": r_description,
        "postCategory": r_postCategory
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
            console.log(data);
            const response = await axios.put(`http://localhost:8000/post/update/${id}`,data);
            if (response.data.success) {
                // clear form fields
                setState({
                    r_topic: '',
                    r_description: '',
                    r_postCategory: '',
                });
                setDeletionSuccess(true);
            }
            else{
                alert("Update Error");
            }  
    };
    

  return (
    <div>
        {/* Success Alert */}
        {deletionSuccess && (
          <div class="alert alert-success" role="alert">
          <strong className="mx-2">Success!</strong> Edited the Post successfully.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => navigate('/')}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        )}

        <Form onSubmit={onSubmit}>
            <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Form.Control type="text" name='topic' value={r_topic} onChange={(e) => setState({ ...state, r_topic: e.target.value })} placeholder="Enter the Topic" required/>
            </Form.Group>

            <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='description' value={r_description} onChange={(e) => setState({ ...state, r_description: e.target.value })} placeholder="Enter the Description" required />
            </Form.Group>

            <Form.Group>
            <Form.Label>Post Category</Form.Label>
            <Form.Control type="text" name='postCategory' value={r_postCategory} onChange={(e) => setState({ ...state, r_postCategory: e.target.value })} placeholder="Enter the Post Category" required/>
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

