import {createContext, useContext, useEffect, useState} from "react";
import {getMe, loginUser, logoutUser} from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUser();
  }, []);

  // Lấy user từ API /auth/me (dựa vào cookie)
  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const applySessionUser = (sessionUser) => {
    if (user && user.id !== sessionUser.id) {
      localStorage.removeItem(`selectedAddress_${user.id}`);
    }
    setUser(sessionUser);
    return sessionUser;
  };

  const refreshUser = async () => {
    const res = await getMe();
    return applySessionUser(res.data.user);
  };

  const login = async (credentials) => {
    await loginUser(credentials);
    return refreshUser();
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      
      // Xóa localStorage khi logout để reset về trạng thái ban đầu
      if (user) {
        localStorage.removeItem(`selectedAddress_${user.id}`);
        console.log('🧹 Cleared selectedAddress from localStorage on logout');
      }
    } catch (err) {
      console.error("Error logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{user, login, logout, refreshUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
