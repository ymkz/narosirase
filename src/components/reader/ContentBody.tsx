import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { color } from 'src/constants'
import { SettingState } from 'src/modules/setting'

interface Props {
  body: string
  setting: SettingState
}

const ContentBody: React.SFC<Props> = ({ body, setting }) => (
  <Text style={[styles.text, { fontSize: setting.fontSize }, { lineHeight: setting.lineHeight }]}>
    {body}
  </Text>
)

export default ContentBody

const styles = StyleSheet.create({
  text: {
    color: color.black
  }
})
