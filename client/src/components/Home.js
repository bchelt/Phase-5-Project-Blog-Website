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
                <>
                    <Link to={`/post/${post.id}`} key={post.id}>
                        <h1>{post.title}</h1>
                        <div>{post.summary}</div>
                    </Link>
                    <Link to={`/users/${post.user.id}`}>By: {post.user.full_name}</Link>
                </>
            ))}
        </div>
    )
}

export default Home;