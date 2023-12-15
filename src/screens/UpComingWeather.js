import React from 'react'
import {
	SafeAreaView,
	FlatList,
	StyleSheet,
	ImageBackground
} from 'react-native'
import ItemSeparatorComponent from '../components/ItemSeparatorComponent'
import Empty from '../components/Empty'
import renderDailyWeather from '../components/renderDailyWeather'
import getDailyData from '../utilities/functions/getDailyData'

const UpComingWeather = ({ weatherData }) => {
	const dailyItems = getDailyData(weatherData)
	const { image, container } = pageStyles
	return (
		<SafeAreaView style={container}>
			<ImageBackground
				source={require('../../assets/images/clouds.jpg')}
				style={image}
			>
				<FlatList
					data={dailyItems}
					renderItem={renderDailyWeather}
					keyExtractor={(item) => item[0].dt}
					ItemSeparatorComponent={ItemSeparatorComponent}
					ListEmptyComponent={Empty}
				/>
			</ImageBackground>
		</SafeAreaView>
	)
}

const pageStyles = StyleSheet.create({
	container: {
		flex: 1,
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
	}
})

export default UpComingWeather
