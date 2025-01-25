import { React, useState} from 'react'
import Search from './Components/Search.jsx'

const App = () => {

  const [SearchTerm, setSearch] = useState("")


  return (
    <main>

      <div className='pattern' />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero-banner" srcset="" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy without Hassle</h1>
          <p>Search</p>
        </header>

        <Search SearchTerm={SearchTerm} setSearch = {setSearch}/>

      </div>

    </main>
  )
}

export default App
