export interface AuthProps {
  userId: string
  userToken: string
  isLoading: boolean
  loginUser: (email: string, password: string) => void
  logoutUser: () => void
}
