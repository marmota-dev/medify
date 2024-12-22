import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default function HelloWord(props: { message: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>

      <ActivityIndicator size="large" color="#3498db" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  doneText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 20,
  },
})
