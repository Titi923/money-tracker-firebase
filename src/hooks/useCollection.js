import { useEffect, useState, useRef } from 'react'
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query) => {
  const [documents, setDocuments] = useState(null)  
  const [error, setError] = useState(null)  

  const query = useRef(_query).current
  
  useEffect(() => {
    let ref = projectFirestore.collection(collection)

    // if we don't use a ref --> infinite loop in useEffect
    // _query is an array and is "different" on every function call
    if (query) {
      ref = ref.where(...query)
    }

    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update states
      setDocuments(results)
      setError(null)
    }, (error) => {
      console.log(error);
      setError('Could not fetch teh data');
    })

    // unsubscribe on unmount
    return () => unsubscribe()
    
  }, [collection, query])

  return { documents, error }
}