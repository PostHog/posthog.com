import { useContext } from 'react'
import { Context } from '../context/question'

export const useQuestion = () => {
  const question = useContext(Context)
  return question
}
