import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { weatherType } from '../utilities/weatherType'
import moment from 'moment'

const ListItem = (props) => {
	const { dt_text, min, max, condition } = props
	// console.log("🚀 ~ file: ListItem.js:9 ~ ListItem ~ dt_text:", dt_text)
	const { date, temp, item, dataeTextWrapper } = pageStyles
	// const dateStr = dt_text.split(' ')[0]
	// const timeStr = dt_text.split(' ')[1]
	// console.log("🚀 ~ file: ListItem.js:12 ~ ListItem ~ dt_text.split(' '):", dt_text.split(' '))
	return (
		<View style={item}>
			<Feather
				name={weatherType[condition]?.icon}
				size={50}
				color={'white'}
			/>
			<View style={dataeTextWrapper}>
				<Text style={date}>{moment(dt_text).format('dddd')}</Text>
				<Text style={date}>{moment(dt_text).format('MMM Do YY')}</Text>
				<Text style={date}>{moment(dt_text).format('h:mm:ss a')}</Text>
			</View>
			<Text style={temp}>{`${Math.round(min)}°/${Math.round(
				max
			)}°`}</Text>
		</View>
	)
}

const pageStyles = StyleSheet.create({
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'rgba(38, 36, 36, 0.4)',
		borderRadius: 10
	},
	dataeTextWrapper: {
		flexDirection: 'column'
	},
	temp: {
		color: 'white',
		fontSize: 20
	},
	date: {
		color: 'white',
		fontSize: 15
	}
})

export default ListItem

