require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const fs = require('fs')
const promisify = require('util').promisify
const path = require('path')
const cors = require('cors')

const readDir = promisify(fs.readdir)

const app = express()
const { WEATHER_KEY, PORT } = process.env
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(req.method, req.path, req.hostname)
  next()
})

console.log(process.env)

app.use('/', express.static(path.resolve('./build')))

const getWeatherData = async (url, city, key) => {
  const weatherAPIUrl = `${url}?q=${city}&units=metric&appid=${key}`
  return await axios(weatherAPIUrl)
    .then(res => res.data)
    .catch(console.error)
}

app.get('/weather/:city', async (req, res) => {
  const {city} = req.params
  const weatherData = await getWeatherData(WEATHER_API_URL, city, WEATHER_KEY)
  res.json(weatherData)
})


app.get('/background-image/:city', async (req, res) => {
  const {city} = req.params

  const weatherData = await getWeatherData(WEATHER_API_URL, city, WEATHER_KEY)

  const weatherIdGroup = Math.floor(weatherData.weather[0].id / 100)
  let weatherCondition

  switch(weatherIdGroup) {
    case 2:
      weatherCondition = 'stormy' 
      break
    case 3:
    case 5:
      weatherCondition = 'rainy' 
      break
    case 6:
      weatherCondition = 'snowy' 
      break
    case 7:
    case 8:
    default:
      weatherCondition = 'sunny'
  }

  const imagePath = path.join(__dirname, 'assets/img')
  const images = await readDir(imagePath)

  const regex = new RegExp(weatherCondition, 'g')
  const filteredImages = images.filter(i => i.match(regex))

  const rndImage = filteredImages[Math.floor(Math.random() * filteredImages.length)]

  const imageFilePath = path.join(imagePath, rndImage)
  
  res.sendFile(imageFilePath)
})


app.listen(PORT, () => console.log(`App is listening to port ${PORT}`))