import CloudinaryImage from 'components/CloudinaryImage'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import hedgehogTrenchcoatPng from 'brand-hoggie-pngs/trenchcoat.png'
export const BasicHedgehogImage = () => <CloudinaryImage width={300} src={hedgehogTrenchcoatPng} />
