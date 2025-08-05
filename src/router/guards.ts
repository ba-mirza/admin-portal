import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { authStore } from "../stores/auth";

export const requireAuth = (
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) => {
  if (authStore.isAuthenticated) {
    next();
  } else {
    next('/login');
  }
};

export const requireGuest = (
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) => {
  if (!authStore.isAuthenticated) {
    next();
  } else {
    next('/dashboard');
  }
}