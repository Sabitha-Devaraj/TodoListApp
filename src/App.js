import './App.css';
import './index.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content'
import React, { useState, useEffect} from 'react'
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


function App() {

  const API_URL= "http://localhost:3500/items";

  const [items, setItems] = useState([]); //JSON.parse(localStorage.getItem('todolist'))

  const [newItem, setNewItem] = useState('')

  const [searchItem, setSearchItem] = useState('')

  const [fetchError, setFetchError] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    
    const fetchItems = async () => {
      try { 
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Data not received")
        const listItems = await response.json();
        setItems(listItems)
        setFetchError(null)
      }
      catch(err){
        console.log(err.stack)
        setFetchError(err.message)
      }
      finally{
        setIsLoading(false)
      }
    }
     setTimeout(() => {
      (async () => await fetchItems())  ()
     },1000)
    //JSON.parse(localStorage.getItem('todolist')) //couldn't get the item from local storage inside useEffect
  },[])
  

  const handleChange = async (id) => {
      const listItems = items.map((item)=> item.id === id ? {...item, checked: !item.checked}: item)
      setItems(listItems)
      //localStorage.setItem("todolist",JSON.stringify(listItems))

      const updateItem = listItems.filter((item) => item.id === id)

      const updateOptions = {
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({checked: updateItem[0].checked})
      }

      const reqURL = `${API_URL}/${id}`
      const result = await apiRequest(reqURL, updateOptions)
      if(result) setFetchError(result)
  }

  const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id)
      setItems(listItems)
     // localStorage.setItem("todolist",JSON.stringify(listItems))
    

     const deleteOptions = {
        method : 'DELETE'
     }
     
     const reqURL = `${API_URL}/${id}`
     const result = await apiRequest(reqURL,deleteOptions)
     if(result) setFetchError(result)
  }

  const addNewItem = async (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1
      const addNewItem = {id, checked : false, item }
      const listItems = [...items,addNewItem]
      setItems(listItems)
      //localStorage.setItem("todolist",JSON.stringify(listItems))

      const postOptions = {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(addNewItem)
      }

      const result = await apiRequest (API_URL,postOptions)
      if(result) setFetchError(result)
  }

  const handleSubmit =(e) =>{
      e.preventDefault()
      console.log(e)
      addNewItem(newItem)
      setNewItem('')
  }

 
  return (
    <div>
      <Header title={"To Do List"}/>
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem 
        searchItem = {searchItem}
        setSearchItem = {setSearchItem}
      />
      <main>
        {isLoading && <p>Loading items..</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
       
          <Content 
          items = {items.filter((item) => ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
          handleChange = {handleChange}
          handleDelete = {handleDelete}
        />
        
      </main>
      <Footer
       length = {items.length}
      />
    </div>
  );
}

export default App;
