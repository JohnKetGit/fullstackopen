import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  return (
    <Alert variant={notification[1]}>
      {notification[0]}
    </Alert>
  )
}

export default Notification
