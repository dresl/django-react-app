import Constants from './constants'

/**
 * Wrapper over javascript fetch function
*/
const fetchJson = async (endpoint, headers={}, method='GET', body=null, host=Constants.BACKEND_URL) => {
	let response = await fetch(host + endpoint, { method, headers, body })
	return response.status === 200 ? await response.json() : null
}

export default fetchJson
