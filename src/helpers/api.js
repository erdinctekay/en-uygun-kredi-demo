const apiMethod = (method, body = '', contentType = 'application/json') => {
	let methods = {
		GET: {
			method: method,
			headers: {
				'Content-Type': contentType,
			},
		},
		DELETE: {
			method: method,
			headers: {
				'Content-Type': contentType,
			},
		},
		POST: {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': contentType,
			},
		},
		PUT: {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': contentType,
			},
		},
		PATCH: {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': contentType,
			},
		},
	}

	return methods[method]
}

export { apiMethod }
