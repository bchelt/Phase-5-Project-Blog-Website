import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content,
            })
        }).then((res) => {
            if (res.ok) {
                navigate("/")
            } else {
                res.json().then((err) => console.log(err))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input 
                type='text'
                id='title'
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <p><label htmlFor="post">Post:</label></p>
            <textarea
                id='post'
                autoComplete="off"
                value={content}
                rows="10"
                cols="50"
                onChange={(e) => setContent(e.target.value)}
            />
            <button type='submit'>Create Post</button>
        </form>
    )
}

export default NewPost;