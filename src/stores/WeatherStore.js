import {observable, action} from 'mobx';


class WeatherStore {
  @observable city = [];
  @observable weather = [];
  @observable current_city = [];
  @observable current_weather = [];

  @action AddCity = (city) => {
    let weather
    let wether_elem = []
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a96ef5cb83edc2065f75c5e6e13c79e8')
      .then(response => response.json())
      .then(result => {
        weather = result.main

        if (weather === undefined) {
          alert('there is no such city')
        } else if (this.city.indexOf(city) !== undefined) {
          for (var key in weather) {
            const now = (key + " " + weather[key])
            wether_elem.push(now)
          }
          this.weather.push(wether_elem)
          this.city.push(city);
        }
      })
      .catch(error => console.log(error))

  }

  @action deleteCity() {

  }

  @action
  current() {

    fetch('http://api.openweathermap.org/data/2.5/weather?lat=50.493780099999995&lon=30.6006126&APPID=a96ef5cb83edc2065f75c5e6e13c79e8')
      .then(response => response.json())
      .then(result => {
        let weather = result.main
        for (var key in weather) {
          const now = (key + " " + weather[key])
          this.current_weather.push(now)
        }
        let naming = result.name
        this.current_city.push(naming);
      })
      .catch(error => console.log(error))
  }

}

const store = new WeatherStore();
export default store;