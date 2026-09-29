import { useEffect, useRef, useState } from "react";
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
import resourcesData from "./data/resources.json";
import type { Resource, Service } from "./data/siteConfig";
import * as THREE from "three";

function SpaceCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const mobile = window.matchMedia("(max-width: 760px)").matches; const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" }); const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(55,1,.1,100); camera.position.z=8;
    const count = mobile ? 380 : 1700; const positions = new Float32Array(count*3); const colors = new Float32Array(count*3);
    for(let i=0;i<count;i++){const r=2.5+Math.random()*5.5,t=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1);positions[i*3]=r*Math.sin(p)*Math.cos(t);positions[i*3+1]=r*Math.cos(p);positions[i*3+2]=r*Math.sin(p)*Math.sin(t);colors[i*3]=.35+Math.random()*.35;colors[i*3+1]=.45+Math.random()*.4;colors[i*3+2]=.85+Math.random()*.15;}
    const geometry=new THREE.BufferGeometry(); geometry.setAttribute("position",new THREE.BufferAttribute(positions,3));geometry.setAttribute("color",new THREE.BufferAttribute(colors,3));const material=new THREE.PointsMaterial({size:mobile?.025:.035,vertexColors:true,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false});const points=new THREE.Points(geometry,material);scene.add(points);
    const resize=()=>{const w=canvas.clientWidth||1,h=canvas.clientHeight||1;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.2:1.6));renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};resize();window.addEventListener("resize",resize);let raf=0;const pointer={x:0,y:0};const move=(e:MouseEvent)=>{pointer.x=(e.clientX/innerWidth-.5)*.2;pointer.y=(e.clientY/innerHeight-.5)*.2};window.addEventListener("mousemove",move);const animate=()=>{points.rotation.y+=reduced?.0002:.0007;points.position.x+=(pointer.x-points.position.x)*.008;points.position.y+=(pointer.y-points.position.y)*.008;renderer.render(scene,camera);raf=requestAnimationFrame(animate)};animate();return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);window.removeEventListener("mousemove",move);geometry.dispose();material.dispose();renderer.dispose()};
  }, []);
  return <canvas ref={ref} className="space-canvas" aria-hidden="true" />;
}

function InteractionLayer() {
  useEffect(() => {
    if (window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)").matches) return;
    const glow = document.createElement("div"); glow.className = "pointer-glow"; document.body.appendChild(glow);
    const move = (event: MouseEvent) => { glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`; };
    const click = (event: MouseEvent) => { const ripple = document.createElement("span"); ripple.className = "click-ripple"; ripple.style.left = `${event.clientX}px`; ripple.style.top = `${event.clientY}px`; document.body.appendChild(ripple); window.setTimeout(() => ripple.remove(), 650); };
    window.addEventListener("mousemove", move); window.addEventListener("click", click);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("click", click); glow.remove(); };
  }, []);
  return null;
}

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
      <SpaceCanvas />
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
        <div className="hero-image-slot image-slot"><img src="/images/hero-main.webp" alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>
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

const showcaseImages = Array.from({ length: 6 }, (_, index) => `/images/showcase-0${index + 1}.webp`);
function Showcase() {
  const [preview, setPreview] = useState<string | null>(null);
  const rows = [showcaseImages, [...showcaseImages].reverse()];
  return <section className="showcase-section" aria-label="视觉展示"><div className="showcase-heading container"><span className="eyebrow">SELECTED VISUALS / 视觉展示</span><p>一些游戏、技术与资源的视觉片段。</p></div>{rows.map((row, rowIndex) => <div className={`showcase-row showcase-row-${rowIndex}`} key={rowIndex}><div className="showcase-track">{[...row, ...row].map((src, index) => <button className="showcase-item image-slot" key={`${src}-${index}`} onClick={() => setPreview(src)} aria-label={`预览展示图片 ${index + 1}`}><img src={src} alt="展示图片" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /><span>0{(index % 6) + 1}</span></button>)}</div></div>)}{preview && <div className="image-modal" role="dialog" aria-modal="true" onClick={() => setPreview(null)}><button aria-label="关闭图片预览" onClick={() => setPreview(null)}><X /></button><img src={preview} alt="展示图片预览" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>}</section>;
}

function About() {
  return (
    <section id="about" className="container about">
      <Reveal className="about-inner">
        <div className="about-visual image-slot"><img src="/images/avatar.webp" alt="个人头像占位" onError={(event) => { event.currentTarget.style.display = "none"; }} /><span>{config.logoText}</span></div><div>
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
  const activeResources = (resourcesData as Resource[]).filter((resource) => resource.enabled);
  const filtered = activeResources.filter(
    (resource) =>
      (category === "全部" || resource.category === category) &&
      `${resource.title} ${resource.description} ${resource.category}`
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
              <article className={`resource-card${resource.featured ? " resource-featured" : ""}`} key={resource.id}>
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

function CurrentGame() {
  const resources = (resourcesData as Resource[]).filter((resource) => resource.enabled && resource.currentGame);
  const resource = resources[0];
  if (!resource) return null;
  const url = safeUrl(resource.url);
  return <section className="current-game-section"><div className="section container"><Reveal><div className="current-game"><div className="current-game-cover image-slot"><img src="/images/current-game-cover.webp" alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /><span className="game-cover-mark">{resource.title.slice(0, 1)}</span></div><div className="current-game-copy"><span className="eyebrow"><span className="status-dot" /> 正在运行</span><h2>{resource.title}</h2><p>{resource.description}</p><div className="game-shots"><div className="game-shot image-slot"><img src="/images/current-game-01.webp" alt={`${resource.title}截图`} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div></div>{url ? <a className="button primary" href={url} target="_blank" rel="noopener noreferrer">立即下载 <ArrowUpRight size={17} /></a> : <button className="button secondary" disabled>暂未提供 <Download size={17} /></button>}</div></div></Reveal></div></section>;
}

function Recommendations() {
  return <section id="recommendations" className="section container recommendations"><Reveal><SectionHeading section="recommendations" /></Reveal><div className="recommendation-grid">{config.partnerships.map((item) => <Reveal key={item.id} className="recommendation-card"><span className="eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p><a href={item.url} target="_blank" rel="noopener noreferrer" className="service-link">{item.action} <ExternalLink size={16} /></a></Reveal>)}</div></section>;
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
          {config.qqGroupUrl ? <a className="group-link" href={config.qqGroupUrl} target="_blank" rel="noopener noreferrer">加入QQ群 <ArrowUpRight size={16} /></a> : <p className="group-hint">QQ群暂未提供分享链接，可复制群号加入：784662149</p>}
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
      <InteractionLayer />
      <a className="skip-link" href="#services">
        跳到服务内容
      </a>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <About />
        <Services />
        <Recommendations />
        <Resources />
        <CurrentGame />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
