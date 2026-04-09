import React from 'react'

export default function FormButton(props) {
  return (
    <div id="button" className="row">
      <button>{props.title}</button>
    </div>
  )
}
