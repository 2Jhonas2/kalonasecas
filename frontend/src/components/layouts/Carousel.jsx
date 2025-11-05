// Carousel.jsx (sin selección inicial)
import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

/**
 * Datos estáticos de las categorías para el carrusel.
 * Cada categoría incluye un ID, título, URL de imagen y texto alternativo.
 */
const CATEGORIES = [
  { id: 1, title: "Thematic Places", img: "https://www.informateymas.com/wp-content/uploads/2021/12/Iztapasauria1-608x366.jpg", alt: "Dinosaurio en un parque temático" },
  { id: 2, title: "Temperate Places",          img: "https://tse2.mm.bing.net/th/id/OIP.EqxvH7j-ZzCVbLROcfYeWQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Valle montañoso templado" },
  { id: 3, title: "Warm Places",            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/a1/d1/6b/caption.jpg?w=300&h=300&s=1", alt: "Isla tropical con mar azul" },
];

// Array de URLs de imágenes de fondo, mapeado desde las categorías.
const BG_IMAGES = CATEGORIES.map(c => c.img);

/**
 * Componente Carousel para la selección de categorías.
 * Muestra una fila de tarjetas de categoría con un fondo dinámico que cambia
 * según la tarjeta seleccionada. Permite la selección de categorías y notifica
 * al componente padre sobre la selección.
 * @param {object} props Las propiedades del componente.
 * @param {Function} props.onSelect Función que se llama cuando se selecciona una categoría, pasando el ID de la categoría.
 */
export default function Carousel({ onSelect }) {
  // Estado para el índice de la tarjeta seleccionada. `null` si ninguna está seleccionada.
  const [selectedIdx, setSelectedIdx] = useState(null); 
  // Estado para el índice de la imagen de fondo actual.
  const [bgIndex, setBgIndex] = useState(null);
  // Clave para forzar la animación de fade del fondo cuando cambia la imagen.
  const [fadeKey, setFadeKey] = useState(0);

  // Referencia para el contenedor de las tarjetas, utilizada para el scroll programático.
  const rowRef = useRef(null);
  // Referencias para cada tarjeta individual, utilizadas para el scroll y el enfoque.
  const cardRefs = useRef([]);

  /**
   * Efecto secundario para actualizar la clave de fade del fondo cuando cambia `bgIndex`.
   * Esto reinicia la animación CSS para el cambio de fondo.
   */
  useEffect(() => {
    if (bgIndex != null) setFadeKey(k => k + 1);
  }, [bgIndex]);

  /**
   * Centra una tarjeta específica en la vista del carrusel, especialmente en móvil.
   * @param {number} i El índice de la tarjeta a centrar.
   * @param {object} [opts={ behavior: "smooth" }] Opciones de scroll.
   */
  const centerCard = (i, opts = { behavior: "smooth" }) => {
    const row = rowRef.current;
    const el = cardRefs.current[i];
    if (!row || !el) return;

    // Solo aplica el centrado en dispositivos móviles.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const rowRect = row.getBoundingClientRect();
    const target =
      el.offsetLeft - (rowRect.width - el.getBoundingClientRect().width) / 2;
    row.scrollTo({ left: target, behavior: opts.behavior || "smooth" });
  };

  /**
   * Maneja la selección de una tarjeta de categoría.
   * Actualiza el índice seleccionado, el fondo y notifica al componente padre.
   * También centra la tarjeta seleccionada en la vista.
   * @param {number} i El índice de la tarjeta seleccionada.
   */
  const handleSelect = (i) => {
    setSelectedIdx(i);
    setBgIndex(i % BG_IMAGES.length);
    onSelect?.(CATEGORIES[i].id); // Llama a la función onSelect del padre con el ID de la categoría.
    centerCard(i);
  };

  return (
    <section className="hero-wrapper" aria-label="Explora climas y temáticas">
      {/* Fondo dinámico que se muestra solo si hay una categoría seleccionada. */}
      <div
        key={fadeKey} // La clave cambia para forzar la re-renderización y la animación CSS.
        className="hero-bg"
        style={{ backgroundImage: `url(${selectedIdx !== null ? BG_IMAGES[bgIndex] : 'back.jpg'})` }}
        aria-hidden="true"
      />
      {/* Capa de superposición sobre la imagen de fondo para mejorar la legibilidad del texto. */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Fila de tarjetas de categorías. */}
      <div ref={rowRef} className="cards-row" aria-live="polite">
        {CATEGORIES.map((c, i) => (
          <article
            key={c.id}
            ref={(el) => (cardRefs.current[i] = el)} // Asigna la referencia a la tarjeta.
            className={`card ${
              selectedIdx === i ? "selected" : "dimmed" // Aplica estilos según si está seleccionada o no.
            }`}
            role="button"
            tabIndex={0}
            aria-pressed={selectedIdx === i}
            aria-label={`Seleccionar ${c.title}`}
            onClick={() => handleSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect(i); // Selección con Enter o Espacio.
              // Navegación con flechas izquierda/derecha.
              if (e.key === "ArrowLeft" && selectedIdx !== null)
                handleSelect(Math.max(0, selectedIdx - 1));
              if (e.key === "ArrowRight" && selectedIdx !== null)
                handleSelect(Math.min(CATEGORIES.length - 1, selectedIdx + 1));
            }}
          >
            <img className="card-img" src={c.img} alt={c.alt || c.title} />
            <div className="card-caption">
              <h3>{c.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}