import { formatNumber, toEnglish } from '@/helpers/utils'

export default function Card(offer) {
	// define
	const card = document.createElement('div')
	card.innerHTML = `
        <div class="card bg-gray-800 text-body border-0 mb-2">
        <div class="card-body">
            <div class="d-flex flex-row justify-content-between align-items-start">
                <div class="d-flex flex-column pt-1">
                    <img src="/img/${toEnglish(offer.bank).toLowerCase()}-logo.webp" width="100">
                </div>
                <div class="d-flex flex-column text-end">
                    <div class="d-flex flex-row mb-3">
                        <div class="d-flex small flex-column me-4">
                            <span class="text-wrap">
                                Faiz Oranı
                            </span>
                            <span class="text-wrap text-white">
                                ${formatNumber(offer.interestRate)}%
                            </span>

                        </div>
                        <div class="d-flex small flex-column">
                            <span class="text-wrap">
                                Aylık Ödeme
                            </span>
                            <span class="text-wrap text-white fw-bold">
                                ${formatNumber(offer.monthlyPayment)} TL
                            </span>
                        </div>
                    </div>
                    <div class="d-flex small flex-column">
                        <span class="text-wrap">
                            Toplam
                        </span>
                        <span class="text-wrap text-white fw-bold">
                            ${formatNumber(offer.totalPayment)} TL
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `
	card.style.cssText += ''
	card.classList += ''

	// return
	return card
}

const offers = [
	{
		bank: 'Yapıkredi',
		logo: 'Yapıkredi',
		monthlyPayment: 3500,
		interestRate: 3.29,
		totalPayment: 63317.0,
	},
]
