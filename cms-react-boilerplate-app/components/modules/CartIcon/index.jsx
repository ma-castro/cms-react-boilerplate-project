import { Island } from '@hubspot/cms-components'
import React from 'react'

import CartIcon from '../../islands/CartIcon/index.jsx?island'

export const Component = ({ fieldValues, hublParameters }) => {
  return <Island module={CartIcon} hydrateOn='load' fieldValues={fieldValues} hublParameters={hublParameters} />
}

export { fields } from './fields.jsx'

export const meta = {
  name: 'cart_icon',
  label: 'Cart Icon'
}
