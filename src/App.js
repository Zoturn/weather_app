import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('WeatherStore')
@observer

class App extends Component {
  hendleSubmit = (e) => {
    e.preventDefault();
    let city = this.city.value;
    this.props.WeatherStore.AddCity(city);
    this.city.value = '';
  }

  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  componentDidMount() {
    this.props.WeatherStore.current()
  }

  deleteCity = e => {
    e.preventDefault();
    const className = e.target.className
    this.props.WeatherStore.deleteCity(className)
  }

  render() {
    const {WeatherStore} = this.props;

    return (
      <div className="App">
        <h2>Weather in the City. You have {WeatherStore.weatherCount}</h2>

        <form onSubmit={e => this.hendleSubmit(e)}>
          <input id="cityInput" type="text" placeholder="Enter city" ref={input => this.city = input}/>
          <button>Add City</button>
        </form>

        <table>
          <tbody>
          <tr>
            <th>city</th>
            <th>weather</th>
          </tr>
          {WeatherStore.currentCity.map(city => (
            <tr id={city.city} key={city.city}>
              <td>
                {city.city}
              </td>
              <td>
                {city.weather}
              </td>
              <td><input className={city.city} type={'submit'} value={'delete'} onClick={this.deleteCity}/></td>
            </tr>
          ))}
          {localStorage.setItem("city", JSON.stringify(WeatherStore.city))}
          {WeatherStore.city.map(city => (
            <tr id={city.city} key={city.city}>
              <td>
                {city.city}
              </td>
              <td>
                {city.weather}
              </td>
              < td>< input className={city.city} type={'submit'} value={'delete'} onClick={this.deleteCity}/></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}


export default App;


