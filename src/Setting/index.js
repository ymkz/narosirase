import React from 'react'
import { StyleSheet, View, ScrollView, Button, Text } from 'react-native'
import { iOSColors } from 'react-native-typography'
import { connect } from 'react-redux'
import { novelPurge } from '../Novel/modules'
import Header from './Header'

const SettingContainer = ({ navigation, dispatch }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <ScrollView style={styles.scroll}>
      <Button title="novelPurge" onPress={() => dispatch(novelPurge())} />
      <Text>default expand prologue and epilogue</Text>
      <Text>default novel backgroundColor</Text>
      <Text>default novel font size</Text>
      <Text>
        Additionのジェスチャーはスタート位置の判定と距離で判定いれるべき
      </Text>
      <Text>add重複排他制御</Text>
      <Text>設定redux</Text>
    </ScrollView>
  </View>
)

export default connect()(SettingContainer)

const styles = StyleSheet.create({
  container: {
    backgroundColor: iOSColors.customGray,
    flex: 1
  },
  scroll: {
    backgroundColor: iOSColors.customGray,
    flex: 1,
    paddingHorizontal: 8
  }
})
