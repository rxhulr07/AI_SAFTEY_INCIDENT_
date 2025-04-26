import React, { useState, useEffect } from 'react';
import { initialIncidents, addNewIncident } from '../data/incidentsData';
import './AISafetyDashboard.css';

const AISafetyDashboard = () => {
 
  const [incidents, setIncidents] = useState([]);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedIncidents, setExpandedIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  });


  useEffect(() => {
    setIncidents(initialIncidents);
  }, []);

  
  const filteredIncidents = incidents.filter(incident => 
    severityFilter === 'All' || incident.severity === severityFilter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const toggleDetails = (id) => {
    setExpandedIncidents(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const updatedIncidents = addNewIncident(incidents, formData);
    setIncidents(updatedIncidents);
    setFormData({ title: '', description: '', severity: 'Medium' });
    setShowForm(false);
  };


  const handleEdit = (id) => {
    const incidentToEdit = incidents.find(incident => incident.id === id);
    setEditingId(id);
    setEditData({
      title: incidentToEdit.title,
      description: incidentToEdit.description,
      severity: incidentToEdit.severity
    });
  };

  
  const handleSaveEdit = () => {
    setIncidents(incidents.map(incident => 
      incident.id === editingId ? { ...incident, ...editData } : incident
    ));
    setEditingId(null);
  };

  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      setIncidents(incidents.filter(incident => incident.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>AI Safety Incidents</h2>
        <div className="dashboard-actions">
          <div className="filter-controls">
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            
            <div className="sort-buttons">
              <button 
                onClick={() => setSortOrder('newest')} 
                className={`sort-btn ${sortOrder === 'newest' ? 'active' : ''}`}
              >
                Newest
              </button>
              <button 
                onClick={() => setSortOrder('oldest')} 
                className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
              >
                Oldest
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="primary-btn"
          >
            {showForm ? 'Cancel' : 'Report Incident'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="incident-form">
          <h3>Report New Incident</h3>
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Brief incident title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Detailed description of the incident"
            />
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              Submit Incident
            </button>
          </div>
        </form>
      )}

      <div className="incidents-list">
        {sortedIncidents.length > 0 ? (
          sortedIncidents.map(incident => (
            <div 
              key={incident.id} 
              className="incident-card"
            >
              <div className="incident-header">
                <h3>
                  {editingId === incident.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    incident.title
                  )}
                </h3>
                <div className="incident-meta">
                  {editingId === incident.id ? (
                    <select
                      name="severity"
                      value={editData.severity}
                      onChange={handleEditChange}
                      className="edit-select"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  ) : (
                    <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
                      {incident.severity}
                    </span>
                  )}
                  <span className="incident-date">{formatDate(incident.reported_at)}</span>
                </div>
              </div>
              
              <div className="incident-content">
                {editingId === incident.id ? (
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="edit-textarea"
                  />
                ) : (
                  <p className="incident-description">
                    {incident.description.substring(0, 150)}...
                  </p>
                )}
                
                {editingId === incident.id ? (
                  <div className="edit-actions">
                    <button 
                      onClick={handleSaveEdit}
                      className="primary-btn"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="text-btn"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => toggleDetails(incident.id)} 
                      className="text-btn"
                    >
                      {expandedIncidents.includes(incident.id) ? 
                        'Show Less' : 
                        'Read More'}
                    </button>

                    {expandedIncidents.includes(incident.id) && (
                      <div className="incident-details">
                        <p>{incident.description}</p>
                        <div className="incident-actions">
                          <button 
                            onClick={() => handleEdit(incident.id)}
                            className="text-btn"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(incident.id)}
                            className="text-btn danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No incidents found matching your criteria</p>
            <button 
              onClick={() => {
                setSeverityFilter('All');
                setShowForm(true);
              }} 
              className="primary-btn"
            >
              Report First Incident
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISafetyDashboard;