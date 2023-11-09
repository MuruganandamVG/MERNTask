import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + 10}
      y={y - 10}
      fill="#9F9F9F"
      textAnchor="middle"
      fontSize={12}
    >
      {value}
    </text>
  );
};

const customLegend = [
  {
    value: "Category 1",
    type: "circle",
    color: "#CB9488",
  },
  {
    value: "Category 2",
    type: "circle",
    color: "#239B56",
  },
  {
    value: "Category 3",
    type: "circle",
    color: "#FF5733",
  },
];

const Chart = ({ data }) => {
  console.log(data, 50);
  const Bikedata = [
    {
      name: " Hero Honda",
      value: data.HeroHonda,
      color: "#CB9488",
      fontSize: 6,
    },
    {
      name: "TVS Bike",
      value: data.TVSBike,
      color: "#239B56",
    },
    {
      name: "Bajaj",
      value: data.Bajaj,
      color: "#FF5733",
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={Bikedata} layout="horizontal">
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="value"
          fill="#8884d8"
          label={<CustomizedLabel />}
          barSize={35}
        >
          {Bikedata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
