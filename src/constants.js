import { Dimensions } from 'react-native'
import { Constants } from 'expo'

export const colors = {
  transparent: 'transparent',
  snowWhite: '#fefeff',
  darkBlack: '#22222a',
  lightBlack: '#454556',
  ghostGray: '#eceff1',
  tranquilBlue: '#37474f',
  materialBlue: '#0091ea',
  dangerRed: '#f44336'
}

export const constraints = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
  statusBarHeight: Constants.statusBarHeight
}
