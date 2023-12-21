import React from 'react'

const SearchItem = ({searchItem,setSearchItem}) => {
  return (
    <form className='searchForm' name= 'searchItem' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='searchItem'>
            SearchItem
        </label>
        <input
            id='searchItem'
            type='text'
            placeholder='Search Item'
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
        />
    </form>
  )
}

export default SearchItem