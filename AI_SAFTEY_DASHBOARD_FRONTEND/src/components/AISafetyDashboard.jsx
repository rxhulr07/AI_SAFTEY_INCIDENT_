import React, { useState, useEffect } from 'react';
import { initialIncidents, addNewIncident } from '../data/incidentsData';
import './AISafetyDashboard.css';

const AISafetyDashboard = () => {
  // State management
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

  // Load initial data
  useEffect(() => {
    setIncidents(initialIncidents);
  }, []);

  // Filter and sort incidents
  const filteredIncidents = incidents.filter(incident => 
    severityFilter === 'All' || incident.severity === severityFilter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Toggle incident details
  const toggleDetails = (id) => {
    setExpandedIncidents(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const updatedIncidents = addNewIncident(incidents, formData);
    setIncidents(updatedIncidents);
    setFormData({ title: '', description: '', severity: 'Medium' });
    setShowForm(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard">
      <div className="controls">
        <div className="filter-group">
          <label htmlFor="severity-filter">Filter by Severity:</label>
          <select 
            id="severity-filter"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="select"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="sort-group">
          <label>Sort by Date:</label>
          <button 
            onClick={() => setSortOrder('newest')} 
            className={`sort-button ${sortOrder === 'newest' ? 'active' : ''}`}
          >
            Newest First
          </button>
          <button 
            onClick={() => setSortOrder('oldest')} 
            className={`sort-button ${sortOrder === 'oldest' ? 'active' : ''}`}
          >
            Oldest First
          </button>
        </div>
      </div>

      <button 
        onClick={() => setShowForm(!showForm)} 
        className="toggle-form-button"
      >
        {showForm ? 'Cancel' : 'Report New Incident'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="incident-form">
          <h2>Report New Incident</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity:</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              className="select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Submit Incident
          </button>
        </form>
      )}

      <div className="incidents-list">
        {sortedIncidents.length > 0 ? (
          sortedIncidents.map(incident => (
            <div 
              key={incident.id} 
              className={`incident-card ${incident.severity.toLowerCase()}`}
            >
              <div className="incident-header">
                <h3>{incident.title}</h3>
                <div className="meta">
                  <span className={`severity ${incident.severity.toLowerCase()}`}>
                    {incident.severity}
                  </span>
                  <span className="date">{formatDate(incident.reported_at)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => toggleDetails(incident.id)} 
                className="details-button"
              >
                {expandedIncidents.includes(incident.id) ? 'Hide Details' : 'View Details'}
              </button>

              {expandedIncidents.includes(incident.id) && (
                <div className="incident-description">
                  <p>{incident.description}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No incidents found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AISafetyDashboard;