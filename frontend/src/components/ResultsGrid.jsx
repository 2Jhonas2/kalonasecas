export default function ResultsGrid({ items = [], total = 0 }) {
  return (
    <section className="results">
      <p><strong>{total}</strong> resultados</p>
      <div className="grid">
        {items.map((p) => (
          <article key={p.id_place_recreational} className="card">
            <img
              src={p.image_url ?? "/placeholder.jpg"}
              alt={p.place_name}
              loading="lazy"
            />
            <div className="card-body">
              <h3>{p.place_name}</h3>
              {p.short_description && <p className="muted">{p.short_description}</p>}
              <p className="meta">
                {p.city?.name}, {p.department?.name} · {p.climate?.name}
              </p>
              {p.categories?.length > 0 && (
                <p className="badges">
                  {p.categories.map((pc) => (
                    <span key={pc.id_place_category} className="badge">
                      {pc.category.name}
                    </span>
                  ))}
                </p>
              )}
              {p.price_from != null && (
                <p className="price">Desde ${Number(p.price_from).toLocaleString("es-CO")}</p>
              )}
              {p.rating_avg ? (
                <p className="rating">⭐ {Number(p.rating_avg).toFixed(1)} ({p.review_count ?? 0})</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
