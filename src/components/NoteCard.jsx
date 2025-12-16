import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './NoteCard.css';

const branchStyleMap = {
  CSE: { 
    background: 'linear-gradient(135deg, #DBEAFE 0%, #E0F2FE 100%)', 
    color: '#1E40AF',
    icon: '💻'
  },
  ECE: { 
    background: 'linear-gradient(135deg, #F3E8FF 0%, #EDE9FE 100%)', 
    color: '#6B21A8',
    icon: '📡'
  },
  ME:  { 
    background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)', 
    color: '#991B1B',
    icon: '⚙️'
  },
  CE:  { 
    background: 'linear-gradient(135deg, #D1FAE5 0%, #BBF7D0 100%)', 
    color: '#166534',
    icon: '🏗️'
  },
  EE:  { 
    background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', 
    color: '#78350F',
    icon: '⚡'
  },
  default: { 
    background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)', 
    color: '#374151',
    icon: '📚'
  },
};

const difficultyStyleMap = {
  easy: { background: '#D1FAE5', color: '#166534' },
  medium: { background: '#FEF3C7', color: '#78350F' },
  hard: { background: '#FEE2E2', color: '#991B1B' }
};

function getBranchStyle(branch) {
  return branchStyleMap[branch] || branchStyleMap.default;
}

function getDifficultyStyle(difficulty) {
  return difficultyStyleMap[difficulty] || difficultyStyleMap.medium;
}

