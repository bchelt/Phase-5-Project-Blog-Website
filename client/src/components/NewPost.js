import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RichTextEditor } from '@mantine/rte';
import { Box, MultiSelect, TextInput, Button } from '@mantine/core';
import { Context } from '../index.js';

function NewPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [allTags, setAllTags] = useState([])
    const [addedTags, setAddedTags] = useState([])
    const navigate = useNavigate()
    const width = useContext(Context)
    
    useEffect(() => {
        fetch("/tags")
        .then((res) => res.json())
        .then((data) => {
            setAllTags(data.map((tag) => { return { value: tag.category, label: tag.category }}))
        })
    }, [])
    
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
                tags: addedTags
            })
        }).then((res) => {
            if (res.ok) {
                navigate("/")
            } else {
                res.json().then((err) => console.log(err))
            }
        })
    }
    function addTag(query) {
        fetch("/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: query
            }) 
        }).then((res) => {
            if(res.ok) {

            } else {
                res.json.then((err) => console.log(err))
            }
        })
        
    }
    return (
        <Box sx={{ maxWidth: width }} mx='auto'>
            <form onSubmit={handleSubmit}>
                <TextInput 
                    placeholder='Title'
                    size='xl'
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <br></br>
                <RichTextEditor
                    id="rte"
                    value={content}
                    onChange={setContent}
                    placeholder="Your post goes here"
                />
                <div></div>
                <MultiSelect
                    label="Add some tags"
                    data={allTags}
                    placeholder="Select tags"
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                        addTag(query)
                        const tag = { value: query, label: query }
                        setAllTags((current) => [...current, tag])
                        return tag
                    }}
                    onChange={(e) => setAddedTags(e)}
                />
                <Button type='submit'>Create Post</Button>
            </form>
        </Box>
    )
}

export default NewPost;