import { Annotation } from '../types'
import { rideAnnotations } from './ride'
import { highwayAnnotations } from './highway'
import { helpAnnotations } from './help'
import { safetyAnnotations } from './safety'

export const ANNOTATIONS: Annotation[] = [
    ...rideAnnotations,
    ...highwayAnnotations,
    ...helpAnnotations,
    ...safetyAnnotations,
]
