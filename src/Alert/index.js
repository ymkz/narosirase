import React from 'react'
import { iOSColors, materialColors } from 'react-native-typography'
import StatusBarAlert from 'react-native-statusbar-alert'
import { connect } from 'react-redux'

const Alert = ({ alert }) => (
  <StatusBarAlert
    visible={alert.visible}
    message={alert.message}
    backgroundColor={iOSColors.blue}
    color={materialColors.whitePrimary}
  />
)

export default connect(({ alert }) => ({ alert }))(Alert)
