import React, { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Box, NavLink, Button } from '@mantine/core';


function Nav({ user, setUser }) {
    let navigate = useNavigate();
    const location = useLocation();


    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                setUser(null);
                navigate("/")
            }
        })
    }
    
    if (user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <NavLink sx={{width: 65}} label="Home" to="/" component={Link} active={location.pathname === '/'}/>
                <Box sx={{display: 'flex'}}>
                    <NavLink sx={{width: 82}} label="New Post" to="/posts/new" component={Link} active={location.pathname === '/posts/new'}/>
                    <NavLink sx={{width: 64}} label="Profile" to={`/users/${user.id}`} component={Link} active={location.pathname === `/users/${user.id}`}/>
                    <Button variant="default" onClick={handleLogout}>Logout</Button>
                </Box>
                
            </Box>
        )
    }
    else {
        return (
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <NavLink sx={{width: 65}} label="Home" to="/" component={Link} active={location.pathname === '/'}/>
                <Box sx={{display: 'flex'}}>
                    <NavLink sx={{width: 65}} label="Login" to="/login" component={Link} active={location.pathname === '/login'}/>
                    <NavLink sx={{width: 80}} label="Sign Up" to="/sign-up" component={Link} active={location.pathname === '/sign-up'}/>
                </Box>
            </Box>
        )
    }
}

export default Nav