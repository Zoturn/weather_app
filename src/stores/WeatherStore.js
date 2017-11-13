import {observable, action, computed} from 'mobx';


class WeatherStore {
  @observable city = [];
  @observable weather = [];
  @observable current_city = [];
  @observable current_weather = [];

  @action AddCity = (city) => {
    let weather
    let wether_elem = []
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a96ef5cb83edc2065f75c5e6e13c79e8')
      .then(response => {
        return response.json()
      })
      .then(result => {
        weather = result.main

        console.log(this.city.indexOf(city))
        if (this.city.indexOf(city) !== undefined) {
          for (let key in weather) {
            const now = (" " + key + " " + weather[key])
            wether_elem.push(now)
          }
          this.weather.push(wether_elem)
          this.city.push(city + ' -');
        }
      })
      .catch(error => console.log(error))

  }

  @action deleteCity = (Name) => {
    let cityIndex = this.city.indexOf(Name)
    let currentCityIndex = this.current_city.indexOf(Name)

    if (cityIndex !== -1) {
      this.city.splice(this.city.indexOf(Name), 1);
      this.weather.splice(this.weather.indexOf(Name), 1);
    }else if (currentCityIndex === 0) {
      this.current_city.splice(this.current_city.indexOf(Name), 1);
    }
  }

  @action
  current() {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=50.4501&lon=30.5234&APPID=a96ef5cb83edc2065f75c5e6e13c79e8')
      .then(response => response.json())
      .then(result => {
        let weather = result.main
        for (let key in weather) {
          const now = (key + " " + weather[key])
          this.current_weather.push(now)
        }
        let naming = result.name
        this.current_city.push(naming);
      })
      .catch(error => console.log(error))
  }

  @computed
  get weatherCount() {
    return this.weather.length;
  }

}

const store = new WeatherStore();
export default store;