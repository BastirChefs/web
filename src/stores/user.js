import { defineStore } from "pinia";
import { computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const auth = getAuth();
    const isAuthenticatedRef =  ref(auth.currentUser !== null);
    onAuthStateChanged(auth, (user) => {
        isAuthenticatedRef.value = user !== null;
    });
    const isAuthenticated = computed(() => isAuthenticatedRef.value);
    return { isAuthenticated };
});