export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeFileEnding(str) {
  return str.replace(/\.[^/.]+$/, "")
}


// Builds array of Site objects from array of img path strings
export function splitImgListBySitePrefix(imgPathList) {
  const arr = []
  for (const imgPath of imgPathList) {
    const siteName = imgPath.replace(/^.*[\\\/]/, '').split('-').slice(0, 1)[0]
    const idx = arr.findIndex((obj) => obj.siteName === siteName)
    if (idx === -1) {
      arr.push({
        siteName: siteName,
        siteImgList: [imgPath]
      })
    } else {
      arr[idx].siteImgList.push(imgPath)
    }
  }
  return arr
}