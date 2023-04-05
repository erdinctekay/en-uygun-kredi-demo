export const findMaxArr = (arr) => {
	if (arr.length === 0) {
		return 0
	}
	return Math.max(...arr)
}

export const includesElements = (array, elements) => {
	return elements.some((element) => array.includes(element))
}

export const capitalizeSentence = (str) => {
	return str.replace(/.+?([\.\?\!]\s|$)/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

export const capitalizeWords = (words) => {
	var separateWord = words.toLowerCase().split(' ')
	for (var i = 0; i < separateWord.length; i++) {
		separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1)
	}
	return separateWord.join(' ')
}

export const sanitize = (input) => {
	const disallowedChars = /['"%<>_&`;\(\)\/]/g
	return input.replace(disallowedChars, '')
}

export const formatShortName = (fullName) => {
	// due to reactivity null object can pass
	if (!fullName) return

	const nameArray = fullName.split(' ')
	const firstName = nameArray[0]
	const lastName = nameArray.length > 1 ? nameArray[nameArray.length - 1] : ''
	let middleInitials = ''

	// Check if there are middle names/initials
	if (nameArray.length > 2) {
		for (let i = 1; i < nameArray.length - 1; i++) {
			middleInitials += nameArray[i].charAt(0).toUpperCase() + '.'
		}
	}

	const formattedName = removeLastWhiteSpace(normalizeSpacing(firstName + ' ' + middleInitials + ' ' + lastName))

	return formattedName
}

export const formatNumber = (x, seperatorType = '.') => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperatorType)
}

export const limitMaxLength = (value, maxLength) => {
	if (value.length > maxLength) {
		return value.substring(0, maxLength)
	}
	return value
}

export const limitWordLength = (inputString, maxWordLength = 11) => {
	const words = inputString.split(' ')
	const limitedWords = words.map((word) => {
		if (word.length > maxWordLength) {
			return word.substring(0, maxWordLength)
		}
		return word
	})
	const limitedString = limitedWords.join(' ')
	if (limitedString.length > inputString.length) {
		return inputString
	}
	return limitedString
}

export const removeUnderscores = (str) => {
	return str.replace(/_/g, ' ')
}

export const removeAllSpaces = (str) => {
	return str.replace(/\s/g, '')
}

export const removeWhiteSpaces = (str) => {
	return str.replace(/' '/g, '')
}

export const removeLastWhiteSpace = (str) => {
	let string = str
	if (str.charAt(str.length - 1) === ' ') string = str.slice(0, -1)

	return string
}

export const normalizeSpacing = (input) => {
	return input.replace(/^\s+/, '').replace(/\s+/g, ' ')
}

export const keepOnlyDigitsAndPlus = (input) => {
	const digitsAndPlusRegex = /[\d+]/g
	const matches = input.match(digitsAndPlusRegex)
	return matches ? matches.join('') : ''
}

export const keepOnlyDigits = (input) => {
	const digitsAndPlusRegex = /[\d]/g
	const matches = input.match(digitsAndPlusRegex)
	return matches ? matches.join('') : ''
}

export const getDateNowIsoStr = () => {
	let date = new Date()
	let isoString = date.toISOString()

	return isoString
}

export const convertTimestamp = (timestamp) => {
	const date = new Date(timestamp * 1000)
	const year = date.getFullYear()
	const month = `0${date.getMonth() + 1}`.slice(-2)
	const day = `0${date.getDate()}`.slice(-2)
	const hours = `0${date.getHours()}`.slice(-2)
	const minutes = `0${date.getMinutes()}`.slice(-2)
	const seconds = `0${date.getSeconds()}`.slice(-2)
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const currentTimestamp = () => Math.floor(Date.now() / 1000)

export const getNumberFromString = (str) => {
	const match = str.match(/\d+/)
	if (!match) return 0
	return parseInt(match[0], 10)
}

export const getOnlyDigits = (str) => {
	return parseFloat(str.replace(/[^0-9]+/g, ''))
}

export const getRandomNumber = (length) => {
	let randomNumber = ''
	for (let i = 0; i < length; i++) {
		randomNumber += Math.floor(Math.random() * 10)
	}
	return randomNumber
}

export const formatCount = (count, unit, unitPlural) => {
	if (!unitPlural) unitPlural = `${unit}s`

	if (count === 1) {
		return `1 ${unit}`
	} else if (count < 1000) {
		return `${count} ${unitPlural}`
	} else if (count < 1000000) {
		const countInK = Math.floor(count / 1000)
		const countDecimal = count % 1000 ? `.${Math.floor((count % 1000) / 100)}` : ''
		return `${countInK}${countDecimal}K ${unitPlural}`
	} else {
		const countInM = Math.floor(count / 1000000)
		const countDecimal = count % 1000000 ? `.${Math.floor((count % 1000000) / 100000)}` : ''
		return `${countInM}${countDecimal}M ${unitPlural}`
	}
}

export const convertToHttps = (url) => {
	// if http convert to https
	if (/^http/.test(url)) return url.replace(/^http:\/\//, 'https://')

	// if not http/https add it
	if (!/^(http(s)?:)/.test(url)) return (url = 'https://' + url)
}
