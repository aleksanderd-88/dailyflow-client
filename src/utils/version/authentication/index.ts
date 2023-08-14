import { useCurrentUserStore } from "@/stores/current-user"

export const userIsLoggedIn = () => {
  return Boolean(Object.keys(useCurrentUserStore().currentUser || {}).length)
}