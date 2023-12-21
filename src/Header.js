import React from 'react'


const Header = ({title}) => {
  return (
   <header>{title}</header>
   )
}
Header.defaultProps= {
    title : "To-Do List"
}
export default Header