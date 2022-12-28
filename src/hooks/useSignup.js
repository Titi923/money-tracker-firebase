import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext()

  const signup = async (displayName, email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // signup user
      const response = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!response) {
          throw new Error("Could not complete signup")
      }
      // add display name to user after creating it
      await response.user.updateProfile({ displayname: displayName })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })

      setIsPending(false)
      setError(null)
    }
    catch (err) {
      console.log(err.message);
      setError(err.message)
      setIsPending(false)
    }
  }
  
  return { error, isPending, signup }
}