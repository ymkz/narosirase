import React from 'react'
import RootSiblings from 'react-native-root-siblings'
import Snackbar from './Snackbar'

class Manager {
  constructor() {
    this.current = null
    this.queue = []
  }

  show = (message, options) => {
    const props = { message, dismiss: this.dismiss, ...options }

    if (this.current) {
      this.queue.push(props)
      return
    }

    this.setCurrent(props)
  }

  dismiss = () => {
    this.removeCurrent(() => {
      if (!this.queue.length) {
        return
      }

      const current = this.queue.shift()
      this.setCurrent(current)
    })
  }

  setCurrent = props => {
    const current = new RootSiblings(<Snackbar {...props} />)
    this.current = current
  }

  removeCurrent = callback => {
    this.current.destroy(() => {
      this.current = null
      callback()
    })
  }
}

export default new Manager()
