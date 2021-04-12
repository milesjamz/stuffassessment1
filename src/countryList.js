import React from 'react'

function CountryList(props) {
    return (
        <div>
        {props.filteredCountries.map((country, index) => {
            return <li key={index} value={country.phoneCode}><button value={country.value} flag={country.map} code={country.phoneCode} onClick={props.onButtonClick(country)}>{country.map}  {country.value}(+{country.phoneCode}) </button></li>
        })}
        </div>
    )
}

export default CountryList