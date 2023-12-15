import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { weatherType } from '../utilities/weatherType'
import moment from 'moment'

const HourlyListItem = (data) => {
	const {
		main: { temp },
		weather,
		dt_txt
	} = data.data
	const weatherCondition = weather[0]?.main
	return (
		<View style={pageStyles.hourlyItem}>
			<Feather
				name={weatherType[weatherCondition]?.icon}
				size={30}
				color={'white'}
			/>
			<Text style={pageStyles.hourlyItemText}>{`${temp}°`}</Text>
			<Text style={pageStyles.hourlyItemTime}>
				{moment(dt_txt).format('h:mm a')}
			</Text>
		</View>
	)
}
const pageStyles = StyleSheet.create({
	hourlyItem: {
		width: 70,
		height: '100%',
		// backgroundColor: 'rgba(38, 36, 36, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		paddingVertical: 8,
		marginHorizontal: 2.5,
		borderRadius: 5
	},
	hourlyItemText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18
	},
	hourlyItemTime: {
		color: 'white',
		textAlign: 'center',
		fontSize: 15
	}
})

export default HourlyListItem
