import React from 'react'

export default function FormInput(props) {
  return (
    <div className="row">
      <label>{props.description}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
      />
    </div>
  )
}
