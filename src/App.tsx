import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Check,
  CheckCheck,
  Copy,
  Download,
  ExternalLink,
  Gift,
  Layers3,
  Menu,
  MessageCircle,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  X,
  BookOpen,
  Gamepad2,
  FileText,
} from "lucide-react";
import { siteConfig as config } from "./data/siteConfig";
import type { Service } from "./data/siteConfig";

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            {config.logoText}
            <span />
          </span>
          <span>{config.siteName}</span>
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="navigation"
          className={open ? "navigation open" : "navigation"}
          aria-label="主导航"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          {config.nav.map((item) => (
            <a
              key={item.id}
              className={item.id === "contact" ? "nav-contact" : ""}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
              {item.id === "contact" && <ArrowUpRight size={15} />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero container">
      <div className="hero-glow" aria-hidden="true" />
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37 + 7) % 100}%`,
              top: `${(i * 19 + 11) % 100}%`,
              animationDelay: `${i * -0.7}s`,
            }}
          />
        ))}
      </div>
      <Reveal className="hero-copy">
        <div className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          {config.heroEyebrow}
        </div>
        <h1>
          {config.heroTitle.map((line, index) => (
            <span key={line} className={index === 1 ? "gradient-text" : ""}>
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-description">{config.heroSubtitle}</p>
        <div className="hero-actions">
          <a className="button primary" href="#contact">
            联系我 <ArrowUpRight size={18} />
          </a>
          <a className="button secondary" href="#services">
            查看服务 <ArrowDown size={17} />
          </a>
        </div>
        <div className="hero-tags">
          {config.heroTags.map((tag) => (
            <span key={tag}>
              <Check size={14} />
              {tag}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal className="hero-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-cross cross-one">+</div>
        <div className="art-cross cross-two">+</div>
        <div className="terminal-card">
          <div className="terminal-bar">
            <div className="terminal-dots">
              <i />
              <i />
              <i />
            </div>
            <span>personal / workspace</span>
            <Terminal size={14} />
          </div>
          <div className="terminal-body">
            <span className="mono muted">// {config.nickname}</span>
            <div className="terminal-command">
              <span>›</span> build something playable
              <span className="cursor" />
            </div>
            <div className="service-stack">
              {config.services.map((service, index) => (
                <a href="#services" key={service.id}>
                  <span className="stack-number">0{index + 1}</span>
                  <span>{service.title}</span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
            <div className="terminal-footer">
              <span>
                <span className="status-dot" /> SIMPLE. USEFUL. PERSONAL.
              </span>
              <span>↵</span>
            </div>
          </div>
        </div>
        <div className="floating-label">
          <Layers3 size={17} />
          <span>从搭建，到分享。</span>
          <Sparkles size={14} />
        </div>
      </Reveal>
      <a href="#about" className="hero-bottom">
        <span>了解更多</span>
        <ArrowDown size={14} />
        <span className="hero-bottom-line" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container about">
      <Reveal className="about-inner">
        <div>
          <span className="eyebrow">ABOUT / 关于我</span>
          <h2>{config.aboutTitle}</h2>
        </div>
        <div>
          <p>{config.aboutText}</p>
          <div className="tag-list">
            {config.aboutTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SectionHeading({
  section,
}: {
  section: keyof typeof config.sections;
}) {
  const content = config.sections[section];
  return (
    <div className="section-heading">
      <span className="eyebrow">{content.eyebrow}</span>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
}

const serviceIcons = [Server, Download, ShieldCheck, Wrench];
function Services() {
  return (
    <section id="services" className="section container">
      <Reveal>
        <SectionHeading section="services" />
      </Reveal>
      <div className="services-grid">
        {(config.services as Service[]).map((service, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          return (
            <Reveal key={service.id} className="service-card">
              <div className="card-top">
                <span className="icon-box">
                  <Icon size={22} />
                </span>
                <span className="card-index">0{index + 1}</span>
              </div>
              <h3>{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <div
                className={`prices ${service.prices.length > 1 ? "multiple-prices" : ""}`}
              >
                {service.prices.length ? (
                  service.prices.map((price) => (
                    <div key={price.unit}>
                      <strong>{price.amount}</strong>
                      <span>{price.unit}</span>
                    </div>
                  ))
                ) : (
                  <div>
                    <strong className="negotiable">按需沟通</strong>
                  </div>
                )}
              </div>
              <p className="service-description">{service.description}</p>
              <ul className="feature-list">
                {service.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {service.formats && (
                <div className="formats">
                  {service.formats.map((format) => (
                    <span key={format}>{format}</span>
                  ))}
                </div>
              )}
              {service.note && <p className="service-note">{service.note}</p>}
              <a className="service-link" href="#contact">
                咨询这项服务 <ArrowUpRight size={16} />
              </a>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="benefit">
        <span className="icon-box">
          <Gift size={24} />
        </span>
        <div>
          <h3>{config.benefit.title}</h3>
          <p>{config.benefit.description}</p>
        </div>
        <span className="benefit-range">{config.benefit.range}</span>
      </Reveal>
    </section>
  );
}

function safeUrl(url: string) {
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
}

function Resources() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const filtered = config.resources.filter(
    (resource) =>
      (category === "全部" || resource.category === category) &&
      `${resource.title} ${resource.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section id="resources" className="resources-section">
      <div className="section container">
        <Reveal>
          <SectionHeading section="resources" />
        </Reveal>
        <div className="resource-controls">
          <div className="category-tabs" role="group" aria-label="资源分类">
            {["全部", ...config.resourceCategories].map((item) => (
              <button
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={17} />
            <input
              aria-label="搜索资源"
              type="search"
              placeholder="搜索资源…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="resource-count" role="status">
          {category} · {filtered.length} 项资源
        </div>
        <div className="resources-grid">
          {filtered.map((resource) => {
            const url = safeUrl(resource.url);
            const Icon =
              resource.category === "教程"
                ? BookOpen
                : resource.category === "游戏"
                  ? Gamepad2
                  : resource.category === "工具"
                    ? Wrench
                    : FileText;
            return (
              <article className="resource-card" key={resource.id}>
                <div className="resource-top">
                  <Icon size={24} />
                  <span>{resource.category}</span>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-bottom">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      立即下载 <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <button disabled className="download-disabled">
                      暂未提供 <Download size={16} />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            暂无匹配资源，试试其他分类或关键词。
          </div>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const [feedback, setFeedback] = useState("");
  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback(`${label}已复制`);
    } catch {
      setFeedback("暂时无法自动复制，请选中号码手动复制。");
    }
  }
  return (
    <section id="contact" className="section container">
      <Reveal className="contact-panel">
        <div>
          <SectionHeading section="contact" />
          <p className="contact-hint">
            <MessageCircle size={16} />
            {config.contactHint}
          </p>
        </div>
        <div className="contact-methods">
          {config.contacts.map((contact) => (
            <div className="contact-method" key={contact.label}>
              <span className="contact-label">{contact.label}</span>
              <strong>{contact.value}</strong>
              <button
                aria-label={`复制${contact.label}号码`}
                onClick={() => copy(contact.label, contact.value)}
              >
                {feedback === `${contact.label}已复制` ? (
                  <CheckCheck size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          ))}
          <p className="copy-status" role="status">
            {feedback || "点击右侧图标复制联系方式"}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="container footer">
      <div className="footer-top">
        <a className="brand" href="#home">
          <span className="brand-mark">
            {config.logoText}
            <span />
          </span>
          {config.siteName}
        </a>
        <div className="other-links">
          <span>其他资源</span>
          {config.externalLinks.map((link) => {
            const url = safeUrl(link.url);
            return (
              url && (
                <a
                  key={link.title}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                  <ExternalLink size={12} />
                </a>
              )
            );
          })}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {config.footerText}
        </span>
        <a href="#home">
          回到顶部 <ArrowRight size={14} />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = `${config.siteName} | ${config.heroTitle.join(" · ")}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", config.heroSubtitle);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#services">
        跳到服务内容
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
