import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface Props {
  images: string[]
}

class ContentImages extends React.PureComponent<Props> {
  render() {
    const { images } = this.props
    return (
      <View style={styles.container}>
        {images.map(image => (
          <Image
            key={image}
            style={styles.image}
            source={{
              uri: image
            }}
          />
        ))}
      </View>
    )
  }
}

export default ContentImages

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 24
  },
  image: {
    borderRadius: 8,
    height: 96,
    marginRight: 16,
    width: 96
  }
})
