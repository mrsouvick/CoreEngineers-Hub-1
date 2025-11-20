import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './NoteCard.css';

const branchStyleMap = {
  CSE: { background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' },
  ECE: { background: '#f3e8ff', color: '#6b21a8', border: '1px solid #e9d5ff' },
  ME:  { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' },
  CE:  { background: '#d1fae5', color: '#166534', border: '1px solid #86efac' },
  EE:  { background: '#fef3c7', color: '#78350f', border: '1px solid #fde68a' },
  default: { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' },
};

function getBranchStyle(branch) {
  return branchStyleMap[branch] || branchStyleMap.default;
}

function formatDate(dateLike) {
  if (!dateLike) return '—';
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const NoteCard = ({ note }) => {
  if (!note || typeof note !== 'object') {
    return null;
  }

  const {
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
  } = note;

  const safeTags = Array.isArray(tags) ? tags : [];

  const branchStyle = getBranchStyle(branch);

  const isExternalPreview = previewUrl && /^https?:\/\//i.test(previewUrl);

  return (
    <article className="note-card card" aria-labelledby={`note-title-${note.id || Math.random()}`}>
      <div className="card-header">
        <span
          className="branch-badge"
          style={{ background: branchStyle.background, color: branchStyle.color, border: branchStyle.border }}
        >
          <strong className="branch-text">{branch}</strong>
          <span className="sem-text">Sem {semester}</span>
        </span>

        <span className="file-size" aria-hidden={fileSize ? 'false' : 'true'}>
          {fileSize || ''}
        </span>
      </div>

      <h3 id={`note-title-${note.id || Math.random()}`} className="note-title">{title}</h3>

      {subject && <p className="note-subject">{subject}</p>}

      {description && <p className="note-description">{description}</p>}

      <div className="note-tags" aria-label="Tags">
        {safeTags.slice(0, 3).map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
        {safeTags.length > 3 && (
          <span className="tag-more" aria-hidden="false">+{safeTags.length - 3} more</span>
        )}
      </div>

      <div className="note-stats" aria-hidden="false">
        <div className="stat-group">
          <span className="stat" title={`Uploaded by ${uploadedBy}`}>👤 {uploadedBy}</span>
          <span className="stat" title={`Last updated ${formatDate(lastUpdated)}`}>📅 {formatDate(lastUpdated)}</span>
        </div>
        <div className="rating" aria-label={`Rating ${rating}`}>⭐ {rating}</div>
      </div>

      <div className="note-actions">
        <a
          href={previewUrl || '#'}
          target={isExternalPreview ? '_blank' : '_self'}
          rel={isExternalPreview ? 'noopener noreferrer' : undefined}
          className="btn btn-primary"
          aria-label={`Preview ${title}`}
        >
          👁️ Preview
        </a>

        <a
          href={downloadUrl || '#'}
          download
          className="btn btn-secondary"
          aria-label={`Download ${title}`}
          onClick={(e) => {
            // If there's no real URL, prevent navigation
            if (!downloadUrl || downloadUrl === '#') {
              e.preventDefault();
            }
          }}
        >
          📥 Download
        </a>
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
  }).isRequired,
};

export default memo(NoteCard);
