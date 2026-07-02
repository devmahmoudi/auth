import { useNavigate } from "react-router";
import LoginForm from "../../components/login-form";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
    const {signIn} = useAuth()

    const navigate = useNavigate()

    const handleOnSubmit = async (credentials: {email: string, password: string}) => {
        try{
            const result = await signIn(credentials)

            navigate("/")
        } catch (error) {
            console.error(error);
        }     
    }

    return <LoginForm onSubmit={handleOnSubmit}/>
}