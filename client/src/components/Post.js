import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const { postId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
            setPost(data)
            setUser(data.user)
        })
    }, [])
    return (
        <div>
            <h1>{post.title}</h1>
            <h4>By: {user.full_name}</h4>
            <div>{post.content}</div>
        </div>
    )
}

export default Post;