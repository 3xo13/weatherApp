import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import styles from '../../global/styles'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import RowText from '../components/RowText'
import { weatherType } from '../utilities/weatherType'
import moment from 'moment'
import HourlyListItem from '../components/HourlyListItem'

const CurrentWeather = ({ weatherData }) => {
	const {
		highLow,
		wrapper,
		container,
		feels,
		highLowWrapper,
		bodyWrapper,
		description,
		message
	} = styles
	const {
		main: { temp, feels_like, temp_max, temp_min },
		weather,
		dt_txt
	} = weatherData[0]
	const weatherCondition = weather[0]?.main
	const currentDay = dt_txt.split(' ')[0]
	const eightHoursList = weatherData.filter(
		(obj, index) => obj.dt_txt.includes(currentDay) || index < 8
	)
	const renderHourlyList = eightHoursList.map((item, index) => (
		<HourlyListItem data={item} key={index} />
	))
	return (
		<SafeAreaView
			style={[
				wrapper,
				{
					backgroundColor:
						weatherType[weatherCondition]?.backgroundColor
				}
			]}
		>
			<View style={container}>
				<Feather
					name={weatherType[weatherCondition]?.icon}
					size={100}
					color={'white'}
				/>
				<Text style={styles.temp}>{`${temp}°`}</Text>
				<Text style={feels}>{`Feels like ${feels_like}°`}</Text>
				<RowText
					messageOne={`High: ${temp_max}° `}
					messageTwo={`Low: ${temp_min}° `}
					containerStyles={highLowWrapper}
					messageOneStyles={highLow}
					messageTwoStyles={highLow}
				/>
			</View>
			<ScrollView style={pageStyles.hourlyListWrapper} horizontal={true}>
				{renderHourlyList}
			</ScrollView>
			<RowText
				messageOne={weather[0]?.description}
				messageTwo={weatherType[weatherCondition]?.message}
				containerStyles={bodyWrapper}
				messageOneStyles={description}
				messageTwoStyles={message}
			/>
		</SafeAreaView>
	)
}

const pageStyles = StyleSheet.create({
	hourlyListWrapper: { height: 150, maxHeight: 120, flexDirection: 'row' }
})

export default CurrentWeather
