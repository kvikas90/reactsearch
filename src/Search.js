import React, { useState } from 'react';

function Search({term, searchKeyword}) {

    function handleSearch(e) {
       
        searchKeyword(e.target.value); // This will log the input value as you type
    }

    return (
        <>
            <input 
                className='input-field'
                type="text" 
                value={term}
                placeholder="Enter the book name" 
                onChange={handleSearch} // onChange event handler goes here
            />
        </>
    );
}

export default Search;
