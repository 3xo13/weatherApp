import { StatusBar } from 'expo-status-bar'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ImageBackground
} from 'react-native'
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
		message,
		tempText,
		topWrapper,
		hourlyListWrapper,
		bottomWrapper,
		bottomLeft,
		bottomRight,
		day,
		details,
		image
	} = pageStyles
	const {
		main: { temp, feels_like, temp_max, temp_min, humidity, pressure },
		weather,
		dt_txt,
		clouds: { all },
		wind: { speed, deg, gust },
		visibility,
		pop,
		rain,
		snow,
		sys: { pod }
	} = weatherData[0]
	const weatherCondition = weather[0]?.main
	const currentDay = dt_txt.split(' ')[0]
	const windSpeedKm = ((speed * 60 * 60) / 1000).toFixed(2)
	const windGustKm = ((gust * 60 * 60) / 1000).toFixed(2)
	const eightHoursList = weatherData.filter(
		(obj, index) => obj.dt_txt.includes(currentDay) || index < 8
	)
	const renderHourlyList = eightHoursList.map((item, index) => (
		<HourlyListItem data={item} key={index} />
	))
	return (
		<SafeAreaView style={container}>
			<ImageBackground
				source={require('../../assets/images/clouds.jpg')}
				style={image}
			>
				<View style={topWrapper}>
					<Feather
						name={weatherType[weatherCondition]?.icon}
						size={100}
						color={'white'}
					/>
					<Text style={tempText}>{`${temp}°`}</Text>
					<Text style={description}>{weather[0]?.description}</Text>
					<Text style={feels}>{`Feels like ${feels_like}°`}</Text>
					<RowText
						messageOne={`High: ${temp_max}°`}
						messageTwo={`Low: ${temp_min}°`}
						containerStyles={highLowWrapper}
						messageOneStyles={highLow}
						messageTwoStyles={highLow}
					/>
				</View>
				<ScrollView style={hourlyListWrapper} horizontal={true}>
					{renderHourlyList}
				</ScrollView>
				{/* <RowText
				messageOne={weather[0]?.description}
				messageTwo={weatherType[weatherCondition]?.message}
				containerStyles={bodyWrapper}
				messageOneStyles={description}
				messageTwoStyles={message}
			/> */}
				<View style={bottomWrapper}>
					<View style={bottomLeft}>
						<Text style={day}>{moment(dt_txt).format('dddd')}</Text>
						<Text style={details}>Precipitation</Text>
						<Text style={details}>Clouds</Text>
						<Text style={details}>Humidity</Text>
						<Text style={details}>Pressure</Text>
						<Text style={details}>Visibility</Text>
						<Text style={details}>Wind Speed</Text>
						<Text style={details}>Wind Gust</Text>
						<Text style={details}>Wind direction</Text>
					</View>
					<View style={bottomRight}>
						<Text style={day}>
							{moment(dt_txt).format('MMM Do YY')}
						</Text>
						<Text style={details}>{`${pop * 100} %`}</Text>
						<Text style={details}>{`${all} %`}</Text>
						<Text style={details}>{`${humidity} %`}</Text>
						<Text style={details}>{`${pressure} hPa`}</Text>
						<Text style={details}>{`${visibility / 100} %`}</Text>
						<Text style={details}>{`${windSpeedKm} Km/H`}</Text>
						<Text style={details}>{`${windGustKm} Km/H`}</Text>
						<View style={{ flexDirection: 'row' }}>
							<Text style={details}>{`${deg}°`}</Text>
							<View style={{ transform: `rotate(${deg}deg)` }}>
								<Feather
									name={'arrow-up'}
									size={18}
									color={'white'}
								/>
							</View>
						</View>
					</View>
				</View>
			</ImageBackground>
		</SafeAreaView>
	)
}

const pageStyles = StyleSheet.create({
	hourlyListWrapper: {
		height: 150,
		maxHeight: 120,
		flexDirection: 'row',
		marginTop: 0,
		paddingHorizontal: 5,
		backgroundColor: 'rgba(38, 36, 36, 0.5)'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	topWrapper: {
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: 'rgba(38, 36, 36, 0.5)'
	},
	bodyWrapper: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-start'
	},
	description: {
		fontSize: 35,
		textTransform: 'capitalize',
		color: 'white',
		textAlign: 'center'
	},
	message: {
		fontSize: 15,
		paddingLeft: 25,
		marginBottom: 40,
		color: 'white'
	},
	feels: {
		color: 'white',
		fontSize: 30,
		textAlign: 'center'
	},
	tempText: {
		color: 'white',
		fontSize: 48,
		textAlign: 'center'
	},
	highLow: {
		color: 'white',
		fontSize: 20
	},
	highLowWrapper: {
		flexDirection: 'row',
		gap: 5
	},
	bottomWrapper: {
		flex: 1,
		width: '100%',
		backgroundColor: 'rgba(38, 36, 36, 0.5)',
		alignItems: 'flex-end',
		flexDirection: 'row',
		marginTop: -0.2
	},
	bottomLeft: {
		flex: 1,
		width: '50%',
		height: '100%',
		paddingLeft: 15
	},
	bottomRight: {
		flex: 1,
		width: '50%',
		height: '100%',
		alignItems: 'flex-end',
		paddingRight: 15
	},
	day: {
		fontSize: 20,
		color: 'white'
	},
	details: {
		color: 'white'
	},
	image: {
		flex: 1
	}
})

export default CurrentWeather
