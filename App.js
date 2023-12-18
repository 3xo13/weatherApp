/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/components/Tabs'
import { ActivityIndicator } from 'react-native'
import styles from './global/styles'
import { useGetWeather } from './src/hooks/useGetWeather'
import ErrorItem from './src/components/ErrorItem'

const App = () => {
	const [loading, error, weather, lat, lon] = useGetWeather()

	if (weather && weather.list && !loading) {
		return (
			<NavigationContainer>
				<Tabs weather={weather} lat={lat} lon={lon} />
			</NavigationContainer>
		)
	}
	return (
		<NavigationContainer>
			{error ? (
				<ErrorItem />
			) : (
				<ActivityIndicator
					size={'larger'}
					color={'blue'}
					style={styles.container}
				/>
			)}
		</NavigationContainer>
	)
}

export default App
