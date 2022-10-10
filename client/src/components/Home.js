import React from "react"
import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"


function Home() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        fetch("/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data))
    }, [])
    return (
        <div>
            Posts:
            {posts.map((post) => (
                <div key={post.id}>
                    <Link to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        <div>{post.summary}</div>
                    </Link>
                    <Link to={`/users/${post.user.id}`}>By: {post.user.full_name}</Link>
                </div>
            ))}
        </div>
    )
}

export default Home;