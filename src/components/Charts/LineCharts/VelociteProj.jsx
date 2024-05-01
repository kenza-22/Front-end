import React from "react";
import { Line } from "react-chartjs-2";
function VelociteProj(){
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
    return(
        <div style={{ width: "500px" }}>
<Line data={data}/>
        </div>
    );
}
export default VelociteProj;