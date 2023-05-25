import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom"

export default function PostDetails() {
    const [post, setPost] = useState({});
    let id  = useParams();

    useEffect(() => {
      fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/post/${id.id}`);
            if (response.data.success) {
                setPost(response.data.post);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const {topic, description, postCategory} = post;

  return (
    
    <div style={{marginTop: '20px'}}>
        <h4>{topic}</h4>
        <hr/>

        <dl className='row'>
            <dt class="col-sm-3">Description</dt>
            <dd class="col-sm-9">{description}</dd>
            
            <dt class="col-sm-3">Post Category</dt>
            <dd class="col-sm-9">{postCategory}</dd>

        </dl>
    </div>
  );
}

