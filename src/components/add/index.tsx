import * as React from 'react'
import { Clipboard, NavState, StyleSheet, View, WebView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Header from 'src/components/add/Header'
import { color, constraint, narou } from 'src/constants/'
import {
  responseToNovelData,
  scrapeIndexPage,
  scrapeNovelContents,
  snackbar,
  validToAddNovel
} from 'src/helpers'
import { connector, RootAction, RootState } from 'src/modules'
import { novelActions, NovelState, Status } from 'src/modules/novels'
import { parse } from 'url'

interface Props {
  data: string
  routeName: string
  novels: NovelState[]
  novelAdd: typeof novelActions.novelAdd
}

interface State {
  clipboard: string
  uri: string
  valid: boolean
  value: string
}

class Add extends React.PureComponent<Props, State> {
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
    const { value } = this.state
    if (RegExp(narou.novel).test(value)) {
      Actions.WEB(value)
    } else {
      snackbar.error('エラーが発生しました')
    }
  }

  handlePressClipboard = () => {
    Actions.WEB(this.state.clipboard)
  }

  handlePressAddNovel = async () => {
    if (!this.state.valid) {
      return
    } else {
      this.setState({ valid: false })
      const splited = parse(this.props.data).pathname.split('/')
      const ncode = splited[1]
      const page = Number(splited[2]) || 0
      const api = `${narou.api}ncode=${ncode}&out=json`
      const url = `https://${narou.novel}/${ncode}`
      try {
        const response = await fetch(api)
        const json = await response.json()
        const data = responseToNovelData(json[1])
        const index = await scrapeIndexPage(url)
        const contents = await scrapeNovelContents(
          `${url}${data.isShort ? '' : page === 0 ? '/1' : `/${page}`}`
        )
        const scrollOffset = !page || data.isShort ? 0 : constraint.scrollOffset
        const payload: NovelState = {
          ...data,
          page,
          index,
          contents,
          scrollOffset,
          status: Status.reading
        }
        this.props.novelAdd(payload)
        snackbar.success('小説を追加しました')
        Actions.popTo('HOME')
      } catch (error) {
        snackbar.error('小説追加時にエラーが発生しました')
      }
    }
  }

  handleNavigationStateChange = ({ url, navigationType }: NavState) => {
    if (navigationType === 'click') {
      this.web.current.stopLoading()
      Actions.WEB(url)
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

const mapStateToProps = (state: RootState) => ({
  novels: state.novels
})

const mapDispatchToProps = (action: RootAction) => ({
  novelAdd: action.novelActions.novelAdd
})

export default connector(mapStateToProps, mapDispatchToProps)(Add)

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1
  },
  webView: {
    flex: 1
  }
})
