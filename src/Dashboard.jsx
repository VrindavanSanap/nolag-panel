import './Dashboard.css';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://52.66.174.153:5001/data?last_n=10');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result.data); // Log the data after fetching
        setData(result.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-body">
      <header className="dashboard-header">
        <h1 className="dashboard-title">NOLAG-PANEL</h1>
        <p className="dashboard-subtitle">Welcome to the Dashboard</p>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          {data ? (
            data.map((system, index) => (
              <div className="dashboard-item" key={index}>
                <img
                  src="https://i.ibb.co/8nM09ztb/screenshot.jpg"
                  alt="System Screenshot"
                  className="dashboard-image"
                />
                <div className="dashboard-info">
                  <strong>Computer Name:</strong> {system.name}
                </div>
                <div className="dashboard-info">
                  <strong>System:</strong> {system.system}
                </div>
                <div className="dashboard-info">
                  <strong>Processor:</strong> {system.processor}
                </div>
                <div className="dashboard-info">
                  <strong>Public IPv4:</strong> {system.ipv4}
                </div>
              </div>
            ))
          ) : (
            <p className="dashboard-loading">Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
