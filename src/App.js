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
    this.props.WeatherStore.deleteCity();
  }
  componentWillMount(){
    this.props.WeatherStore.current();
  }
  render() {
    const {WeatherStore} = this.props;

    return (
      <div className="App" >
        <h2>Weather in the City.</h2>

        <form onSubmit={e => this.hendleSubmit(e)}>
          <input type="text" placeholder="Enter city" ref={input => this.city = input}/>
          <button>Add birds</button>
        </form>

        <ul>
          {WeatherStore.current_city.map(city => (
            <li id={city}>
              {city}
              <ul>
                {WeatherStore.current_weather.map(weather => (
                  <li id={weather}>
                    {weather}
                  </li>
                ))}
              </ul>
              <form onSubmit={e => this.handleSubmit(e)}>
                <input className={city} type={'submit'} value={'delete'} ref={submit => this.class = submit}/>
              </form>
            </li>
          ))}
          {WeatherStore.city.map(city => (
            <li id={city}>
              {city}
              <ul>
                {WeatherStore.weather.map(weather => (
                  <li id={weather}>
                    {WeatherStore.weather[(WeatherStore.weather).length-1]}
                  </li>
                ))}
              </ul>
              <form onSubmit={e => this.handleSubmit(e)}>
                <input className={city} type={'submit'} value={'delete'} ref={submit => this.class = submit}/>
              </form>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}


export default App;
