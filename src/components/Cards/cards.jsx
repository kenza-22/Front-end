import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <div className="w-1/4 px-4 mb-8">
      <div className="bg-white shadow p-4 text-center">
        <h3 className="text-purple-800 font-bold mb-2">{title}</h3>
        <hr className="border-t border-gray-300 mb-2" />
        <div className="flex justify-between items-center">
          <div className="text-left">{prefix}</div>
          <div className="w-1/2">
            <span className={`px-3 py-1 inline-block rounded ${tagColor}`}>
              {tagContent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cards = ({selected}) => {
   const [ticketEstime, setTicketEstime] = useState(null);
  const [ticketNonEstime, setTicketNonEstime] = useState(null);
  const [Charge, setCharge]= useState(null);
  useEffect(() => {
    if(selected !== "Select a project"){
    axios
      .get(`http://localhost:5000/project/${selected}/timeEffortRatio`)
      .then((res) => {
        console.log("Points d'effort traité from API:", res.data);
        setCharge(res.data.ratio);
      })
      .catch((err) => console.log(err));
    }
  }, [selected]);
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

     

  
  return (
    <div className="flex flex-wrap justify-center">
      <TopCard title={"Tickets Estimés"} tagColor={"bg-cyan-500 text-white"} prefix={"Nombre"} tagContent={ticketEstime} />
      <TopCard title={"Ticket non estimés"} tagColor={"bg-red-500 text-white"} prefix={"Nombre"} tagContent={ticketNonEstime} />
      <TopCard title={"Points Effort VS Charge"} tagColor={"bg-purple-500 text-white"} prefix={"Nombre"} tagContent={Charge} />

    </div>
  );
};

export default Cards;
