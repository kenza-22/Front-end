import {useMsal} from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
export const SignInButton = () => {
    const {instance} = useMsal();
    const navigate = useNavigate();
    const handleSignIn = () => {
        instance.loginRedirect({
            scopes: ['user.read']
        })
        .then(()=>{
        console.log("naviagte with success")
        })
        .catch(error=>{
        console.log('Error during login', error)
        });
    }
    return (
        <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900" onClick={handleSignIn}>Se connecter</button>
    )
};