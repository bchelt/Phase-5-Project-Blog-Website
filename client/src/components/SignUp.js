import { useState } from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core'; 
import { useNavigate } from 'react-router-dom';

function SignUp({ setUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        let fullName = firstName + ' ' + lastName
        fetch('/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirm,
                full_name: fullName
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    setUser(user)
                    navigate('/')
                })
            } else {
                res.json().then((error) => setErr(error.errors))
            }
        })
    }

    return (
        <Box sx={{ maxWidth: 400 }} mx="auto">
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextInput required
                        label='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                    <TextInput required
                        label='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Box>
                <TextInput required
                    label='Username'
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <PasswordInput required
                    label='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <PasswordInput required
                    label='Confirm Password'
                    value={passwordConfirm} 
                    onChange={(e) => setPasswordConfirm(e.target.value)} 
                />
                <div style={{ color: 'red' }}>{err}</div>
                <Group position="right" mt="md">
                    <Button type='submit'>Sign Up</Button>
                </Group>
            </form>
        </Box>
    )
}

export default SignUp