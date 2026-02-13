# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**천원마켓 (Chunwon Market)** - Customer-facing e-commerce storefront built with Next.js 16. This is a Korean-language shopping site UI currently in transition from using dummy data to integrating with a microservices backend.

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server (with Turbo)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

**Development server runs on http://localhost:3000**

**Package manager:** Always use `pnpm`, never npm or yarn.

## Architecture

### Next.js App Router Structure

```
app/
├── (site)/              # Route group for main site (includes Header, Footer, BottomNav)
│   ├── exhCtgr/        # Exhibition category pages
│   │   └── [...slug]/  # Catch-all dynamic route
│   ├── products/
│   │   └── [id]/       # Product detail pages
│   ├── layout.tsx      # Site layout wrapper (Header + Footer + BottomNav)
│   └── page.tsx        # Home page
├── api-test/           # API testing page for microservices integration
├── search/             # Search results page
└── layout.tsx          # Root layout (fonts, Toaster, metadata)
```

**Route groups:** `(site)` is used to apply shared layout (header/footer) without affecting URL structure.

### Component Organization

```
components/
├── home/       # Home page sections
│   ├── HeroCarousel.tsx
│   ├── CategoryRanking.tsx
│   ├── PromoGrid.tsx
│   ├── RecommendedProducts.tsx          # 더미 데이터 기반 추천
│   ├── PersonalizedRecommendations.tsx  # ✨ API 기반 사용자 맞춤 추천
│   └── ...
├── layout/     # Layout components (Header, Footer, BottomNav, TopBar, CategoryMegaMenu)
├── product/    # Product components
│   ├── ProductCard.tsx
│   ├── PurchasePanel.tsx
│   ├── RelatedProducts.tsx              # ✨ API 기반 유사 상품 추천
│   └── ...
├── promo/      # Promotion components
├── review/     # Review components
├── modals/     # Modal dialogs
├── providers/  # Context providers (QueryProvider)
└── ui/         # shadcn/ui primitives (button, card, dialog, etc.)
```

**Naming convention:** PascalCase for components (`ProductCard.tsx`), `use-` prefix for hooks.

### Data Layer

```
lib/
├── api-client.ts           # Axios client configured for backend API
├── api/
│   └── product-api.ts      # API functions for product recommendations (microservices)
├── dummy-data.ts           # Mock data for products, categories, promos
├── product-detail-mocks.ts # Mock product detail data
├── user.ts                 # User ID management (localStorage)
├── query-client.ts         # React Query client configuration
├── utils.ts                # Utility functions (cn for classnames)
└── fonts.ts                # Font configuration

hooks/
└── use-product-recommendations.ts  # React Query hooks for recommendations API
```

**Data source status:**
- Most of the app uses dummy data (`lib/dummy-data.ts`, `lib/product-detail-mocks.ts`)
- **API integration implemented** for:
  - ✅ Personalized recommendations (홈 페이지)
  - ✅ Product-based recommendations (상품 상세 페이지)
  - ✅ User interaction tracking (VIEW events)
- See `/api-test` page for API testing
- API client expects backend at `http://localhost:8080` (API Gateway)

### Path Aliases

Configured in `tsconfig.json` and `components.json`:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`
- `@/ui` → `components/ui/`

Always use these aliases for imports, never relative paths like `../../`.

## Key Technologies

- **Next.js 16.1.6** (App Router, React Server Components)
- **React 19.2.3**
- **TypeScript 5.7.3**
- **Tailwind CSS 3.4.17** with custom config
- **shadcn/ui** components (built on Radix UI primitives)
- **Lucide React** for icons
- **Axios** for HTTP client
- **React Query (TanStack Query)** for server state management
- **React Hook Form + Zod** for form validation
- **Embla Carousel** for carousels
- **Recharts** for charts
- **date-fns** for date formatting
- **next-themes** for theme switching

## Configuration Notes

### TypeScript

`next.config.mjs` has `ignoreBuildErrors: true` - this is intentional to avoid blocking builds during rapid UI development. Fix TypeScript errors when you encounter them, but don't be surprised if builds succeed despite TS errors.

### Images

`unoptimized: true` in `next.config.mjs` - Next.js image optimization is disabled. Images are served as-is.

### Styling

- **Tailwind config:** `tailwind.config.ts` with shadcn/ui color system (CSS variables in `app/globals.css`)
- **Use `cn()` utility** from `lib/utils.ts` for conditional classes
- **Font:** Noto Sans KR (loaded in `app/layout.tsx`)

### shadcn/ui

- Configuration: `components.json`
- Base color: neutral
- Components use CSS variables for theming
- Icon library: Lucide React

## API Integration

### Current Setup

- **API client:** `lib/api-client.ts` (Axios instance with interceptors)
- **React Query:** Server state management with automatic caching and revalidation
  - Provider: `components/providers/query-provider.tsx`
  - Configuration: `lib/query-client.ts` (1분 staleTime, 5분 gcTime)
  - Hooks: `hooks/use-product-recommendations.ts`
- **Base URL:** `process.env.NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:8080`)
- **Product API:** `lib/api/product-api.ts` (personalized recommendations, product-based recommendations, interaction tracking)
- **User Management:** `lib/user.ts` (localStorage 기반 임시 사용자 ID 관리)

### React Query Usage

All API calls should use React Query hooks for caching and state management:

```tsx
// Query example (GET requests)
const { data, isLoading, error, refetch } = usePersonalizedRecommendations(userId, 5);

