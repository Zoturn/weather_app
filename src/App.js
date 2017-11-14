import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('WeatherStore')
@observer

class App extends Component {
  hendleSubmit = (e) => {
    e.preventDefault();
    const city = this.city.value;
    this.props.WeatherStore.AddCity(city);
    this.city.value = '';

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
          <input type="text" placeholder="Enter city" ref={input => this.city = input}/>
          <button>Add City</button>
        </form>

        <table>
          <tbody>
          {WeatherStore.currentCity.map(city => (
            <tr key={city.city}>
              <td>
                <div id={city}>
                  {city.city + ' - ' + city.weather}
                  <input className={city.city} type={'submit'} value={'delete'} onClick={this.deleteCity}/>
                </div>
              </td>
            </tr>
          ))}
          {localStorage.setItem("city", JSON.stringify(WeatherStore.city))}
          {WeatherStore.city.map(city => (
            <tr key={city.city}>
              <td>
                <div id={city}>
                  {city.city + ' - ' + city.weather}
                  <input className={city.city} type={'submit'} value={'delete'} onClick={this.deleteCity}/>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

      </div>
    );
  }
}


export default App;


