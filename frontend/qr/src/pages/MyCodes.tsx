import { useState } from 'react';
import './MyCodes.css';

interface QRCode {
  id: string;
  name: string;
  type: 'Static' | 'Dynamic' | 'Image';
  hits: number | null;
  updated: string;
}

interface MyCodesProps {
}

export function MyCodes({ }: MyCodesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<QRCode | null>(null);

  // Sample data
  const [codes] = useState<QRCode[]>([
    { id: '1', name: 'Promo QR', type: 'Static', hits: null, updated: 'Jan 10' },
    { id: '2', name: 'Bio Link', type: 'Dynamic', hits: 823, updated: 'Jan 14' },
    { id: '3', name: 'Event QR', type: 'Image', hits: 241, updated: 'Jan 12' },
  ]);

  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || code.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (action: string, codeId: string) => {
    console.log(`${action} action for code ${codeId}`);
    setOpenMenuId(null);
    
    if (action === 'View') {
      const code = codes.find(c => c.id === codeId);
      if (code) {
        setSelectedCode(code);
        setSlideOverOpen(true);
      }
    }
    // Implement other action handlers here
  };

  const toggleMenu = (codeId: string) => {
    setOpenMenuId(openMenuId === codeId ? null : codeId);
  };

  return (
    <div className="my-codes">
      <div className="my-codes-controls">
        <div className="search-box">
          <label>Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="filter-box">
          <label>Filter:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All</option>
            <option value="Static">Static</option>
            <option value="Dynamic">Dynamic</option>
            <option value="Image">Image</option>
          </select>
        </div>
        <button className="new-code-btn">+ New Code</button>
      </div>

      <div className="codes-table-container">
        <table className="codes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Hits</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCodes.map(code => (
              <tr key={code.id}>
                <td>{code.name}</td>
                <td>{code.type}</td>
                <td>{code.hits !== null ? code.hits : '—'}</td>
                <td>{code.updated}</td>
                <td>
                  <div className="menu-container">
                    <button 
                      className="menu-btn"
                      onClick={() => toggleMenu(code.id)}
                    >
                      ⋮
                    </button>
                    {openMenuId === code.id && (
                      <div className="menu-dropdown">
                        <button onClick={() => handleAction('View', code.id)}>View</button>
                        <button onClick={() => handleAction('Edit', code.id)}>Edit</button>
                        <button onClick={() => handleAction('Download', code.id)}>Download</button>
                        <button onClick={() => handleAction('Copy', code.id)}>Copy</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {slideOverOpen && selectedCode && (
        <>
          <div className="modal-overlay" onClick={() => setSlideOverOpen(false)}></div>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSlideOverOpen(false)}>
              × Close
            </button>

            <h2 className="modal-title">Edit Dynamic URL</h2>

            <div className="form-section">
              <label>Name</label>
              <input type="text" defaultValue="Spring Campaign Link" />
            </div>

            <hr className="section-divider" />

            <div className="form-section">
              <h3>Current Destination</h3>
              <div className="version-label">Version: v3</div>
              <input type="text" defaultValue="https://example.com/spring-2026" />
              <button className="secondary-btn">Change Destination</button>
            </div>

            <hr className="section-divider" />

            <div className="form-section">
              <h3>Version History</h3>
              <div className="version-list">
                <div className="version-item">
                  <div className="version-url">v3 – https://example.com/spring-2026</div>
                  <div className="version-date">Updated Jan 18, 2026 (Active)</div>
                </div>
                <div className="version-item">
                  <div className="version-url">v2 – https://example.com/spring-2025</div>
                  <div className="version-date">Updated Dec 01, 2025</div>
                </div>
                <div className="version-item">
                  <div className="version-url">v1 – https://example.com/original</div>
                  <div className="version-date">Created Nov 15, 2025</div>
                </div>
              </div>
              <button className="secondary-btn">Roll back to selected version</button>
            </div>

            <hr className="section-divider" />

            <div className="warning-box">
              ⚠ Changing the destination will create a new version
            </div>

            <div className="modal-actions">
              <button className="primary-btn">Save Changes</button>
              <button className="cancel-btn" onClick={() => setSlideOverOpen(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
