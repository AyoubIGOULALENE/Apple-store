import React from 'react'
import Navlinks from '../constants'
const Navbar = () => {
  return (
    <header>
        <nav>
            <img src="/logo.svg" alt="apple logo" />
            <ul>
                {
                    Navlinks.map(({ name, link }) => (
                        <li key={name}>
                            <a href={link}>{name}</a>
                        </li>
                    ))  
                }
            </ul>
            <div className='flex-center gap-3'>
                <button>
                    <img src="/search.svg" alt="search icon" />
                </button>
                <button>
                    <img src="/cart.svg" alt="bag icon"  />
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar