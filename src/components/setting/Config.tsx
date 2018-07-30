import * as React from 'react'
import { Slider, StyleSheet, Switch, Text, View } from 'react-native'
import Separator from 'src/components/Setting/Separator'
import { color } from 'src/constants'
import { NovelsAction } from 'src/modules/novels'
import { SettingAction, SettingState } from 'src/modules/setting'

interface Props {
  setting: SettingState
  action: NovelsAction & SettingAction
}

const Config: React.SFC<Props> = ({ setting, action }) => (
  <View style={styles.container}>
    <View style={styles.sliderContainer}>
      <Text style={styles.label}>本文のフォントサイズ</Text>
      <Slider
        value={setting.fontSize}
        minimumValue={10}
        maximumValue={18}
        step={1}
        style={styles.slider}
        onValueChange={action.changeFontSize}
      />
      <Text style={styles.value}>
        {setting.fontSize}
        pt
      </Text>
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
        onValueChange={action.changeLineHeight}
      />
      <Text style={styles.value}>
        {setting.lineHeight}
        pt
      </Text>
    </View>
    <Separator />
    <View style={styles.switchContainer}>
      <Text style={styles.label}>"まえがき"と"あとがき"を展開する</Text>
      <Switch value={setting.expandWord} onValueChange={action.changeExpandWord} />
    </View>
    <Separator />
    <View style={styles.switchContainer}>
      <Text style={styles.label}>ステータスバーを表示する</Text>
      <Switch value={setting.hideStatusbar} onValueChange={action.changeHideStatusbar} />
    </View>
    <Separator />
    <View style={styles.switchContainer}>
      <Text style={styles.label}>小説を追加後に追加画面を閉じる</Text>
      <Switch value={setting.backOnAdd} onValueChange={action.changeBackOnAdd} />
    </View>
  </View>
)

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
