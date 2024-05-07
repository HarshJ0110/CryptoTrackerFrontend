import React, { useState, useContext, useEffect } from 'react';
import { HistoricalChart } from '../config/api';
import CryptoContext from '../context/CryptoContext';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import LoadingBar from './Loadingbar';
import Chart from 'chart.js/auto';

const CoinInfo = ({ id }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(3);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartInitialized, setChartInitialized] = useState(false); // Track chart initialization
  const context = useContext(CryptoContext);
  const { currency } = context;

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setHistoricalData(data?.prices);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  useEffect(() => {
    if (historicalData && !chartInitialized) {
      renderChart();
      setChartInitialized(true);
    } else if (historicalData && chartInstance) {
      updateChart();
    }
  }, [historicalData, chartInitialized]); // Only update when historicalData changes or chartInitialized changes

  const renderChart = () => {
    const ctx = document.getElementById('coin-chart');
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalData.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            data: historicalData.map((coin) => coin[1]),
            label: `Price ( Past ${days} Days ) in ${currency}`,
            borderColor: 'rgb(105, 187, 253)',
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 1,
          },
        },
      },
    });
    setChartInstance(newChartInstance);
  };

  const updateChart = () => {
    chartInstance.data.labels = historicalData.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });
    chartInstance.data.datasets[0].data = historicalData.map((coin) => coin[1]);
    chartInstance.update();
  };
  {!historicalData && <LoadingBar />}
  return (
    <div className="flex flex-col justify-center text-white lg:w-2/3">
      
      <canvas id="coin-chart"></canvas>
      {historicalData && (
        <div className="text-white flex flex-row justify-evenly mt-5 mb-5">
          
        <button className = {days == 1 ? "text-blue-400 px-5" : "px-5" } value="1" onClick={(e) => (setDays(e.target.value))}>1D</button>
          <button className = {days == 3 ? "text-blue-400 px-5" : "px-5" } value="3" onClick={(e) => (setDays(e.target.value))}>3D</button>
          <button className = {days == 7 ? "text-blue-400 px-5" : "px-5" } value="7" onClick={(e) => (setDays(e.target.value))}>1W</button>
          <button className = {days == 30 ? "text-blue-400 px-5" : "px-5" } value="30" onClick={(e) => (setDays(e.target.value))}>1M</button>
          <button className = {days == 90 ? "text-blue-400 px-5" : "px-5" } value="90" onClick={(e) => (setDays(e.target.value))}>3M</button>
          <button className = {days == 365 ? "text-blue-400 px-5" : "px-5" } value="365" onClick={(e) => (setDays(e.target.value))}>1Y</button>

        </div>
      )}
    </div>
  );
};

export default CoinInfo;
