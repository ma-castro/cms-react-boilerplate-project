export const sortByDateExpiry = (data) => {
  return data.sort((a, b) => new Date(a.date_expire) - new Date(b.date_expire))
}
