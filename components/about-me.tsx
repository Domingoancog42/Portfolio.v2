const iconPaths = {
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5" />,
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5a3 3 0 0 0-5-2 4 4 0 0 0-3 6 4 4 0 0 0 0 7 4 4 0 0 0 5 5 3 3 0 0 0 3-3V5Zm0 0a3 3 0 0 1 5-2 4 4 0 0 1 3 6 4 4 0 0 1 0 7 4 4 0 0 1-5 5 3 3 0 0 1-3-3" />
      <path d="M7 7c0 2 2 3 5 3m-6 4c3-1 5 0 6 2m5-9c0 2-2 3-5 3m6 4c-3-1-5 0-6 2" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4c-1-1 0-2 1-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-8Z" />
      <path d="M7 10h.01M10 6h.01M15 7h.01M6 14h.01" strokeWidth="3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 9h6v6H9zM9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3" />
    </>
  ),
  cube: (
    <>
      <path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9 9-4M12 12 3 8m9 4v10M8 5l9 5" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v5m-2.5-2.5h5" />
    </>
  ),
};

function AboutIcon({ kind }: { kind: keyof typeof iconPaths }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[kind]}
    </svg>
  );
}

const interests: { label: string; icon: keyof typeof iconPaths }[] = [
  { label: "Software Development", icon: "code" },
  { label: "Web Development", icon: "code" },
  { label: "Mobile Development", icon: "phone" },
  { label: "Artificial Intelligence", icon: "brain" },
  { label: "UI/UX Design", icon: "palette" },
  { label: "Database Management", icon: "database" },
  { label: "Information Technology", icon: "chip" },
];

export default function AboutMe() {
  return (
    <section
      id="about"
      className="section container about-section"
      aria-labelledby="about-heading"
    >
      <header className="about-heading-block">
        <p className="about-eyebrow">GET TO KNOW ME</p>
        <h2 id="about-heading">About Me</h2>
        <p className="about-subtitle">
          A little about my background, curiosity, and love for technology.
        </p>
      </header>
      <div className="about-reference-grid">
        <div className="about-background">
          <p className="about-biography">
            I&apos;m a 4th year IT student from PHINMA Cagayan de Oro College
            building web and system solutions that people can actually use. My
            approach connects thoughtful UI/UX with the structure behind it:
            solid data, clear flows, and code that is built to evolve.
          </p>
          <p className="about-biography">
            I&apos;m actively seeking an internship/OJT opportunity where I can
            apply what I&apos;ve learned, gain hands-on industry experience, and
            keep developing my technical and professional skills. Based in
            Cagayan de Oro City, Philippines.
          </p>
          <div className="about-background-cards">
            <article className="about-background-card">
              <span className="about-card-icon">
                <AboutIcon kind="code" />
              </span>
              <div>
                <h3>Web Development</h3>
                <p>React · Next.js · TypeScript</p>
              </div>
            </article>
          </div>
        </div>
        <aside className="about-interests" aria-labelledby="interests-heading">
          <h3 id="interests-heading">
            INTERESTS
          </h3>
          <ul className="about-interest-grid">
            {interests.map((interest) => (
              <li key={interest.label}>
                <AboutIcon kind={interest.icon} />
                <span>{interest.label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
