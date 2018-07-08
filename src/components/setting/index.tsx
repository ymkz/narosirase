import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import About from 'src/components/setting/About'
import Config from 'src/components/setting/Config'
import Developer from 'src/components/setting/Developer'
import Disclaimer from 'src/components/setting/Disclaimer'
import Export from 'src/components/setting/Export'
import Header from 'src/components/setting/Header'
import Import from 'src/components/setting/Import'
import Purge from 'src/components/setting/Purge'
import { color } from 'src/constants/'
import { connector, RootAction, RootState } from 'src/modules'
import { novelActions, NovelState } from 'src/modules/novels'
import { settingActions, SettingState } from 'src/modules/setting'

interface Props {
  novels: NovelState[]
  setting: SettingState
  novelHydrate: typeof novelActions.novelHydrate
  novelPurge: typeof novelActions.novelPurge
  changeFontSize: typeof settingActions.changeFontSize
  changeLineHeight: typeof settingActions.changeLineHeight
  changeExpandWord: typeof settingActions.changeExpandWord
}

class Setting extends React.PureComponent<Props> {
  render() {
    const {
      novels,
      setting,
      novelHydrate,
      novelPurge,
      changeFontSize,
      changeLineHeight,
      changeExpandWord
    } = this.props
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
        >
          <Config
            setting={setting}
            changeFontSize={changeFontSize}
            changeLineHeight={changeLineHeight}
            changeExpandWord={changeExpandWord}
          />
          <About />
          <Developer />
          <Disclaimer />
          <Export novels={novels} />
          <Import novelHydrate={novelHydrate} />
          <Purge novelPurge={novelPurge} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  novels: state.novels,
  setting: state.setting
})

const mapDispatchToProps = (action: RootAction) => ({
  novelHydrate: action.novelActions.novelHydrate,
  novelPurge: action.novelActions.novelPurge,
  changeFontSize: action.settingActions.changeFontSize,
  changeLineHeight: action.settingActions.changeLineHeight,
  changeExpandWord: action.settingActions.changeExpandWord
})

export default connector(mapStateToProps, mapDispatchToProps)(Setting)

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.lightGray,
    flex: 1
  },
  scroll: {
    backgroundColor: color.lightGray,
    flex: 1
  },
  content: {
    paddingVertical: 24
  }
})
