import { Logger } from './Logger.js'

const loginURL = 'http://localhost:5000/authenticate'
const validateTokenURL = 'http://localhost:5000/token/validate'

let logger = new Logger()
logger.write('Init the logger...')

let token = ''

let login = async (url, email, password) => {
  logger.write('user try to login....')
  logger.line()

  try {
    let response = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })

    logger.write('HTTP status: ' + response.status)
    let result = await response.json()
    logger.write('Issuer: ' + result.issuer)
    logger.write('System message: ' + result.message)
    if (response.ok) {
      logger.write('UserID: ' + result.user_id)
      token = result.token
      logger.write('Token: ' + result.token)
    }

    if (result.event_log) {
      logger.write('Event log: ...................')
      result.event_log.forEach(element => {
        logger.write(element)
      })
      logger.write('....................')
    }

    logger.line()
  } catch (error) {
    console.log(error)
  }
}

let validateToken = async (url, token) => {
  logger.write('Starting to validate the token')
  logger.line()
  logger.write('Trying to validate: ' + token)

  try {
    let response = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': token
      }
    })
    // console.log(response)
    logger.write('HTTP status: ' + response.status)
    let result = await response.json()
    logger.write('Issuer: ' + result.issuer)
    logger.write('System message: ' + result.message)
    if (response.ok) {
      logger.write('UserID: ' + result.user_id)
      token = result.user_id
    }

    if (result.event_log) {
      logger.write('Event log: ...................')
      result.event_log.forEach(element => {
        logger.write(element)
      })
      logger.write('....................')
    }

    logger.line()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

let loginButton = document.querySelector('#login_button')
loginButton.addEventListener('click', (event) => {
  let email = document.querySelector('input[name="email"]').value
  let password = document.querySelector('input[name="password"]').value

  login(loginURL, email, password)
})

let validateTokenButton = document.querySelector('#token_button')
validateTokenButton.addEventListener('click', (event) => {
  validateToken(validateTokenURL, token)
})

let clearButton = document.querySelector('#clear_button')
clearButton.addEventListener('click', (event) => {
  logger.clear()
})
