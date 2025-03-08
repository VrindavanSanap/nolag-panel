import './dashboard.css';
import { useEffect, useState } from 'react';
import imag from "../src/assets/coding.jpg"
const BASE_URL = 'http://52.66.174.153:5001';

function Dashboard() {
  const [data, set_data] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [total_pages, set_total_pages] = useState(1);
  const [is_loading, set_is_loading] = useState(true);
  const [error, set_error] = useState(null);
  const [show_right_panel, set_show_right_panel] = useState(false);
  const [selected_panel_option, set_selected_panel_option] = useState(null);
  const items_per_page = 10;

  useEffect(() => {
    const fetch_data = async () => {
      set_is_loading(true);
      set_error(null);

      try {
        const range_start = (current_page - 1) * items_per_page + 1;
        const range_end = current_page * items_per_page;

        const response = await fetch(
          `${BASE_URL}/data?range_start=${range_start}&range_end=${range_end}`,
          { headers: { Accept: 'application/json' } }
        );

        if (!response.ok) throw new Error(`Network error: ${response.status}`);

        const result = await response.json();
        if (!result || typeof result !== 'object') throw new Error('Invalid response format');

        set_data(Array.isArray(result.data) ? result.data : []);

        const response_total = await fetch(`${BASE_URL}/total_items`, {
          headers: { Accept: 'application/json' }
        });
        if (!response_total.ok) throw new Error(`Network error: ${response_total.status}`);

        const result_total = await response_total.json();
        if (!result_total || typeof result_total !== 'object') throw new Error('Invalid response format');

        set_total_pages(Math.ceil((result_total.total_items || 0) / items_per_page));
      } catch (err) {
        console.error('Fetch error:', err);
        set_error(err.message);
        set_data([]);
      } finally {
        set_is_loading(false);
      }
    };

    fetch_data();
  }, [current_page]);

  const handle_image_error = (e) => {
    e.target.src = '/fallback-image.png';
  };

  const close_right_panel = () => {
    set_show_right_panel(false);
    set_selected_panel_option(null);
  };

  const render_panel_content = () => {
    switch (selected_panel_option) {
      case 'account':
        return (
          <div className="panel-content">
            <h3>Account Settings</h3>
            <p>Manage your account preferences and personal information.</p>
            {/* Add more account-related settings here */}
          </div>
        );
      case 'display':
        return (
          <div className="panel-content">
            <h3>Display Settings</h3>
            <p>Customize the appearance of your dashboard.</p>
            {/* Add more display-related settings here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-body">
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <h1 className="dashboard-title">NOLAG-PANEL</h1>
        <img
          src={imag}
          alt="Profile Logo"
          className="profile-logo"
          style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
          onClick={() => set_show_right_panel(!show_right_panel)}
        />
      </header>
      <main className="dashboard-main" >
        <div className="dashboard-container" style={{ flex: 1 }}>
          {is_loading ? (
            <p className="dashboard-loading">Loading...</p>
          ) : error ? (
            <p className="dashboard-error">Error: {error}</p>
          ) : data.length > 0 ? (
            data.map((system, index) => (
              <div className="dashboard-item" key={system.id || `system-${index}`}>
                <img
                  src={`${BASE_URL}/${system.image_url}`}
                  alt={`${system.computer_name} Screenshot`}
                  className="dashboard-image"
                  onError={handle_image_error}
                  loading="lazy"
                />
                <div className="dashboard-info"><strong>Computer Name:</strong> {system.computer_name || 'N/A'}</div>
                <div className="dashboard-info"><strong>System:</strong> {system.system || 'N/A'}</div>
                <div className="dashboard-info"><strong>Processor:</strong> {system.processor || 'N/A'}</div>
                <div className="dashboard-info"><strong>Public IPv4:</strong> {system.public_ip || 'N/A'}</div>
              </div>
            ))
          ) : (
            <p className="dashboard-empty">No data available</p>
          )}
        </div>

        {total_pages > 1 && !is_loading && !error && (
          <div className="pagination">
            <a href="#" onClick={(e) => { e.preventDefault(); set_current_page((prev) => Math.max(prev - 1, 1)); }}
              className={`pagination-link ${current_page === 1 ? 'disabled' : ''}`}>Previous</a>
            {Array.from({ length: total_pages }, (_, index) => index + 1).map((page) => (
              <a href="#" key={page} onClick={(e) => { e.preventDefault(); set_current_page(page); }}
                className={`pagination-link ${current_page === page ? 'active' : ''}`}>{page}</a>
            ))}
            <a href="#" onClick={(e) => { e.preventDefault(); set_current_page((prev) => Math.min(prev + 1, total_pages)); }}
              className={`pagination-link ${current_page === total_pages ? 'disabled' : ''}`}>Next</a>
          </div>
        )}
        {show_right_panel && (
          <div className="right-panel" style={{
            width: '300px',
            backgroundColor: '#f0f0f0',
            padding: '20px',
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ddd',
              paddingBottom: '10px',
              marginBottom: '10px'
            }}>
              <h2>Settings</h2>
              <div
                onClick={close_right_panel}
                className="close-button"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') close_right_panel(); }}
              >
                ✕
              </div>
            </div>

            <div>
              <div
                className={`panel-button ${selected_panel_option === 'account' ? 'active' : ''}`}
              >
                Account Settings
              </div>
              <div
                className={`panel-button ${selected_panel_option === 'display' ? 'active' : ''}`}
              >
                Display Settings
              </div>
            </div>

            {render_panel_content()}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;