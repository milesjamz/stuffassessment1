import React from 'react'
import countryData from './data'
import CountryList from './countryList.js'

class PhoneInput extends React.Component {

state = {
    prefix: '+1 ',
    inpValue:'',
    widgetOpen:false,
    widgetOpen2:false,
    prefixSearch:'Search',
    countries:[],
    filteredCountries:[],
    selectedCountry:''
}

textInput = React.createRef()

focusTextInput() {
    this.textInput.current.focus()
}

handleSubmit(event) {
    console.log(event)
}

handleOnChange = event => {
    let slicedInput = event.target.value.slice(this.state.prefix.length)
    if (slicedInput === '' || /^[0-9\b]+$/.test(slicedInput)) {
    this.setState({inpValue:slicedInput})
    }
}

onButtonClick = country => e => {
    e.preventDefault()
    this.setState({selectedCountry:country,prefix:"+" + country.phoneCode.toString() + ' ',widgetOpen:false})
    this.focusTextInput()
    this.setState({widgetOpen:false})
}

handleBlur = e => {
    console.log('focused out')
    console.log(e)
    this.setState({prefixSearch:'Search'})
}

handleOnFocus = e => {
   if (e.target.id === 'searchBar') {
       this.setState({prefixSearch:'',filteredCountries:this.state.countries})
    } else {
        console.log('lo')
    }
    this.setState({widgetOpen:true})
    // console.log(e)
}

handleSearchChange = e => {
    this.setState({prefixSearch:e.target.value})
    let filtered = this.state.countries.filter(country => country.value.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({filteredCountries:filtered})
}

componentDidMount() {
    this.setState({countries:countryData, filtedCountries:countryData, selectedCountry:countryData[192], prefix:"+" + countryData[192].phoneCode + " "})
    console.log(countryData)
}

render() {

const widget1 = e => {
    return (
        <div className='countryMenu'>
                {this.state.selectedCountry.map} {this.state.selectedCountry.value} (+{this.state.selectedCountry.phoneCode})<br/>
                <input onFocus={this.handleOnFocus} id='searchBar' value={this.state.prefixSearch} onChange={this.handleSearchChange}></input>
                <br/>
                <ul>
                <CountryList onButtonClick={this.onButtonClick} filteredCountries={this.state.filteredCountries}/>
                    </ul>
        </div>
    )
}

    return (
        <div className="parentWidget" onBlur={this.handleBlur} onFocus={this.handleOnFocus}>
            <form onSubmit={this.handleSubmit} >
            <span style={{color:'gray'}}>Phone:</span><br/>
            <input type='tel' ref={this.textInput} onChange={this.handleOnChange} value={this.state.prefix + this.state.inpValue} ></input>
            <br/>
            {this.state.widgetOpen === true ? widget1() : null }
</form>
</div>
    )
    }
}

export default PhoneInput