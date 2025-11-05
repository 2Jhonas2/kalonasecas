import { useEffect, useState, useCallback } from "react";

export default function SearchPanel({ onSearch }) {
  const [query, setQuery] = useState("");
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [climates, setClimates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    departmentId: "",
    cityId: "",
    climateId: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
  });

  // Carga catálogos
  useEffect(() => {
    Promise.all([
      fetch("/api/catalog/departments").then((r) => r.json()),
      fetch("/api/catalog/climates").then((r) => r.json()),
      fetch("/api/catalog/categories").then((r) => r.json()),
    ]).then(([deps, cls, cats]) => {
      setDepartments(deps);
      setClimates(cls);
      setCategories(cats);
    }).catch(console.error);
  }, []);

  // Cargar ciudades al cambiar departamento
  useEffect(() => {
    if (!filters.departmentId) { setCities([]); return; }
    fetch(`/api/catalog/cities?departmentId=${filters.departmentId}`)
      .then((r) => r.json())
      .then(setCities)
      .catch(console.error);
  }, [filters.departmentId]);

  // Debounce 300ms
  useEffect(() => {
    const t = setTimeout(() => {
      onSearch({ query, ...filters });
    }, 300);
    return () => clearTimeout(t);
  }, [query, filters, onSearch]);

  const submit = useCallback(() => onSearch({ query, ...filters }), [onSearch, query, filters]);

  return (
    <div className="search-panel">
      <input
        type="search"
        placeholder="¿Qué estás buscando? (ej. mesitas del colegio)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        value={filters.departmentId}
        onChange={(e) => setFilters((f) => ({ ...f, departmentId: e.target.value, cityId: "" }))}
      >
        <option value="">Departamento</option>
        {departments.map((d) => (
          <option key={d.id_department} value={d.id_department}>{d.name}</option>
        ))}
      </select>

      <select
        value={filters.cityId}
        onChange={(e) => setFilters((f) => ({ ...f, cityId: e.target.value }))}
        disabled={!filters.departmentId}
      >
        <option value="">{filters.departmentId ? "Ciudad" : "Selecciona un departamento"}</option>
        {cities.map((c) => (
          <option key={c.id_city} value={c.id_city}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.climateId}
        onChange={(e) => setFilters((f) => ({ ...f, climateId: e.target.value }))}
      >
        <option value="">Clima</option>
        {climates.map((c) => (
          <option key={c.id_climate} value={c.id_climate}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.categoryId}
        onChange={(e) => setFilters((f) => ({ ...f, categoryId: e.target.value }))}
      >
        <option value="">Categoría</option>
        {categories.map((c) => (
          <option key={c.id_category} value={c.id_category}>{c.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Precio mín"
        value={filters.minPrice}
        onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
        min={0}
      />
      <input
        type="number"
        placeholder="Precio máx"
        value={filters.maxPrice}
        onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
        min={0}
      />

      <button onClick={submit}>Buscar</button>
    </div>
  );
}
