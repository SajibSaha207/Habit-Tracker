// ✅ সঠিক
import { createContext, useState } from 'react'

export const AuthContext = createContext()  // ← বাইরে রাখো, null দাও

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const authInfo = {
    user,
    setUser,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider