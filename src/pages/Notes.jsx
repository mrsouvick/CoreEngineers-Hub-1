import React, { useState, useMemo, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import { notesData, branches, semesters, subjects, difficulties } from '../data/notesData';
import './Notes.css';

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    branch: '',
    semester: '',
    subject: '',
    difficulty: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalViews: 0,
    totalDownloads: 0
  });

  // Initialize stats
  useEffect(() => {
    const totalNotes = notesData.length;
    const totalViews = notesData.reduce((sum, note) => sum + (note.views || 0), 0);
    const totalDownloads = notesData.reduce((sum, note) => sum + (note.downloadCount || 0), 0);
    
    setStats({
      totalNotes,
      totalViews,
      totalDownloads
    });
  }, []);

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let filtered = [...notesData];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchLower) ||
        note.description.toLowerCase().includes(searchLower) ||
        note.subject.toLowerCase().includes(searchLower) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        note.branch.toLowerCase().includes(searchLower)
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

    // Difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter(note => 
        note.difficulty === filters.difficulty
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
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleBranchQuickFilter = (branch) => {
    setFilters(prev => ({ 
      ...prev, 
      branch: prev.branch === branch ? '' : branch 
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ branch: '', semester: '', subject: '', difficulty: '' });
    setSearchTerm('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleDownloadAll = () => {
    // This would typically trigger a batch download
    // For now, just show a message
    alert('Batch download feature coming soon!');
  };

  return (
    <div className="notes-page">
      {/* Background Glow Effects */}
      <div className="notes-glow-effect glow-1"></div>
      <div className="notes-glow-effect glow-2"></div>
      
      <div className="notes-container">
        {/* Header */}
        <header className="notes-header">
          <div className="notes-badge">
            <span className="notes-badge-dot"></span>
            Engineering Study Materials
          </div>
          
          <h1 className="notes-title">
            <span className="gradient-text">Notes Library</span>
          </h1>
          
          <p className="notes-subtitle">
            Access comprehensive study materials for all engineering branches and semesters. 
            Download PDFs, view previews, and enhance your learning experience.
          </p>
        </header>

        {/* Stats Bar */}
        <div className="notes-stats-bar">
          <div className="stat-item">
            <span className="stat-value">{formatNumber(stats.totalNotes)}</span>
            <span className="stat-label">Notes Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatNumber(stats.totalViews)}</span>
            <span className="stat-label">Total Views</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatNumber(stats.totalDownloads)}</span>
            <span className="stat-label">Downloads</span>
          </div>
        </div>

        {/* Branch Quick Filters */}
        <div className="branch-quick-filters">
          <h3 className="branch-filters-title">Browse by Branch</h3>
          <div className="branch-filters-grid">
            {branches.map(branch => (
              <button
                key={branch.value}
                className={`branch-filter-btn ${filters.branch === branch.value ? 'active' : ''}`}
                onClick={() => handleBranchQuickFilter(branch.value)}
              >
                <span className="branch-icon">{branch.icon}</span>
                {branch.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <section className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search notes by title, subject, tags, or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
            {searchTerm && (
              <button 
                className="search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">🏫</span>
                Branch
              </label>
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                className="filter-select"
              >
                <option value="">All Branches</option>
                {branches.map(branch => (
                  <option key={branch.value} value={branch.value}>
                    {branch.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">📚</span>
                Semester
              </label>
              <select
                value={filters.semester}
                onChange={(e) => handleFilterChange('semester', e.target.value)}
                className="filter-select"
              >
                <option value="">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem.value} value={sem.value}>
                    {sem.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">📖</span>
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className="filter-select"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">⚡</span>
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="filter-select"
              >
                <option value="">All Levels</option>
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">📊</span>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="downloads">Most Downloads</option>
                <option value="rating">Highest Rated</option>
                <option value="alphabetical">A → Z</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || filters.branch || filters.semester || filters.subject || filters.difficulty) && (
            <div className="active-filters-container">
              <h4 className="active-filters-title">Active Filters:</h4>
              <div className="active-filters">
                {searchTerm && (
                  <span className="filter-tag">
                    Search: "{searchTerm}"
                    <button 
                      className="filter-remove"
                      onClick={() => setSearchTerm('')}
                      aria-label="Remove search filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {filters.branch && (
                  <span className="filter-tag">
                    Branch: {branches.find(b => b.value === filters.branch)?.label}
                    <button 
                      className="filter-remove"
                      onClick={() => handleFilterChange('branch', '')}
                      aria-label="Remove branch filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {filters.semester && (
                  <span className="filter-tag">
                    Semester: {filters.semester}
                    <button 
                      className="filter-remove"
                      onClick={() => handleFilterChange('semester', '')}
                      aria-label="Remove semester filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {filters.subject && (
                  <span className="filter-tag">
                    Subject: {filters.subject}
                    <button 
                      className="filter-remove"
                      onClick={() => handleFilterChange('subject', '')}
                      aria-label="Remove subject filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {filters.difficulty && (
                  <span className="filter-tag">
                    Difficulty: {filters.difficulty}
                    <button 
                      className="filter-remove"
                      onClick={() => handleFilterChange('difficulty', '')}
                      aria-label="Remove difficulty filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>
              <button onClick={clearFilters} className="clear-filters-btn">
                <span>🗑️</span>
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* View Controls and Results Info */}
        <div className="results-info">
          <div className="results-count">
            Showing <span>{startIndex + 1}-{Math.min(endIndex, filteredNotes.length)}</span> of <span>{filteredNotes.length}</span> notes
          </div>
          
          <div className="results-actions">
            <div className="view-controls">
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  ⏹️
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  📋
                </button>
              </div>
              
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="sort-select"
              >
                <option value="8">8 per page</option>
                <option value="12">12 per page</option>
                <option value="16">16 per page</option>
                <option value="24">24 per page</option>
              </select>
            </div>
            
            {filteredNotes.length > 0 && (
              <button onClick={handleDownloadAll} className="download-all-btn">
                <span>📦</span>
                Download All
              </button>
            )}
          </div>
        </div>

        {/* Notes Grid/List */}
        {paginatedNotes.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="notes-grid">
              {paginatedNotes.map(note => (
                <NoteCard key={note.id} note={note} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="notes-list">
              {paginatedNotes.map(note => (
                <NoteCard key={note.id} note={note} viewMode="list" />
              ))}
            </div>
          )
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3 className="empty-title">No notes found</h3>
            <p className="empty-message">
              {searchTerm || filters.branch || filters.semester || filters.subject || filters.difficulty
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'No notes have been uploaded yet. Check back soon!'
              }
            </p>
            {(searchTerm || filters.branch || filters.semester || filters.subject || filters.difficulty) && (
              <button onClick={clearFilters} className="btn btn-primary">
                Clear All Filters
              </button>
            )}
            <div className="empty-suggestions">
              <span className="empty-suggestion" onClick={() => handleBranchQuickFilter('CSE')}>
                Try CSE Notes
              </span>
              <span className="empty-suggestion" onClick={() => setSortBy('popular')}>
                Most Popular
              </span>
              <span className="empty-suggestion" onClick={clearFilters}>
                Show All Notes
              </span>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ←
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              }
              
              // Show ellipsis
              if (
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return <span key={`dots-${page}`} className="pagination-dots">...</span>;
              }
              
              return null;
            })}
            
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;