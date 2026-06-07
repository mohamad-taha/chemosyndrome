import React from 'react'

const FormInput = ({label, name, type, id, value, onChange, placeholder, accept}) => {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        autoComplete="off"
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        accept={accept}
      />
    </div>
  )
}

export default FormInput
