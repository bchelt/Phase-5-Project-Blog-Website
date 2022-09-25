import React from "react"
import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"


function Home() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data))
    }, [])
    console.log(posts)
    return (
        <div>
            Posts:
            {posts.map((post) => (
                <Link to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                    <h4>By: {post.user.full_name}</h4>
                    <div>{post.summary}</div>
                </Link>
            ))}
        </div>
    )
}

export default Home;