// Mutation example (POST/PUT/DELETE requests)
const mutation = useRecordInteraction();
mutation.mutate({ userId, productId, interactionType: 'VIEW' });
```

**Query Keys:** Defined in `hooks/use-product-recommendations.ts` - follow the established pattern for new APIs.

**React Query Devtools:** Available in development mode (bottom-left corner).

### Implemented Features

**Homepage (`app/(site)/page.tsx`):**
- `<PersonalizedRecommendations />` - API 기반 사용자 맞춤 추천 (자동 로드)

**Product Detail (`app/(site)/products/[id]/page.tsx`):**
- `<RelatedProducts />` - API 기반 유사 상품 추천
- Automatic VIEW event tracking when page loads

**User Interaction Tracking:**
- VIEW events automatically recorded on product detail page
- User ID stored in localStorage (temporary solution)
- Mutations invalidate related queries for fresh recommendations

### Testing API Integration

Visit `/api-test` page to test microservices endpoints:
- `GET /api/recommendations/personalized` - User-based product recommendations
- `GET /api/recommendations/product-based` - Similar products
- `POST /api/interactions` - Record user interactions (VIEW, CART, PURCHASE, LIKE)

**Microservices architecture:**
1. Frontend (port 3000) → API Gateway (port 8080)
2. API Gateway → Eureka Server (port 8761) → Product Service (port 9090)

**Development mode features:**
- Recommendation scores displayed in dev mode
- React Query Devtools (bottom-left corner)

### Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Development Patterns

### Adding a New Page

1. Create file in `app/(site)/your-page/page.tsx` for pages that need header/footer
2. Create file in `app/your-page/page.tsx` for pages without site layout
3. Use `export default function YourPage()` - no need to define metadata unless needed

### Adding a New Component

1. Place in appropriate subdirectory (`components/home/`, `components/product/`, etc.)
2. Use PascalCase filename matching component name
3. Export as default function
4. Use `@/components/...` import alias

### Adding shadcn/ui Components

The project already includes most shadcn/ui components. If you need to add a new one:

```bash
pnpm dlx shadcn@latest add [component-name]
```

This will add the component to `components/ui/`.

### Using Icons

Import from Lucide React:
```tsx
import { ShoppingCart, Heart, Search } from 'lucide-react'
```

### Adding API Endpoints

When adding new API endpoints:

1. **Create API function** in `lib/api/` directory:
```tsx
// lib/api/your-api.ts
import apiClient from '../api-client';

export const getYourData = async (id: string) => {
  const response = await apiClient.get(`/api/your-endpoint/${id}`);
  return response.data;
};
```

2. **Create React Query hook** in `hooks/` directory:
```tsx
// hooks/use-your-data.ts
import { useQuery } from '@tanstack/react-query';
import { getYourData } from '@/lib/api/your-api';

export const yourDataKeys = {
  all: ['your-data'] as const,
  detail: (id: string) => [...yourDataKeys.all, id] as const,
};

export function useYourData(id: string) {
  return useQuery({
    queryKey: yourDataKeys.detail(id),
    queryFn: () => getYourData(id),
    enabled: !!id,
  });
}
```

3. **Use the hook** in components:
```tsx
const { data, isLoading, error } = useYourData(id);
```

### Forms

Use React Hook Form + Zod for validation:
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
```

## Code Style

- **No formatter configured** - follow existing code style
- Match Tailwind utility patterns in existing components
- Korean text for user-facing content, English for code
- Use TypeScript interfaces for data types (see `lib/dummy-data.ts` for examples)

## Important Notes

- **Mobile-first design:** Site is optimized for mobile (note `BottomNav` and `MobileBuyBar` components)
- **Responsive breakpoints:** Uses Tailwind's default breakpoints (sm:640px, md:768px, lg:1024px)
- **Max content width:** Main content constrained to `max-w-[1200px]` (see `app/(site)/layout.tsx`)
- **Korean language:** All UI text is in Korean
- **Brand color:** Theme color is `#FFC400` (yellow, set in viewport metadata)

## Migration from Dummy Data to API

When replacing dummy data with real API calls:

1. Create API function in `lib/api/` (follow pattern in `product-api.ts`)
2. Create React Query hook in `hooks/` (follow pattern in `use-product-recommendations.ts`)
3. Replace imports from `lib/dummy-data.ts` with the new hook
4. Update components to handle loading states (`isLoading`) and errors
5. Test with `/api-test` page or create dedicated test page
6. Remove unused dummy data once confirmed working

**Note:** The admin CMS frontend (`haulic-cms-frontend/`) in the parent workspace is already fully integrated with the backend API using React Query. Reference its implementation for patterns.
