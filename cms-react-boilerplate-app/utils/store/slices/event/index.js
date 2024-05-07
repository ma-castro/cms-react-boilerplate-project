import eventApi from '../../../apis/event'
import { getAxiosErrorData } from '../../../helpers/error-handler'
import { STORED_EVENT, STORED_EVENTS_LIST, getStorageData, setStorageData } from '../../../helpers/local-storage'

const eventSlice = (set, get) => ({
  status: 'idle',
  events: [],
  event: null,
  errorMessage: null,
  getEvents: async () => {
    const storedEvents = getStorageData(STORED_EVENTS_LIST)

    if (!!storedEvents && storedEvents.length > 0) {
      set((state) => ({ ...state, events: storedEvents }))
    } else {
      set((state) => ({ ...state, status: 'fetching', events: get().events }))
    }

    try {
      const response = await eventApi.getEvents()

      set((state) => ({ ...state, status: 'fetched', events: response.data }))

      if (response.data) {
        setStorageData(STORED_EVENTS_LIST, response.data)
      }
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', errorMessage }))
    }
  },
  getEvent: async (id) => {
    const storedEvent = getStorageData(STORED_EVENT)
    const storedEventById = storedEvent?.[id]

    if (!!storedEventById && storedEventById.length > 0) {
      set((state) => ({ ...state, event: storedEventById }))
    } else {
      set((state) => ({ ...state, status: 'fetching' }))
    }

    try {
      const response = await eventApi.getEvent(id)

      set((state) => ({ ...state, status: 'fetched', event: response.data }))

      if (response.data) {
        setStorageData(STORED_EVENT, {
          [id]: response.data
        })
      }
    } catch (error) {
      const errorMessage = getAxiosErrorData(error)
      set((state) => ({ ...state, status: 'error', errorMessage }))
    }
  }
})

export default eventSlice
