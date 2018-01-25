import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { iOSColors, materialColors } from 'react-native-typography'
import { patchDelay } from '../constants'

const AboutComponent = () => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{
        uri: 'https://png.icons8.com/color/96/000000/blockchain-new-logo.png'
      }}
    />
    <View style={styles.information}>
      <Text style={styles.message}>
        このアプリは小説家になろうの小説更新を追跡するためのアプリです。
        APIサーバーへの負荷低減のため、小説情報の更新を行う際に{patchDelay}ミリ秒/小説
        の遅延を設定しています。
      </Text>
    </View>
  </View>
)

export default AboutComponent

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
  avatar: {
    borderRadius: 8,
    height: 48,
    width: 48
  },
  information: {
    flex: 1,
    paddingLeft: 16
  },
  message: {
    color: materialColors.blackPrimary
  }
})
