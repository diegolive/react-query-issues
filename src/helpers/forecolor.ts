
export const forecolor = (
    backgroundColor: string,
    defaultDarkColor: string = '000000',
    defaultLightColor: string = 'e7e7e7'
) => {
  
  const red = parseInt(backgroundColor.substring(0,2),16)
  const green = parseInt(backgroundColor.substring(2,4),16)
  const blue = parseInt(backgroundColor.substring(4,6),16)
  
  const brightness = red*0.299 + green*0.587 + blue*0.114
  
  if (brightness>180) 
    return defaultDarkColor
  
  return defaultLightColor 

}

