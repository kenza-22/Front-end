import React from 'react';
import ReactDOM from 'react-dom/client'; 
import 'tailwindcss/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
 
import App from './App';
 
import { PublicClientApplication, EventType } from '@azure/msal-browser'; //A reviser
 
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'; //A reviser
import Landing from './pages/Landing';

 
const pca = new PublicClientApplication({
    auth: {
        clientId: '716fa805-d117-44b8-8d9a-f6443efba185',
        authority: 'https://login.microsoftonline.com/fe013626-9e98-4cbe-b49e-c5848b622c2d/oauth2/v2.0/authorize',
        redirectUri: 'http://localhost:3000/'
    }
}); //A reviser
 
pca.addEventCallback(event => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    }
}); //A reviser
 
const root = ReactDOM.createRoot(document.getElementById('root')); //A reviser
root.render( 
    <React.StrictMode>
        <BrowserRouter>
            <MsalProvider instance={pca}>
                <AuthenticatedTemplate>
                    <App/>
                </AuthenticatedTemplate> 
                <UnauthenticatedTemplate>
                    <Landing />
                </UnauthenticatedTemplate>
            </MsalProvider>
        </BrowserRouter>
    </React.StrictMode>
);