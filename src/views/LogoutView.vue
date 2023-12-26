<script>
import { getAuth, signOut } from 'firebase/auth'
import router from '../router'

const logout = () => {
  signOut(getAuth())
    .then(() => {
        router.push('/login')
        console.log('Success')
    })
    .catch((error) => {
      console.log(error)
    })
}
export { logout }
</script>

<script setup>


import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  logout()
})
</script>
