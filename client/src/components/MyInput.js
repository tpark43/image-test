import React from 'react'

export const MyInput = ({label, value, setValue, type = 'text'}) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input style={{
                width: '100%',
                padding: 8,
                borderRadius: 8
            }} type={type} id={label} onChange={e => setValue(e.target.value)} value={value} />
        </>
    )
}
