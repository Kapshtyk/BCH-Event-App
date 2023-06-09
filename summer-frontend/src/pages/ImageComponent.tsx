import React from 'react'

const ImageComponent = ({ base64Image }: { base64Image: string }) => {
  const imageUrl = `data:image/jpeg;base64,${base64Image}`

  return <img src={imageUrl} alt="Decoded" />
}

export default ImageComponent
