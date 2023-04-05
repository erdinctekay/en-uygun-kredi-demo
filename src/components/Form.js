import { setupRangeSlider } from '@/functions/rangeSlider.js'
import { getOnlyDigits } from '@/helpers/utils'

export default function Form() {
	// define
	const form = document.createElement('div')
	form.innerHTML = `
        <div id="credit-amount" class="mb-3">
            <label for="credit-amount-input" class="form-label fw-bold ps-1">Kredi tutarı</label>
            <input type="text" class="form-control fw-bold text-white py-3" id="credit-amount-input">
            <input type="range" class="form-range" id="credit-amount-range">
            <label for="credit-amount-range" class="form-label small text-muted d-flex justify-content-between mt-n1 px-1">
                <span class="label-min">
                
                </span>
                <span class="label-max">

                </span>
            </label>
        </div>

        <div id="maturity" class="mb-3">
            <label for="maturity-input" class="form-label fw-bold ps-1">Vade</label>
            <input type="text" class="form-control fw-bold text-white py-3" id="maturity-input">
            <input type="range" class="form-range" id="maturity-range">
            <label for="maturity-range" class="form-label small text-muted d-flex justify-content-between mt-n1 px-1">
                <span class="label-min">

                </span>
                <span class="label-max">

                </span>
            </label>
        </div>

        <div class="mb-3 pt-4">
            <button class="btn d-flex flex-row align-items-center w-100 w-sm-25 fw-bold btn-primary py-2">
                <div class="d-inline-flex align-items-center flex-row flex-grow-1">
                    <span class="w-100 mx-2 text-nowrap"><span>TEKLİFLERİ GÖR</span></span>
                </div>
            </button>
        </div>
    `

	form.style.cssText += 'max-width:360px; min-width:348px'

	window.addEventListener('load', () => {
		const creditAmountConfig = {
			parentElement: document.querySelector('#credit-amount'),
			inputElement: document.querySelector('#credit-amount-input'),
			rangeElement: document.querySelector('#credit-amount-range'),
			suffix: 'TL',
			minValue: 1000,
			maxValue: 70000,
			defaultValue: 50000,
			step: 500,
		}

		const maturityConfig = {
			parentElement: document.querySelector('#maturity'),
			inputElement: document.querySelector('#maturity-input'),
			rangeElement: document.querySelector('#maturity-range'),
			suffix: 'ay',
			minValue: 3,
			maxValue: 36,
			defaultValue: 24,
			step: 1,
		}

		setupRangeSlider(creditAmountConfig)
		setupRangeSlider(maturityConfig)

		const creditAmountInputs = [creditAmountConfig.inputElement, creditAmountConfig.rangeElement]

		creditAmountInputs.forEach((input) => {
			input.addEventListener('input', () => arrangeMaturity(input))
		})

		const arrangeMaturity = (input) => {
			const amount = getOnlyDigits(input.value)
			console.log(amount)
			if (amount > 50000) {
				console.log('bigger')
				maturityConfig.maxValue = 24
			} else {
				console.log('lower')
				maturityConfig.maxValue = 36
			}
			setupRangeSlider(maturityConfig)
		}
	})

	// return
	return form
}
