import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { TypographyStylesProvider, Box, Tabs, Table, Textarea, Button, Group } from '@mantine/core';

function Post({ user }) {
    const [post, setPost] = useState({})
    const [creator, setCreator] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [tags, setTags] = useState([])
    const { postId } = useParams()
    const [activeTab, setActiveTab] = useState('comments')
    const rows = comments.map((comment) => (
        <tr key={comment.id}>
            <td>
                {comment.user 
                    ? <div>{comment.user.full_name}</div>
                    : <div>Deleted user</div>
                }
                <div>{comment.content}</div>
            </td>
        </tr>
    ))

    useEffect(() => {
        fetch(`/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
            setPost(data)
            setCreator(data.user)
            setComments(data.comments)
            setTags(data.tags)
        })
    }, [])
    function handleClick(e) {
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
                res.json().then((cmt) => setComments([...comments, {id: cmt.id, content: cmt.content, user: cmt.user}]))
                setActiveTab('comments')
                setNewComment('')
            } else {
                res.json().then((err) => console.log(err.errors))
            }
        })
    }
    return (
        <Box sx={{ maxWidth: 1000 }} mx='auto'>
            <h1>{post.title}</h1>
            <div>Tags: {tags.map((tag) => (
                <span key={tag.id}>{tag.category} </span>
            ))}</div>
            {creator 
                ? <Link to={`/users/${creator.id}`} style={{ textDecoration: 'inherit', color: 'inherit' }}><h4>By: {creator.full_name}</h4></Link>
                : <h4>By: Deleted user</h4>
            }
            <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: post.content }}/>
            </TypographyStylesProvider>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value='comments' onClick={handleClick}>Comments</Tabs.Tab>
                    {user ? <Tabs.Tab value='create-comment'>Add a comment</Tabs.Tab> : <Tabs.Tab value='create-comment' disabled>Log in to comment</Tabs.Tab>}
                </Tabs.List>
                <Tabs.Panel value='comments'>
                    <Table>
                        <tbody>{rows}</tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value='create-comment'>
                    <form onSubmit={handleSubmit}>
                        <Textarea autosize minRows={2} label='Your comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        <Group position='right' mt='md'>
                            <Button type='submit'>Submit</Button>
                        </Group>
                    </form>
                </Tabs.Panel>
            </Tabs>
        </Box>

    )
}

export default Post;