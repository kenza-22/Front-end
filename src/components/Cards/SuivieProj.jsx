import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function SuivieProj({selected}) {
  const [ticketEstime, setTicketEstime] = useState(null);
  const [ticketNonEstime, setTicketNonEstime] = useState(null);
  const [EffortTrait, setEffortTrait] = useState(null);
  const [Pourcentage, setPourcentage]= useState(null);

  useEffect(() => {
    if (selected !== "Select a project") {
      axios
        .get(`http://localhost:5000/tickets/${selected}/kpi`)
        .then((res) => {
          console.log("Tickets estimés et non estimés :", res.data);
          setTicketEstime(res.data.TicketEstime);
          setTicketNonEstime(res.data.TicketNonEstime);
        })
        .catch((err) => console.log(err));
      
    }
  }, [selected]);

  useEffect(() => {
    if (selected !== "Select a project") {
      axios.get(`http://localhost:5000/project/${selected}/effortRatio`)
      .then((res)=>{
        console.log("points effort traité from API:", res.data);
        setEffortTrait(res.data.percentage);
      })
      .catch((err) => console.log(err));
    }
  }, [selected]);

  useEffect(() => {
    if (selected !== "Select a project") {
      axios.get(`http://localhost:5000/project/${selected}/timeConsumRatio`)
      .then((res)=>{
        console.log("Pourcentage charge traitement from API:", res.data);
        setPourcentage(res.data.ratioPercentage);
      })
      .catch((err) => console.log(err));
    }
  }, [selected]);
  
  return (
    <>
      <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          key="Nombre Tickets Estimés"
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">
            Nombre Tickets Estimés
          </dt>

          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {ticketEstime !== null ? ticketEstime : "Chargement..."}
          </dd>
        </div>

        <div
          key="Nombre Tickets Non Estimés"
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">
            Nombre Tickets Non Estimés
          </dt>

          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {ticketNonEstime !== null ? ticketNonEstime : "Chargement..."}
          </dd>
        </div>

        <div
          key="Points efforts traités"
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">
            Points Effort Traité % Total Points Effort
          </dt>

          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {EffortTrait !== null ? EffortTrait : "Chargement..."}
          </dd>
        </div>

        <div
          key="Pourcentage traitement bug"
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">
            Charge Traitement Bug % Charge Totale
          </dt>

          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
          {Pourcentage !== null ? Pourcentage : "Chargement..."}
          </dd>
        </div>
      </dl>
    </>
  );
}
export default SuivieProj;
