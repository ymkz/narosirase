import * as React from 'react'
import { Slider, StyleSheet, Switch, Text, View } from 'react-native'
import Separator from 'src/components/setting/Separator'
import { color } from 'src/constants'
import { settingActions, SettingState } from 'src/modules/setting'

interface Props {
  setting: SettingState
  changeFontSize: typeof settingActions.changeFontSize
  changeLineHeight: typeof settingActions.changeLineHeight
  changeExpandWord: typeof settingActions.changeExpandWord
}

class Config extends React.PureComponent<Props> {
  handleChangeFontSize = (value: number) => {
    console.log(value)
    this.props.changeFontSize(value)
  }

  render() {
    const {
      setting,
      changeFontSize,
      changeLineHeight,
      changeExpandWord
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <Text style={styles.label}>本文のフォントサイズ</Text>
          <Slider
            value={setting.fontSize}
            minimumValue={10}
            maximumValue={18}
            step={1}
            style={styles.slider}
            onValueChange={changeFontSize}
          />
          <Text style={styles.value}>{setting.fontSize}pt</Text>
        </View>
        <Separator />
        <View style={styles.sliderContainer}>
          <Text style={styles.label}>本文の行間の高さ</Text>
          <Slider
            value={setting.lineHeight}
            minimumValue={16}
            maximumValue={24}
            step={1}
            style={styles.slider}
            onValueChange={changeLineHeight}
          />
          <Text style={styles.value}>{setting.lineHeight}pt</Text>
        </View>
        <Separator />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>"まえがき"と"あとがき"を展開する</Text>
          <Switch value={setting.expandWord} onValueChange={changeExpandWord} />
        </View>
      </View>
    )
  }
}

export default Config

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.darkGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  label: {
    color: color.black,
    marginRight: 16
  },
  slider: {
    flex: 1
  },
  value: {
    color: color.black,
    marginLeft: 16
  }
})
