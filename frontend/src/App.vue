<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input type="text"
        name=""
        id=""
        class="search-bar"
        placeholder="Enter the location" 
        v-model="query"
        @keypress="fetchWeather"
        />
    <ul>
      <li v-for="(result, i) in searchResults" :key="i">
        {{ result }} // list of all places
      </li>

    </ul>

      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{weather.name}}, {{weather.sys.country}} </div>
          <div class="date">{{dateBuilder()}}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{Math.round(weather.main.temp)}} °C</div>
          <div class="weather">{{ weather.weather[0].main }} </div>
       </div>
      </div>

      </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      searchResults: [],
      service: null,

      api_key: '3837d029e6997b3a23f83cbb5aacd161',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query:'',
      weather: {}
    }
  }, 
 
  methods: {
    fetchWeather (e) {
      if (e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResults);
      }
    },
    setResults (results) {
      this.weather = results;
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
    
  },
 
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  background-image: url('./assets/cold.jpg');
   background-size: cover;
  background-position: center;
  transition: 0.4s;
}
#app.warm {
  background-image: url('./assets/warm.jpg');
}

main{
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
}
.search-box, .search-bar{
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: 0px transparent solid ;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.5);
  border-radius: 10px;
  transition: 0.45;
}

.search-box, .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.75);
  border: 1px transparent solid;
  border-radius: 16px;
}

.weather-wrap{
  display: block;
  align-items: center;
  text-align: center;
}

.location-box, .location{
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0,0,0,0.25);
}

.location-box, .date{
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}

.weather-box {
  text-align: center;

}

.weather-box, .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(255,255,255,0.25);
}

.weather-box .weather{
  color: #FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0,0,0,0.25);
}
</style>
