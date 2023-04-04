import * as utils from './utils.js'

const html = document.querySelector('html')
const body = document.body
const docSelf = document.documentElement
const header = document.querySelector('header')
const rootFontSize = utils.getNumberFromString(
	window.getComputedStyle(document.querySelector('html')).getPropertyValue('font-size')
)

export const openModal = () => {
	body.classList.add('modal-open')
	body.style.cssText += 'overflow: hidden;'
	html.style.cssText += 'overflow: hidden;'
	// html.style.cssText += 'margin-right: var(--scrollbar-width)';

	let modal = document.querySelector('#modalForm')

	modal.classList.add('show')
	modal.setAttribute('aria-modal', 'true')
	modal.setAttribute('role', 'dialog')
	modal.style.cssText += 'display: block;'

	let DIV_0_0 = document.createElement('DIV')
	DIV_0_0.setAttribute('class', 'modal-backdrop fade show')
	DIV_0_0.style.cssText += 'width: calc(100vw * (1 / var(--zoom-ratio))); height: calc(100vh * (1 / var(--zoom-ratio)))'

	body.appendChild(DIV_0_0)
}

export const closeModal = () => {
	let modal = document.querySelector('#modalForm')

	body.classList.remove('modal-open')
	body.style.removeProperty('overflow')
	html.style.removeProperty('overflow')
	// html.style.removeProperty('margin-right')

	modal.classList.remove('show')
	modal.removeAttribute('aria-modal', 'true')
	modal.removeAttribute('role', 'dialog')
	modal.style.removeProperty('display')

	let backdrop = document.querySelector('.modal-backdrop')
	if (backdrop) {
		let backdropParent = backdrop.parentNode
		backdropParent.removeChild(backdrop)
	}
}

export const deleteAnimation = () => {}

const transformAsChildHeight = () => {
	let targets = document.querySelectorAll('.transform-as-child-height')

	targets.forEach((target) => {
		let children = target.children
		let totalHeight = 0

		for (let i = 0; i < children.length; i++) totalHeight += children[i].clientHeight
		totalHeight += (children.length - 1) * rootFontSize

		target.style.cssText += 'transform: translateY(-' + totalHeight + 'px)'
	})
}

export const fixedToParent = () => {
	const fixedElems = document.querySelectorAll('.fixed-to-parent')

	/* resize fixer if fixed element height changes with resize */
	const resizeObs = new ResizeObserver((entries) => {
		for (let entry of entries) {
			const fixedElem = entry.target
			const newHeight = fixedElem.clientHeight

			fixedElem.parentNode.style.minHeight = newHeight + 'px'

			if (typeof transformAsChildHeight === 'function') transformAsChildHeight()
		}
	})

	fixedElems.forEach((fixedElem) => {
		/* set initial min-height */
		fixedElem.parentNode.style.minHeight = fixedElem.clientHeight + 'px'

		/* resize observer attach */
		resizeObs.observe(fixedElem)
	})
}

const alertsObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'childList') {
			// Run fixedToParent function
			fixedToParent()
		}
	})
})

const startObservers = () => {
	const alertsElement = document.querySelector('.alerts') || document.body
	alertsObserver.observe(alertsElement, { childList: true, subtree: true })
}

const executeDefaultUi = () => {
	fixedToParent()
	startObservers()
	removeInitials()
	favIconColorSchemeListener()
	getScrollbarWidth()
	getPageScrollPosition()
}

export const loadUiFunctions = () => {
	executeDefaultUi()
}

export const enablePopovers = (Popover) => {
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
	const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => {
		const container = popoverTriggerEl.getAttribute('data-bs-container')
		if (!container) {
			new Popover(popoverTriggerEl, {
				container: popoverTriggerEl.parentNode,
			})
		} else {
			new Popover(popoverTriggerEl, {
				container: document.querySelector(container),
			})
		}
	})
	// console.log(popoverList)
	return popoverList
}

const removeInitials = () => {
	window.onload = function () {
		var elements = document.querySelectorAll('.remove-after-init')
		for (var i = 0; i < elements.length; i++) {
			elements[i].parentNode.removeChild(elements[i])
		}
	}
}

const favIconColorSchemeListener = () => {
	const favicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
	const queryColorScheme = window.matchMedia('(prefers-color-scheme: dark)')

	// handler
	function themeChange(event) {
		if (event.matches) {
			favicons.forEach((icon) => {
				icon.setAttribute('href', '/favicon-dark.ico')
			})
		} else {
			favicons.forEach((icon) => {
				icon.setAttribute('href', '/favicon-light.ico')
			})
		}
	}

	// for first load
	themeChange(queryColorScheme)
	// for listening changes
	queryColorScheme.addEventListener('change', themeChange)
}

