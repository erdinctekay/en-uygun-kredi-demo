import Card from '@/components/Card'
import { getOffers, getOfferConfig } from '@/stores/OfferStore'

export default function Table() {
	// define
	const table = document.createElement('div')
	table.style.cssText += ''
	table.classList += 'offer-results w-100'
	table.setAttribute('id', 'table')

	const offerConfig = getOfferConfig()

	const settingsCard = document.createElement('div')
	settingsCard.innerHTML = `
        <div class="card bg-primary bg-opacity-50 text-body border-0 mb-2">
        <div class="card-body">
            <div class="d-flex flex-row justify-content-between align-items-start">
				<div class="d-flex flex-row">
					<div class="d-flex small flex-column me-4">
						<span class="text-wrap">
							Kredi Tutarı
						</span>
						<span class="text-wrap text-white fw-bold">
							${offerConfig.amount} ${offerConfig.amountSuffix}
						</span>

					</div>
					<div class="d-flex small flex-column">
						<span class="text-wrap">
							Vade
						</span>
						<span class="text-wrap text-white fw-bold">
							${offerConfig.maturity} ${offerConfig.maturitySuffix}
						</span>
					</div>
				</div>
				<button id="return" class="btn d-flex flex-row align-items-center fw-bold btn-dark py-2">
					<div class="d-inline-flex align-items-center flex-row flex-grow-1">
						<span class="w-100 mx-2 text-nowrap small"><span>Değiştir</span></span>
					</div>
				</button>
            </div>
        </div>
        </div>
    `
	table.appendChild(settingsCard)

	const offers = getOffers()
	offers.forEach((offer) => {
		table.appendChild(Card(offer))
	})

	const returnButton = settingsCard.querySelector('#return')

	returnButton.addEventListener('click', () => {
		console.log('clicked')
		const event = new Event('returnInitState')
		table.dispatchEvent(event)
	})

	// return
	return table
}
