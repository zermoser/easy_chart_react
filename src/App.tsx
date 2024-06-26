import React from 'react';
import Chart from './Chart';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-8">Real-Time Population Growth Chart</h1>
      <Chart />
    </div>
  );
};

export default App;
