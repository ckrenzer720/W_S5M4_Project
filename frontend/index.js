async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  // #### 👉 TASK 1 - Hide the div#weatherWidget
document.querySelector("#weatherWidget").style.display = "none";

  // #### 👉 TASK 2 - Add an event listener to the dropdown
  document.querySelector("#citySelect").addEventListener('change', async evt => {
  // #### 👉 TASK 3 - Prepare to fetch the weather data
  try {
    evt.target.setAttribute("disabled", "disabled")
    document.querySelector("#weatherWidget").style.display = "none";
    const pInfo = document.querySelector(".info");
    pInfo.textContent = "Fetching weather data..."
  // #### 👉 TASK 4 - Launch a request to the weather API
    const currentCity = evt.target.value;
    const url = `http://localhost:3003/api/weather?city=${currentCity}`
    const res = await axios.get(url)
    console.log(res.data)
  // #### 👉 TASK 5 - Handle data fetching success
document.querySelector("#weatherWidget").style.display = 'block';
document.querySelector(".info").textContent = " "
evt.target.removeAttribute("disabled") 

const { data } = res

document.querySelector("#apparentTemp div:nth-child(2)")
    .textContent = `${data.current.apparent_temperature}°`
document.querySelector("#todayDescription")
    .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1]
document.querySelector("#todayStats div:nth-child(1)")
    .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
document.querySelector("#todayStats div:nth-child(2)")
    .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
document.querySelector("#todayStats div:nth-child(3)")
    .textContent = `Humidity: ${data.current.humidity}%`
document.querySelector("#todayStats div:nth-child(4)")
    .textContent = `Wind: ${data.current.wind_speed}m/s`

    data.forecast.daily.forEach((day, idx) => {
      let card = document.querySelectorAll('.next-day')[idx]
      let weekDay = card.children[0]
      let apparent = card.children[1]
      let minMax = card.children[2]
      let precipitation = card.children[3]

      weekDay.textContent = getWeekDay(day.date)
      apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
      minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
      precipitation.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
    })
    document.querySelector("#location").firstElementChild.textContent = data.location.city
  } catch (err) {
    console.log(err.message + "; Sorry, ¯\\_(ツ)_/¯")
  }
})

function getWeekDay(dates) {
  const [year, month, day] = dates.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeekNumber = date.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayOfWeekNumber];
}
getWeekDay()

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
