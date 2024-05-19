import React, { useState, useEffect } from "react";
import BarChartParType from "../../components/Charts/BarCharts/BarChartParType";
import BarChartHoriz from "../../components/Charts/BarChartsHoriz/BarChartHoriz";
import PieChart from "../../components/Charts/PieCharts/PieChart";
import DoughnutChart from "../../components/Charts/DoughnutCharts/DoughnutChart";
import CardChargeEstime from "../../components/Cards/CardChargeEstime";
import BarChartHorizType from "../../components/Charts/BarChartsHoriz/BarChartHorizType";
import NbrTicketsStatus from "../../components/Charts/DoughnutCharts/NbrTicketsStatus";
import axios from "axios";
import "./Dashboard.css";

function DashboardIssues() {
  const [selected, setSelected] = useState(null);
  const [Project, setProject] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => {
        console.log("All Projects from API:", res.data);
        setProject(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100">
    <div className="mt-1 relative">
      <select
        className="block appearance-none w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-gray-900 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option disabled value="">
          Select a project
        </option>
        {Project.map((project) => (
          <option key={project.id} value={project.key}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
    <br />

    {selected ? (
      <>
        <CardChargeEstime selected={selected} />
        <div className="graphBox">
          <div className="box">
            <NbrTicketsStatus selected={selected} />
          </div>
          <div className="box">
            <BarChartParType selected={selected} />
          </div>
        </div>
        <div className="graphBox">
          <div className="box">
            <DoughnutChart selected={selected} />
          </div>
          <div className="box">
            <BarChartHoriz selected={selected} />
          </div>
        </div>
        <div className="graphBox">
          <div className="box">
            <PieChart selected={selected} />
          </div>
          <div className="box">
            <BarChartHorizType selected={selected} />
          </div>
        </div>
      </>
    ) : (
      <div className="mt-10 h-screen text-center text-red-500">
        Veuillez sélectionner un projet
      </div>
    )}
  </div>
  );
}
export default DashboardIssues;
