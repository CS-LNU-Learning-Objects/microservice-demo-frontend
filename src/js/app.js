const loginURL = 'http://localhost:5000/authenticate'

let login = async (url, email, password) => {
  let result
  try {
    result = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })

    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

let button = document.querySelector('#login_button')

button.addEventListener('click', (event) => {
  let email = document.querySelector('input[name="email"]').value
  let password = document.querySelector('input[name="password"]').value

  login(loginURL, email, password)
})
