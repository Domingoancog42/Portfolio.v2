"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import AboutMe from "@/components/about-me";
import SiteHeader from "@/components/site-header";
import ContactIntro from "@/components/contact-intro";
import HomeSocials from "@/components/home-socials";
import Skills from "@/components/skills";
import Certificates from "@/components/certificates";
import JourneyGallery from "@/components/journey-gallery";
import SpecialtyFlicker from "@/components/specialty-flicker";
import { useEffect, useId, useRef, useState, type SVGProps } from "react";
import { profile, projects, type Project } from "@/lib/portfolio";

const BadgeScene = dynamic(() => import("@/components/badge-scene"), {
  ssr: false,
  loading: () => (
    <div className="scene-loading">
      <span className="status-dot" /> Getting my good side…
    </div>
  ),
});

function Arrow({
  diagonal = false,
  ...props
}: SVGProps<SVGSVGElement> & { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 0v40M0 20h40M6 6l28 28M6 34 34 6"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

function ProjectPreview({ kind }: { kind: Project["preview"] }) {
  const gradientId = useId();
  if (kind === "pikolcastle")
    return (
      <div className="project-preview preview-project-image">
        <Image
          src="/assets/images/pikolcastle.png"
          alt="Pikol Castle website preview"
          fill
          sizes="(max-width: 620px) 90vw, (max-width: 900px) 45vw, 400px"
        />
      </div>
    );
  if (kind === "sailing")
    return (
      <div className="project-preview preview-project-image">
        <Image
          src="/assets/images/boat-sailing.png"
          alt="Wayfarer boat-sailing open-world project with a sailboat on the open ocean"
          fill
          sizes="(max-width: 620px) 90vw, (max-width: 900px) 45vw, 400px"
        />
      </div>
    );
  if (kind === "horror")
    return (
      <div className="project-preview preview-project-image">
        <Image
          src="/assets/images/Gamedev.jpg"
          alt="Escape from PETA: PHINMA COC Nightmare game title screen"
          fill
          sizes="(max-width: 620px) 90vw, (max-width: 900px) 45vw, 400px"
        />
      </div>
    );
  if (kind === "shopping")
    return (
      <div className="project-preview preview-shopping" aria-hidden="true">
        <span className="shopping-preview-note">
          SHOPPING LIST
          <br />
          <strong>Everyday, organised.</strong>
        </span>
        <div className="shopping-preview-phone">
          <div className="shopping-preview-notch" />
          <small>YOUR EVERYDAY ESSENTIALS</small>
          <strong>
            My shopping list <span>＋</span>
          </strong>
          <p>A little planning. A simpler day.</p>
          {["Fresh vegetables", "Milk & eggs", "Bread", "Fruit"].map(
            (item, index) => (
              <div className="shopping-preview-item" key={item}>
                <span>{index === 0 ? "✓" : ""}</span>
                {item}
              </div>
            ),
          )}
          <div className="shopping-preview-add">＋ Add an item</div>
        </div>
        <span className="shopping-preview-caption">
          ILLUSTRATIVE INTERFACE PREVIEW
        </span>
      </div>
    );
  if (kind === "hris")
    return (
      <div className="project-preview preview-project-image">
        <Image
          src="/assets/images/mgb.png"
          alt="HRIS Management System sign-in screen"
          fill
          sizes="(max-width: 620px) 90vw, (max-width: 900px) 45vw, 400px"
        />
      </div>
    );
  if (kind === "badge")
    return (
      <div className="project-preview preview-badge" aria-hidden="true">
        <span className="preview-coordinates">EXPERIMENT_001 / WEBGL</span>
        <div className="mini-strap" />
        <div className="mini-badge">
          <span>DEVELOPER</span>
          <Image
            src="/assets/images/ancog.png"
            alt=""
            width={180}
            height={180}
          />
          <strong>Domingo Ancog</strong>
          <small>CREATIVE DEVELOPER</small>
        </div>
        <span className="preview-caption">
          A bit of code. A bit of personality.
        </span>
        <span className="preview-orbit orbit-one" />
        <span className="preview-orbit orbit-two" />
      </div>
    );
  if (kind === "forma")
    return (
      <div className="project-preview preview-forma" aria-hidden="true">
        <div className="mock-window forma-window">
          <div className="mock-nav">
            <strong>
              forma<span>®</span>
            </strong>
            <span>
              Space to create. <span className="mock-menu">☰</span>
            </span>
          </div>
          <small>LESS NOISE. MORE POSSIBILITY.</small>
          <div className="forma-title">
            Make room
            <br />
            for your next
            <br />
            <i>big idea.</i>
          </div>
          <span className="forma-button">
            Find your space <Arrow />
          </span>
          <div className="forma-sculpture">
            <span />
            <span />
            <span />
          </div>
          <span className="forma-bottom">
            A LITTLE SPACE GOES A LONG WAY. <span>↗</span>
          </span>
        </div>
      </div>
    );
  return (
    <div className="project-preview preview-orbit-dashboard" aria-hidden="true">
      <div className="mock-window orbit-window">
        <aside>
          <strong>
            o<span>r</span>
          </strong>
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="orbit-main">
          <div className="orbit-nav">
            <strong>
              Overview <span>↗</span>
            </strong>
            <span className="orbit-avatar">DA</span>
          </div>
          <small>Here&apos;s the bigger picture.</small>
          <div className="orbit-stats">
            <div>
              <small>Total visitors</small>
              <strong>24,892</strong>
              <span>↗ 18.6%</span>
            </div>
            <div>
              <small>Engagement</small>
              <strong>
                86.4<span>%</span>
              </strong>
              <span>↗ 8.2%</span>
            </div>
          </div>
          <div className="chart-label">
            <span>Activity overview</span>
            <small>This week ⌄</small>
          </div>
          <svg viewBox="0 0 300 100" className="mock-chart">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c4f36b" stopOpacity=".3" />
                <stop offset="100%" stopColor="#c4f36b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 84H300M0 50H300M0 16H300"
              stroke="#30352e"
              strokeWidth=".5"
            />
            <path
              d="m0 83 20-7 18 3 20-27 20 6 23-18 20 9 21-25 20 8 25-17 20 8 25-17 25 4 23-18 20 8V100H0Z"
              fill={`url(#${gradientId})`}
            />
            <path
              d="m0 83 20-7 18 3 20-27 20 6 23-18 20 9 21-25 20 8 25-17 20 8 25-17 25 4 23-18 20 8"
              stroke="#c4f36b"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <div className="chart-days">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCredits({ project }: { project: Project }) {
  if (!project.role && !project.partner) return null;
  return (
    <dl className="project-credits">
      {project.role ? (
        <div>
          <dt>MY ROLE</dt>
          <dd>{project.role}</dd>
        </div>
      ) : null}
      {project.partner ? (
        <div>
          <dt>PARTNER</dt>
          <dd>{project.partner}</dd>
        </div>
      ) : null}
    </dl>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!project || !element) return;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="project-dialog-title"
    >
      {project ? (
        <>
          <button
            className="dialog-close"
            onClick={onClose}
            aria-label="Close project details"
          >
            ×
          </button>
          <ProjectPreview kind={project.preview} />
          <div className="dialog-content">
            <span className="eyebrow">{project.label}</span>
            <h2 id="project-dialog-title">{project.title}</h2>
            <p>{project.detail}</p>
            <ProjectCredits project={project} />
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {project.websiteUrl ? (
              <a
                className="button button-primary"
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.label} website (opens in a new tab)`}
              >
                Visit website <Arrow diagonal />
              </a>
            ) : project.playUrl ? (
              <a
                className="button button-primary"
                href={project.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Play ${project.label} (opens in a new tab)`}
              >
                <span aria-hidden="true">&#9654;</span> Play <Arrow diagonal />
              </a>
            ) : project.id === "badge" ? (
              <a
                className="button button-primary"
                href="#home"
                onClick={onClose}
              >
                Try the 3D card <Arrow />
              </a>
            ) : (
              <button className="button button-secondary" onClick={onClose}>
                Back to projects <Arrow />
              </button>
            )}
          </div>
        </>
      ) : null}
    </dialog>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <section
          id="home"
          className="hero container"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <p className="hero-intro">WELCOME TO MY PORTFOLIO</p>
            <h1 id="hero-heading">
              Hi, I&apos;m{" "}
              <span className="hero-name">
                Domingo
                <br />
                Ancog
              </span>
            </h1>
            <SpecialtyFlicker />
            <p className="hero-description">
              A developer with a curious mind and an eye for detail. I enjoy
              bringing ideas to life through web development, thoughtful
              interfaces, and interactive 3D experiences.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                <Arrow diagonal /> View Projects
              </a>
              <a href="#contact" className="button button-secondary">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 6 9 7 9-7" />
                </svg>{" "}
                Contact Me
              </a>
              <HomeSocials />
            </div>
          </div>
          <div className="hero-art">
            <div className="badge-canvas">
              <BadgeScene />
            </div>
          </div>
          <a
            href="#about"
            className="scroll-cue"
            aria-label="Scroll to About me"
          >
            <span>↓</span>
          </a>
        </section>
        <AboutMe />
        <section
          id="projects"
          className="section projects-section"
          aria-labelledby="projects-heading"
        >
          <div className="container">
            <header className="projects-heading-block">
              <p className="projects-eyebrow">SELECTED WORK</p>
              <h2 id="projects-heading">Projects</h2>
              <p className="projects-subtitle">
                A selection of web experiences and interface concepts,
                <br className="desktop-break" /> built with code, curiosity, and
                thoughtful design.
              </p>
            </header>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.id} className="project-card">
                  <button
                    className="project-image-button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View ${project.label}`}
                  >
                    <ProjectPreview kind={project.preview} />
                    <span className="project-category">
                      {project.categoryLabel ??
                        (project.category === "UI experiments"
                          ? "UI / UX Concept"
                          : "Web Application")}
                    </span>
                  </button>
                  <div className="project-card-content">
                    <h3>
                      <button
                        className="project-title"
                        onClick={() => setSelectedProject(project)}
                      >
                        {project.label}
                      </button>
                    </h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      className="project-detail-link"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Read more about ${project.label}`}
                      title="View project details"
                    >
                      <Arrow diagonal />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Skills />
        <Certificates />
        <JourneyGallery />
        <section
          id="contact"
          className="section contact-section"
          aria-labelledby="contact-heading"
        >
          <div className="container">
            <header className="contact-heading-block">
              <h2 id="contact-heading">Contact Me</h2>
            </header>
            <div className="contact-grid">
              <ContactIntro />
              <form
                className="contact-form"
                action={`https://staticsiteforms.co.uk/${profile.email}`}
                method="POST"
              >
                <div className="form-heading">
                  <h3>Let&apos;s hear your idea.</h3>
                </div>
                <div className="form-field-row">
                  <label>
                    Your name
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="What should I call you?"
                      maxLength={100}
                      required
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      name="_replyto"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      maxLength={254}
                      required
                    />
                  </label>
                </div>
                <label>
                  What&apos;s on your mind?
                  <textarea
                    name="message"
                    placeholder="Tell me a little about your idea…"
                    rows={4}
                    maxLength={5000}
                    required
                  />
                </label>
                <div className="form-bottom">
                  <button className="button button-primary" type="submit">
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a className="footer-brand" href="#home">
          domingo ancog<span>.</span>
        </a>
        <p>Built with care, code, and a little personality.</p>
        <a href="#home" className="back-to-top">
          BACK TO TOP <span>↑</span>
        </a>
      </footer>
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
