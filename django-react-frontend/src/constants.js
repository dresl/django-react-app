const { REACT_APP_API_URL, REACT_APP_WEBSOCKET_URL } = process.env

const Constants = {
    BACKEND_URL: REACT_APP_API_URL ?? 'http://localhost:8000',
    WEBSOCKET_URL: REACT_APP_WEBSOCKET_URL ?? 'ws://localhost:8000'
}

export default Constants
