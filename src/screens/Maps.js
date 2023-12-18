import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	Text,
	View,
	StyleSheet,
	ImageBackground,
	Button,
	Pressable
} from 'react-native'
import IconText from '../components/IconText'
import moment from 'moment'
import MapView, { UrlTile, MapUrlTile, LocalTile } from 'react-native-maps'
import { API_KEY } from '@env'
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'

const Maps = ({ lat, lon }) => {
	const { imageLayout, map, btnsWrapper, mapBtn } = pageStyles
	const [mapLayer, setMapLayer] = useState()
	const [layerName, setLayerName] = useState('clouds_new')
	useEffect(() => {
		const getMapLayer = async () => {
			try {
				await fetch(
					`https://tile.openweathermap.org/map/clouds/19/200/200.png?appid=${API_KEY}`
				).then((data) => setMapLayer(data))
			} catch (error) {
				console.log(
					'🚀 ~ file: City.js:35 ~ getMapLayer ~ error:',
					error
				)
			}
		}
		getMapLayer()
	}, [])

	return (
		<SafeAreaView style={imageLayout}>
			<ImageBackground
				source={require('../../assets/images/cityNight.jpg')}
				style={imageLayout}
				blurRadius={0}
			>
				<View style={btnsWrapper}>
					<Pressable
						onPress={() => setLayerName('clouds_new')}
						style={mapBtn}
					>
						<Feather
							name={'cloud'}
							size={35}
							color={
								layerName === 'clouds_new' ? 'tomato' : 'white'
							}
						/>
					</Pressable>
					<Pressable
						onPress={() => setLayerName('precipitation_new')}
						style={mapBtn}
					>
						<Feather
							name={'cloud-rain'}
							size={35}
							color={
								layerName === 'precipitation_new'
									? 'tomato'
									: 'white'
							}
						/>
					</Pressable>
					<Pressable
						onPress={() => setLayerName('pressure_new')}
						style={mapBtn}
					>
						<Octicons
							name="meter"
							size={28}
							color={
								layerName === 'pressure_new'
									? 'tomato'
									: 'white'
							}
						/>
					</Pressable>
					<Pressable
						onPress={() => setLayerName('wind_new')}
						style={mapBtn}
					>
						<Feather
							name={'wind'}
							size={35}
							color={
								layerName === 'wind_new' ? 'tomato' : 'white'
							}
						/>
					</Pressable>
					<Pressable
						onPress={() => setLayerName('temp_new')}
						style={mapBtn}
					>
						<Feather
							name={'thermometer'}
							size={35}
							color={
								layerName === 'temp_new' ? 'tomato' : 'white'
							}
						/>
					</Pressable>
				</View>
				<MapView
					initialRegion={{
						latitude: lat,
						longitude: lon,
						latitudeDelta: 0.2,
						longitudeDelta: 0.2
					}}
					style={map}
				>
					{layerName === 'clouds_new' && (
						<UrlTile
							urlTemplate={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
						/>
					)}
					{layerName === 'precipitation_new' && (
						<UrlTile
							urlTemplate={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
						/>
					)}
					{layerName === 'pressure_new' && (
						<UrlTile
							urlTemplate={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
						/>
					)}
					{layerName === 'wind_new' && (
						<UrlTile
							urlTemplate={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
						/>
					)}
					{layerName === 'temp_new' && (
						<UrlTile
							urlTemplate={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
						/>
					)}
				</MapView>
			</ImageBackground>
		</SafeAreaView>
	)
}

const pageStyles = StyleSheet.create({
	imageLayout: {
		flex: 1,
		filter: 'blur(5)'
	},
	map: {
		width: '100%',
		height: '100%'
	},
	btnsWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		height: 'auto',
		backgroundColor: 'lightblue',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	mapBtn: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Maps
