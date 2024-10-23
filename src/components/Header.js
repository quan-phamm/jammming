import React from 'react';

const Header = ( {handleLogin, isLoggedIn} ) => {
    return (
        <header>
            <div className='header'>
                <h1>ja<span>mmm</span>ing</h1>
            </div>
            {!isLoggedIn && <button id='sign-in' type='submit' onClick={handleLogin}>Sign In</button>}
            {isLoggedIn && <button id='reauth' type='submit' onClick={handleLogin}>Reauthorize</button>}
        </header>
    );
};

export default Header;