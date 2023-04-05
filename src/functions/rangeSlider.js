import { formatNumber, getOnlyDigits } from '@/helpers/utils'

export const setupRangeSlider = (config) => {
	let { parentElement, inputElement, rangeElement, defaultValue, minValue, maxValue, suffix, step } = config
	suffix = ' ' + suffix

	// Set initial value of range based on config
	rangeElement.setAttribute('min', minValue)
	rangeElement.setAttribute('max', maxValue)
	rangeElement.setAttribute('step', step)
	rangeElement.setAttribute('value', defaultValue)

	parentElement.querySelector('.label-min').innerHTML = minValue + suffix
	parentElement.querySelector('.label-max').innerHTML = maxValue + suffix

	// Set initial value of input based on range
	inputElement.value = formatNumber(rangeElement.value) + suffix

	// Update input when range change
	rangeElement.addEventListener('input', () => {
		inputElement.value = formatNumber(rangeElement.value) + suffix
	})

	// Clear input on first focus till focus out
	inputElement.addEventListener('focus', () => {
		inputElement.value = ''
	})
	inputElement.addEventListener('blur', () => {
		console.log('blur')

		if (inputElement.value === '') {
			inputElement.value = formatNumber(rangeElement.value) + suffix
		}

		let value = getOnlyDigits(inputElement.value)

		value < minValue ? (value = minValue) : value

		rangeElement.value = value
		inputElement.value = formatNumber(rangeElement.value) + suffix
	})

	// Update range when input changes
	inputElement.addEventListener('input', () => {
		let value = getOnlyDigits(inputElement.value)
		value > maxValue ? (value = maxValue) : value

		console.log(value)

		if (value >= minValue) {
			rangeElement.value = value
			inputElement.value = formatNumber(rangeElement.value) + suffix
		} else {
			isNaN(value) ? (value = '') : value
			inputElement.value = value === '' ? '' : formatNumber(value) + suffix
			rangeElement.value = minValue
		}

		// Move the cursor to the left of the suffix
		let suffixIndex = inputElement.value.indexOf(suffix)
		if (suffixIndex !== -1) {
			inputElement.setSelectionRange(suffixIndex, suffixIndex)
		}
	})

	// Remove step when input is focused
	inputElement.addEventListener('focus', () => {
		rangeElement.removeAttribute('step')
	})

	// Add step back when input is blurred
	inputElement.addEventListener('blur', () => {
		rangeElement.setAttribute('step', step)
		inputElement.value = formatNumber(rangeElement.value) + suffix
	})
}
