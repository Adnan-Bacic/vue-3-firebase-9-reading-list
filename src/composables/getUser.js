import { ref } from "vue";
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const user = ref(auth.currentUser)

//auth changes
onAuthStateChanged(auth, (currentAuthUser) => {
    console.log('cau', currentAuthUser)
    user.value = currentAuthUser
})

const getUser = () => {
    return {
        user
    }
}

export default getUser
