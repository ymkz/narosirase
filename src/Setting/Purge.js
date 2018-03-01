import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { human, systemWeights, iOSColors, materialColors } from 'react-native-typography'
import { novelPurge } from '../Novel/modules'
import Snackbar from '../Snackbar'

const handlePurge = dispatch => {
  Alert.alert('小説データの初期化', 'この操作は取り消せません', [
    { text: 'キャンセル', style: 'cancel', onPress: () => {} },
    {
      text: '初期化',
      style: 'destructive',
      onPress: async () => {
        dispatch(novelPurge())
        Snackbar.show('データを初期化しました')
      }
    }
  ])
}

const PurgeComponent = ({ dispatch }) => (
  <View style={styles.container}>
    <View style={styles.description}>
      <Text style={[human.footnote, styles.message]}>すべての小説データの初期化を行います</Text>
      <Text style={[human.footnote, styles.message]}>この操作は取り消しできません</Text>
    </View>
    <TouchableOpacity onPress={() => handlePurge(dispatch)}>
      <View style={styles.button}>
        <Text style={[human.footnote, systemWeights.semibold, styles.text]}>purge</Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default PurgeComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderBottomColor: iOSColors.red,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: iOSColors.red,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 16
  },
  description: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    color: materialColors.blackPrimary
  },
  button: {
    alignItems: 'center',
    backgroundColor: iOSColors.red,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  text: {
    color: materialColors.whitePrimary
  }
})
