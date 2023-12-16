<script setup>
import { getAuth, signOut } from 'firebase/auth'
import router from '../router'
const auth = getAuth()

const logout = () => {
  signOut(auth)
    .then(() => {
        router.push('/login')
        console.log('Success')
    })
    .catch((error) => {
      console.log(error)
    })
}

import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  logout()
})
</script>
