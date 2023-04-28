export interface AuthProps {
  userId: string
  isLoading: boolean
  loginUser: (passwortd: string) => void
  logoutUser: () => void
}
