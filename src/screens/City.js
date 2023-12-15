import React from 'react'
import {
	SafeAreaView,
	Text,
	View,
	StyleSheet,
	ImageBackground
} from 'react-native'
import IconText from '../components/IconText'
import moment from 'moment'

const City = ({ weatherData }) => {
	const { name, country, population, sunrise, sunset } = weatherData
	const {
		container,
		imageLayout,
		cityName,
		stateName,
		populationWrapper,
		cityText,
		populationText,
		riseSetWrapper,
		riseSetText,
		rowLayout
	} = pageStyles
	return (
		<SafeAreaView style={container}>
			<ImageBackground
				source={require('../../assets/images/cityNight.jpg')}
				style={imageLayout}
				blurRadius={0}
			>
				<Text style={[cityName, cityText]}>{name}</Text>
				<Text style={[stateName, cityText]}>{country}</Text>
				<View style={[populationWrapper, rowLayout]}>
					<IconText
						iconName={'user'}
						iconColor={'red'}
						bodyText={`Population: ${population}`}
						bodyTextStyles={populationText}
					/>
				</View>
				<View style={[riseSetWrapper, rowLayout]}>
					<IconText
						iconName={'sunrise'}
						iconColor={'white'}
						bodyText={moment(sunrise).format('h:mm:ss a')}
						bodyTextStyles={riseSetText}
					/>
					<IconText
						iconName={'user'}
						iconColor={'white'}
						bodyText={moment(sunset).format('h:mm:ss a')}
						bodyTextStyles={riseSetText}
					/>
				</View>
			</ImageBackground>
		</SafeAreaView>
	)
}

const pageStyles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		backgroundColor: 'royalblue'
	},
	imageLayout: {
		flex: 1,
		filter: 'blur(5)'
	},
	cityName: {
		fontSize: 40
	},
	stateName: {
		fontSize: 30
	},
	cityText: {
		justifyContent: 'center',
		alignSelf: 'center',
		fontSize: 30,
		color: 'white'
	},
	populationWrapper: {
		justifyContent: 'center',
		marginTop: 30
	},
	populationText: {
		fontSize: 25,
		marginLeft: 7.5,
		color: 'red'
	},
	riseSetWrapper: {
		justifyContent: 'space-around',
		marginTop: 30
	},
	riseSetText: {
		fontSize: 20,
		color: 'white'
	},
	rowLayout: {
		alignItems: 'center',
		flexDirection: 'row'
	}
})

export default City
