import React from 'react'

const Input = ({value,onChange,placeholder}) => {
  return (
    <div>
         <div className="input">
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
       
      />
       
    </div>
          </div>
  )
}

export default Input
