import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import Error from './components/Error'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'

function App() {

  //* Para guardar una location
  const [location, setLocation] = useState()
  //* Para  guardar la información del input y la petición cuando se hace submit
  const [chapter, setChapter] = useState('')
  //* Para guardar las sugerencias de la api
  const [suggestedList, setSuggestedList] = useState()
  //* Para indicar si hay error o no
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if (chapter) {
      id = chapter
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`
    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [chapter])

  const handleSumbit = e => {
    e.preventDefault()
    setChapter(e.target.idLocation.value)
  }

  const handleChange = e => {

    if (e.target.value === '') {
      setSuggestedList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="App">
      <h1>Rick And Morty</h1>
      <form onSubmit={handleSumbit}>
        <input
          id='idLocation'
          placeholder='Enter some number from 1 to 126'
          type="text"
          onChange={handleChange} />
        <button>Search</button>
        < FilterList
          suggestedList={suggestedList}
          setChapter={setChapter}
        />
      </form>
      {
        hasError ?
          <Error />
          :
          <div>
            <LocationInfo
              location={location} />
            <div className='card-container'>
              {
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url} />
                ))
              }
            </div>
          </div>
      }
    </div>
  )
}

export default App
