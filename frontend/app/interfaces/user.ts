export interface User extends Record<string, unknown> {
    id: number;
    name: string;
    email: string;
}

export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    githubAccess: boolean;
    token: string | null;
    githubToken: string | null;
    error: string | null;
    user: User | null;
}

export interface ApiUser {
    user_id: number;
    user_name: string;
    user_email: string;
  }

