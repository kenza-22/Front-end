import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
//import { Route, Navigate  } from "react-router-dom";

const UserInfo = () => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await instance.acquireTokenSilent({
          scopes: ["User.Read"],
          account: accounts[0]
        });

        const userAccount = accounts[0];
        setUser(userAccount);
        setAccessToken(response.accessToken);

        fetch("https://graph.microsoft.com/v1.0/me/memberOf?$select=displayName", {
          headers: {
            Authorization: `Bearer ${response.accessToken}`
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.value ) {
              const displayNames = data.value.map(group => group.displayName);
              console.log("roleeeeeee:",displayNames)
              setRoles(displayNames);
              localStorage.setItem("roles", JSON.stringify(displayNames));
            }
          })
          .catch(error => {
            console.error("Error retrieving group info:", error);
          });
      } catch (error) {
        console.error("Error retrieving user info:", error);
      }
      return roles
    };

    if (accounts.length > 0) {
      getUserInfo();
    }
    console.log("tttttttttttttttttttttttttt",roles)
   // return roles
  }, [instance, accounts]);
 /*if(roles=="Manager"){
    return <Navigate to="/Dashboard2"/>
  }else if (roles=="Administrateur"){
    return <Navigate to="/Dashboard"/>
  }*/

  return (
    <div>
      {user && (
        <div>
          <h1>Hello, {user.name}</h1> 
        </div>
      )}
    </div>
  );
};

export default UserInfo;