import React from 'react'

const Footer = ({length}) => {
  return (
    <footer>{length} list {length>1 ? "items":"item"}</footer>
  )
}


export default Footer