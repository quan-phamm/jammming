import React, { useState } from 'react';
import SearchBar from './SearchBar';

const SearchBarContainer = () => {
    const [searchInput, setSearchInput] = useState("");
    const handleSearchInput = ({target}) => setSearchInput(target.value);

    const handleSearchSubmit = e => {
        e.preventDefault();
        setSearchInput("");
    };

    return (
        <SearchBar searchInput={searchInput} handleSearchInput={handleSearchInput} handleSearchSubmit={handleSearchSubmit}/>
    );
}

export default SearchBarContainer;