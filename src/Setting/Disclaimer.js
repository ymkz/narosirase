import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, systemWeights, iOSColors, materialColors } from 'react-native-typography'

const DisclaimerComponent = () => (
  <View style={styles.container}>
    <Text style={styles.message}>
      <Text style={[human.callout, systemWeights.bold, styles.strong]}>Disclaimer{'  '}</Text>
      「小説家になろう」は株式会社ヒナプロジェクトの登録商標であり、本アプリケーションは株式会社ヒナプロジェクトが提供するものではありません。
    </Text>
  </View>
)

export default DisclaimerComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: iOSColors.midGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 16
  },
  strong: {
    color: materialColors.blackPrimary
  },
  message: {
    color: materialColors.blackPrimary
  }
})
