import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login({ setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => setUser(user))
                navigate("/")
            } else {
                console.log('login not ok')
                res.json().then((err) => console.log(err))
            }
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
                type='text'
                id='username'
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
        </form>
    )
}
export default Login