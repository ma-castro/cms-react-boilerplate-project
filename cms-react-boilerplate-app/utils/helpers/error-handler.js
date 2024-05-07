import { isAxiosError } from 'axios'

const UNKNOWN_ERROR = 'Unknown error!'

export const getAxiosErrorData = (error) => {
  if (isAxiosError(error)) {
    const errorResponse = error?.response?.data?.error || error?.response?.data || UNKNOWN_ERROR
    if (errorResponse) {
      return errorResponse
    }
  }

  return {
    status_code: 500,
    message: 'Unknown error'
  }
}
