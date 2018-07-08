import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { color } from 'src/constants'
import { SettingState } from 'src/modules/setting'

interface Props {
  body: string
  setting: SettingState
}

class ContentBody extends React.PureComponent<Props> {
  render() {
    const { body, setting } = this.props
    return (
      <Text
        style={[
          styles.text,
          { fontSize: setting.fontSize },
          { lineHeight: setting.lineHeight }
        ]}
      >
        {body}
      </Text>
    )
  }
}

export default ContentBody

const styles = StyleSheet.create({
  text: {
    color: color.black
  }
})
