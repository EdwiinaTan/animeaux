export interface AuthProps {
  userId: string
  isLoading: boolean
  loginUser: (email: string, password: string) => void
  logoutUser: () => void
}
