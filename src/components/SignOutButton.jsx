import { useMsal } from '@azure/msal-react';
export const SignOutButton = () => {
    const {instance} = useMsal();

    const handleSignOut = () => {
        instance.logoutRedirect();
    }
    return (
        <li>
        <a
          href="#"
          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-blue-800 hover:text-white"
          onClick={handleSignOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Sign out
        </a>
      </li>
      
    )
};