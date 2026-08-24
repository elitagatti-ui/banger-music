
import './Logo.css';

export const Logo = ({ showText = true }) => {
  return (
    <div className="d-flex align-items-center gap-2 logo-container">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" />
        <path d="M16 8V24" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
        <path d="M11 12V20" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M21 12V20" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 14V18" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" />
        <path d="M25 14V18" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {showText && <span className="logo-text">BANGER</span>}
    </div>
  );
};