function formatDate(dateLike) {
  if (!dateLike) return '—';
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  if (Number.isNaN(d.getTime())) return '—';
  const now = new Date();
  const diffTime = Math.abs(now - d);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays/7)} weeks ago`;
  
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatNumber(num) {
  if (!num && num !== 0) return '—';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

const NoteCard = ({ note, viewMode = 'grid' }) => {
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  if (!note || typeof note !== 'object') {
    return null;
  }

  const {
    id,
    branch = 'N/A',
    semester = '—',
    fileSize = '',
    title = 'Untitled Note',
    subject = '',
    description = '',
    tags = [],
    uploadedBy = 'Unknown',
    lastUpdated = null,
    rating = '—',
    previewUrl = '#',
    downloadUrl = '#',
    thumbnail = '',
    views = 0,
    downloadCount = 0,
    difficulty = 'medium',
    pages = 0
  } = note;

  const safeTags = Array.isArray(tags) ? tags : [];
  const branchStyle = getBranchStyle(branch);
  const difficultyStyle = getDifficultyStyle(difficulty);
  const isExternalPreview = previewUrl && /^https?:\/\//i.test(previewUrl);
  
  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement quick view modal here
    console.log('Quick view:', title);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show copied notification
    }
  };

  const renderRatingStars = () => {
    const numericRating = typeof rating === 'number' ? rating : parseFloat(rating) || 0;
    const filledStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;
    
    return (
      <div className="rating-stars" aria-label={`Rating: ${numericRating} out of 5`}>
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`star ${i < filledStars ? 'filled' : (i === filledStars && hasHalfStar ? 'half' : '')}`}
          >
            ★
          </span>
        ))}
        <span className="rating-value">{numericRating.toFixed(1)}</span>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <article className="note-card note-card-list" aria-labelledby={`note-title-${id}`}>
        <div className="note-card-list-inner">
          {/* Thumbnail */}
          {thumbnail && !imageError ? (
            <div className="note-thumbnail-list">
              <img 
                src={thumbnail} 
                alt={title}
                className="thumbnail-image"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="note-thumbnail-placeholder-list" style={{ background: branchStyle.background }}>
              <span className="thumbnail-icon">{branchStyle.icon}</span>
            </div>
          )}
          
          {/* Content */}
          <div className="note-content-list">
            <div className="note-header-list">
              <div className="branch-info-list">
                <span 
                  className="branch-badge-list"
                  style={{ background: branchStyle.background, color: branchStyle.color }}
                >
                  <span className="branch-icon-list">{branchStyle.icon}</span>
                  <strong className="branch-text">{branch}</strong>
                  <span className="sem-text">Sem {semester}</span>
                </span>
                
                <span className="difficulty-badge" style={{ background: difficultyStyle.background, color: difficultyStyle.color }}>
                  {difficulty}
                </span>
                
                <span className="file-size">{fileSize}</span>
              </div>
              
              <div className="note-actions-mini">
                <button 
                  className="action-btn-mini bookmark-btn"
                  onClick={handleBookmark}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark note'}
                >
                  {isBookmarked ? '🔖' : '📑'}
                </button>
                <button 
                  className="action-btn-mini share-btn"
                  onClick={handleShare}
                  aria-label="Share note"
                >
                  ↗️
                </button>
              </div>
            </div>
            
            <h3 id={`note-title-${id}`} className="note-title-list">{title}</h3>
            
            {subject && <p className="note-subject-list">{subject}</p>}
            
            {description && (
              <p className="note-description-list line-clamp-2">{description}</p>
            )}
            
            <div className="note-tags-list">
              {safeTags.slice(0, 4).map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
              {safeTags.length > 4 && (
                <span className="tag-more">+{safeTags.length - 4} more</span>
              )}
            </div>
            
            <div className="note-stats-list">
              <div className="stat-group-list">
                <span className="stat" title={`Uploaded by ${uploadedBy}`}>
                  👤 {uploadedBy}
                </span>
                <span className="stat" title={`Last updated ${formatDate(lastUpdated)}`}>
                  📅 {formatDate(lastUpdated)}
                </span>
                <span className="stat" title={`${pages} pages`}>
                  📄 {pages} pages
                </span>
              </div>
              
              <div className="engagement-stats">
                <span className="engagement-stat" title={`${formatNumber(views)} views`}>
                  👁️ {formatNumber(views)}
                </span>
                <span className="engagement-stat" title={`${formatNumber(downloadCount)} downloads`}>
                  📥 {formatNumber(downloadCount)}
                </span>
              </div>
              
              {renderRatingStars()}
            </div>
          </div>
          
          {/* Actions */}
          <div className="note-actions-list">
            <a
              href={previewUrl || '#'}
              target={isExternalPreview ? '_blank' : '_self'}
              rel={isExternalPreview ? 'noopener noreferrer' : undefined}
              className="btn btn-primary btn-preview"
              aria-label={`Preview ${title}`}
              onClick={handleQuickView}
            >
              <span className="btn-icon">👁️</span>
              Quick View
            </a>

            <a
              href={downloadUrl || '#'}
              download
              className="btn btn-secondary btn-download"
              aria-label={`Download ${title}`}
              onClick={(e) => {
                if (!downloadUrl || downloadUrl === '#') {
                  e.preventDefault();
                }
              }}
            >
              <span className="btn-icon">📥</span>
              Download
              {fileSize && <span className="file-size-badge">{fileSize}</span>}
            </a>
          </div>
        </div>
      </article>
    );
  }

  // Grid View (Default)
  return (
    <article className="note-card note-card-grid" aria-labelledby={`note-title-${id}`}>
      {/* Thumbnail */}
      {thumbnail && !imageError ? (
        <div className="note-thumbnail">
          <img 
            src={thumbnail} 
            alt={title}
            className="thumbnail-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="thumbnail-overlay">
            <button 
              className="quick-view-btn"
              onClick={handleQuickView}
              aria-label="Quick preview"
            >
              👁️ Quick View
            </button>
          </div>
          
          <button 
            className="bookmark-btn-top"
            onClick={handleBookmark}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark note'}
          >
            {isBookmarked ? '🔖' : '📑'}
          </button>
          
          <span 
            className="difficulty-badge-top"
            style={{ background: difficultyStyle.background, color: difficultyStyle.color }}
          >
            {difficulty}
          </span>
        </div>
      ) : (
        <div className="note-thumbnail-placeholder" style={{ background: branchStyle.background }}>
          <span className="thumbnail-icon">{branchStyle.icon}</span>
          <div className="thumbnail-overlay">
            <button 
              className="quick-view-btn"
              onClick={handleQuickView}
              aria-label="Quick preview"
            >
              👁️ Quick View
            </button>
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className="note-content">
        <div className="card-header">
          <div className="branch-info">
            <span 
              className="branch-badge"
              style={{ background: branchStyle.background, color: branchStyle.color }}
            >
              <span className="branch-icon">{branchStyle.icon}</span>
              <strong className="branch-text">{branch}</strong>
              <span className="sem-text">Sem {semester}</span>
            </span>
            
            <div className="file-info">
              <span className="file-size">{fileSize}</span>
              <span className="pages-badge" title={`${pages} pages`}>
                📄 {pages}
              </span>
            </div>
          </div>
          
          <div className="engagement-mini">
            <span className="views-mini" title={`${formatNumber(views)} views`}>
              👁️ {formatNumber(views)}
            </span>
            <span className="downloads-mini" title={`${formatNumber(downloadCount)} downloads`}>
              📥 {formatNumber(downloadCount)}
            </span>
          </div>
        </div>

        <h3 id={`note-title-${id}`} className="note-title">{title}</h3>

        {subject && <p className="note-subject">{subject}</p>}

        {description && <p className="note-description line-clamp-3">{description}</p>}

        <div className="note-tags" aria-label="Tags">
          {safeTags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
          {safeTags.length > 3 && (
            <span className="tag-more" aria-label={`${safeTags.length - 3} more tags`}>
              +{safeTags.length - 3}
            </span>
          )}
        </div>

        <div className="note-meta">
          <div className="meta-left">
            <span className="meta-item" title={`Uploaded by ${uploadedBy}`}>
              <span className="meta-icon">👤</span>
              <span className="meta-text">{uploadedBy}</span>
            </span>
            <span className="meta-item" title={`Updated ${formatDate(lastUpdated)}`}>
              <span className="meta-icon">🕒</span>
              <span className="meta-text">{formatDate(lastUpdated)}</span>
            </span>
          </div>
          
          <div className="meta-right">
            {renderRatingStars()}
          </div>
        </div>

        <div className="note-actions">
          <a
            href={previewUrl || '#'}
            target={isExternalPreview ? '_blank' : '_self'}
            rel={isExternalPreview ? 'noopener noreferrer' : undefined}
            className="btn btn-primary btn-preview"
            aria-label={`Preview ${title}`}
            onClick={handleQuickView}
          >
            <span className="btn-icon">👁️</span>
            Preview
          </a>

          <a
            href={downloadUrl || '#'}
            download
            className="btn btn-secondary btn-download"
            aria-label={`Download ${title}`}
            onClick={(e) => {
              if (!downloadUrl || downloadUrl === '#') {
                e.preventDefault();
              }
            }}
          >
            <span className="btn-icon">📥</span>
            Download
          </a>
          
          <button 
            className="btn btn-icon-only share-btn"
            onClick={handleShare}
            aria-label="Share note"
          >
            ↗️
          </button>
        </div>
      </div>
    </article>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    branch: PropTypes.string,
    semester: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fileSize: PropTypes.string,
    title: PropTypes.string,
    subject: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    uploadedBy: PropTypes.string,
    lastUpdated: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    previewUrl: PropTypes.string,
    downloadUrl: PropTypes.string,
    thumbnail: PropTypes.string,
    views: PropTypes.number,
    downloadCount: PropTypes.number,
    difficulty: PropTypes.string,
    pages: PropTypes.number
  }).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list'])
};

NoteCard.defaultProps = {
  viewMode: 'grid'
};

export default memo(NoteCard);