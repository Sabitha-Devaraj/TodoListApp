import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItem = ({newItem, setNewItem, handleSubmit}) => {

  const inputRef = useRef()

  return (
    <form className="addForm" name="addForm" onLoad={() => handleSubmit}> 
        <label htmlFor='addItem'>Add Item</label>
        <input 
            type='text'
            id = 'addItem'
            ref={inputRef}
            autoFocus
            placeholder='Add Item'
            required
            value={newItem}
            onChange = {(e) => setNewItem(e.target.value)}
        />
        <FaPlus className="btnSubmit"
        role="button"
        type='submit'
        onClick={(e) => {handleSubmit(e); inputRef.current.focus()}}/>
     </form>
    )
  
}

export default AddItem