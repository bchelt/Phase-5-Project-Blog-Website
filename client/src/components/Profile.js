import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, TextInput, Textarea, Button, Tabs, TypographyStylesProvider, Menu, Burger } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';

function Profile({ user }) {
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [editable, setEditable] = useState(false)
    const { userId } = useParams()
    const [nameEdit, setNameEdit] = useState("")
    const [bioEdit, setBioEdit] = useState("")
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()

    const openModal = (id, type) => {
        console.log('here')
        openConfirmModal({
        title: 'Please confirm',
        children: (
            <Text>
                Are you sure you want to delete this {type}? This process is irreversible.
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log(id),
        onConfirm: () => {
            if(type === 'post'){
                deletePost(id)
            }
            else if (type === 'comment') {
                deleteComment(id)
            }
            else if (type === 'account') {
                deleteAccount(id)
            }
        }
    })}
    
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

    function deletePost(id) {
        fetch(`/posts/${id}`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                let newPosts = posts.filter((post) => {return post.id != id})
                setPosts(newPosts)
                let newComments = comments.filter((comment) => {return comment.post_id != id})
                setComments(newComments)
            }
        })
    }
    function deleteComment(id) {
        fetch(`/comments/${id}`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                let newComments = comments.filter((comment) => {return comment.id != id})
                setComments(newComments)
            }
        })
    }

    function deleteAccount(id) {
        fetch(`/users/${id}`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                navigate('/')
            }
        })
    }

    if (editable) {
        return (
            editMode ? (
            <Box sx={{ maxWidth: 1000 }} mx='auto'>
                <form onSubmit={handleSubmit}>
                    
                    <TextInput label='Full Name' value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />
                    <Textarea label='Bio' value={bioEdit} onChange={(e) => setBioEdit(e.target.value)} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant='outline' color='red' onClick={handleClick}>Cancel</Button>
                        <Button type='submit'>Confirm</Button>
                    </Box>
                </form>
            </Box>
            )
            : (
            <Box sx={{ maxWidth: 1000 }} mx='auto' >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>{profile.full_name}</h1>
                    {/* <Button sx={{ alignSelf: 'center' }} variant='subtle' onClick={handleClick}>Edit Profile</Button> */}
                    <Menu shadow='md' width={200} trigger='hover'>
                        <Menu.Target>
                            <Burger
                                sx={{ alignSelf: 'center' }}
                            />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={handleClick}>Edit Profile</Menu.Item>
                            <Menu.Item color='red' onClick={() => openModal(userId, 'account')}>Delete Profile</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Box>
                <p>{profile.bio}</p>
                <Tabs defaultValue='posts'>
                    <Tabs.List>
                        <Tabs.Tab value='posts'>Posts</Tabs.Tab>
                        <Tabs.Tab value='comments'>Comments</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='posts'>
                        {posts.map((post) => (
                            <div key={post.id}>
                                <h2>{post.title}</h2>
                                <Text lineClamp={3}>
                                    <TypographyStylesProvider>
                                        <div dangerouslySetInnerHTML={{ __html: post.content }}/>
                                    </TypographyStylesProvider>
                                </Text>
                                <Button variant='white' color='red' id={post.id} onClick={() => openModal(post.id, 'post')}>Delete Post</Button>
                            </div>
                        ))}
                    </Tabs.Panel>
                    <Tabs.Panel value='comments'>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.content}</p>
                                <Button variant='white' color='red' id={comment.id} onClick={() => openModal(comment.id, 'comment')}>Delete Comment</Button>
                            </div>
                        ))}
                    </Tabs.Panel>
                </Tabs>
            </Box>
            )
        )
    } else {
        return (
            <Box sx={{ maxWidth: 1000 }} mx='auto' >
                <Box sx={{ display: 'flex' }}>
                    <h1>{profile.full_name}</h1>
                </Box>
                <p>{profile.bio}</p>
                <Tabs defaultValue='posts'>
                    <Tabs.List>
                        <Tabs.Tab value='posts'>Posts</Tabs.Tab>
                        <Tabs.Tab value='comments'>Comments</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='posts'>
                        {posts.map((post) => (
                            <div key={post.id}>
                                <h2>{post.title}</h2>
                                <Text lineClamp={3}>
                                    <TypographyStylesProvider>
                                        <div dangerouslySetInnerHTML={{ __html: post.content }}/>
                                    </TypographyStylesProvider>
                                </Text>
                            </div>
                        ))}
                    </Tabs.Panel>
                    <Tabs.Panel value='comments'>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </Tabs.Panel>
                </Tabs>
            </Box>
        )
    }
}

export default Profile;