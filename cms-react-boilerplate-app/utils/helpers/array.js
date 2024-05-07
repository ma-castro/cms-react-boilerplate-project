export const generateQuantityOptions = (minPurchaseQty, maxPurchaseQty) => {
  const min = parseInt(minPurchaseQty) || 0
  const max = parseInt(maxPurchaseQty) || 0

  if (min === 0 && max === 0) {
    return Array.from({ length: 20 }, (_, i) => i + 1)
  } else if (min > 0 && max === 0) {
    return Array.from({ length: 20 - min + 1 }, (_, i) => i + min)
  } else {
    return Array.from({ length: max - min + 1 }, (_, i) => i + min)
  }
}

const order = ['Full Membership', 'Member Guest Card', 'Giddy Up club', 'Saddle Club']

const customSort = (a, b) => {
  const indexA = order.indexOf(a.ordered_product_name)
  const indexB = order.indexOf(b.ordered_product_name)
  if (indexA === indexB) {
    return a.ordered_product_name.localeCompare(b.ordered_product_name)
  }
  return indexA - indexB
}

export const sortMembershipProducts = (products) => {
  return products.sort(customSort)
}
