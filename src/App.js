import React, { useState, useEffect } from "react";
import './App.css';
import Search from "./Search";



function App() {
  
  const [array, setArray] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search,setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://openlibrary.org/search.json?author=tolkien&sort=new")
      .then((response) => response.json())
      .then((data) => {
        setArray(data.docs); // Store the `docs` array directly
        setSearchResult(data.docs); // Initialize with all the results
        setLoading(false); // Turn off loading when data is fetched
      })
      .catch((error) => {
        setError(error); // Pass the error message to the state
        setLoading(false); // Turn off loading even in case of an error
      });
       
  }, []); 
  
  if (loading){
    return<h1 style={{ textAlign:"center" }}>Loading....</h1>
  }
  
  if(error){
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }
  if(!array.length){
    return <h2>No data found</h2>;
  }
  

  const searchHandler =(search) =>{
    setSearch(search);
    if(search !== ""){
      const newBookList = array.filter((book)=>{
        return Object.values(book)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
      });
      setSearchResult(newBookList);
    }else{
      setSearchResult(array);
    }

  };
  



  
  return(
    
    <div className="container">
      <Search term={search} searchKeyword={searchHandler}/>
    <ul className="list">
      {searchResults.map((item, i) => {
        return (
          <li key={i} className="list-item">
            <i className="fa fa-book"></i> {/* Fixed the i tag */}
            &nbsp;
            {item.title}
          </li>
        );
      })}
    </ul>
  </div>
  
    
  );


  
}

export default App;
