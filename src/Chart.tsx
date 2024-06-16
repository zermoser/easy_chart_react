import React, { useEffect, useState } from 'react';
import { Bar } from '@ant-design/charts';
import populationData from './db.json'; // Assuming db.json is correctly imported and formatted

const Chart: React.FC = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [year, setYear] = useState<number>(parseInt(populationData.population[currentYearIndex].Year));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYearIndex(prevIndex => (prevIndex < populationData.population.length - 1 ? prevIndex + 1 : 0));
    }, 1000); // Update every second (adjust interval as needed)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setYear(parseInt(populationData.population[currentYearIndex].Year));
  }, [currentYearIndex]);

  // Filter and sort data by population, then take top 12 countries
  const filteredData = populationData.population
    .filter(item => item.Year === year.toString())
    .sort((a, b) => parseInt(b.Population) - parseInt(a.Population))
    .slice(0, 12);

  const config = {
    data: filteredData,
    xField: 'Country name',
    yField: 'Population',
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
      'Country name': { alias: 'Country' },
      Population: { alias: 'Population' },
    },
  };

  return (
    <div className="p-4">
      <Bar {...config} />
      <div className="text-center mt-4">
        <p className="text-xl">Year: {year}</p>
      </div>
    </div>
  );
};

export default Chart;
