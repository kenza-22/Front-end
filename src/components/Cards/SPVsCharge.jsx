import React from "react";
import Effort from "../../pages/Images/effort.png"
function SPVsCharge() {
  return (
    <div>
      <dl className="mt-0 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <div
            className="relative overflow-hidden rounded-lg bg-white px-3 pb-3 pt-3 shadow sm:px-6 sm:pt-3"
          >
            <dt>
              <div className="ml-3 absolute rounded-md bg-indigo-500 p-3">
                <img  class="h-6 w-6 text-white" src={Effort}/>
              
              </div>
              <p className="mt-5 ml-20 truncate text-sm font-medium text-gray-500">Points Effort VS Charge</p>
            </dt>
            <dd className="ml-20 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">71,897</p>
            </dd>
          </div>
      </dl>
    </div>
  )
}
export default SPVsCharge;