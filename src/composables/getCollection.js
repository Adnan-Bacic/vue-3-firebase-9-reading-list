import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const getCollection = (fireStoreCollection, firestoreQuery) => {
    const documents = ref(null)

    //collection reference
    let colRef = collection(db, fireStoreCollection)

    if (firestoreQuery){
        colRef = query(colRef, where(...firestoreQuery))
    }

    //real-time listener
    const unsubscribe = onSnapshot(colRef, snapshot => {
        let results = []

        snapshot.docs.forEach((doc) => {
            console.log('doc', doc)
            console.log('doc.data', doc.data())

            results.push({
                ...doc.data(),
                id: doc.id
            })
        })

        //update values
        documents.value = results
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe())
    })

    return {
        documents
    }
}

export default getCollection
