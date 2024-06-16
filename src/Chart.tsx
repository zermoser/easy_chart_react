import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';

interface PopulationData {
  year: number;
  country: string;
  population: number;
}

const mockData: PopulationData[] = [
  { year: 1950, country: 'China', population: 554419263 },
  { year: 1950, country: 'India', population: 376325200 },
  { year: 1950, country: 'USA', population: 158804398 },
  { year: 1951, country: 'China', population: 560005300 },
  { year: 1951, country: 'India', population: 381603200 },
  { year: 1951, country: 'USA', population: 159880800 },
  // ... add more data points as needed
];

const Chart: React.FC = () => {
  const [data, setData] = useState<PopulationData[]>([]);
  const [year, setYear] = useState<number>(1950);

  useEffect(() => {
    const updateData = () => {
      const filteredData = mockData.filter(item => item.year === year);
      setData(filteredData);
    };

    updateData();

    const interval = setInterval(() => {
      setYear((prevYear) => prevYear + 1);
      updateData();
    }, 10000);

    return () => clearInterval(interval);
  }, [year]);

  const config = {
    data,
    xField: 'country',
    yField: 'population',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      country: { alias: 'Country' },
      population: { alias: 'Population' },
    },
  };

  return (
    <div className="p-4">
      <Column {...config} />
      <div className="text-center mt-4">
        <p className="text-xl">Year: {year}</p>
      </div>
    </div>
  );
};

export default Chart;
