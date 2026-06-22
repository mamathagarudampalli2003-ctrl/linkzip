import { useAuth as useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  const {
    user,
    token,
    login,
    logout,
    loading,
  } = useAuthContext();

  return {
    user,
    token,
    login,
    logout,
    loading,
  };
}