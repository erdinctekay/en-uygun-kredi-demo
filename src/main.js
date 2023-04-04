import '@/style.css'
import { loadUiFunctions } from '@/helpers/ui'
import App from '@/App'

const mountTarget = document.querySelector('#app')
const body = document.querySelector('body')
// execute app on related dom element
App(mountTarget)

document.addEventListener('DOMContentLoaded', () => {
	loadUiFunctions()
	setTimeout(() => {
		document.querySelector('body').style.opacity = '' // to show body (initial opacity was 0)
	}, 100)
})
