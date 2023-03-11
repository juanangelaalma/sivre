import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Paragraph } from "../components";
import { API_URL } from "../configs/api";
import useVoterFetcher from "../hooks/useVoterFetcher";

const data = [
  {
    name: "A",
    value: 400,
    img: "https://siakadu.unesa.ac.id/photo/fotomhs/20051204058.jpg",
  },
  {
    name: "B",
    value: 300,
    img: "https://siakadu.unesa.ac.id/photo/fotomhs/20051204058.jpg",
  },
  {
    name: "C",
    value: 300,
    img: "https://siakadu.unesa.ac.id/photo/fotomhs/20051204058.jpg",
  },
  {
    name: "D",
    value: 200,
    img: "https://siakadu.unesa.ac.id/photo/fotomhs/20051204058.jpg",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  img,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? "start" : "end";

  const divStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
    overflow: "hidden",
    width: "70px",
    height: "70px",
  };

  const imageStyle = {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    objectPosition: "top",
  };

  return (
    <g>
      <foreignObject
        x={cx + (outerRadius + 55) * Math.cos(-midAngle * RADIAN) - 40}
        y={cy + (outerRadius + 55) * Math.sin(-midAngle * RADIAN) - 40}
        width={80}
        height={80}
      >
        <div style={divStyle}>
          <img src={img} alt="icon" style={imageStyle} />
        </div>
      </foreignObject>
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill="white"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const Results = () => {
  const [results, setResults] = useState([]);
  const fetcher = useVoterFetcher();

  const getResults = async () => {
    try {
      const response = await fetcher(`${API_URL}/votes`, {
        method: "GET",
      });

      setResults(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="w-full flex h-screen overflow-hidden justify-center items-center active:border-none outline-none bg-gradient-to-r from-[#B165F9] to-[#FF886E]">
      <Details results={results} />
      {results.length > 0 ? (
        <PieChart width={800} height={800}>
          <Pie
            data={results}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={240}
            fill="#8884d8"
            label={(props) => (
              <CustomLabel {...props} img={props.payload.img} />
            )}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      ) : (
        ""
      )}
    </div>
  );
};

const ResultCard = ({ image, value, name }) => {
  return (
    <div className="bg-white rounded-md py-4 px-3">
      <div className="flex justify-start flex-row space-x-2">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={image} />
        </div>
        <div>
          <Paragraph className="text-md font-medium">{name}</Paragraph>
          <Paragraph className="font-bold text-xl">{value} suara</Paragraph>
        </div>
      </div>
    </div>
  );
};

const Details = ({ results }) => {
  return (
    <div className="absolute top-8 right-8 space-y-4">
      {results.map((result) => (
        <ResultCard
          name={result.name}
          image={result.img}
          value={result.value}
        />
      ))}
    </div>
  );
};

export default Results;
