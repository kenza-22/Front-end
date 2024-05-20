import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

function BarChartParType({ selected }) {
  const [ticketData, setTicketData] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketCounts, setTicketCounts] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/tickets/${selected}/kpi/by-type`)
        .then((res) => {
          console.log("Tickets par type:", res.data);
          const types = res.data.map((item) => item._id);
          const counts = res.data.map((item) => item.count);
          setTicketTypes(types);
          setTicketCounts(counts);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
  const customColors = ticketTypes.map((type) => {
    if (type === "Bug") {
      return 'rgba(255, 0, 0, 0.5)'; 
      
    } else {
      if(type === "Sous-tâche")
      return 'rgba(176, 224, 230, 1)'; 
      else{
        if (type === "Story")
        return 'rgba(216, 191, 216, 1)'
        else{
          if (type === "Tâche")
          return 'rgba(176, 196, 222, 1)'
          else{
            if (type === "Epic")
            return 'rgba(138, 43, 226, 1)'
            else{
              if (type === "Support")
              return 'rgba(255, 140, 0, 1)'
              else{
                if (type === "Tâche technique")
                return 'rgba(100, 149, 237, 1)'
                else{
                  if (type === "Test task")
                  return 'rgba(255, 255, 0, 1)'
                  else{
                    if (type === "Testing task")
                    return 'rgba(255, 215, 0, 1)'
                    else{
                      if (type === "Bogue")
                      return 'rgba(205, 92, 92, 1)'
                      else{
                        if (type === "Bug Sub Task")
                        return 'rgba(255, 67, 67, 1)'
                        else{
                          if (type === "Exploratory or research work")
                          return 'rgba(191, 133, 89, 1)'
                          else{
                            if (type === "Planification")
                            return 'rgba(79, 211, 69, 1)'
                            else{
                              if (type === "Création et Désign")
                              return 'rgba(69, 86, 211, 1)'
                              else{
                                if (type === "Feature")
                                return 'rgba(172, 108, 172, 1)'
                                else{
                                  if (type === "Amélioration")
                                  return 'rgba(80, 200, 160, 1)'
                                  else{
                                    if (type === "Design")
                                    return 'rgba(248, 32, 145, 1)'
                                    else{
                                      if (type === "Découpage de Design")
                                      return 'rgba(244, 116, 116, 1)'
                                      else{
                                        if (type === "Test plan")
                                        return 'rgba(255, 184, 105, 1)'
                                        else{
                                          if (type === "Actif")
                                          return 'rgba(177, 253, 107, 1)'
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                          
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
    }
  });
 
  const dataBar = {
    labels: ticketTypes,
    datasets: [
      {
        label: "Nombre des tickets",
        data: ticketCounts,
        backgroundColor: customColors,
        borderColor: customColors,
        borderWidth: 1
      }
    ]
  };
  const options = {
    scales:{
      y:{
        beginAtZero: true
      }
    }
    }
  return (

    <div>
         {ticketTypes.length === 0 ? (
        <div className="text-center text-red-500">
          Pas de données!
        </div>
      ) : (
        <Bar 
        data={dataBar}
        options={{
          ...options,
          plugins: {
            title: {
              display: true,
              text: "Nombre des tickets par type",
            },
          },
        }}
        />
      )}
    
    </div>

  );
}

export default BarChartParType;
