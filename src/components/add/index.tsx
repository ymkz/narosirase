import * as React from 'react'
import { Clipboard, NavState, StyleSheet, View, WebView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Header from 'src/components/Add/Header'
import { color, constraint, narou } from 'src/constants'
import {
  responseToNovelData,
  scrapeIndexPage,
  scrapeNovelContents,
  snackbar,
  validToAddNovel
} from 'src/helpers'
import { Store } from 'src/modules'
import {
  NovelContent,
  NovelData,
  NovelIndex,
  novelsAction,
  NovelsAction,
  NovelState
} from 'src/modules/novels'
import { SettingAction, settingAction, SettingState } from 'src/modules/setting'
import { Status } from 'src/modules/status'
import { parse } from 'url'

interface Props {
  data: string
  routeName: string
  novels: NovelState[]
  setting: SettingState
  action: NovelsAction & SettingAction
}

interface State {
  clipboard: string
  uri: string
  valid: boolean
  value: string
}

class Add extends React.Component<Props, State> {
  web: React.RefObject<WebView> = React.createRef()

  constructor(props: Props) {
    super(props)
    this.state = {
      clipboard: '',
      uri: props.data ? props.data : narou.search,
      valid: validToAddNovel(props.data, props.novels),
      value: props.data ? props.data : ''
    }
  }

  async componentDidMount() {
    const clipboard = await Clipboard.getString()
    if (RegExp(narou.novel).test(clipboard)) {
      this.setState({ clipboard })
    }
  }

  handleChangeText = (value: string) => {
    this.setState({ value })
  }

  handleSubmitEditing = () => {
    if (RegExp(narou.novel).test(this.state.value)) {
      Actions.WEB(this.state.value)
    } else {
      snackbar.error('エラーが発生しました')
    }
  }

  handlePressClipboard = () => {
    if (this.state.clipboard) {
      Actions.WEB(this.state.clipboard)
    }
  }

  handlePressAddNovel = async () => {
    if (this.state.valid) {
      this.setState({ valid: false })
      const splited: string[] = parse(this.props.data).pathname.split('/')
      const ncode: string = splited[1]
      const page: number = Number(splited[2]) || 0
      const api: string = `${narou.api}ncode=${ncode}&out=json`
      const url: string = `https://${narou.novel}/${ncode}`
      try {
        const response = await fetch(api)
        const json = await response.json()
        const data: NovelData = responseToNovelData(json[1])
        const index: NovelIndex = await scrapeIndexPage(url)
        const contents: NovelContent = await scrapeNovelContents(
          `${url}${data.isShort ? '' : page === 0 ? '/1' : `/${page}`}`
        )
        const scrollOffset: number = !page || data.isShort ? 0 : constraint.scrollOffset
        const payload: NovelState = {
          ...data,
          page,
          index,
          contents,
          scrollOffset,
          status: Status.reading
        }
        this.props.action.addNovel(payload)
        snackbar.success('小説を追加しました')
        if (this.props.setting.backOnAdd) {
          Actions.popTo('HOME')
        }
      } catch (error) {
        snackbar.error('小説追加時にエラーが発生しました')
      }
    }
  }

  handleNavigationStateChange = ({ url, navigationType }: NavState) => {
    if (navigationType === 'click') {
      if (this.web.current) {
        this.web.current.stopLoading()
        Actions.WEB(url)
      }
    }
  }

  render() {
    const { routeName } = this.props
    const { clipboard, uri, valid, value } = this.state
    return (
      <View style={styles.container}>
        <Header
          root={routeName === 'ADD'}
          value={value}
          valid={valid}
          clipboard={clipboard}
          handleChangeText={this.handleChangeText}
          handleSubmitEditing={this.handleSubmitEditing}
          handlePressClipboard={this.handlePressClipboard}
          handlePressAddNovel={this.handlePressAddNovel}
        />
        <WebView
          ref={this.web}
          source={{ uri }}
          onNavigationStateChange={this.handleNavigationStateChange}
          style={styles.webView}
        />
      </View>
    )
  }
}

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
)(Add)

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1
  },
  webView: {
    flex: 1
  }
})
