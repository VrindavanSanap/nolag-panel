import './Dashboard.css';

function Dashboard() {
  const systems = [
    { name: "JUDITH", system: "Windows", processor: "AMD64", ipv4: "40.80.158.10" },
    { name: "JUDITH", system: "Windows 10", processor: "Intel i7", ipv4: "40.80.158.11" },
    { name: "JUDITH", system: "macOS", processor: "M1", ipv4: "40.80.158.12" }
  ];

  return (
    <div className="dashboard-body">
      <header className="dashboard-header">
        <h1 className="dashboard-title">NOLAG-PANEL</h1>
        <p className="dashboard-subtitle">Welcome to the Dashboard</p>
      </header>
      <main className="dashboard-main">
        <div className="dashboard-container">
          {systems.map((system, index) => (
            <div className="dashboard-item" key={index}>
              <img src="https://i.ibb.co/8nM09ztb/screenshot.jpg" alt="System Screenshot" className="dashboard-image" />
              <div className="dashboard-info"><strong>Computer Name:</strong> {system.name}</div>
              <div className="dashboard-info"><strong>System:</strong> {system.system}</div>
              <div className="dashboard-info"><strong>Processor:</strong> {system.processor}</div>
              <div className="dashboard-info"><strong>Public IPv4:</strong> {system.ipv4}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
