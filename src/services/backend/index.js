import { apiMethod } from '@/helpers/api.js'

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL

const getAllOffers = (params) => {
	let result = fetch(BASE_URL + '/teklif-al', apiMethod('POST', params))
	return result
}

export { getAllOffers }
