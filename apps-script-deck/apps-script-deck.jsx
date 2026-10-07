// ============================================================
// apps-script-deck.jsx — layout engine
// Maps apps-script-content.js → paginated Letter-landscape pages.
// Edit content in apps-script-content.js; styles live in index.html.
// React + ReactDOM are loaded as globals by index.html.
// ============================================================
import { config, pages } from "./apps-script-content.js";

const { createElement: h, Fragment } = React;

// ── Icons (24×24 stroke) ───────────────────────────────────
const ICONS = {
  grid: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.3c2.1.8 3.5 2.8 3.5 5.7" /></>,
  doc: <><path d="M6 3h8l5 5v13H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  sparkle: <><path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" /><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM9 12h6M9 16h6" /></>,
  browser: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 10l3 2-3 2M12.5 15H17" /></>,
  bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: <><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17h.01" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

const Icon = ({ name, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[name] || null}
  </svg>
);

const Html = ({ tag = "span", html, ...rest }) =>
  h(tag, { ...rest, dangerouslySetInnerHTML: { __html: html } });

const pad2 = (n) => String(n).padStart(2, "0");

// ── Shared blocks ──────────────────────────────────────────
const Callout = ({ callout }) =>
  callout ? <Html tag="div" className={`callout callout-${callout.color || "amber"}`} html={callout.text} /> : null;

const Links = ({ links }) =>
  links && links.length ? (
    <div className="links">
      {links.map((l) => (
        <a key={l.url} href={l.url} className="link">
          <Icon name="arrow" size={13} />
          {l.text}
        </a>
      ))}
    </div>
  ) : null;

const Lead = ({ text }) => (text ? <p className="lead">{text}</p> : null);

const Card = ({ item }) => (
  <div className="card">
    <div className="card-top">
      <div className={`icon icon-${item.iconColor || "coral"}`}><Icon name={item.icon} /></div>
      {item.badge ? <span className="badge">{item.badge}</span> : null}
    </div>
    <h3 className="card-title">{item.title}</h3>
    {item.body ? <p className="card-body">{item.body}</p> : null}
  </div>
);

// ── Layouts ────────────────────────────────────────────────
const LAYOUTS = {
  "full-text": (p) => (
    <>
      <Html tag="p" className="purpose-block" html={p.statement} />
      <div className="tile-row">
        {(p.tiles || []).map((t) => (
          <div className="tile" key={t.title}>
            <div className={`icon icon-${t.iconColor || "coral"}`}><Icon name={t.icon} /></div>
            <span>{t.title}</span>
          </div>
        ))}
      </div>
    </>
  ),

  "card-grid-3": (p) => (
    <>
      <Lead text={p.lead} />
      <div className="card-grid card-grid-3">{p.items.map((it) => <Card key={it.title} item={it} />)}</div>
      <Callout callout={p.callout} />
    </>
  ),

  "card-grid-2": (p) => (
    <>
      <Lead text={p.lead} />
      <div className="card-grid card-grid-2">{p.items.map((it) => <Card key={it.title} item={it} />)}</div>
      <Callout callout={p.callout} />
      <Links links={p.links} />
    </>
  ),

  "option-compare": (p) => (
    <div className="card-grid card-grid-2 options">
      {p.options.map((o) => (
        <div className={`card option ${o.chosen ? "option-chosen" : "option-muted"}`} key={o.title}>
          <div className="card-top">
            <div className={`icon ${o.chosen ? "icon-coral" : "icon-gray"}`}><Icon name={o.icon} /></div>
            <span className={`badge ${o.chosen ? "" : "badge-muted"}`}>{o.badge}</span>
          </div>
          <h3 className="card-title option-title">{o.title}</h3>
          {o.body.map((b, i) => <Html tag="p" className="card-body" key={i} html={b} />)}
          <Links links={o.links} />
        </div>
      ))}
    </div>
  ),

  "two-col": (p) => (
    <>
      <div className="two-col">
        {p.columns.map((c) => (
          <div className={`col col-${c.tone || "primary"}`} key={c.heading}>
            <h3 className="col-heading">{c.heading}</h3>
            <ul className="col-list">
              {c.items.map((t, i) => (
                <li key={i}>
                  <span className="bullet"><Icon name={c.tone === "warning" ? "alert" : "check"} size={16} /></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Callout callout={p.callout} />
    </>
  ),

  "journey-map": (p) => (
    <>
      <div className="journey">
        {p.steps.map((s, i) => (
          <div className="journey-step" key={s.title}>
            <div className="journey-num">{pad2(i + 1)}</div>
            <h3 className="card-title">{s.title}</h3>
            <p className="card-body">{s.body}</p>
            {i < p.steps.length - 1 ? <span className="journey-arrow"><Icon name="arrow" size={16} /></span> : null}
          </div>
        ))}
      </div>
      <Callout callout={p.callout} />
    </>
  ),

  checklist: (p) => (
    <>
      <ol className="checklist">
        {p.items.map((it, i) => {
          const item = typeof it === "string" ? { text: it } : it;
          return (
            <li key={i}>
              <span className="check-num">{i + 1}</span>
              <span className="check-text">{item.text}</span>
              {item.tag ? <span className={`tag tag-${item.tagColor || "coral"}`}>{item.tag}</span> : null}
            </li>
          );
        })}
      </ol>
      <Callout callout={p.callout} />
    </>
  ),
};

// ── Page types ─────────────────────────────────────────────
const Cover = ({ p }) => (
  <section className="page page-cover">
    <div className="cover-org">{config.org}</div>
    <div className="cover-main">
      <h1 className="cover-title">
        {p.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}
      </h1>
      <p className="cover-subtitle">{p.subtitle}</p>
    </div>
    <div className="cover-meta">
      {(p.meta || []).map((m) => (
        <div key={m.label}>
          <div className="meta-label">{m.label}</div>
          <div className="meta-value">{m.value}</div>
        </div>
      ))}
    </div>
    <div className="cover-bar">{p.footerLabel}</div>
    <div className="cover-ghost" aria-hidden="true">{p.ghost}</div>
  </section>
);

const Divider = ({ p }) => (
  <section className="page page-divider">
    <div className="divider-ghost" aria-hidden="true">{p.sectionNum}</div>
    <div className="divider-main">
      <div className="eyebrow">{p.eyebrow}</div>
      <h2 className="divider-title">{p.title}</h2>
      <p className="divider-desc">{p.description}</p>
    </div>
  </section>
);

const Closing = ({ p }) => (
  <section className="page page-cover page-closing">
    <div className="cover-org">{config.org}</div>
    <div className="cover-main">
      <div className="closing-eyebrow">{p.eyebrow}</div>
      <h2 className="cover-title"><span>{p.title}</span></h2>
      <Html tag="p" className="cover-subtitle closing-desc" html={p.description} />
      <p className="closing-highlight">{p.highlight}</p>
    </div>
    <div className="cover-ghost" aria-hidden="true">{"{ }"}</div>
  </section>
);

const Content = ({ p, num, total }) => {
  const render = LAYOUTS[p.layout];
  return (
    <section className="page page-content">
      <header className="page-header">
        <div>
          <div className="eyebrow">{p.eyebrow}</div>
          <h2 className="page-title">{p.title}</h2>
        </div>
        <div className="page-num">{pad2(num)}<span> / {pad2(total)}</span></div>
      </header>
      <div className={`page-body layout-${p.layout}`}>
        {render ? render(p) : <p className="lead">Unknown layout: {p.layout}</p>}
      </div>
      <footer className="page-footer">
        <span>{config.title}</span>
        <span>{config.org}</span>
      </footer>
    </section>
  );
};

const Deck = () =>
  pages.map((p, i) => {
    const key = i;
    if (p.type === "cover") return <Cover key={key} p={p} />;
    if (p.type === "divider") return <Divider key={key} p={p} />;
    if (p.type === "closing") return <Closing key={key} p={p} />;
    return <Content key={key} p={p} num={i + 1} total={pages.length} />;
  });

// Apply brand tokens from content config
const root = document.documentElement;
const b = config.brand || {};
[["primary", "--primary"], ["dark", "--dark"], ["secondary", "--secondary"], ["warning", "--warning"], ["success", "--success"]]
  .forEach(([k, v]) => b[k] && root.style.setProperty(v, b[k]));
document.title = config.title;

ReactDOM.createRoot(document.getElementById("deck")).render(<Deck />);
