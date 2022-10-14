import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [allTags, setAllTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [addedTags, setAddedTags] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/tags")
        .then((res) => res.json())
        .then((data) => {
            setAllTags(data.map((tag) => tag.category))
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
    function addTag(e) {
        console.log(currentTag)
        if (!addedTags.includes(currentTag)) {
            setAddedTags([...addedTags, currentTag])
            let tag = currentTag.toLowerCase()
            tag = tag.charAt(0).toUpperCase() + tag.slice(1)
            //let allCategories = allTags.map((tag) => tag.category)
            if (!allTags.includes(tag)) {
                fetch("/tags", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        category: tag
                    }) 
                }).then((res) => {
                        if(res.ok) {
                            setAllTags([...allTags, tag])
                        } else {
                            res.json.then((err) => console.log(err))
                        }
                    })
            }
            
        }
        
    }
    function removeTag(e) {
        setAddedTags(addedTags.filter((tag) => tag !== e.target.id))
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
            <div></div>
            <label>Choose some tags:
            <input list="tags" value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} /></label>
            <datalist id="tags">
                {allTags.map((tag) => (
                    <option key={tag} value={tag} />
                ))}
            </datalist>
            <button type='button' onClick={addTag}>Add Tag</button>
            <div>
                Tags: {addedTags.map((tag) => (
                    <div key={tag}>{tag} <span id={tag} onClick={removeTag} style={{ color: "red" }}>X</span></div>
                ))}
            </div>
            <button type='submit'>Create Post</button>
        </form>
    )
}

export default NewPost;