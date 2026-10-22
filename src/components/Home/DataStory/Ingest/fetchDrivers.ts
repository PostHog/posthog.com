const CLOUDINARY = 'https://res.cloudinary.com/dmukukwp6/image/upload'
const PIXEL_DENSITY = 2
const ARROW_PHOTO = { id: 'DSCF_1680_77451171e6.JPG', crop: 'c_crop,w_480,h_480,x_320,y_420' }

export const ARROW = { name: 'Arrow', breed: 'Golden retriever', rating: '5.0' } as const

export const arrowHeadshot = (size: number): string =>
    `${CLOUDINARY}/${ARROW_PHOTO.crop}/c_scale,w_${size * PIXEL_DENSITY}/q_auto,f_auto/${ARROW_PHOTO.id}`
