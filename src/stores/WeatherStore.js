import {observable, action, computed} from 'mobx';

let storageCity
if (localStorage.getItem("city") === null){
  storageCity = []
}else {storageCity = JSON.parse(localStorage.getItem("city"))}

class WeatherStore {
  @observable city = storageCity;
  @observable currentCity = [];

  @action AddCity = (city) => {
    let cityAndWeather = {}
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a96ef5cb83edc2065f75c5e6e13c79e8')
      .then(response => {
        return response.json()
      })
      .then(result => {
        if (city !== "") {
          let weather = result.main
          let now
          for (let key in weather) {
            now = now + " " + key + " " + weather[key] + ";"
            cityAndWeather.weather = now
          }
          cityAndWeather.city = city
          this.city.push(cityAndWeather)
        }
      })
      .catch(error => console.log(error))
  }

  @action deleteCity = (Name) => {
    this.city = (this.city).filter(el => el.city === Name ? false : true)
    this.currentCity = (this.currentCity).filter(el => el.city === Name ? false : true)
  }

  @action current() {
    let lat
    let lon
    navigator.geolocation.getCurrentPosition(async function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      await getWeather(lat, lon)
    });

    const thisCity = this.currentCity

    function getWeather(lat, lon) {
      let cityAndWeather = {}
      fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=a96ef5cb83edc2065f75c5e6e13c79e8')
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