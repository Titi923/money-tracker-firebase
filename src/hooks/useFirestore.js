import { useReducer, useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
} 

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null}   
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }  
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }  
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  // FOR CLEANUP FUNCTION
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch if not canceled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const addedDocument = await ref.add(doc)
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    
  }
  
  // FOR CLEANUP FUNCTION
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])
    
  return { addDocument, deleteDocument, response }
}