import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core'; 
import { useForm } from '@mantine/form';

function Login({ setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
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
                res.json().then((err) => setErr(err.errors))
            }
        })
    }
    
    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={handleSubmit}>
            
                <TextInput
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{ color: 'red' }}>{err}</div>
                <Group position="right" mt="md">
                    <Button type='submit'>Login</Button>
                </Group>
                
            </form>
        </Box>
    )
}
export default Login