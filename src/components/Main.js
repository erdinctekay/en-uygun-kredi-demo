import { setupCounter } from '@/functions/counter.js'

export default function Main() {
	// define
	const main = document.createElement('main')
	main.innerHTML = `
    <div>
        <h1>Hello Cnm!</h1>
        <div class="card">
        <button id="counter" type="button"></button>
        </div>
    </div>
    `
	main.style.cssText += 'width: 100%'

	setupCounter(main.querySelector('#counter'))

	// return
	return main
}
