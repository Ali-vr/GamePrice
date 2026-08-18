/**
 * Datos mock de precios para juegos
 * Estructura: respuesta unificada de Phase 3 (Steam ARS + CheapShark USD)
 * NOTA: En Phase 6, estos datos serán reemplazados por llamadas reales a /api/games/search-prices
 */

export interface StorePriceData {
  store: string;
  storeId?: string;
  price: number;
  currency: "ARS" | "USD";
  discountPercent: number;
  normalPrice?: number;
  storeUrl?: string;
  trend?: "up" | "down" | "flat"; // MOCK: será reemplazado por histórico real en Phase 9
}

export interface GamePriceData {
  id: string;
  title: string;
  coverImage: string;
  slug: string;
  description: string;
  gamePriceScore?: {
    label: string;
    rating: "excelente" | "buena" | "normal" | "esperar";
    emoji: string;
  };
  prices: StorePriceData[];
}

// MOCK DATA - Estructura lista para Phase 3 real
// En Phase 3, reemplazar con respuesta de GET /api/games/search-prices?title=...
export const MOCK_GAMES: GamePriceData[] = [
  {
    id: "elden-ring",
    title: "Elden Ring",
    slug: "elden-ring",
    coverImage:
      "https://shared.akamai.steamstatic.com/media/steamcommunity/public/images/apps/570590/e768afc4e79e4e4b00d86d3d8b69a0382a61e39e.jpg",
    description: "Aventura de fantasía oscura de FromSoftware y George R.R. Martin.",
    gamePriceScore: {
      label: "Buena oferta",
      rating: "buena",
      emoji: "🟢",
    },
    prices: [
      {
        store: "Steam",
        storeId: "steam",
        price: 4999,
        currency: "ARS",
        discountPercent: 0,
        normalPrice: 4999,
        storeUrl: "https://store.steampowered.com/app/570590/ELDEN_RING/",
        trend: "flat",
      },
      {
        store: "Epic Games",
        storeId: "epic",
        price: 34.99,
        currency: "USD",
        discountPercent: 12,
        normalPrice: 39.99,
        storeUrl: "https://www.epicgames.com/store/en-US/p/elden-ring",
        trend: "down",
      },
      {
        store: "GOG",
        storeId: "gog",
        price: 39.99,
        currency: "USD",
        discountPercent: 0,
        normalPrice: 39.99,
        storeUrl: "https://www.gog.com/game/elden_ring",
        trend: "flat",
      },
      {
        store: "Microsoft Store",
        storeId: "microsoft",
        price: 39.99,
        currency: "USD",
        discountPercent: 0,
        normalPrice: 39.99,
        storeUrl: "https://www.xbox.com/en-US/games/store/elden-ring/9pczn9jff8rj",
        trend: "up",
      },
    ],
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    slug: "baldurs-gate-3",
    coverImage:
      "https://shared.akamai.steamstatic.com/media/steamcommunity/public/images/apps/1238140/1228e8e0e5be72e78a0296b0e3decdef48c8f8ac.jpg",
    description: "RPG de rol de turno completo basado en D&D 5e.",
    gamePriceScore: {
      label: "Excelente oferta",
      rating: "excelente",
      emoji: "🟢",
    },
    prices: [
      {
        store: "Steam",
        storeId: "steam",
        price: 7699,
        currency: "ARS",
        discountPercent: 0,
        normalPrice: 7699,
        storeUrl: "https://store.steampowered.com/app/1238140/Baldurs_Gate_3/",
        trend: "down",
      },
      {
        store: "Epic Games",
        storeId: "epic",
        price: 59.99,
        currency: "USD",
        discountPercent: 0,
        normalPrice: 59.99,
        storeUrl: "https://www.epicgames.com/store/en-US/p/baldurs-gate-3",
        trend: "flat",
      },
      {
        store: "GOG",
        storeId: "gog",
        price: 59.99,
        currency: "USD",
        discountPercent: 10,
        normalPrice: 66.66,
        storeUrl: "https://www.gog.com/game/baldurs_gate_3",
        trend: "up",
      },
      {
        store: "Microsoft Store",
        storeId: "microsoft",
        price: 59.99,
        currency: "USD",
        discountPercent: 0,
        normalPrice: 59.99,
        storeUrl: "https://www.xbox.com/en-US/games/store/baldurs-gate-3/9nhc7cckr48p",
        trend: "flat",
      },
    ],
  },
  {
    id: "the-witcher-3",
    title: "The Witcher 3",
    slug: "the-witcher-3",
    coverImage:
      "https://shared.akamai.steamstatic.com/media/steamcommunity/public/images/apps/292030/eee446fcf45a8a424ec669872e9f9cbb6639b58e.jpg",
    description: "RPG de mundo abierto épico con Geralt de Rivia.",
    gamePriceScore: {
      label: "Conviene esperar",
      rating: "esperar",
      emoji: "🔴",
    },
    prices: [
      {
        store: "Steam",
        storeId: "steam",
        price: 2499,
        currency: "ARS",
        discountPercent: 60,
        normalPrice: 6247,
        storeUrl: "https://store.steampowered.com/app/292030/The_Witcher_3__Wild_Hunt/",
        trend: "flat",
      },
      {
        store: "Epic Games",
        storeId: "epic",
        price: 14.99,
        currency: "USD",
        discountPercent: 60,
        normalPrice: 39.99,
        storeUrl: "https://www.epicgames.com/store/en-US/p/the-witcher-3--wild-hunt",
        trend: "down",
      },
      {
        store: "GOG",
        storeId: "gog",
        price: 9.99,
        currency: "USD",
        discountPercent: 75,
        normalPrice: 39.99,
        storeUrl: "https://www.gog.com/game/the_witcher_3_wild_hunt",
        trend: "down",
      },
      {
        store: "Microsoft Store",
        storeId: "microsoft",
        price: 19.99,
        currency: "USD",
        discountPercent: 50,
        normalPrice: 39.99,
        storeUrl: "https://www.xbox.com/en-US/games/store/the-witcher-3-wild-hunt/bq3kql3kks76",
        trend: "flat",
      },
    ],
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    slug: "cyberpunk-2077",
    coverImage:
      "https://shared.akamai.steamstatic.com/media/steamcommunity/public/images/apps/1091500/8b61ce3366175b474840c7020336b88e27814f6f.jpg",
    description:
      "Acción RPG en primera persona en un futuro distópico. Ahora con Phantom Liberty.",
    gamePriceScore: {
      label: "Normal",
      rating: "normal",
      emoji: "🟡",
    },
    prices: [
      {
        store: "Steam",
        storeId: "steam",
        price: 3999,
        currency: "ARS",
        discountPercent: 0,
        normalPrice: 3999,
        storeUrl: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
        trend: "up",
      },
      {
        store: "Epic Games",
        storeId: "epic",
        price: 29.99,
        currency: "USD",
        discountPercent: 25,
        normalPrice: 39.99,
        storeUrl: "https://www.epicgames.com/store/en-US/p/cyberpunk-2077",
        trend: "down",
      },
      {
        store: "GOG",
        storeId: "gog",
        price: 29.99,
        currency: "USD",
        discountPercent: 25,
        normalPrice: 39.99,
        storeUrl: "https://www.gog.com/game/cyberpunk_2077",
        trend: "flat",
      },
      {
        store: "Microsoft Store",
        storeId: "microsoft",
        price: 39.99,
        currency: "USD",
        discountPercent: 0,
        normalPrice: 39.99,
        storeUrl: "https://www.xbox.com/en-US/games/store/cyberpunk-2077/bwmh55zpxn92",
        trend: "flat",
      },
    ],
  },
];
