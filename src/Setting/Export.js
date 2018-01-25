import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Share } from 'react-native'
import {
  human,
  systemWeights,
  iOSColors,
  materialColors
} from 'react-native-typography'
import { connect } from 'react-redux'
import { alertDelay } from '../constants'
import { sleep } from '../functions'
import { alertShow, alertHide } from '../Alert/modules'

const errorHandler = async (dispatch, message = 'Error happened') => {
  dispatch(alertShow(message))
  await sleep(alertDelay)
  dispatch(alertHide())
}

const handleExport = async (dispatch, novel) => {
  const shared = await Share.share({
    title: 'narosirase-export',
    message: JSON.stringify(novel)
  }).catch(() => errorHandler(dispatch, 'エクスポート時にエラーが発生しました'))
  if (shared.action === 'sharedAction') {
    dispatch(alertShow('小説データをエクスポートしました'))
    await sleep(alertDelay)
    dispatch(alertHide())
  }
}

const ExportComponent = ({ dispatch, novel }) => (
  <View style={styles.container}>
    <View style={styles.description}>
      <Text style={[human.footnote, styles.message]}>
        小説データをエクスポートします
      </Text>
      <Text style={[human.footnote, styles.message]}>
        Dropboxに保存を選択してください
      </Text>
    </View>
    <TouchableOpacity onPress={() => handleExport(dispatch, novel)}>
      <View style={styles.button}>
        <Text style={[human.footnote, systemWeights.semibold, styles.text]}>
          export
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default connect(({ novel }) => ({ novel }))(ExportComponent)

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
  description: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    color: materialColors.blackPrimary
  },
  button: {
    alignItems: 'center',
    backgroundColor: iOSColors.lightGray,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  text: {
    color: materialColors.blackPrimary
  }
})
