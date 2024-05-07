import { useEffect, useRef } from 'react'

const useIsMounted = () => {
  const isMountRef = useRef(false)
  useEffect(() => {
    isMountRef.current = true
  }, [])
  return isMountRef.current
}

export default useIsMounted
