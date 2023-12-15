const getDailyData = (weatherData) => {
	let dailyItems = []
	let current = ''
	for (let i = 0; i < weatherData.length; i++) {
		const element = weatherData[i].dt_txt
		const day = element.split(' ')[0]
		if (current !== day) {
			current = day
			dailyItems.push([weatherData[i]])
		} else {
			dailyItems.at(-1).push(weatherData[i])
		}
	}
	return dailyItems
}

export default getDailyData
