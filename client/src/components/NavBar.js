import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div>
            <Link to="/"><span>Home</span></Link>
            <Link to="/auth/login">
                <span style={{
                    float: 'right'
                }}>Login</span>
            </Link>
            <Link to="/auth/register">
                <span style={{
                    float: 'right',
                    marginRight: 16
                }}>Register</span>
            </Link>
        </div>
    )
}
