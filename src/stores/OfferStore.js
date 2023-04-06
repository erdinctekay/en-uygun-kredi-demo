let isFetching = false
let isSuccess = false
let isError = false

const fetchOffers = async () => {
	isFetching = true
	console.log(fetchState())

	await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for 1 second

	isSuccess = true
	isError = false
	isFetching = false

	console.log(fetchState())

	return
}

const returnInitState = async () => {
	isSuccess = false
	isError = false
	isFetching = false

	console.log(fetchState())
	return
}

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

const offers = [
	{
		bank: 'Yapıkredi',
		monthlyPayment: 3500,
		interestRate: 3.29,
		totalPayment: 63317.0,
	},
	{
		bank: 'Fibabanka',
		monthlyPayment: 3500,
		interestRate: 3.29,
		totalPayment: 63317.0,
	},
	{
		bank: 'Denizbank',
		monthlyPayment: 3500,
		interestRate: 3.29,
		totalPayment: 63317.0,
	},
	{
		bank: 'Halkbank',
		monthlyPayment: 3500,
		interestRate: 3.29,
		totalPayment: 63317.0,
	},
	{
		bank: 'QNB',
		monthlyPayment: 3500,
		interestRate: 3.29,
		totalPayment: 63317.0,
	},
]

const getOffers = () => offers

let offerConfig = {}

const setOfferConfig = (object) => (offerConfig = object)

const getOfferConfig = () => offerConfig

export { fetchOffers, getOffers, setOfferConfig, getOfferConfig, fetchState, returnInitState }
