import { PieChart, Pie, Cell, Legend } from "recharts";
import { store } from "../store";
import { State } from "../types";
// PieChart, Pie, Cell, Tooltip, Legend


const Chart = () => {
  const fetchdata = store((state: State) => state.data);
  const filteredCity = fetchdata.map((item) => item.address.city);
  const norepeatCities = filteredCity.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  })

  let data:any = [];

  norepeatCities.forEach((city) => {
    data.push({
      name: city,
      value: 0,
    });
  });

  fetchdata.forEach((item) => {
    data.forEach((dataItem:any, index:any) => {
      if (item.address.city === dataItem.name) {
        data.splice(index, 1, {
          name: dataItem.name,
          value: dataItem.value + 1,
        });
      }
    });
  });


  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#E94649",
    "#F6B53F",
    "#6FAAB0",
    "#C4C24A",
    "#FFE35B",
    "#1E4629",
    "#FFE35B",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <PieChart width={730} height={300}>
        <Pie
          data={data}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
        >
          {fetchdata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Tooltip content={<CustomTooltip />} /> */}
        <Legend />
      </PieChart>
    </>
  );
};
export default Chart;