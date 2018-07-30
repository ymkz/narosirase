import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import About from 'src/components/Setting/About'
import Config from 'src/components/Setting/Config'
import Developer from 'src/components/Setting/Developer'
import Disclaimer from 'src/components/Setting/Disclaimer'
import Export from 'src/components/Setting/Export'
import Header from 'src/components/Setting/Header'
import Import from 'src/components/Setting/Import'
import Reset from 'src/components/Setting/Reset'
import { color } from 'src/constants'
import { Store } from 'src/modules'
import { novelsAction, NovelsAction, NovelState } from 'src/modules/novels'
import { settingAction, SettingAction, SettingState } from 'src/modules/setting'

interface Props {
  novels: NovelState[]
  setting: SettingState
  action: NovelsAction & SettingAction
}

const Setting: React.SFC<Props> = ({ novels, setting, action }) => (
  <View style={styles.container}>
    <Header />
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Config setting={setting} action={action} />
      <About />
      <Developer />
      <Disclaimer />
      <Export novels={novels} />
      <Import action={action} />
      <Reset action={action} />
    </ScrollView>
  </View>
)

const mapStateToProps = (state: Store) => ({
  novels: state.novels,
  setting: state.setting
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  action: bindActionCreators({ ...novelsAction, ...settingAction }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting)

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
