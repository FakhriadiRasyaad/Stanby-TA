import React, { useEffect, useState } from 'react';
import supabase from '../components/SupabaseClient';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Botpress from '../components/botpress';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Esp32Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: esp32Data, error } = await supabase
          .from('esp32')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        setData(esp32Data);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  const latestData = data.length > 0 ? data[data.length - 1] : {
    ds18b20_temp: 0,
    dht22_temp: 0,
    dht22_humi: 0,
    fan_status: 'Off',
  };

  const chartData = {
    labels: data.map(item => item.created_at),
    datasets: [
      {
        label: 'DS18B20 Temperature (°C)',
        data: data.map(item => item.ds18b20_temp),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'DHT22 Temperature (°C)',
        data: data.map(item => item.dht22_temp),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'DHT22 Humidity (%)',
        data: data.map(item => item.dht22_humi),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const convertToCSV = (jsonData: any[]) => {
    const headers = ['Created at', 'DS18B20 Temp (°C)', 'DHT22 Temp (°C)', 'DHT22 Humidity (%)', 'Fan Status'];
    const csvRows = [headers.join(',')];

    jsonData.forEach((item) => {
      const row = [
        item.created_at,
        item.ds18b20_temp,
        item.dht22_temp,
        item.dht22_humi,
        item.fan_status,
      ];
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  };

  const downloadCSV = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'esp32_data.csv');
    a.click();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Botpress />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Sensor Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-100 border border-gray-300 p-4 text-center rounded-lg">
                <h4 className="font-medium">DS18B20 Temperature</h4>
                <p className="text-3xl font-bold text-teal-600">{latestData.ds18b20_temp}°C</p>
              </div>
              <div className="bg-gray-100 border border-gray-300 p-4 text-center rounded-lg">
                <h4 className="font-medium">DHT22 Temperature</h4>
                <p className="text-3xl font-bold text-pink-600">{latestData.dht22_temp}°C</p>
              </div>
              <div className="bg-gray-100 border border-gray-300 p-4 text-center rounded-lg">
                <h4 className="font-medium">DHT22 Humidity</h4>
                <p className="text-3xl font-bold text-blue-600">{latestData.dht22_humi}%</p>
              </div>
              <div className="bg-gray-100 border border-gray-300 p-4 text-center rounded-lg">
                <h4 className="font-medium">Fan Status</h4>
                <div className={`p-2 rounded-lg text-white text-xl font-bold ${latestData.fan_status === 'On' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {latestData.fan_status}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">ESP32 Data Chart</h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        {/* Data Table Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">ESP32 Data Table</h2>
          <table className="table-auto border-collapse border border-gray-400 w-full mb-4">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Created at</th>
                <th className="border border-gray-400 p-2">DS18B20 Temp (°C)</th>
                <th className="border border-gray-400 p-2">DHT22 Temp (°C)</th>
                <th className="border border-gray-400 p-2">DHT22 Humidity (%)</th>
                <th className="border border-gray-400 p-2">Fan Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="border border-gray-400 p-2">{item.created_at}</td>
                  <td className="border border-gray-400 p-2">{item.ds18b20_temp}</td>
                  <td className="border border-gray-400 p-2">{item.dht22_temp}</td>
                  <td className="border border-gray-400 p-2">{item.dht22_humi}</td>
                  <td className="border border-gray-400 p-2">{item.fan_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={downloadCSV}
          >
            Download CSV
          </button>
          <div className="mt-20"> {/* Margin above the footer */}
        <Footer />
      </div>
        </div>
      </div>

    </div>
  );
};

export default Esp32Dashboard;
