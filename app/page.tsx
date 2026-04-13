import { FooterLinks } from "@/components/footer-links";
import Grainient from "@/components/grainient";
import { sections, socialLinks } from "@/data/site";

export default function Home() {
  return (
    <main className="page-shell">
      <Grainient
        color1="#5f535f"
        color2="#5227FF"
        color3="#B19EEF"
        timeSpeed={0.55}
        colorBalance={0}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
        className="grainient-background"
      />
      <div className="page-overlay" />
      <div className="content">
        <header className="hero">
          <h1>Mohamed Deraz Nasr</h1>
          <div className="intro-copy">
            ML engineer & researcher interested in embodied/physical AI,
            robotics, neural graphics, inference & distributed systems.
          </div>
        </header>

        {sections.map((section) => (
          <section key={section.title} className="section">
            <h2>{section.title}</h2>
            <div className={section.title === "Education" ? "side-by-side" : ""}>
              {section.items.map((item) => (
                <article key={item.name} className="entry">
                  <p className="entry-line">
                    <span className="entry-name">
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </span>
                    {section.title === "Experience" && item.meta ? (
                      <span className="entry-line-meta"> · {item.meta}</span>
                    ) : null}
                  </p>
                  {item.subtitle || item.meta ? (
                    <p className="entry-subtitle">
                      {item.subtitle ? <span>{item.subtitle}</span> : null}
                      {item.subtitle &&
                      item.meta &&
                      section.title !== "Experience" ? (
                        <span className="inline-meta"> · {item.meta}</span>
                      ) : null}
                    </p>
                  ) : null}
                  {!item.subtitle &&
                  item.meta &&
                  section.title !== "Experience" ? (
                    <p className="meta">{item.meta}</p>
                  ) : null}
                  {item.summary ? (
                    <p className="entry-summary">
                      <span className="bullet">·</span> {item.summary}
                    </p>
                  ) : null}

                  {item.links?.length ? (
                    <div className="inline-links">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}

        <FooterLinks links={socialLinks} />
      </div>
    </main>
  );
}
