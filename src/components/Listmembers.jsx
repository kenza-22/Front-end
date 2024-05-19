import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function ListMembers(){
  const [data, setData] = useState({ value: [] });
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(groupId){
      axios
      .get(`http://localhost:5000/group/members/${groupId}`)
      .then((res) => {
        console.log("Membres:", res.data.members.value);
        setData(res.data.members.value);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
        setLoading(false);
      });
    }
   
  }, [groupId]);
   return(
    <>
     {loading ? ( 
       <div className="flex items-center justify-center min-h-screen">
       <div className="loader"></div>;
       </div>
      ) :(
        <div className="flex items-center justify-center min-h-screen pt-35">
          <div className="sm:flex sm:items-center">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Membres
                  </h1>
                </div>
               
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Nom d'affichage
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                             Nom principal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {data.map((user, i) => (
                            <tr key={i}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {i+1}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {user.displayName}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {user.userPrincipalName}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}

    </>
   );
}
export default ListMembers;