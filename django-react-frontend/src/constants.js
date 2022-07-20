const { REACT_APP_API_URL, REACT_APP_WEBSOCKET_URL } = process.env

const Constants = {
    BACKEND_URL: REACT_APP_API_URL ?? 'http://127.0.0.1:8000',
    WEBSOCKET_URL: REACT_APP_WEBSOCKET_URL ?? 'ws://127.0.0.1:8000'
}

export default Constants
