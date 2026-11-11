interface FooterProps {
  studentName: string;
  nim: string;
  courseName: string;
}

export default function Footer({ courseName }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <address>
          <strong>Game Library Tracker</strong><br />
          Tugas Mata Kuliah {courseName}<br />
        </address>
      </div>
    </footer>
  );
}
