import { useAfterIslandHydration } from '@hubspot/cms-components'
import React from 'react'

import Wrapper from '../../Wrapper'
import CartIconContainer from '../../container/CartIcon'

const CartIcon = ({ hublParameters: { event_id: eventId, product_area_id: productAreaId } }) => {
  const afterHydration = useAfterIslandHydration()

  if (!afterHydration) return <></>

  return (
    <Wrapper eventId={eventId} productAreaId={productAreaId}>
      <CartIconContainer />
    </Wrapper>
  )
}

export default CartIcon
