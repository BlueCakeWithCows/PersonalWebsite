import './Dashboard.css';

interface DashboardProps {
    
}

export function Dashboard({}: DashboardProps) {
    // Mock data - replace with actual data from API
    const stats = {
        totalCodes: 47,
        dynamicUrls: 12,
        totalHits: 3542
    };

    const topLink = {
        url: 'mypromo.link',
        hits: 1245
    };

    return (
        <div className="dashboard">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Codes</div>
                    <div className="stat-value">{stats.totalCodes}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Dynamic URLs</div>
                    <div className="stat-value">{stats.dynamicUrls}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Hits</div>
                    <div className="stat-value">{stats.totalHits.toLocaleString()}</div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="card top-link-card">
                    <h3>Top Link</h3>
                    <div className="top-link-content">
                        <div className="link-url">{topLink.url}</div>
                        <div className="link-hits">{topLink.hits.toLocaleString()} hits</div>
                    </div>
                </div>

                <div className="card chart-card">
                    <h3>Hits Over Time</h3>
                    <div className="chart-placeholder">
                        <svg viewBox="0 0 300 150" className="line-chart">
                            <polyline
                                points="10,120 50,100 90,80 130,90 170,60 210,70 250,40 290,50"
                                fill="none"
                                stroke="#646cff"
                                strokeWidth="2"
                            />
                            <line x1="10" y1="130" x2="290" y2="130" stroke="#ddd" strokeWidth="1" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
