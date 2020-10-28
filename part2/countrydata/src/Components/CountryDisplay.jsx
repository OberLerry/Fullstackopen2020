import { useState } from "react"

const CountryDisplay = (props) => {
    const [show, setShow] = useState(false)
    console.log(props.len)
    
    const countryInfo = (country) => {
        return (<div>
                            <h2>{country.name}</h2>
                            <div>capital {country.capital}</div>
                            <div>population {country.population}</div>
                            <h3>languages</h3>
                            <ul>{country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}</ul>
                            <img alt="" src={country.flag}></img>
                            <h2>Weather in {country.capital}</h2>
                            
                        </div>)
      }
    return <div>
            {props.country.name} <button onClick={() => setShow(!show)}>show</button>
            { (show || props.len === 1) ? (countryInfo(props.country)) : ''}
            
            </div>
}

export default CountryDisplay