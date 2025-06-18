import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { authService } from '@/services/auth.service'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuthenticated = authService.isAuthenticated()
  const isAuthRoute = to.name === 'login'

  if (!isAuthenticated && !isAuthRoute) {
    next({ name: 'login' })
  } else if (isAuthenticated && isAuthRoute) {
    next({ name: 'home' })
  } else {
    next()
  }
} 