import React from 'react'
import { FaTrash } from "react-icons/fa";

const LineItem = ({item,handleChange,handleDelete}) => {

  return (
   
        <li className='item' key={item.id}> 
          <input 
            type = "checkbox" 
            checked={item.checked}
            onChange={()=> handleChange(item.id)}
          />
          <label
            style = {(item.checked) ? {textDecoration : "line-through"}:null}
            onDoubleClick={()=> handleChange(item.id)}
          >{item.item}
          </label>
          <FaTrash 
            role = "button"
            onClick={()=>handleDelete(item.id)}
          />
      </li>
       
  )
}

export default LineItem