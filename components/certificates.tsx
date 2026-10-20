import Image from "next/image";
import { certificates } from "@/lib/certificates";

function AwardIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="m8 12-2 9 6-3 6 3-2-9m-6-4 1.3 1.3L14 6.5" />
    </svg>
  );
}

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="section container certificates-section"
      aria-labelledby="certificates-heading"
    >
      <header className="certificates-heading">
        <p>PROOF OF LEARNING</p>
        <h2 id="certificates-heading">Certificates</h2>
        <span>
          A collection of certifications and milestones along my learning
          journey.
        </span>
      </header>
      <div className="certificate-grid">
        {(certificates.length
          ? certificates
          : Array.from({ length: 3 }, (_, index) => ({
              id: `placeholder-${index}`,
              title: "Certificate coming soon",
              issuer: "Details to be added",
              issued: "?",
              url: "",
              image: "",
            }))
        ).map((certificate) => {
          const content = (
            <>
              <div className="certificate-preview">
                {certificate.image ? (
                  <Image
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    width={800}
                    height={600}
                    unoptimized
                  />
                ) : (
                  <div
                    className="certificate-placeholder"
                    aria-label="Certificate image placeholder"
                  >
                    <span>CERTIFICATE</span>
                    <i />
                    <i />
                    <span className="certificate-placeholder-seal">
                      <AwardIcon />
                    </span>
                    <small>PREVIEW ? COMING SOON</small>
                  </div>
                )}
              </div>
              <div className="certificate-details">
                <span className="certificate-year">
                  <AwardIcon />
                  {certificate.issued}
                </span>
                <h3>{certificate.title}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
              </div>
            </>
          );
          return certificate.url ? (
            <a
              key={certificate.id}
              className="certificate-card"
              href={certificate.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${certificate.title}`}
            >
              {content}
            </a>
          ) : (
            <article className="certificate-card" key={certificate.id}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
