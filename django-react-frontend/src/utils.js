import { notification } from 'antd';
import Constants from './constants'

/**
 * Wrapper over javascript fetch function
*/
const fetchJson = async (endpoint, headers = {}, method = 'GET', body = null, host = Constants.BACKEND_URL) => {
  let response = await fetch(host + endpoint, { method, headers, body })
  return response.status === 200 ? { data: await response.json(), status: 200 } : { status: response.status }
}


/**
 * Ant design notification manager
*/
class NotificationService {

  static openNotification = (type, message, placement='bottomRight') => {
    switch (type) {
      case 'success':
        notification.success({
          message,
          placement
        })
        break
      case 'error':
        notification.error({
          message,
          placement
        })
        break
      case 'info':
        notification.info({
          message,
          placement
        })
        break
      case 'warning':
        notification.warning({
          message,
          placement
        })
        break
      default:
        notification.info({
          message,
          placement
        })
    }
  }
}

export { fetchJson, NotificationService }
