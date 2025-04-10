import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: "1",
        name: "Demo User",
        email: email,
        avatar: "https://bit.ly/dan-abramov",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful registration
      const mockUser = {
        id: "1",
        name,
        email,
        avatar: "https://bit.ly/dan-abramov",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
