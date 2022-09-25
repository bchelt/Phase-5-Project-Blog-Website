import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    const [post, setPost] = useState({})
    const { postId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => setPost(data))
    }, [])

    return (
        <div>
            <h1>{post.title}</h1>
            <div>{post.content}</div>
        </div>
    )
}

export default Post;