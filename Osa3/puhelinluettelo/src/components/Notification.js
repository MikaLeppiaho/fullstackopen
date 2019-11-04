import React from 'react'

const Notification = ({ message, errorCode}) =>{
    const NotificationStyle = {
        color: errorCode,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    console.log('ErrorMessage: ',message)
    if (message === null){
        return null
    }
    return(
        <div style={NotificationStyle}>
            {message}
        </div>
    )
}

export default Notification