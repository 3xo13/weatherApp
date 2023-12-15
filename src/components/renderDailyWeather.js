import React from 'react'
import {
	SafeAreaView,
	Text,
	FlatList,
	StatusBar,
	StyleSheet,
	ImageBackground,
	View,
	ScrollView
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import ListItem from './ListItem'
import ItemSeparatorComponent from './ItemSeparatorComponent'
import Empty from './Empty'
import { weatherType } from '../utilities/weatherType'
import RowText from './RowText'
import styles from '../../global/styles'
import moment from 'moment'
import findMostRepeatedItem from '../utilities/functions/findMostRepeatedItem'
import HourlyListItem from './HourlyListItem'

const renderDailyWeather = ({ item }) => {
	// console.log("🚀 ~ file: UpComingWeather.js:70 ~ renderDaylyWeather ~ item:", JSON.stringify(item, null, 2))
	const dt_text = item[0].dt_txt
	const weatherNameList = item.map((hourlyItem) => hourlyItem.weather[0].main)
	const condition = findMostRepeatedItem(weatherNameList)
	// min and max temperature for the day
	const tempList = item.map((hourlyItem) => hourlyItem.main.temp)
	const maxTemp = Math.max(...tempList)
	const minTemp = Math.min(...tempList)
	// avrage pressure for the day
	const pressureList = item.map((hourlyItem) => hourlyItem.main.pressure)
	const pressureListSum = pressureList.reduce((a, b) => a + b, 0)
	const avgPressure = Math.round(pressureListSum / pressureList.length)
	// avrage sea level for the day
	const cloudsList = item.map((hourlyItem) => hourlyItem.clouds.all)
	const cloudsSum = cloudsList.reduce((a, b) => a + b, 0)
	const avgClouds = Math.round(cloudsSum / cloudsList.length)
	// avrage humidity for the day
	const humidityList = item.map((hourlyItem) => hourlyItem.main.humidity)
	const humiditySum = humidityList.reduce((a, b) => a + b, 0)
	const avgHumidity = Math.round(humiditySum / humidityList.length)
	// avrage wind speed for the day
	const windSpeedList = item.map((hourlyItem) => hourlyItem.wind.speed)
	const windSpeedSum = windSpeedList.reduce((a, b) => a + b, 0)
	const avgWindSpeed = (
		((windSpeedSum / windSpeedList.length) * 60 * 60) /
		1000
	).toFixed(2)

	// avrage humidity for the day
	const precipitationList = item.map((hourlyItem) => hourlyItem.pop)
	const precipitationSum = precipitationList.reduce((a, b) => a + b, 0)
	const avgPrecipitation = Math.round(
		(precipitationSum * 100) / precipitationList.length
	)
	// console.log("🚀 ~ file: UpComingWeather.js:80 ~ renderDaylyWeather ~ avgPressure:", avgPressure)
	const HourlyList = item.map((preriod, index) => (
		<HourlyListItem data={preriod} key={index} />
	))
	return (
		<View style={styles.daylyWrapper}>
			<View style={pageStyles.topWrapper}>
				<View style={pageStyles.topLeftWrapper}>
					<Feather
						name={weatherType[condition]?.icon}
						size={50}
						color={'white'}
					/>
					<Text style={styles.date}>
						{moment(dt_text).format('dddd')}
					</Text>
					<Text style={styles.date}>
						{moment(dt_text).format('MMM Do YY')}
					</Text>
					<RowText
						messageOne={`High: ${maxTemp}° `}
						messageTwo={`Low: ${minTemp}° `}
						containerStyles={styles.highLowWrapper}
						messageOneStyles={pageStyles.highLow}
						messageTwoStyles={pageStyles.highLow}
					/>
				</View>
				<View style={pageStyles.topRightWrapper}>
					<Text
						style={pageStyles.details}
					>{`Precipitation ${avgPrecipitation}%`}</Text>
					<Text
						style={pageStyles.details}
					>{`Pressure ${avgPressure} hPa`}</Text>
					<Text
						style={pageStyles.details}
					>{`Humidity ${avgHumidity}%`}</Text>
					<Text
						style={pageStyles.details}
					>{`Clouds ${avgClouds}%`}</Text>
					<Text
						style={pageStyles.details}
					>{`Wind speed ${avgWindSpeed} Km/h`}</Text>
				</View>
			</View>
			<ScrollView style={pageStyles.hourlyListWrapper} horizontal={true}>
				{HourlyList}
			</ScrollView>
		</View>
	)
}

const pageStyles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		backgroundColor: 'royalblue'
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderWidth: 5,
		backgroundColor: 'pink'
	},
	temp: {
		color: 'white',
		fontSize: 20
	},
	date: {
		color: 'white',
		fontSize: 15
	},
	image: {
		flex: 1
	},
	topWrapper: {
		height: '50%',
		width: '100%',
		flexDirection: 'row'
	},
	topLeftWrapper: {
		// borderWidth: 2,
		width: '50%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	topRightWrapper: {
		// borderWidth: 2,
		width: '50%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	highLow: {
		color: 'white',
		fontSize: 14
	},
	details: {
		color: 'white',
		fontSize: 12
	},
	hourlyListWrapper: { height: 150, maxHeight: 120, flexDirection: 'row' }
})

export default renderDailyWeather
