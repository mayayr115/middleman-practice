import { useEffect} from 'react'
import { useState } from 'react'
import fetchData from './utils/fetchData'
import './App.css'

function App() {
  const [poke, setPoke] = useState(0)

  useEffect(() => {
    // fetch to middleman server
    const doFetch = async () => {
      const API_URL = `/api/pokemon`;
      try {
        const [data, error] = await fetchData(API_URL);

        if (data.results) setPoke(data.results[0]);
      } catch (error) {
        console.log(error.message)
      }
    }
    doFetch();
  }, [])

  const renderPokeName = (poke) => {
    return (
      <div>
        <h1>{poke.name}</h1>
      </div>
    )
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {poke ? renderPokeName(poke) : <h1>Loading...</h1>}
      </header>
    </div>
  )
  
}

export default App
