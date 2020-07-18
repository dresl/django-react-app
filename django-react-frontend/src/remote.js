import Constants from './constants'

const fetchJson = async (endpoint, host=Constants.BACKEND_URL, method='GET', headers={}, body=null) => {
	const response = await fetch(host + endpoint, { method, headers, body })
	return response.status === 200 ? await response.json() : {}
}

export default fetchJson
