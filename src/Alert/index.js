import React from 'react'
import { materialColors } from 'react-native-typography'
import StatusBarAlert from 'react-native-statusbar-alert'
import { connect } from 'react-redux'

const Alert = ({ alert }) => (
  <StatusBarAlert
    visible={alert.visible}
    message={alert.message}
    backgroundColor={materialColors.blackPrimary}
    color={materialColors.whitePrimary}
  />
)

export default connect(({ alert }) => ({ alert }))(Alert)
