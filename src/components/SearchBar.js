import React, { useState, useEffect, useRef } from 'react';
import styles from './components_css/SearchBar.module.css';

const SearchBar = ({ searchInput, handleSearchInput, handleSearchSubmit, resetSearchInput, refreshSearch }) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMouseUp, setIsMouseUp] = useState(false);

    const searchInputRef = useRef(null);
    const searchBarRef = useRef(null);
    useEffect(() => {
        const handleClick = () => {
            searchInputRef.current.focus();
        }
        searchBarRef.current.addEventListener('click', handleClick);

        return () => {searchBarRef.current.removeEventListener('click', handleClick);}
    }, []);

    return (
        <div className="search-block">
            <form onSubmit={handleSearchSubmit}>
                <div className={styles.searchBar} ref={searchBarRef}>
                    <div className={`${styles.icon} ${styles.searchIcon}`}>
                        <button type='submit' title='Search' onClick={handleSearchSubmit}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </button>
                    </div>
                    <input id="search" type="text" name="search" aria-label='Search' placeholder='Search' value={searchInput} onChange={handleSearchInput} ref={searchInputRef}/>
                    {searchInput && <div className={`${styles.icon} ${styles.clearSearchIcon}`}>
                        <button type='button' title='Clear' onClick={resetSearchInput}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 460.775 460.775">
                                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                            </svg>
                        </button>
                    </div>}
                </div>            
                <div className={`${styles.icon} ${styles.resetResultIcon} ${isMouseDown ? styles.refreshMouseDown : ''} ${isMouseUp ? styles.refreshMouseUp : ''}`}>
                    <button
                        type='button'
                        title='Refresh'
                        onClick={refreshSearch}
                        onMouseDown={() => setIsMouseDown(true)}
                        onMouseUp={() => {
                            if (isMouseDown) {
                                setIsMouseDown(false);
                                setIsMouseUp(true);
                                setTimeout(() => setIsMouseUp(false), 200);
                            }
                        }}
                        onMouseOut={() => {
                            setIsMouseDown(false);
                            setIsMouseUp(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" className="mdl-js">
                            <path d="M20.9844 10H17M20.9844 10V6M20.9844 10L17.6569 6.34315C14.5327 3.21895 9.46734 3.21895 6.34315 6.34315C3.21895 9.46734 3.21895 14.5327 6.34315 17.6569C9.46734 20.781 14.5327 20.781 17.6569 17.6569C18.4407 16.873 19.0279 15.9669 19.4184 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>    
            </form>
        </div>
    );
}

export default SearchBar;