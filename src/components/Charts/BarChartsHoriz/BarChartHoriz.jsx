import React from "react";
import { Bar} from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Chart, registerables } from 'chart.js';
import axios from "axios";
import { useState, useEffect } from "react";
Chart.register(...registerables);
function BarChartHoriz({selected}){
  const [ticketStatut, setTicketStatut] = useState([]);
    const [timeCount, setTimeCount] = useState([]);
  
    useEffect(() => {
      if (selected) {
        axios
          .get(`http://localhost:5000/tickets/${selected}/kpi/estimated-time-by-statut`)
          .then((res) => {
            console.log("Tickets par type:", res.data);
            const statut = res.data.map((item) => item._id);
            const Estimated = res.data.map((item) => item.totalEstimatedTime);
            setTicketStatut(statut);
            setTimeCount(Estimated);
          })
          .catch((err) => console.log(err));
      }
    }, [selected]);
    const customColors = ticketStatut.map((statut) => {
      if (statut === "Terminé(e)") {
        return 'RGBA(60, 179, 113, 1)'; 
        
      } else {
        if(statut === "À faire")
        return 'rgba(253, 159, 107, 1)'; 
        else{
          if (statut === "Assigned To Run")
          return 'rgba(192, 192, 192, 1)'
          else{
            if (statut === "Backlog")
            return 'rgba(255, 163, 101, 1)'
            else{
              if (statut === "En cours")
              return 'rgba(255, 215, 0, 1)'
              else{
                if (statut === "In Rework")
                return 'rgba(255, 228, 181, 1)'
                else{
                  if (statut === "New Story")
                  return 'rgba(240, 128, 128, 1)'
                  else{
                    if (statut === "Ouvert")
                    return 'rgba(255, 140, 0, 1)'
                    else{
                      if (statut === "Ready For Test")
                      return 'rgba(238, 232, 170, 1)'
                      else{
                        if (statut === "Removed From Scope")
                        return 'rgba(128, 128, 128, 1)'
                        else{
                          if (statut === "Story To Do")
                          return 'rgba(244, 164, 96, 1)'
                          else{
                            if (statut === "Released")
                            return 'rgba(152, 251, 152, 1)'
                            else{
                              if (statut === "Fermée")
                              return 'rgba(143, 188, 143, 1)'
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
      labels: ticketStatut,
    datasets: [{
      axis: 'y',
      label: 'My First Dataset',
      data: timeCount,
      fill: false,
      backgroundColor: customColors,
      borderColor: customColors,
        borderWidth: 1
      }]
    };
        const options = {
          indexAxis: 'y',
          }
        
    return(
      
         <div style={{ width: "500px" }}>
      <Bar 
      data={dataBar} 
      options={{
        ...options,
        plugins: {
          title: {
            display: true,
            text: "Charge tickets estimés par statut",
          },
        },
      }} 

      />
    </div>
       
    )
}
export default BarChartHoriz;