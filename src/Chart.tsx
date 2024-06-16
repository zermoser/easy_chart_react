import React, { useEffect, useState } from 'react';
import { Bar } from '@ant-design/charts';
import populationData from './db.json'; // Assuming db.json is correctly imported and formatted

const Chart: React.FC = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [year, setYear] = useState<number>(parseInt(populationData.population[currentYearIndex].Year));
  const [previousData, setPreviousData] = useState([]); // State to store previous data

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYearIndex(prevIndex => (prevIndex < populationData.population.length - 1 ? prevIndex + 1 : 0));
    }, 1000); // Update every second (adjust interval as needed)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setYear(parseInt(populationData.population[currentYearIndex].Year));
  }, [currentYearIndex]);

  useEffect(() => {
    // Filter and sort data by population, then take top 12 countries
    const filteredData = populationData.population
      .filter(item => item.Year === year.toString())
      .sort((a, b) => parseInt(b.Population) - parseInt(a.Population))
      .slice(0, 12);

    // Update currentData incrementally starting from previousData
    const updatedData = filteredData.map(newItem => {
      const prevItem = previousData.find(item => item['Country name'] === newItem['Country name']);
      return prevItem ? { ...prevItem, Population: newItem.Population } : newItem;
    });

    // Update previousData to current filteredData
    setPreviousData(updatedData);
  }, [year, previousData]); // Trigger when year changes or previousData changes

  const config = {
    data: previousData,
    xField: 'Country name',
    yField: 'Population',
    label: {
      position: 'right', // Position labels to the right of bars
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
    animate: false, // Disable animation
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
