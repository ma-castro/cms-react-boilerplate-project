export const extractBaseURLFromImagePath = (path) => {
  return new URL(path).origin
}
