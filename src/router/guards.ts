import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { authStore } from "../stores/auth";

export const requireAuth = (
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) => {
  if (authStore.isAuthenticated && authStore.isTokenValid()) {
    next();
  } else {
    next('/auth');
  }
};