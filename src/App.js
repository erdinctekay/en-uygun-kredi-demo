// import Header from '@/components/Header.js'
import Main from '@/components/Main.js'

export default function App(app) {
	// app.appendChild(Header())
	app.appendChild(Main())

	// select all script tags inside the app element
	const scripts = app.querySelectorAll('script')

	// loop through the script tags and append them to the end of the app element
	scripts.forEach((script) => {
		app.appendChild(script)
	})

	return app
}
