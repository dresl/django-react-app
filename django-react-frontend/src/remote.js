import Constants from './constants';

const fetchJson = async (endpoint) => {
	const response = await fetch(Constants.BACKEND_URL + endpoint)
	return await response.json()
}

export default fetchJson;
