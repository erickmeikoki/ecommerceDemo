import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useToast } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		// Check active sessions
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) throw error;

			if (data?.user) {
				setUser(data.user);
				navigate("/");
				toast({
					title: "Welcome back!",
					status: "success",
					duration: 3000,
					isClosable: true
				});
			}
		} catch (error) {
			console.error("Login failed:", error);
			toast({
				title: "Login failed",
				description:
					error instanceof Error
						? error.message
						: "Please check your credentials",
				status: "error",
				duration: 3000,
				isClosable: true
			});
			throw error;
		}
	};

	const register = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password
			});

			if (error) throw error;

			if (data?.user) {
				setUser(data.user);
				navigate("/");
				toast({
					title: "Welcome!",
					description: "Please check your email to confirm your account",
					status: "success",
					duration: 5000,
					isClosable: true
				});
			}
		} catch (error) {
			console.error("Registration failed:", error);
			toast({
				title: "Registration failed",
				description:
					error instanceof Error ? error.message : "Please try again",
				status: "error",
				duration: 3000,
				isClosable: true
			});
			throw error;
		}
	};

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			setUser(null);
			navigate("/login");
			toast({
				title: "Logged out successfully",
				status: "success",
				duration: 2000,
				isClosable: true
			});
		} catch (error) {
			console.error("Logout failed:", error);
			toast({
				title: "Logout failed",
				description:
					error instanceof Error ? error.message : "Please try again",
				status: "error",
				duration: 3000,
				isClosable: true
			});
		}
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
