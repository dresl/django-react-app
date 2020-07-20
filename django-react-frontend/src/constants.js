const { REACT_APP_API_URL } = process.env

const Constants = {
    BACKEND_URL: REACT_APP_API_URL ?? 'http://localhost:8000',
}

export default Constants
