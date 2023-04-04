const apiMethod = (method, body = '') => {
	let methods = {
		GET: {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': accessToken,
			},
		},
		DELETE: {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': accessToken,
			},
		},
		POST: {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': accessToken,
			},
		},
		PUT: {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': accessToken,
			},
		},
		PATCH: {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': accessToken,
			},
		},
	}

	return methods[method]
}

export { apiMethod }
