export default function Header() {
	const header = document.createElement('header')
	header.innerHTML = `
        	<section class="nav col-12 fixed-to-parent">
                <nav
                    class="navbar navbar-expand-lg p-0 w-100 bg-gray-800"
                >
                    <div class="container-fluid container-fluid-xxl py-2 px-3 px-sm-5 row g-0 m-auto">
                        <div class="d-flex flex-column w-100 py-3">
                            <span class="lead fw-bold fst-italic">En Uygun Kredi</span>
                        </div>
                    </div>
                </nav>
            </section>
        `
	header.classList += 'position-fixed fixed-top border-1 border-bottom'

	return header
}
