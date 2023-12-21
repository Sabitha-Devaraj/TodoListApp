import React from 'react'
import ListItem from './ListItem'

const Content = ({items,handleChange,handleDelete}) => {

  return (
   <ListItem 
   items = {items}
   handleChange = {handleChange}
   handleDelete = {handleDelete}/>
  )
}

export default Content