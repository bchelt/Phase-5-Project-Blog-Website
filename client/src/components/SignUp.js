import { useState } from 'react';
function SignUp({ setUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
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
                res.json().then((user) => setUser(user))
            } else {
                console.log('signup not ok')
                console.log(res.json())
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='first_name'>First Name</label>
            <input required
                type='text'
                id='first_name'
                autoComplete="off"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} 
            />
            <label htmlFor='last_name'>Last Name</label>
            <input required
                type='text'
                id='last_name'
                autoComplete="off"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor='username'>Username</label>
            <input required
                type='text' 
                id='username' 
                autoComplete="off"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <label htmlFor='password'>Password</label>
            <input required
                type='password' 
                id='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <label htmlFor='password_confirmation'>Password Confirmation</label>
            <input required
                type='password' 
                id='password_confirmation' 
                value={passwordConfirm} 
                onChange={(e) => setPasswordConfirm(e.target.value)} 
            />
            <button type='submit'>Sign Up</button>
        </form>
    )
}

export default SignUp