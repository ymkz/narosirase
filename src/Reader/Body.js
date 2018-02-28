import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { materialColors } from 'react-native-typography'

const BodyComponent = ({ body, setting }) => (
  <Text style={[styles.text, { fontSize: setting.fontSize }, { lineHeight: setting.lineHeight }]}>
    {body}
  </Text>
)

export default BodyComponent

const styles = StyleSheet.create({
  text: {
    color: materialColors.blackPrimary
  }
})

// import React from 'react'
// import styled from 'styled-components'

// const BodyComponent = ({ body, setting }) => (
//   <Body fontSize={setting.fontSize} lineHeight={setting.lineHeight}>
//     {body}
//   </Body>
// )

// export default BodyComponent

// const Body = styled.Text`
//   color: rgba(0, 0, 0, 0.87);
//   font-size: ${props => props.fontSize};
//   line-height: ${props => props.lineHeight};
// `
