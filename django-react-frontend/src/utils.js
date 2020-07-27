import { notification } from 'antd'
import Constants from './constants'
import axios from 'axios'


/**
 * Axios wrapper
 */
const fetchJson = axios.create({
  baseURL: Constants.BACKEND_URL
})
if (localStorage.getItem('token'))
  fetchJson.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}`
fetchJson.defaults.headers.common['Content-Type'] = 'application/json'


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
