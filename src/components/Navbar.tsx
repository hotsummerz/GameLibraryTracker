interface NavbarProps {
  appName: string;
  studentName: string;
  nim: string;
  profileUrl: string;
}

export default function Navbar({ appName, studentName, nim, profileUrl }: NavbarProps) {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <div className="brand-wrapper">
            <div className="brand">{appName}</div>
            <div className="student-id">{studentName} · {nim}</div>
          </div>
          {profileUrl && (
            <nav>
              <a href={profileUrl} className="nav-link" target="_blank" rel="noopener noreferrer">
                ← Kembali ke Profil
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
