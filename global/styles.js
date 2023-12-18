import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: 'pink'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	temp: {
		color: 'white',
		fontSize: 48
	},
	feels: {
		color: 'white',
		fontSize: 30
	},
	highLow: {
		color: 'white',
		fontSize: 20
	},
	highLowWrapper: {
		flexDirection: 'row',
		gap: 5
	},
	flex1: {
		flex: 1
	},
	separator: {
		// backgroundColor: 'red',
		height: 10
	},
	date: {
		color: 'white'
	},
	daylyWrapper: {
		height: 250,
		backgroundColor: 'rgba(38, 36, 36, 0.5)'
	}
})

export default styles
