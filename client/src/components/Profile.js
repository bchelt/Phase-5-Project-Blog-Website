import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile({ user }) {
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [editable, setEditable] = useState(false)
    const { userId } = useParams()
    const [nameEdit, setNameEdit] = useState("")
    const [bioEdit, setBioEdit] = useState("")
    const [editMode, setEditMode] = useState(false)
    
    useEffect(() => { 
        fetch(`/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            setProfile(data)
            setPosts(data.posts)
            setComments(data.comments)
            if(user) {
                if (user.id === data.id) {
                    setEditable(true)
                }
            }
        })
    }, [])

    function handleClick() {
        setNameEdit(profile.full_name)
        setBioEdit(profile.bio)
        setEditMode(!editMode)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: nameEdit,
                bio: bioEdit
            })
        }).then((res) => {
            if (res.ok) {
                setProfile({...profile, full_name: nameEdit, bio: bioEdit})
                setEditMode(!editMode)
            }
        })
    }

    function deletePost(e) {
        fetch(`/posts/${e.target.id}`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                let newPosts = posts.filter((post) => {return post.id != e.target.id})
                setPosts(newPosts)
                let newComments = comments.filter((comment) => {return comment.post_id != e.target.id})
                setComments(newComments)
            }
        })
    }

    function deleteComment(e) {
        fetch(`/comments/${e.target.id}`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                let newComments = comments.filter((comment) => {return comment.id != e.target.id})
                setComments(newComments)
            }
        })
    }
    if (editable) {
        return (
            editMode ? (
            <form onSubmit={handleSubmit}>
                <button onClick={handleClick}>Cancel</button>
                <input type='text' autoComplete="off" value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />
                <input type='text' autoComplete="off" value={bioEdit} onChange={(e) => setBioEdit(e.target.value)} />
                <button type='submit'>Confirm</button>
            </form>
            )
            : (
            <div>
                <button onClick={handleClick}>Edit Profile</button>
                <h4>{profile.full_name}</h4>
                <div>{profile.bio}</div>
                <div>Posts:</div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <button id={post.id} onClick={deletePost}>Delete Post</button>
                    </div>
                ))}
                <div>Comments:</div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <div>{comment.content}</div>
                        <button id={comment.id} onClick={deleteComment}>Delete Comment</button>
                    </div>
                ))}
            </div>
            )
        )
    } else {
        return (
            <div>
                <h4>{profile.full_name}</h4>
                <div>{profile.bio}</div>
                <div>Posts:</div>
                {posts.map((post) => (
                    <h1 key={post.id}>{post.title}</h1>
                ))}
                <div>Comments:</div>
                {comments.map((comment) => (
                    <div key={comment.id}>{comment.content}</div>
                ))}
            </div>
        )
    }
}

export default Profile;