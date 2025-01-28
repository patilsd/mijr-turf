export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  isLead: boolean;
}



export interface AuthState {
  isAuthenticated: boolean;
  user: {
    firstName: string
    lastName: string;
    mobile: string;
    teamName: string;
  } | null;
}