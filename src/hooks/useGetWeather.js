import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { API_KEY } from '@env'

export const useGetWeather = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [weather, setWeather] = useState([])
	// console.log("🚀 ~ file: useGetWeather.js:9 ~ useGetWeather ~ weather:", JSON.stringify(weather, null, 2))
	const [lon, setLon] = useState([])
	const [lat, setLat] = useState([])
	const fetchWeatherData = async () => {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
			)
			const data = await res.json()
			setWeather(data)
		} catch (err) {
			setError('could not fetch data')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setError('permissin to access location was denied')
				return
			}
			let userLocation = await Location.getCurrentPositionAsync({})
			setLat(userLocation.coords.latitude)
			setLon(userLocation.coords.longitude)
			await fetchWeatherData()
		})()
	}, [lon, lat])

	return [loading, error, weather, lat, lon]
}
