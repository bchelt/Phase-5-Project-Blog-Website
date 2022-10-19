import React from "react"
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Box, Table, Title, Text, TypographyStylesProvider } from '@mantine/core'


function Home() {
    const [posts, setPosts] = useState([])
    const rows = posts.map((post) => (
        <tr key={post.id}>
            <td>
                <Link to={`/post/${post.id}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                    <Title order={1}>{post.title}</Title>
                    <div>Tags: {post.tags.map((tag) => (
                            <span key={tag.id}>{tag.category} </span>
                    ))}</div>
                    <Text lineClamp={2}>
                        <TypographyStylesProvider>
                            <div dangerouslySetInnerHTML={{ __html: post.content }}/>
                        </TypographyStylesProvider>
                    </Text>
                </Link>
                {post.user 
                    ? <Link to={`/users/${post.user.id}`} style={{ textDecoration: 'inherit', color: 'inherit' }}><h4>By: {post.user.full_name}</h4></Link>
                    : <h4>By: Deleted user</h4>
                }
            </td>
        </tr>
    ))
    
    useEffect(() => {
        fetch("/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data))
    }, [])
    return (
        <Box sx={{ maxWidth: 1000 }} mx='auto'>
            <Table>
                <thead>
                    <tr>
                        <th> Posts</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box>
    )
}

export default Home;