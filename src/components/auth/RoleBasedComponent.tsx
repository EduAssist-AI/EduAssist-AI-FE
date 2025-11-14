import { useAuth } from "../../hooks/useAuth";

interface RoleBasedComponentProps {
  facultyChildren?: React.ReactNode;
  studentChildren?: React.ReactNode;
  fallback?: React.ReactNode;
  showFor?: 'FACULTY' | 'STUDENT' | 'BOTH';
  children?: React.ReactNode;
}

export const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  facultyChildren,
  studentChildren,
  fallback = null,
  showFor,
  children
}) => {
  const { isFaculty, isStudent } = useAuth();

  // If specific role is required
  if (showFor) {
    if (showFor === 'FACULTY' && isFaculty) {
      return children || facultyChildren || null;
    }
    if (showFor === 'STUDENT' && isStudent) {
      return children || studentChildren || null;
    }
    if (showFor === 'BOTH' && (isFaculty || isStudent)) {
      return children || null;
    }
    return fallback;
  }

  // If specific children are provided for each role
  if (isFaculty && facultyChildren !== undefined) {
    return facultyChildren;
  }
  if (isStudent && studentChildren !== undefined) {
    return studentChildren;
  }

  // If no specific role children are provided, return default children
  if (children) {
    return children;
  }

  return fallback;
};