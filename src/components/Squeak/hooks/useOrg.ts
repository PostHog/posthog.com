import { useContext } from 'react'
import { Context } from '../context/org'

export const useOrg = () => {
  const org = useContext(Context)
  if (org === undefined) {
    throw Error('No org has been specified using Provider')
  }
  return org
}
