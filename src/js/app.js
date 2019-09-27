import { Logger } from './Logger.js'

const BASE_URL = 'http://localhost:5000'

let logger = new Logger()
logger.write('Init the logger...')

try {
  let nodeButton = document.querySelector('#nodeBtn')
  nodeButton.addEventListener('click', async (event) => {
    logger.write('Node button called...calling API gateway...')
    try {
      const response = await fetch(BASE_URL + '/node')
      const myJson = await response.json()
      logger.write(myJson.message)
    } catch (error) {
      logger.write(error)
    }
  })

  let goButton = document.querySelector('#goBtn')
  goButton.addEventListener('click', async (event) => {
    logger.write('Go button called...calling API gateway...')
    try {
      const response = await fetch(BASE_URL + '/go')
      const myJson = await response.json()
      logger.write(myJson[0].message)
    } catch (error) {
      logger.write(error)
    }
  })

  let flaskButton = document.querySelector('#flaskBtn')
  flaskButton.addEventListener('click', async (event) => {
    logger.write('Flask button called...calling API gateway...')
    try {
      const response = await fetch(BASE_URL + '/flask')
      const myJson = await response.json()
      logger.write(myJson.message)
    } catch (error) {
      logger.write(error)
    }
  })
} catch (error) {
  logger.write(error)
}
