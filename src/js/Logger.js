export class Logger {
  constructor () {
    this.textArea = document.querySelector('#textarea_logger')
    this.textArea.value = ''
  }

  write (message) {
    this.textArea.value += message + '\n'
  }

  line () {
    this.textArea.value += '###########################\n'
  }

  clear () {
    this.textArea.value = ''
  }
}
