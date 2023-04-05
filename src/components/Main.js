import Form from '@/components/Form.js'

export default function Main() {
	// define
	const main = document.createElement('main')
	main.innerHTML = `
    <section class="col-12 my-2">
		<div class="container-fluid container-fluid-xxl py-2 px-3 px-sm-5 row g-0 m-auto">
			<div class="d-flex flex-row g-0 w-100 justify-content-center">
                <div class="d-flex flex-column align-items-center">

                </div>
			</div>
		</div>
	</section>
    `

	main.style.cssText +=
		'min-height: calc((calc(1 / var(--zoom-ratio) * 100vh) - var(--footer-height) - var(--header-height) - 1px))'
	main.classList += 'py-4'

	main.querySelector('section .flex-column').appendChild(Form())

	// return
	return main
}
