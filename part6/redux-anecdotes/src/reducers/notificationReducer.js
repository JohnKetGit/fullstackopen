import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        displayNotification(state, action) {
            console.log('action: ', JSON.parse(JSON.stringify(action)))

            return action.payload
        },
        clearNotification(state, action) {
            console.log('action: ', JSON.parse(JSON.stringify(action)))

            return ''
        }
    }
})

export const setNotification = (text, timeout) => {
    return dispatch => {
        dispatch(displayNotification(text))
        
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000) 
    }
}

export const { displayNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
