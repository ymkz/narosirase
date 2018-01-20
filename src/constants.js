import { Dimensions } from 'react-native'
import { Constants } from 'expo'

export const constraints = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
  statusBarHeight: Constants.statusBarHeight,
  alertHeight: Constants.statusBarHeight * 2,
  headerHeight: 96,
  searchHeight: 36,
  separatorHeight: 48,
  separatorpadding: 24,
  scrollOffset: 96
}
