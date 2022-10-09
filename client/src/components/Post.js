import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

function Post({ user }) {
    const [post, setPost] = useState({})
    const [creator, setCreator] = useState({})
    const [comments, setComments] = useState([])
    const [clicked, setClicked] = useState(false)
    const [newComment, setNewComment] = useState("")
    const { postId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
            setPost(data)
            setCreator(data.user)
            setComments(data.comments)
            
        })
    }, [])
    console.log(post)
    function handleClick(e) {
        setClicked(!clicked)
        setNewComment("")
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ post_id: postId, content: newComment})
        }).then((res) => {
            if (res.ok) {
                setClicked(!clicked)
                res.json().then((cmt) => setComments([...comments, {id: cmt.id, content: cmt.content, user: cmt.user}]))
            } else {
                res.json().then((err) => console.log(err.errors))
            }
        })
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <Link to={`/users/${creator.id}`}><h4>By: {creator.full_name}</h4></Link>
            <div>{post.content}</div>
            {user
            ? (clicked 
                ? (<form onSubmit={handleSubmit}>
                    <input type="text" value={newComment} autoComplete="off" onChange={(e) => setNewComment(e.target.value)} />
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={handleClick}>Cancel</button>
                </form> ) 
                : <button onClick={handleClick}>Add a comment</button>)
            : <div>Log in to comment</div>}
            <div>Comments:</div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <div>{comment.user.full_name}</div>
                    <div>{comment.content}</div>
                </div>
            ))}
        </div>

    )
}

export default Post;