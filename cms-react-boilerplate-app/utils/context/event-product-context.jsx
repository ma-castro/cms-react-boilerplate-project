/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
import { useMutation, useQuery } from '@tanstack/react-query'
import { differenceInSeconds, isBefore, isWithinInterval, parseISO } from 'date-fns'
import Cookies from 'js-cookie'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import eventApi from '../apis/event'
import orderApi from '../apis/order'
import {
  STORED_CART_DATA,
  STORED_CART_EXPIRATION,
  STORED_HAS_MEMBERSHIP_PRODUCT,
  getStorageData,
  removeStorageData,
  setStorageData
} from '../helpers/local-storage'
import { extractBaseURLFromImagePath } from '../helpers/url'
import useStore from '../store'

const EventProductContext = createContext()

const EventProductProvider = ({ children, eventId = null, productAreaId = null }) => {
  const [isSalesOpen, setIsSalesOpen] = useState(false)
  const [salesRemainingTime, setSalesRemainingTime] = useState()
  const [shouldPostCloseText, setShouldPostCloseText] = useState(false)
  const [salesCloseText, setSalesCloseText] = useState('')
  const [displayMiniCart, setDisplayMiniCart] = useState(false)

  const storedCartData = getStorageData(STORED_CART_DATA)
  const storedCartExpiration = getStorageData(STORED_CART_EXPIRATION)

  const { setDisplayFullPageLoader, cartExpirationCountDown, setCartExpirationCountDown } = useStore((state) => ({
    setDisplayFullPageLoader: state.setDisplayFullPageLoader,
    cartExpirationCountDown: state.cartExpirationCountDown,
    setCartExpirationCountDown: state.setCartExpirationCountDown
  }))

  const { mutate: createOrder } = useMutation({
    mutationFn: (payload) => orderApi.createOrder(payload),
    onMutate: () => {
      setDisplayFullPageLoader(true)
    },
    onSuccess: (response) => {
      setStorageData(STORED_CART_DATA, response?.data ?? {})
      setStorageData(STORED_CART_EXPIRATION, response?.data?.cart_expiration)
      setDisplayFullPageLoader(false)
      setDisplayMiniCart(true)
    },
    onError: (error) => {
      setDisplayFullPageLoader(false)
      console.log('##createOrder error', error)
    }
  })

  const { mutate: addItemToCart } = useMutation({
    mutationFn: (payload) => orderApi.addItemToCart(payload),
    onMutate: () => {
      setDisplayFullPageLoader(true)
    },
    onSuccess: (response) => {
      setStorageData(STORED_CART_DATA, response?.data ?? {})
      setDisplayFullPageLoader(false)
      setDisplayMiniCart(true)
    },
    onError: (error) => {
      setDisplayFullPageLoader(false)
      console.log('##createOrder error', error)
    }
  })

  const { mutate: updateItemQtyInCart } = useMutation({
    mutationFn: (payload) => orderApi.updateItemQtyInCart(payload),
    onMutate: () => {
      setDisplayFullPageLoader(true)
    },
    onSuccess: (response) => {
      setStorageData(STORED_CART_DATA, response?.data ?? {})
      setDisplayFullPageLoader(false)
      setDisplayMiniCart(true)
    },
    onError: (error) => {
      setDisplayFullPageLoader(false)
      console.log('##createOrder error', error)
    }
  })
  const {
    data: eventData,
    status: eventStatus,
    fetchStatus: eventFetchStatus,
    error: eventError
  } = useQuery({
    enabled: !!eventId,
    queryKey: ['event', eventId],
    queryFn: () => eventApi.getEvent(eventId),
    select: (responseData) => {
      const event = responseData?.data?.[0]
      const baseImagePath = extractBaseURLFromImagePath(event?.img_path ?? '')

      const eventProducts = event?.product?.map(
        ({
          product_id,
          product_name,
          product_category_name,
          short_description,
          product_description,
          product_link,
          product_delivery_method,
          price,
          vat,
          product_image,
          min_purchase,
          max_purchase
        }) => ({
          product_id,
          product_name,
          product_category_name,
          short_description,
          product_description,
          product_link,
          product_delivery_method,
          price,
          vat,
          image_path: `${baseImagePath}/${product_image}`,
          min_purchase,
          max_purchase
        })
      )

      const eventProductAreaProducts = eventProducts?.filter((e) => e.product_area_id === productAreaId)

      return {
        event,
        eventProducts,
        eventProductAreaProducts
      }
    }
  })

  const eventIsLoading = eventStatus === 'pending' && eventFetchStatus === 'fetching'
  const eventErrorMessage = eventStatus === 'error' ? eventError?.response?.data?.message : null

  const memoizedCartData = useMemo(() => {
    if (!!storedCartData && storedCartData?.line_items?.length > 0) {
      return {
        ...storedCartData,
        line_items: [
          ...storedCartData?.line_items?.map((item) => {
            const product = eventData?.eventProducts?.find((e) => e.product_id === item.product_id)
            const { min_purchase, max_purchase } = product ?? {}

            return { ...item, min_purchase, max_purchase }
          })
        ]
      }
    }
    return null
  }, [JSON.stringify(storedCartData)])

  const memoizedCartItemsCount = useMemo(
    () => storedCartData?.line_items?.reduce((total, curr) => total + parseInt(curr?.quantity), 0),
    [JSON.stringify(storedCartData)]
  )

  const onCartExpire = async () => {
    Cookies.remove('ft-order_id')
    Cookies.remove('ft-order_uuid')
    removeStorageData(STORED_CART_DATA)
    removeStorageData(STORED_CART_EXPIRATION)
    removeStorageData(STORED_HAS_MEMBERSHIP_PRODUCT)
    setDisplayMiniCart(false)
  }

  useEffect(() => {
    if (storedCartExpiration) {
      const remainingInSeconds = differenceInSeconds(storedCartExpiration, new Date())
      setCartExpirationCountDown(remainingInSeconds)
    }
  }, [])

  useEffect(() => {
    if (storedCartExpiration) {
      const intervalId = setInterval(() => {
        const remainingInSeconds = differenceInSeconds(storedCartExpiration, new Date())

        if (displayMiniCart) {
          setCartExpirationCountDown(remainingInSeconds)
        }

        if (remainingInSeconds <= 0) {
          clearInterval(intervalId)
          onCartExpire()
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [storedCartExpiration, displayMiniCart])

  useEffect(() => {
    if (eventData?.event) {
      const now = new Date()
      const startDate = parseISO(eventData?.event?.open_sales_datetime)
      const endDate = parseISO(eventData?.event?.close_sales_datetime)
      const isWithinTime = isWithinInterval(now, { start: startDate, end: endDate })

      if (isWithinTime) {
        const remainingSalesTime = differenceInSeconds(endDate, now)

        const shouldPostText = isBefore(parseISO(eventData?.event?.close_postage_datetime), now)

        setIsSalesOpen(true)
        setSalesRemainingTime(remainingSalesTime)

        if (shouldPostText) {
          setShouldPostCloseText(true)
          setSalesCloseText(eventData?.event?.sales_closed_text)
        }
      }
    }
  }, [eventData?.event])

  const handleUpdateItemQuantity = async (quantity, item) => {
    const payload = {
      id: item?.id,
      event_id: item?.event_id,
      product_id: item?.product_id,
      quantity: parseInt(quantity)
    }

    updateItemQtyInCart(payload)
  }

  const handleAddToCart = async ({ product_category, ...payload }) => {
    const orderId = Cookies.get('ft-order_id') ?? ''
    const orderUUID = Cookies.get('ft-order_uuid') ?? ''

    if (product_category === 'Membership') {
      setStorageData(STORED_HAS_MEMBERSHIP_PRODUCT, true)
      // TODO: if the feature of removing item to cart was enabled, stored membership product should be checked
    }

    if (!orderId || !orderUUID) {
      createOrder(payload)
    } else {
      const lineItem = memoizedCartData?.line_items?.find(
        (e) => parseInt(e.event_id) === parseInt(eventId) && parseInt(e.product_id) === parseInt(payload?.product_id)
      )

      if (lineItem) {
        const newQuantity = parseInt(lineItem?.quantity) + payload?.quantity

        updateItemQtyInCart({ ...payload, id: lineItem?.id, quantity: newQuantity })
      } else {
        addItemToCart(payload)
      }
    }
  }

  return (
    <EventProductContext.Provider
      value={{
        cartExpirationCountDown,
        displayMiniCart,
        eventId,
        eventData,
        eventIsLoading,
        eventErrorMessage,
        isSalesOpen,
        memoizedCartData,
        memoizedCartItemsCount,
        productAreaId,
        salesCloseText,
        salesRemainingTime,
        shouldPostCloseText,
        storedCartExpiration,
        onCartExpire,
        setDisplayMiniCart,
        handleAddToCart,
        handleUpdateItemQuantity
      }}
    >
      {children}
    </EventProductContext.Provider>
  )
}

const useEventProduct = () => {
  const context = useContext(EventProductContext)
  if (context === undefined) {
    throw new Error('useEventProduct must be used within a EventProductProvider')
  }
  return { ...context }
}

export { EventProductProvider, useEventProduct }
