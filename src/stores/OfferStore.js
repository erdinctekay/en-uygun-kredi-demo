import { getAllOffers } from '@/services/backend'

let isFetching = false
let isSuccess = false
let isError = false

let offers

const fetchOffers = async () => {
	try {
		isFetching = true
		console.log(fetchState())

		const { amount, maturity } = offerConfig
		const response = await getAllOffers({ maturity, amount })
		if (response.status === 200) {
			let data = await response.json()
			setOffers(data)
		}

		isSuccess = true
		isError = false
		isFetching = false

		console.log(fetchState())
	} catch (e) {
		isSuccess = false
		isError = true
		isFetching = false
	}

	return
}

const getOffers = () => offers

const setOffers = (array) => (offers = array)

let offerConfig

const setOfferConfig = (object) => (offerConfig = object)

const getOfferConfig = () => offerConfig

const fetchState = () => {
	let status
	let isInit = !isSuccess && !isError && !isFetching

	switch (true) {
		case isInit:
			status = 'init'
			break
		case isFetching:
			status = 'fetching'
			break
		case isSuccess:
			status = 'success'
			break
	}

	return status
}

const returnInitState = async () => {
	isSuccess = false
	isError = false
	isFetching = false

	console.log(fetchState())
	return
}

export { fetchOffers, getOffers, setOfferConfig, getOfferConfig, fetchState, returnInitState }
