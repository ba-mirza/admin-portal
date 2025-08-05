import { computed } from "vue"
import { authStore } from "../stores/auth"
import type { LoginCredentials } from "../types/auth"

export const useAuth = () => {
    return {
        user: computed(() => authStore.user),
        isAuthenticated: computed(() => authStore.isAuthenticated),
        loading: computed(() => authStore.loading),

        login: (credentials: LoginCredentials) => authStore.login(credentials),
        logout: () => authStore.logout(),
    }
}