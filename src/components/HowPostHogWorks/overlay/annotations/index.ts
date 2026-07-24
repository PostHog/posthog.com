import { Annotation } from '../types'
import { rideAnnotations } from './ride'
import { highwayAnnotations } from './highway'
import { safetyAnnotations } from './safety'

export const ANNOTATIONS: Annotation[] = [...rideAnnotations, ...highwayAnnotations, ...safetyAnnotations]
