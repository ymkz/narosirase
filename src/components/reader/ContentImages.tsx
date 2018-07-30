import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface Props {
  images: string[]
}

const ContentImages: React.SFC<Props> = ({ images }) => (
  <View style={styles.container}>
    {images.map((image: string) => (
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
