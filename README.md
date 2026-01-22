# Rick and Morty Character Browser 🚀


Name : Pablo Jimenez Mora
Clan: Gosling
CC:1000549308 
 
## 📖 About 

A Next.js 15 application for browsing Rick and Morty characters with authentication, pagination, filtering, and search capabilities. Built with TypeScript, Tailwind CSS, and Axios.




## 🔧 Improvements & Fixes / Mejoras y Correcciones

### Phase 1: Initial Setup / Configuración Inicial

#### 1. API Service Response Parsing
**Problem:** `getCharacters()` returned Response object without parsing
**Solution:** Added `.json()` to properly parse API response

#### 2. TypeScript Errors Fixed
**Problem:** Missing semicolons and type definitions
**Solution:** 
- Added semicolons in return statements
- Created complete TypeScript interfaces for API data

#### 3. DTO (Data Transfer Objects)
**Created interfaces:**
```typescript
- Character (id, name, status, species, gender, image, etc.)
- CharactersResponse (info, results)
```

#### 4. Migrated from styled-components to Tailwind CSS
**Reason:** Better performance, smaller bundle, simpler configuration
**Impact:** 
- Removed styled-components dependencies
- Created `tailwind.config.js` and `postcss.config.js`
- Converted all components to Tailwind classes

---

### Phase 2: Performance & UI / Rendimiento y UI

#### 5. Card Component Optimization
**Improvements:**
- Lazy loading images (`loading="lazy"`)
- Aspect-square for consistent dimensions
- Hover effects (scale + shadow)
- Status badges positioned top-right
- Text truncation with line-clamp

#### 6. Responsive Grid Layout
**Implementation:**
```css
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
```
**Result:** 1 to 5 columns based on screen size

#### 7. Global CSS Utilities
**Created utilities in `globals.css`:**
- `.line-clamp-2`, `.line-clamp-3`
- `.auto-rows-fr` for uniform grid rows
- Bootstrap-like classes (`.card`, `.badge`, `.form-control`)
- Responsive breakpoints

---

### Phase 3: Authentication System / Sistema de Autenticación

#### 8. LocalStorage Authentication
**Implementation:**
- Created `AuthContext` with Context API
- `register()`, `login()`, `logout()` methods
- Persistent sessions in `localStorage`
- Protected routes with redirect

#### 9. Register Page
**Features:**
- Name, email, password, confirm password fields
- Password match validation
- Duplicate email check
- Toast notifications instead of alerts

#### 10. Login Page
**Features:**
- Email and password validation
- Credentials verification
- Success notification
- Redirect to dashboard after login

#### 11. Root Page Protection
**Implementation:**
- `/` now validates authentication
- Redirects to `/login` if not authenticated
- Redirects to `/dashboard` if authenticated
- Shows loading state during redirect

---

### Phase 4: Navigation & Layout / Navegación y Layout

#### 12. Sidebar Component
**Features:**
- Fixed sidebar (260px width)
- User profile section with Avatar
- Navigation items with icons and active states
- Logout button
- Hover effects

#### 13. Avatar Component
**Features:**
- Circular avatar with image support
- Initials fallback (first 2 letters)
- Configurable size

#### 14. Centralized Layout
**Implementation:**
- Created `LayoutWrapper` component
- Conditional sidebar rendering (only for authenticated pages)
- Sidebar hidden on `/login` and `/register`
- Global layout structure

---

### Phase 5: Pagination & Search / Paginación y Búsqueda

#### 15. Server-Side Pagination
**Implementation:**
- API updated to accept pagination params
- Created `GetCharactersParams` interface
- Page state management (currentPage, totalPages, totalCount)
- 20 items per page, 42 pages total (826 characters)

#### 16. Pagination Component
**Features:**
- Dual display: simple top bar + detailed bottom bar
- Smart page numbers with ellipsis (e.g., [1, ..., 5, 6, 7, ..., 42])
- First, Previous, Next, Last buttons
- Disabled states during loading
- Shows "Page X of Y" and total items
- Auto-scroll to top on page change

#### 17. Debounced Search
**Implementation:**
- Immediate input state (`searchInput`)
- Debounced search state (`search`) with 500ms delay
- Resets to page 1 when searching
- Prevents API spam

#### 18. Filter by Status
**Options:**
- All (no filter)
- Alive
- Dead
- Unknown
- Resets to page 1 when filtering

---

### Phase 6: Services & API / Servicios y API

#### 19. Migrated from Fetch to Axios
**Benefits:**
- Cleaner syntax
- Automatic JSON parsing
- Better error handling
- Type-safe requests with generics

#### 20. API Service Refactoring
**Implementation:**
- Created `apiClient` with base configuration
- Centralized error handling
- Exported `GetCharactersParams` interface
- Functions: `getCharacters()`, `getCharacterById()`, `searchCharactersByName()`, `filterCharactersByStatus()`

#### 21. Simplified Axios Implementation
**Final version:**
- Removed complex `apiClient` instance
- Direct `axios.get()` calls with base URL
- Simpler, more maintainable code

---

### Phase 7: Statistics & Data / Estadísticas y Datos

#### 22. Global Statistics Cards
**Implementation:**
- Parallel API calls with `Promise.all()`
- Fetches counts for Alive, Dead, Unknown
- Displays in colored StatsCard components
- Loads once per dashboard visit

#### 23. StatsCard Component
**Features:**
- Reusable card with title and value
- Color variants (success, danger, warning, default)
- Responsive layout (col-md-4 for 3 columns)

---

### Phase 8: Components Cleanup / Limpieza de Componentes

#### 24. Unused Components Removed
**Deleted:**
- `CharacterCard.tsx` (too basic, unused)
- `DashboardHeader.tsx` (too simple, unused)
- `FiltersPanel.tsx` (not providing value)
- `LoadingState.tsx` (initially deleted, then recreated)

**Kept:**
- `Pagination.tsx` (used in dashboard)
- `StatsCard.tsx` (used for statistics)
- `LoadingState.tsx` (reusable loading spinner)

#### 25. LoadingState Component
**Created reusable component:**
- Centered spinner
- Consistent loading UI
- Used in: `/`, `/dashboard`, `/home`

---

### Phase 9: Notifications System / Sistema de Notificaciones

#### 26. React Toastify Integration
**Installation:**
- Installed `react-toastify`
- Imported CSS in layout
- Added `<ToastContainer />` globally

#### 27. Notification Helper
**Created `helpers/notificaciones.ts`:**
- `notification(text, type, time?)` function
- Success: bottom-right, light theme
- Error: top-right, dark theme
- Bounce transition animation

#### 28. Replaced Alerts with Toasts
**Updated pages:**
- Login: error/success notifications
- Register: error/success notifications (replaced `alert()`)
- Removed inline error messages (red boxes)
- Cleaner, more professional UX

---

### Phase 10: Error Handling / Manejo de Errores

#### 29. Graceful 404 HandlingName : Pablo Jimenez Mora
Clan: Gosling
CC:1000549308 

**Problem:** API 404 showed error screen
**Solution:**
- Catch 404 in API service
- Return empty response instead of throwing error
- Show "Character not found" message with search icon
- User-friendly, no red error screens

#### 30. Error State Management
**Implementation:**
- Separate error state from no-results state
- Real errors (network, 500, etc.) show error message
- 404 shows "Personaje no encontrado"
- Improved user experience

---


