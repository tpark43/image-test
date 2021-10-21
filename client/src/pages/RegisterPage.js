import React, { useState } from 'react'
import { MyInput } from '../components/MyInput';

export const RegisterPage = () => {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    return (
        <div style={{
            maxWidth: 400,
            marginTop: 100,
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <h1 className="App-title">Register</h1>
            <form>
                <MyInput label="Name" setValue={setName} value={name} />
                <MyInput label="Username" setValue={setUsername} value={username} />
                <MyInput label="Password" setValue={setPassword} value={password} type="password" />
                <MyInput label="Re-password" setValue={setPassword2} value={password2} type="password" />
            </form>
        </div>
    )
}