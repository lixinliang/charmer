export const read = (file?: File) => {
  return new Promise<string>((resolve, reject) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result
        if (result) {
          resolve(`${result}`)
        }
      }
      reader.onerror = () => {
        reject()
      }
      reader.readAsDataURL(file)
    }
  })
}

export const createImage = (base64: string) => {
  return new Promise<{
    img: HTMLImageElement,
    width: number,
    height: number,
  }>((resolve) => {
    const img = document.createElement('img')
    img.onload = () => {
      const {
        width,
        height,
      } = img
      resolve({
        img,
        width,
        height,
      })
    }
    img.src = base64
  })
}

export const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')!
  return {
    canvas,
    context
  }
}
