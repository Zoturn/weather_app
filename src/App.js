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
  handleSubmit = (e) => {
    e.preventDefault();
    const class_name = this.class

    this.props.WeatherStore.deleteCity(class_name.className)
  }

  componentDidMount() {
    this.props.WeatherStore.current()
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

        <ul>
          {WeatherStore.current_city.map(city => (
            <li key={city}>
              {city}
              <ul>
                {WeatherStore.current_weather.map(weather => (
                  <li key={weather.toString()}>
                    {weather}
                  </li>
                ))}
              </ul>
              <form onSubmit={e => this.handleSubmit(e)}>
                <input className={city} type={'submit'} value={'delete'} ref={submit => this.class = submit}/>
              </form>
            </li>
          ))}
        </ul>
        <table>
          <tbody>
          <tr>
            <td>
              {WeatherStore.city.map(city => (
                <div id={city}>
                  {city}
                </div>
              ))}
            </td>
            <td>
              {WeatherStore.weather.map(weather => (
                <div id={weather}>
                  {weather + '  '}
                </div>

              ))}
            </td>
            <td>
              {WeatherStore.city.map(city => (
                <form id={city + 1} onSubmit={e => this.handleSubmit(e)}>
                  <input className={city} type={'submit'} value={'delete'} ref={submit => this.class = submit}/>
                </form>
              ))}
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    );
  }
}


export default App;
