import React from "react"
import { Link } from "react-router-dom"

function Nav({ user, setUser }) {
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                setUser(null);
            }
        })
    }
    
    if (user) {
        return (
            <nav>
                <Link to="/">
                    Home
                </Link>
                <Link to="/posts/new">
                    New Post
                </Link>
                <Link to={`/users/${user.id}`}>
                    Profile
                </Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        )
    }
    else {
        return (
            <nav>
                <Link to="/">
                    Home
                </Link>
                <Link to="/login">
                    Login
                </Link>
                <Link to="/sign-up">
                    Sign Up
                </Link>
            </nav>
        )
    }
}

export default Nav