export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
  const remainingSeconds = timeInSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}
