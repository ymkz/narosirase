import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {
  systemWeights,
  iOSColors,
  materialColors
} from 'react-native-typography'
import { ActionSheet } from 'react-native-cell-components'
import Switch from 'react-native-switch-pro'
import { Entypo } from '@expo/vector-icons'
import { fontSizeRange, lineHeightRange } from '../constants'
import {
  changeFontSize,
  changeLineHeight,
  changeExpandComment
} from './modules'
import ConfigItem from './ConfigItem'

class ConfigComponent extends React.PureComponent {
  handleFontSizeChange = size => {
    this.props.dispatch(changeFontSize(size))
    this.fontSizeActionSheet.close()
  }

  handlelineHeightChange = size => {
    this.props.dispatch(changeLineHeight(size))
    this.lineHeightActionSheet.close()
  }

  handleExpandCommentChange = value => {
    this.props.dispatch(changeExpandComment(value))
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.fontSizeActionSheet.open()}>
          <View style={styles.item}>
            <Text style={styles.description}>本文のフォントサイズ</Text>
            <View style={styles.information}>
              <Text style={[systemWeights.semibold, styles.text]}>
                {this.props.setting.fontSize} pt
              </Text>
              <Entypo
                name="chevron-thin-right"
                size={16}
                color={materialColors.blackTertiary}
                style={styles.icon}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.lineHeightActionSheet.open()}>
          <View style={styles.item}>
            <Text style={styles.description}>本文の行間の高さ</Text>
            <View style={styles.information}>
              <Text style={[systemWeights.semibold, styles.text]}>
                {this.props.setting.lineHeight} pt
              </Text>
              <Entypo
                name="chevron-thin-right"
                size={16}
                color={materialColors.blackTertiary}
                style={styles.icon}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.lastItem}>
          <Text style={styles.description}>
            「まえがき」と「あとがき」を展開する
          </Text>
          <View style={styles.information}>
            <Switch
              value={this.props.setting.expandComment}
              onSyncPress={this.handleExpandCommentChange}
            />
          </View>
        </View>
        <ActionSheet ref={ref => (this.fontSizeActionSheet = ref)}>
          {fontSizeRange.map(size => (
            <ConfigItem
              key={`font-size-config-row-${size}`}
              size={size}
              name="format-size"
              current={this.props.setting.fontSize === size}
              handler={() => this.handleFontSizeChange(size)}
            />
          ))}
        </ActionSheet>
        <ActionSheet ref={ref => (this.lineHeightActionSheet = ref)}>
          {lineHeightRange.map(size => (
            <ConfigItem
              key={`line-height-config-row-${size}`}
              size={size}
              name="format-line-spacing"
              current={this.props.setting.lineHeight === size}
              handler={() => this.handlelineHeightChange(size)}
            />
          ))}
        </ActionSheet>
      </View>
    )
  }
}

export default ConfigComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: iOSColors.white,
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: iOSColors.midGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: 8
  },
  item: {
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    padding: 16
  },
  lastItem: {
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    flexDirection: 'row',
    padding: 16
  },
  description: {
    color: materialColors.blackPrimary,
    flex: 1
  },
  information: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16
  },
  text: {
    color: materialColors.blackPrimary
  },
  icon: {
    marginTop: 2
  }
})
