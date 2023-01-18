import { showAlert } from "react-native-customisable-alert"

export default function ApiErrorHandler(message, callback) {
    console.log('rejectedValue: ', message)
    showAlert({
      title: 'Something went wrong!!',
      message: message,
      alertType: 'error'
    })
    callback && callback()

}