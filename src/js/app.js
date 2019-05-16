import { Logger } from './Logger.js'

const loginURL = 'http://localhost:5000/authenticate'
let logger = new Logger()
logger.write('Init the logger...')

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
    console.log(response)
    logger.write('HTTP status: ' + response.status)
    let result = await response.json()
    logger.write('Issuer: ' + result.issuer)
    logger.write('System message: ' + result.message)
    if (response.ok) {
      logger.write('UserID: ' + result.user_id)
    }

    if (result.event_log) {
      logger.write('Event log: ...................\n')
      result.event_log.forEach(element => {
        logger.write(element + '\n')
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

let clearButton = document.querySelector('#clear_button')
clearButton.addEventListener('click', (event) => {
  logger.clear()
})
