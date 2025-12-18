export interface RegistrationFormProps {
  // user: string;
  // userPassword: string;
  // email: string;
  loggedIn: boolean;
  mode: "register" | "login";
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
