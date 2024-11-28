import React from 'react'

const Input = ({ id, type = 'text', label, register, required, children, ...props }) => {
  return (
    <>
        <label htmlFor={id} className="fw-400 primary-text f-size-14 pt-3 mb-2">{label}</label>
        <div className="input-group-custom pe-3">
            <input
              type={type} className="autofill-input autofill" 
              id={id} name={id} autoComplete={id}
              {...register(id, required)}
              {...props}
            />

            {/* Qualquer item que colocar aqui, vai aparecer no canto direito do input */}
            { children }
        </div>
    </>
  )
}

export default Input
