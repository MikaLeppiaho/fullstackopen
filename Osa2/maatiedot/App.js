import React, {useState,useEffect} from 'react';
import axios from 'axios'


const Weather = (props) =>{
  const[weather, setWeather] = useState()

  const params ={
    access_key: '804629467c1d317daa0aecd9b96d6c4f',
    query: props.search
  }
  console.log(params)

 useEffect(() =>{
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  
    axios
    .get('http://api.weatherstack.com/current', {params},{ cancelToken: source.token })
    .then(response => {
      setWeather(response.data)
    })
  },[]
  )
  console.log('Weather',weather)
  /*
  */
  if(weather == null)
  return(
    <div></div>
  )
  else{
    return(
      <div>
        <h2><strong>Weather in {weather.location.name}</strong></h2>
        <strong>temperature: </strong>{weather.current.temperature} Celsius<br></br>
        <img src={weather.current.weather_icons}></img><br></br>
        <strong>wind</strong>:{weather.current.wind_speed} kph direction {weather.current.wind_dir}
      </div>
    )

  }

}
const Content = ({countries,value,search}) => {

  console.log('Search',search)
  
  if(countries.length < 10 && countries.length > 1){
    const Rows = () =>  countries.map(fcountry => 
    <li key={fcountry.numericCode}>{fcountry.name}
    <button onClick={value(fcountry.name)}>Show</button></li>)
    
    return(
      <ul>
       {Rows()}
      </ul>
    )
  }
  else if(countries.length <= 1){
    
    console.log('Capital: ',countries)
    const Rows = () => countries.map(fcountry => <h1 key={fcountry.numericCode}>{fcountry.name}</h1>)
    const Info = () => countries.map(Icountry => 
    <p key={Icountry.numericCode}>
      Capital: {Icountry.capital}<br></br>
      Population: {Icountry.population}
    </p>)
    const Language = () => countries.map(lcountry =>
      lcountry.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)
      )
    const Flag = () => countries.map(image => <img width="200" key={image.numericCode} src={image.flag}></img> )
    
    return(
      <>
      {Rows()}
      {Info()}
      <h2>Languages</h2>
      <ul>{Language()}</ul>
      <div>{Flag()}</div>
      <Weather search={search}/>
      </>
      
    )
  }
  else{
    return(
      <div>There are too many countries to list
      </div>
    )}
}

const App = ()=>{
  const[search, setSearch] = useState('')
  const[countries, setCountries] = useState([])
  


  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data)
      })
      },[])


  const handleSearch = (e) => setSearch(e.target.value)

  const setToValue = (x) => () => setSearch(x)

  const filterCountry = countries.filter((country)=>{
    return country.name.toLowerCase().indexOf(
        search.toLowerCase()) !== -1
  })
  
  return(
    <div>
      <div>Find country <input value={search} onChange={handleSearch}/></div>
      <Content 
      countries={filterCountry}
      value={setToValue}
      search={search}
      />
    </div>
  )
}

export default App;
