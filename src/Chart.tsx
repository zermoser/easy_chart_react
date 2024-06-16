import React, { useEffect, useState } from 'react';
import { Bar } from '@ant-design/charts';
import populationData from './db.json';

const Chart: React.FC = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [year, setYear] = useState<number>(
    parseInt(populationData.population[currentYearIndex].Year)
  );
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYearIndex((prevIndex) =>
        prevIndex < populationData.population.length - 1 ? prevIndex + 1 : 0
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setYear(parseInt(populationData.population[currentYearIndex].Year));
  }, [currentYearIndex]);

  useEffect(() => {
    const filteredData = populationData.population
      .filter((item) => item.Year === year.toString())
      .sort((a, b) => parseInt(b.Population) - parseInt(a.Population))
      .slice(0, 12);

    const updatedData = filteredData.map((newItem, index) => {
      const formattedPopulation = parseInt(newItem.Population).toLocaleString();
      return { ...newItem, Population: formattedPopulation, color: `rgb(${index * 2}, ${index * 3}, ${index * 4})` };
    });

    setPreviousData(updatedData);
  }, [year]);

  const config = {
    data: previousData,
    xField: 'Country name',
    yField: 'Population',
    colorField: 'color',
    label: {
      position: 'right',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
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
    animate: false,
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
