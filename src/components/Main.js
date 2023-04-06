import Form from '@/components/Form'
import Table from '@/components/Table'
import { fetchOffers, fetchState, returnInitState } from '@/stores/OfferStore'

export default function Main() {
	// define
	const main = document.createElement('main')
	main.innerHTML = `
    <section class="col-12 my-2">
		<div class="container-fluid container-fluid-xxl py-2 px-3 px-sm-5 row g-0 m-auto">
			<div class="d-flex flex-row g-0 w-100 justify-content-center">
                <div id="data-holder" class="d-flex flex-column align-items-center" style="max-width:360px; min-width:348px">

                </div>
			</div>
		</div>
	</section>
    `

	main.style.cssText +=
		'min-height: calc((calc(1 / var(--zoom-ratio) * 100vh) - var(--footer-height) - var(--header-height) - 1px))'
	main.classList += 'py-4'

	const form = Form()
	main.querySelector('section #data-holder').appendChild(form)

	// create a spinner element with parent div
	const spinnerParent = document.createElement('div')
	spinnerParent.style.cssText = 'min-height: 350px'
	spinnerParent.classList += 'align-items-center'
	spinnerParent.style.display = 'none'

	const spinner = document.createElement('div')
	spinner.classList += 'spinner-border text-primary'
	main.querySelector('section #data-holder').appendChild(spinnerParent)
	spinnerParent.appendChild(spinner)
	// spinner done

	console.log(fetchState())

	// add form observer
	form.addEventListener('fetchOffers', async () => {
		let form = document.querySelector('#form')

		form.style.display = 'none'
		spinnerParent.style.display = 'flex'

		await fetchOffers()
		let status = fetchState()

		if (status === 'success') {
			spinnerParent.style.display = 'none'
			createTable()
		}
	})

	const createTable = () => {
		const table = Table()
		main.querySelector('section #data-holder').appendChild(table)

		table.addEventListener('returnInitState', async () => {
			let form = document.querySelector('#form')

			await returnInitState()
			let status = fetchState()

			if (status === 'init') {
				form.style.display = 'block'
				spinnerParent.style.display = 'none'
				removeTable()
			}
		})
	}

	const removeTable = () => {
		const table = document.querySelector('#table')
		table.parentNode.removeChild(table)
	}

	// return
	return main
}
