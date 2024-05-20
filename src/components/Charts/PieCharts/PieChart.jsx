import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

function PieChart({ selected }) {
  const [ticketStatut, setTicketStatut] = useState([]);
  const [ticketCounts, setTicketCounts] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(
          `http://localhost:5000/tickets/${selected}/kpi/complexity-by-statut`
        )
        .then((res) => {
          const statut = res.data.map((item) => item._id);
          const counts = res.data.map((item) => item.totalStoryPoints);
          setTicketStatut(statut);
          setTicketCounts(counts);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);

  const customColors = ticketStatut.map((statut) => {
    if (statut === "Terminé(e)") {
      return "RGBA(60, 179, 113, 1)";
    } else {
      if (statut === "À faire") return "rgba(253, 159, 107, 1)";
      else {
        if (statut === "Assigned To Run") return "rgba(192, 192, 192, 1)";
        else {
          if (statut === "Backlog") return "rgba(255, 163, 101, 1)";
          else {
            if (statut === "En cours") return "rgba(255, 215, 0, 1)";
            else {
              if (statut === "In Rework") return "rgba(255, 225, 113, 1)";
              else {
                if (statut === "New Story") return "rgba(240, 128, 128, 1)";
                else {
                  if (statut === "Ouvert") return "rgba(255, 140, 0, 1)";
                  else {
                    if (statut === "Ready For Test")
                      return "rgba(238, 232, 170, 1)";
                    else {
                      if (statut === "Removed From Scope")
                        return "rgba(128, 128, 128, 1)";
                      else {
                        if (statut === "Story To Do")
                          return "rgba(208, 248, 120, 1)";
                        else {
                          if (statut === "Released")
                            return "rgba(152, 251, 152, 1)";
                          else {
                            if (statut === "Fermée")
                              return "rgba(143, 188, 143, 1)";
                            else {
                              if (statut === "Résolu") 
                                return "rgba(71, 241, 43, 1)";
                              else {
                                if (statut === "Selected for Development")
                                  return "rgba(27, 167, 237, 1)";
                                else {
                                  if (statut === "In Testing")
                                    return "rgba(250, 134, 217, 0.5)";
                                  else {
                                    if (statut === "To Validate")
                                      return "rgba(204, 234, 108, 1)";
                                    else {
                                      if (statut === "Ready For Estimating")
                                        return "rgba(247, 218, 95, 1)";
                                      else {
                                        if (statut === "Rouvert")
                                          return "rgba(226, 54, 152, 1)";
                                        else {
                                          if (statut === "In Peer Review")
                                            return "rgba(183, 97, 183, 0.5)";
                                          else {
                                            if (statut === "Autorisé")
                                              return "rgba(101, 175, 179, 1)";
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
    }
  });

  const dataPie = {
    labels: ticketStatut,
    datasets: [
      {
        label: "Nombre de Story Points",
        data: ticketCounts,
        backgroundColor: customColors,
        borderColor: "#FFFF",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {ticketStatut.length === 0 ? (
        <div className="text-center text-red-500">Pas de données!</div>
      ) : (
        <Pie
          data={dataPie}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Complexité des tickets par statut",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default PieChart;
