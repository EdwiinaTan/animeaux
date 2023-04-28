import { createContext, useMemo, useState } from 'react'
import { useGetUsers } from 'src/hooks/User'

interface AuthProps {
  userId: string
  token: string
  isLoading: false
}

const initialContext: AuthProps = {
  userId: '',
  token: '',
  isLoading: false,
}

export const AuthContext = createContext(initialContext)

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState()
  const { statusUsers, usersData } = useGetUsers()

  const value = useMemo(() => {
    return {
      userId,
      token,
      isLoading,
    }
  }, [userId, token, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
