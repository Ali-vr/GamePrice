export default function GameDetail({ params }: { params: { slug: string } }) {
  return (
    <div className="container-centered section-spacing">
      <h1 className="text-display-md mb-4">Juego: {params.slug}</h1>
      <p className="text-text-soft">
        Esta página mostrará los detalles del juego, precios, histórico y recomendaciones.
      </p>
      <p className="text-text-soft text-sm mt-2">[Contenido placeholder - Fase 7+]</p>
    </div>
  );
}
