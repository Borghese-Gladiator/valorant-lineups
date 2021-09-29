export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeFileEnding(str) {
  return str.replace(/\.[^/.]+$/, "")
}