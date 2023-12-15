export default function findMostRepeatedItem(arr) {
	const stringCount = {}

	// Count occurrences of each string in the array
	arr.forEach((item) => {
		stringCount[item] = (stringCount[item] || 0) + 1
	})

	let maxCount = 0
	let mostRepeatedString = null

	// Find the string with the maximum occurrences
	Object.keys(stringCount).forEach((item) => {
		if (stringCount[item] > maxCount) {
			maxCount = stringCount[item]
			mostRepeatedString = item
		}
	})

	return mostRepeatedString
}