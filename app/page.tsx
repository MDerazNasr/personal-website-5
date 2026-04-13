import { FooterLinks } from "@/components/footer-links";
import { PixelBlast } from "@/components/pixel-blast";
import { sections, socialLinks } from "@/data/site";

export default function Home() {
  return (
    <main className="page-shell">
      <PixelBlast
        variant="square"
        pixelSize={2}
        color="#1f5c63"
        patternScale={8}
        patternDensity={0.7}
        pixelSizeJitter={1.8}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={1.9}
        edgeFade={0.33}
        transparent
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
            <div>
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
                      {item.subtitle && item.meta && section.title !== "Experience" ? (
                        <span className="inline-meta"> · {item.meta}</span>
                      ) : null}
                    </p>
                  ) : null}
                  {!item.subtitle && item.meta && section.title !== "Experience" ? (
                    <p className="meta">{item.meta}</p>
                  ) : null}
                  {item.summary ? <p className="entry-summary">{item.summary}</p> : null}

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