const getScrollbarWidth = () => {
	// Create a test element
	const testElement = document.createElement('div')
	testElement.style.height = '100px'
	testElement.style.width = '100px'
	testElement.style.overflow = 'scroll'
	testElement.style.position = 'absolute'
	testElement.style.top = '-9999px'

	// Append the test element to the body
	document.body.appendChild(testElement)

	// Measure the width of the scrollbar
	let scrollbarWidth = testElement.offsetWidth - testElement.clientWidth

	// Remove the test element from the body
	document.body.removeChild(testElement)

	// fix firefox issues - 8 for thin scroll
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) scrollbarWidth = 8

	body.insertAdjacentHTML('beforeend', '<style> :root { --scrollbar-width:' + scrollbarWidth + 'px; } </style>')
	// console.log(scrollbarWidth)

	return scrollbarWidth
}

const scrollPositionList = ['load', 'scroll', 'resize', 'click', 'touchend', 'touchmove']

const getPageScrollPosition = () => {
	scrollPositionList.forEach((scrollPosition) => {
		window.addEventListener(scrollPosition, function (e) {
			mobileWidthFix()

			// get page top - bottom - mid status

			const docHeight = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				docSelf.clientHeight,
				docSelf.scrollHeight,
				docSelf.offsetHeight
			)
			const docTop = Math.max(body.scrollTop, docSelf.scrollTop)

			if (docTop < 30) {
				html.classList.add('top')
			} else {
				html.classList.remove('top')
			}

			if (docTop > 30 && docTop + window.innerHeight > docHeight - 50) {
				html.classList.add('bottom')
			} else {
				html.classList.remove('bottom')
			}

			observeHeaderHeight()
			observeFooterHeight()
		})
	})
}

const observeHeaderHeight = () => {
	const headerChildren = document.querySelectorAll('header section')
	let headerTotalHeight = 0

	headerChildren.forEach((headerChild) => {
		headerTotalHeight += headerChild.clientHeight
	})

	body.style.cssText += '--header-height: ' + headerTotalHeight + 'px !important;'

	if (headerTotalHeight != body.style.getPropertyValue('--header-height').replace(/\D/g, '')) {
		body.style.cssText += '--header-height: ' + headerTotalHeight + 'px !important;'
	}
}

const observeFooterHeight = () => {
	const footerChildren = document.querySelectorAll('footer section')
	let footerTotalHeight = 0

	footerChildren.forEach((footerChild) => {
		footerTotalHeight += footerChild.clientHeight
	})

	body.style.cssText += '--footer-height: ' + footerTotalHeight + 'px !important;'

	if (footerTotalHeight != body.style.getPropertyValue('--footer-height').replace(/\D/g, '')) {
		body.style.cssText += '--footer-height: ' + footerTotalHeight + 'px !important;'
	}
}

const mobileWidthFix = () => {
	// get device width
	const minWidth = window.getComputedStyle(html).getPropertyValue('min-width').replace(/\D/g, '')
	const windowWidth = window.innerWidth
	let zoomOutLevel = windowWidth / minWidth

	// if inner width not enough get outer width and assign new value to *zoomOutLevel*
	const seconderFix = () => {
		const innerWidth = window.innerWidth
		const outerWidth = window.outerWidth

		const zoomLevel = innerWidth / outerWidth
		if (zoomLevel > 1) zoomOutLevel = (1 / zoomLevel) * zoomOutLevel
	}

	seconderFix()

	windowWidth < minWidth ? zoomOut() : removeZoom()

	function zoomOut() {
		html.style.cssText += '--zoom-ratio:' + zoomOutLevel + '; zoom: var(--zoom-ratio) !important'
	}

	function removeZoom() {
		html.style.removeProperty('zoom')
		html.style.removeProperty('--zoom-ratio')
	}
}

export const highlightMatchingText = (searchQuery, searchElements) => {
	let searchText = searchQuery.toLowerCase()

	for (let i = 0; i < searchElements.length; i++) {
		let element = searchElements[i]
		let elementText = element.textContent
		let lowercaseElementText = elementText.toLowerCase()

		if (lowercaseElementText.includes(searchText)) {
			let searchIndex = lowercaseElementText.indexOf(searchText)
			let before = elementText.substring(0, searchIndex)
			let match = elementText.substring(searchIndex, searchIndex + searchQuery.length)
			let after = elementText.substring(searchIndex + searchQuery.length)
			element.innerHTML = before + "<span class='highlight'>" + match + '</span>' + after
		}
	}
}
