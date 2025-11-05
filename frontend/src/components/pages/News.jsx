import React, { useState, useEffect } from "react";
import "./News.css";

const API_URL = (import.meta.env?.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

// Convierte rutas relativas del backend (/uploads/...) a absolutas
const resolveImageUrl = (url) => {
  if (!url) return null;
  const v = String(url).trim();
  if (!v) return null;
  if (/^(https?:)?\/\//i.test(v) || /^data:|^blob:/i.test(v)) return v;
  if (v.startsWith("/")) return `${API_URL}${v}`;
  return `${API_URL}/${v}`;
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TypeBadge = ({ type }) => {
  const label =
    type === "NEW_PLACE" ? "Nuevo lugar" :
    type === "NEW_PACKAGE" ? "Nuevo paquete" : "Info";
  return <span className={`news-badge news-${(type || "INFO").toLowerCase()}`}>{label}</span>;
};

const NewsSkeleton = () => (
  <div className="news-card skeleton">
    <div className="news-image skeleton-bar" />
    <div className="news-body">
      <div className="news-meta">
        <span className="skeleton-pill" />
        <span className="skeleton-dot" />
      </div>
      <div className="skeleton-line lg" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
    </div>
  </div>
);

export const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/news`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!alive) return;

        const normalized = Array.isArray(data)
          ? data.map((n) => ({ ...n, imageUrl: resolveImageUrl(n.imageUrl) }))
          : [];
        setNews(normalized);
      } catch (e) {
        console.error("Failed to fetch news:", e);
        setNews([]); // estado vacío si falla
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section className="news-page" aria-labelledby="news-title">
      <div className="news-header">
        <h1 id="news-title" className="news-title">Novedades</h1>
        <p className="news-subtitle">Lo más reciente agregado a la plataforma</p>
      </div>

      {loading ? (
        <div className="news-grid">
          {Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)}
        </div>
      ) : news.length === 0 ? (
        <div className="news-empty">
          <div className="empty-illustration" aria-hidden="true">📰</div>
          <h2>No hay noticias recientes</h2>
          <p>Cuando se agreguen nuevos lugares o paquetes, aparecerán aquí.</p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((item) => (
            <article key={item.id} className="news-card" role="article">
              {item.imageUrl && (
                <div className="news-image-wrap">
                  <img
                    className="news-image"
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              <div className="news-body">
                <div className="news-meta">
                  <TypeBadge type={item.type} />
                  <time className="news-date" dateTime={item.createdAt}>
                    {formatDate(item.createdAt)}
                  </time>
                </div>

                <h2 className="news-card-title">{item.title}</h2>
                {item.description && (
                  <p className="news-description">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default News;