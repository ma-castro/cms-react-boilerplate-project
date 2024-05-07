export const productAreaNameToPath = (name) => {
  return name.toLowerCase().replace(/ /g, '-')
}

export const maskEmail = (email) => {
  const [localPart, domain] = email.split('@')
  const maskedLocalPart = localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1)
  return `${maskedLocalPart}@${domain}`
}
