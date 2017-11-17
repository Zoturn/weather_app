import {observable, action, computed} from 'mobx';

let storageCity
if (localStorage.getItem("city") === null) {
  storageCity = []
} else {
  storageCity = JSON.parse(localStorage.getItem("city"))
}

class WeatherStore {
  @observable city = storageCity;
  @observable currentCity = [];

  @action AddCity = (city) => {

    let cityAndWeather = {}

    function capitalize(city) {
      return city.charAt(0).toUpperCase() + city.slice(1);
    }

    city = capitalize(city)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a96ef5cb83edc2065f75c5e6e13c79e8`)
      .then(response => {
        return response.json()
      })
      .then(result => {
        const filteredCity = (this.city).filter(el => el.city === city ? false : true)
        if (city !== "" && result.main !== undefined && filteredCity.length === this.city.length) {
          let weather = result.main
          let now
          for (let key in weather) {
            now = now + " " + key + " " + weather[key] + ";"
            cityAndWeather.weather = now
          }
          cityAndWeather.city = city
          this.city.push(cityAndWeather)
        } else if (filteredCity.length !== this.city.length) {
          alert('This city already added')
        } else {
          alert('There is no such city')
        }
      })
      .catch(error => console.log(error))
  }

  @action deleteCity = (Name) => {
    this.city = (this.city).filter(el => el.city === Name ? false : true)
    this.currentCity = (this.currentCity).filter(el => el.city === Name ? false : true)
  }

  @action
  current() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon)
    });

    const thisCity = this.currentCity

    function getWeather(lat, lon) {
      let cityAndWeather = {}
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=a96ef5cb83edc2065f75c5e6e13c79e8`)
        .then(response => response.json())
        .then(result => {
          let weather = result.main
          let now

          for (let key in weather) {
            now = now + " " + key + " " + weather[key] + ";"
            cityAndWeather.weather = now
          }
          cityAndWeather.city = result.name
          thisCity.push(cityAndWeather)
        })
        .catch(error => console.log(error))
    }

  }

  @computed
  get weatherCount() {
    return this.city.length;
  }
}

const store = new WeatherStore();
export default store;