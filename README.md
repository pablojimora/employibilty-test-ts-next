# Rick and Morty Character Browser 🚀

## 📖 About / Acerca de

**English:** A Next.js 15 application for browsing Rick and Morty characters with authentication, pagination, filtering, and search capabilities. Built with TypeScript, Tailwind CSS, and Axios.

**Español:** Una aplicación Next.js 15 para explorar personajes de Rick and Morty con autenticación, paginación, filtrado y búsqueda. Construida con TypeScript, Tailwind CSS y Axios.

---

## 🛠️ Tech Stack / Stack Tecnológico

- **Framework:** Next.js 15.0.0 (App Router)
- **Language:** TypeScript 5.9.3
- **UI:** Tailwind CSS 3.4.19
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **API:** [Rick and Morty API](https://rickandmortyapi.com/)
- **State Management:** React Context API
- **Storage:** LocalStorage (Authentication)

---

## ✨ Features / Características

### 🔐 Authentication / Autenticación
- [x] User registration with validation
- [x] Login with credentials
- [x] Protected routes (redirect to /login if not authenticated)
- [x] Logout functionality
- [x] Persistent sessions (LocalStorage)

### 📊 Dashboard
- [x] Global statistics (Alive, Dead, Unknown characters)
- [x] Character search with debouncing (500ms)
- [x] Filter by status (Alive, Dead, Unknown)
- [x] Server-side pagination (20 items per page, 42 pages total)
- [x] Responsive grid layout (1-5 columns based on screen size)
- [x] Loading states with spinner
- [x] Error handling with toast notifications
- [x] "Character not found" message (handles 404 gracefully)

### 🎨 UI/UX
- [x] Modern card design with hover effects
- [x] Lazy loading images
- [x] Sidebar navigation with user profile
- [x] Avatar component with initials fallback
- [x] Responsive design (mobile-first)
- [x] Toast notifications (success/error)
- [x] Smooth scrolling on page change

---

## 🔧 Improvements & Fixes / Mejoras y Correcciones

### Phase 1: Initial Setup / Configuración Inicial

#### ✅ 1. API Service Response Parsing
**Problem:** `getCharacters()` returned Response object without parsing
**Solution:** Added `.json()` to properly parse API response

#### ✅ 2. TypeScript Errors Fixed
**Problem:** Missing semicolons and type definitions
**Solution:** 
- Added semicolons in return statements
- Created complete TypeScript interfaces for API data

#### ✅ 3. DTO (Data Transfer Objects)
**Created interfaces:**
```typescript
- Character (id, name, status, species, gender, image, etc.)
- CharactersResponse (info, results)
```

#### ✅ 4. Migrated from styled-components to Tailwind CSS
**Reason:** Better performance, smaller bundle, simpler configuration
**Impact:** 
- Removed styled-components dependencies
- Created `tailwind.config.js` and `postcss.config.js`
- Converted all components to Tailwind classes

---

### Phase 2: Performance & UI / Rendimiento y UI

#### ✅ 5. Card Component Optimization
**Improvements:**
- Lazy loading images (`loading="lazy"`)
- Aspect-square for consistent dimensions
- Hover effects (scale + shadow)
- Status badges positioned top-right
- Text truncation with line-clamp

#### ✅ 6. Responsive Grid Layout
**Implementation:**
```css
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
```
**Result:** 1 to 5 columns based on screen size

#### ✅ 7. Global CSS Utilities
**Created utilities in `globals.css`:**
- `.line-clamp-2`, `.line-clamp-3`
- `.auto-rows-fr` for uniform grid rows
- Bootstrap-like classes (`.card`, `.badge`, `.form-control`)
- Responsive breakpoints

---

### Phase 3: Authentication System / Sistema de Autenticación

#### ✅ 8. LocalStorage Authentication
**Implementation:**
- Created `AuthContext` with Context API
- `register()`, `login()`, `logout()` methods
- Persistent sessions in `localStorage`
- Protected routes with redirect

#### ✅ 9. Register Page
**Features:**
- Name, email, password, confirm password fields
- Password match validation
- Duplicate email check
- Toast notifications instead of alerts

#### ✅ 10. Login Page
**Features:**
- Email and password validation
- Credentials verification
- Success notification
- Redirect to dashboard after login

#### ✅ 11. Root Page Protection
**Implementation:**
- `/` now validates authentication
- Redirects to `/login` if not authenticated
- Redirects to `/dashboard` if authenticated
- Shows loading state during redirect

---

### Phase 4: Navigation & Layout / Navegación y Layout

#### ✅ 12. Sidebar Component
**Features:**
- Fixed sidebar (260px width)
- User profile section with Avatar
- Navigation items with icons and active states
- Logout button
- Hover effects

#### ✅ 13. Avatar Component
**Features:**
- Circular avatar with image support
- Initials fallback (first 2 letters)
- Configurable size

#### ✅ 14. Centralized Layout
**Implementation:**
- Created `LayoutWrapper` component
- Conditional sidebar rendering (only for authenticated pages)
- Sidebar hidden on `/login` and `/register`
- Global layout structure

---

### Phase 5: Pagination & Search / Paginación y Búsqueda

#### ✅ 15. Server-Side Pagination
**Implementation:**
- API updated to accept pagination params
- Created `GetCharactersParams` interface
- Page state management (currentPage, totalPages, totalCount)
- 20 items per page, 42 pages total (826 characters)

#### ✅ 16. Pagination Component
**Features:**
- Dual display: simple top bar + detailed bottom bar
- Smart page numbers with ellipsis (e.g., [1, ..., 5, 6, 7, ..., 42])
- First, Previous, Next, Last buttons
- Disabled states during loading
- Shows "Page X of Y" and total items
- Auto-scroll to top on page change

#### ✅ 17. Debounced Search
**Implementation:**
- Immediate input state (`searchInput`)
- Debounced search state (`search`) with 500ms delay
- Resets to page 1 when searching
- Prevents API spam

#### ✅ 18. Filter by Status
**Options:**
- All (no filter)
- Alive
- Dead
- Unknown
- Resets to page 1 when filtering

---

### Phase 6: Services & API / Servicios y API

#### ✅ 19. Migrated from Fetch to Axios
**Benefits:**
- Cleaner syntax
- Automatic JSON parsing
- Better error handling
- Type-safe requests with generics

#### ✅ 20. API Service Refactoring
**Implementation:**
- Created `apiClient` with base configuration
- Centralized error handling
- Exported `GetCharactersParams` interface
- Functions: `getCharacters()`, `getCharacterById()`, `searchCharactersByName()`, `filterCharactersByStatus()`

#### ✅ 21. Simplified Axios Implementation
**Final version:**
- Removed complex `apiClient` instance
- Direct `axios.get()` calls with base URL
- Simpler, more maintainable code

---

### Phase 7: Statistics & Data / Estadísticas y Datos

#### ✅ 22. Global Statistics Cards
**Implementation:**
- Parallel API calls with `Promise.all()`
- Fetches counts for Alive, Dead, Unknown
- Displays in colored StatsCard components
- Loads once per dashboard visit

#### ✅ 23. StatsCard Component
**Features:**
- Reusable card with title and value
- Color variants (success, danger, warning, default)
- Responsive layout (col-md-4 for 3 columns)

---

### Phase 8: Components Cleanup / Limpieza de Componentes

#### ✅ 24. Unused Components Removed
**Deleted:**
- `CharacterCard.tsx` (too basic, unused)
- `DashboardHeader.tsx` (too simple, unused)
- `FiltersPanel.tsx` (not providing value)
- `LoadingState.tsx` (initially deleted, then recreated)

**Kept:**
- `Pagination.tsx` (used in dashboard)
- `StatsCard.tsx` (used for statistics)
- `LoadingState.tsx` (reusable loading spinner)

#### ✅ 25. LoadingState Component
**Created reusable component:**
- Centered spinner
- Consistent loading UI
- Used in: `/`, `/dashboard`, `/home`

---

### Phase 9: Notifications System / Sistema de Notificaciones

#### ✅ 26. React Toastify Integration
**Installation:**
- Installed `react-toastify`
- Imported CSS in layout
- Added `<ToastContainer />` globally

#### ✅ 27. Notification Helper
**Created `helpers/notificaciones.ts`:**
- `notification(text, type, time?)` function
- Success: bottom-right, light theme
- Error: top-right, dark theme
- Bounce transition animation

#### ✅ 28. Replaced Alerts with Toasts
**Updated pages:**
- Login: error/success notifications
- Register: error/success notifications (replaced `alert()`)
- Removed inline error messages (red boxes)
- Cleaner, more professional UX

---

### Phase 10: Error Handling / Manejo de Errores

#### ✅ 29. Graceful 404 Handling
**Problem:** API 404 showed error screen
**Solution:**
- Catch 404 in API service
- Return empty response instead of throwing error
- Show "Character not found" message with search icon
- User-friendly, no red error screens

#### ✅ 30. Error State Management
**Implementation:**
- Separate error state from no-results state
- Real errors (network, 500, etc.) show error message
- 404 shows "Personaje no encontrado"
- Improved user experience

---

## 📂 Project Structure / Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── Avatar.tsx          # User avatar with initials
│   │   ├── Card.tsx            # Character card component
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── dashboard/
│   │   └── page.tsx            # Main dashboard with pagination
│   ├── dto/
│   │   └── character.ts        # TypeScript interfaces
│   ├── home/
│   │   └── page.tsx            # Simple character list
│   ├── login/
│   │   └── page.tsx            # Login form
│   ├── register/
│   │   └── page.tsx            # Registration form
│   ├── globals.css             # Tailwind utilities
│   ├── layout.tsx              # Root layout with providers
│   ├── LayoutWrapper.tsx       # Conditional sidebar wrapper
│   └── page.tsx                # Root redirect page
├── components/
│   ├── Loadingstate.tsx        # Loading spinner
│   ├── Pagination.tsx          # Pagination controls
│   └── StatsCard.tsx           # Statistics card
├── contexts/
│   └── AuthContext.tsx         # Authentication state management
├── helpers/
│   └── notificaciones.ts       # Toast notifications helper
└── services/
    └── api.ts                  # Axios API service
```

---

## 🚀 Getting Started / Comenzar

### Prerequisites / Requisitos Previos

```bash
Node.js 18+ 
npm or yarn
```

### Installation / Instalación

```bash
# Clone repository / Clonar repositorio
git clone <repository-url>

# Install dependencies / Instalar dependencias
npm install

# Run development server / Ejecutar servidor de desarrollo
npm run dev

# Build for production / Construir para producción
npm run build

# Start production server / Iniciar servidor de producción
npm start
```

### Environment / Entorno

No environment variables required. The app uses the public Rick and Morty API.

No se requieren variables de entorno. La aplicación usa la API pública de Rick and Morty.

---

## 📝 Usage / Uso

### English:
1. **Register:** Create an account with name, email, and password
2. **Login:** Access the dashboard with your credentials
3. **Browse:** View all 826 Rick and Morty characters across 42 pages
4. **Search:** Type character names with real-time debouncing
5. **Filter:** Filter by status (Alive, Dead, Unknown)
6. **Navigate:** Use pagination controls to browse pages
7. **Logout:** Click the logout button in the sidebar

### Español:
1. **Registrarse:** Crear cuenta con nombre, email y contraseña
2. **Iniciar sesión:** Acceder al dashboard con tus credenciales
3. **Explorar:** Ver los 826 personajes de Rick and Morty en 42 páginas
4. **Buscar:** Escribir nombres de personajes con debouncing en tiempo real
5. **Filtrar:** Filtrar por estado (Vivo, Muerto, Desconocido)
6. **Navegar:** Usar controles de paginación para explorar páginas
7. **Cerrar sesión:** Clic en el botón de cerrar sesión en el sidebar

---

## 🧪 Testing Notes / Notas de Prueba

### Test Users / Usuarios de Prueba
The app uses LocalStorage, so you need to register your own user. Try:
- **Email:** test@example.com
- **Password:** test123

La app usa LocalStorage, necesitas registrar tu propio usuario. Prueba:
- **Email:** test@example.com
- **Contraseña:** test123

### Known Behaviors / Comportamientos Conocidos
- **Session persistence:** Login state persists across browser sessions
- **Search debounce:** 500ms delay before API call
- **404 handling:** Shows "Character not found" instead of error screen
- **Auto-scroll:** Page automatically scrolls to top when changing pages

---

## 📊 Performance Metrics / Métricas de Rendimiento

### Build Output
```
Route (app)                              Size     First Load JS
├ ○ /                                    818 B           100 kB
├ ○ /dashboard                           2.92 kB         123 kB
├ ○ /home                                1.75 kB         122 kB
├ ○ /login                               10.5 kB         119 kB
└ ○ /register                            1.43 kB         110 kB
```

### Optimizations / Optimizaciones
- **Lazy loading images:** Reduces initial page load
- **Debounced search:** Prevents excessive API calls
- **Server-side pagination:** Only loads 20 items at a time
- **Cached statistics:** Global stats loaded once per session

---

## 🐛 Known Issues / Problemas Conocidos

### To Be Fixed / Por Corregir
1. **Home page:** No pagination (only shows first 20 characters)
2. **Sidebar:** Not responsive on mobile devices
3. **Keys:** Some components use `index` instead of `id` for React keys
4. **Validation:** Email and password need stronger validation rules

### Future Improvements / Mejoras Futuras
- [ ] Add dark mode support
- [ ] Implement responsive sidebar (hamburger menu)
- [ ] Add character detail page
- [ ] Implement favorites system
- [ ] Add unit tests
- [ ] Add E2E tests with Playwright
- [ ] Optimize images with next/image
- [ ] Add SEO metadata
- [ ] Create custom 404 page
- [ ] Add retry logic for failed API calls

---

## 🤝 Contributing / Contribuir

**English:** This is a portfolio/demo project. Feel free to fork and modify as needed.

**Español:** Este es un proyecto de portafolio/demo. Siéntete libre de hacer fork y modificar según necesites.

---

## 📄 License / Licencia

MIT License - Feel free to use this project for learning purposes.

Licencia MIT - Libre de usar este proyecto con fines educativos.

---

## 🙏 Acknowledgments / Agradecimientos

- [Rick and Morty API](https://rickandmortyapi.com/) - Free API for character data
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast notifications

---

## 📧 Contact / Contacto

For questions or feedback / Para preguntas o comentarios:
- Create an issue in this repository
- Crea un issue en este repositorio

---

**Built with ❤️ using Next.js and TypeScript**

**Construido con ❤️ usando Next.js y TypeScript**
