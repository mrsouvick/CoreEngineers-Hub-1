import React, { useState, useMemo } from 'react';
import NoteCard from '../components/NoteCard';
import { notesData, branches, semesters } from '../data/notesData';

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    branch: '',
    semester: '',
    subject: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  const filteredNotes = useMemo(() => {
    let filtered = [...notesData];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchLower) ||
        note.description.toLowerCase().includes(searchLower) ||
        note.subject.toLowerCase().includes(searchLower) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Branch filter
    if (filters.branch) {
      filtered = filtered.filter(note => note.branch === filters.branch);
    }

    // Semester filter
    if (filters.semester) {
      filtered = filtered.filter(note => note.semester === filters.semester);
    }

    // Subject filter
    if (filters.subject) {
      filtered = filtered.filter(note => 
        note.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ branch: '', semester: '', subject: '' });
    setSearchTerm('');
    setSortBy('newest');
  };

  return (
    <div className="notes-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Notes Library</h1>
          <p>Access comprehensive study materials for all engineering branches and semesters. Download PDFs and enhance your learning.</p>
        </div>

        {/* Search and Filters */}
        <div className="filters-card">
          <div className="filters-grid">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search notes by title, subject, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <select
              value={filters.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
              className="filter-select"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch.value} value={branch.value}>{branch.label}</option>
              ))}
            </select>

            <select
              value={filters.semester}
              onChange={(e) => handleFilterChange('semester', e.target.value)}
              className="filter-select"
            >
              <option value="">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="downloads">Most Downloads</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Active Filters */}
          {(searchTerm || filters.branch || filters.semester || filters.subject) && (
            <div className="active-filters">
              <div className="filters-label">
                <span>Active filters:</span>
                {searchTerm && (
                  <span className="filter-tag">Search: "{searchTerm}"</span>
                )}
                {filters.branch && (
                  <span className="filter-tag">
                    Branch: {branches.find(b => b.value === filters.branch)?.label}
                  </span>
                )}
                {filters.semester && (
                  <span className="filter-tag">Semester: {filters.semester}</span>
                )}
              </div>
              <button onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>
            Showing <strong>{filteredNotes.length}</strong> notes
            {searchTerm && (
              <span> for "<strong>{searchTerm}</strong>"</span>
            )}
          </p>
        </div>

        {/* Notes Grid */}
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No notes found</h3>
            <p>
              {searchTerm || filters.branch || filters.semester || filters.subject
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'No notes have been uploaded yet. Check back soon!'
              }
            </p>
            {(searchTerm || filters.branch || filters.semester || filters.subject) && (
              <button onClick={clearFilters} className="btn btn-primary">
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .notes-page {
          min-height: 100vh;
          background: var(--page-bg);
          padding: 2rem 0;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .page-header p {
          font-size: 1.125rem;
          color: var(--gray-600);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .filters-card {
          background: var(--surface);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: var(--shadow-base);
          border: 1px solid var(--gray-200);
          margin-bottom: 2rem;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 1rem;
        }

        .search-box {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid var(--gray-300);
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px var(--primary-100);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: 0.75rem;
          font-size: 1rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px var(--primary-100);
        }

        .active-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--gray-200);
        }

        .filters-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .filter-tag {
          background: var(--primary-100);
          color: var(--primary-800);
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .clear-filters {
          background: none;
          border: none;
          color: var(--primary-600);
          font-weight: 500;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .clear-filters:hover {
          color: var(--primary-700);
        }

        .results-info {
          margin-bottom: 1.5rem;
        }

        .results-info p {
          color: var(--gray-600);
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--surface);
          border-radius: 1rem;
          border: 1px solid var(--gray-200);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          margin-bottom: 1rem;
          color: var(--gray-900);
        }

        .empty-state p {
          color: var(--gray-600);
          margin-bottom: 2rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 1024px) {
          .filters-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }

          .notes-grid {
            grid-template-columns: 1fr;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .active-filters {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Notes;