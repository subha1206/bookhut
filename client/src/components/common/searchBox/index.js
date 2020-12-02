import React from 'react'

import "./searchbox.styles.scss"

const SearchBox = () => {
    return (
        <form>
            <input type="text" name="search" id="search" />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBox
