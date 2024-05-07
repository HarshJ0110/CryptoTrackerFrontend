import React from 'react'
const Alert = ({alert}) => {
  return (
    <div className='text-3xl font-black text-center' style={{backgroundColor: alert.color, color: alert.textColor, display: 'initial'}}>
        <p>{alert?.msg}</p>
    </div>
  )
}

export default Alert