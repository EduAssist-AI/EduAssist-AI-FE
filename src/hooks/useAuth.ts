import { useAppSelector } from "../store/hooks";

export const useAuth = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!token;
  const isFaculty = user?.role === 'FACULTY';
  const isStudent = user?.role === 'STUDENT';
  const role = user?.role;

  return {
    user,
    token,
    isAuthenticated,
    isFaculty,
    isStudent,
    role
  };
};