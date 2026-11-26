---

description: "Task list for Sitio Web Institucional"
---

# Tasks: Sitio Web Institucional

**Input**: Design documents from `/specs/001-sitio-web-institucional/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan (src, src/styles, src/js, src/assets)
- [x] T002 Copiar logos e imágenes desde `docs/` hacia `src/assets/` (+ nombres normalizados)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create base HTML5 skeleton with SEO tags in `src/index.html`
- [x] T004 [P] Setup CSS variables (colores, tipografía, efectos modernos) en `src/styles/variables.css`
- [x] T005 [P] Setup base CSS (reset, body defaults) en `src/styles/base.css`
- [x] T006 Create main JS entry point en `src/js/main.js` e importarlo en `src/index.html`
- [x] T007 Importar variables y base CSS en `src/index.html`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Descubrimiento de la Organización (Priority: P1) 🎯 MVP

**Goal**: Que un visitante entienda la misión y actividades de "Invasión del Amor de Dios" al entrar al sitio.

**Independent Test**: Verificar que se ve la misión, el logo y las acciones principales en la página sin errores.

### Implementation for User Story 1

- [x] T008 [US1] Implementar header/navbar con el logo en `src/index.html`
- [x] T009 [US1] Implementar Hero section con la "Misión y Visión" (centrado en Dios) en `src/index.html`
- [x] T010 [US1] Implementar sección de "Acciones principales" en `src/index.html`
- [x] T011 [US1] Crear archivo `src/styles/components.css` y linkear en HTML
- [x] T012 [P] [US1] Estilizar Navbar y Hero section en `src/styles/components.css` (Glassmorphism effects)
- [x] T013 [P] [US1] Estilizar sección de Acciones (cards) en `src/styles/components.css`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Contacto y Redes Sociales (Priority: P2)

**Goal**: Permitir encontrar rápidamente enlaces a WhatsApp e Instagram.

**Independent Test**: Probar que hacer clic en los iconos dirige al número correcto o a Instagram.

### Implementation for User Story 2

- [x] T014 [US2] Implementar sección "Contacto" / Footer en `src/index.html`
- [x] T015 [US2] Implementar Botón Flotante de WhatsApp en `src/index.html` (wa.me)
- [x] T016 [US2] Agregar enlaces a Instagram en el Header/Footer de `src/index.html`
- [x] T017 [US2] Estilizar sección de contacto y botón flotante en `src/styles/components.css`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Conocer al Equipo (Priority: P3)

**Goal**: Mostrar quiénes son los integrantes del proyecto usando las imágenes provistas.

**Independent Test**: Verificar que la sección "Equipo" muestra a los integrantes con formato uniforme.

### Implementation for User Story 3

- [x] T018 [P] [US3] Recortar y procesar imágenes de los integrantes (aplicar recortes circulares u optimizaciones) en `src/assets/` usando CSS o procesador de imágenes.
- [x] T019 [US3] Implementar sección "Equipo / Nosotros" en `src/index.html` usando la lista de `docs/organizacional/INTEGRANTES`
- [x] T020 [US3] Estilizar tarjetas del equipo para que tengan un estilo cohesivo (sombras, efectos de hover) en `src/styles/components.css`

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T021 [P] Implementar animaciones de scroll (Reveal on scroll) usando `src/js/main.js` y `src/styles/components.css`
- [x] T022 [P] Ajustar diseño responsivo (Media Queries) para garantizar visualización perfecta en móviles en `src/styles/components.css`
- [ ] T023 Validar Lighthouse score y aplicar correcciones finales (comprimir imágenes si es necesario) — *imágenes y video ya optimizados (2026-11-25); falta correr Lighthouse*
- [ ] T024 Testear todos los enlaces salientes (WhatsApp, RRSS)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- Secciones CSS de diferentes historias de usuario pueden trabajarse en paralelo.
- Procesamiento de imágenes (T018) puede hacerse de forma aislada e independiente.
- Las animaciones y estilos base se pueden iterar separadamente del HTML.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

## Pendientes (2026-11-25)

- [ ] T025 Cargar el número oficial de WhatsApp en `CONTACT.whatsapp` (`src/js/main.js`); mientras esté vacío los botones de WhatsApp quedan ocultos
- [x] T026 Reemplazar el logo principal (ahora `src/assets/logos/logo.svg`, vectorizado), `favicon.png` y `og-image.jpg` por el logo nuevo — *hecho 2026-11-25 a partir de `logo-nuevo-original.png` (150px); conviene conseguir una versión en alta o SVG*
- [x] T028 Tipografía de títulos cambiada a Comfortaa (acorde al logo nuevo); texto sigue en Outfit
- [ ] T027 Cuando haya dominio: URLs absolutas en `og:image` y agregar `og:url` en `src/index.html`
