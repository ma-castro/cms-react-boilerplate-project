import { DEFAULT_CURRENCY_CODE, DEFAULT_LOCALES } from '../contants'

export const formatCurrency = (amount = 0, locales = DEFAULT_LOCALES, currencyCode = DEFAULT_CURRENCY_CODE) => {
  const formatter = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currencyCode
  })

  return formatter.format(amount)
}
