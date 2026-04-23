# Weeaver - Volunteer-NGO Platform
## Cursor Rules for Design & Feature Consistency

---

## PROJECT OVERVIEW
**Name:** Weeaver (Open Innovation: Bridging the Gap in Social Impact)
**Team:** Shadow Garden
**Core Mission:** Connect NGOs and volunteers through a data-driven, gamified platform with real-time "Heat Maps of Need"

**Key Features:**
- Real-time Heat Map visualization of community needs
- Volunteer skill & location-based task matching
- Gamified merit system (Impact-Weighted Rewards)
- NGO Command Center dashboard
- Paper-to-Pixel Bridge (AI-OCR for legacy data)
- Offline-first resilience for remote areas

---

## DESIGN SYSTEM

### Color Palette (Tailwind + Custom)
- **Primary:** `#1d4ed8` (Deep Blue) - Main actions, headers, CTAs
- **Secondary:** `#10b981` (Emerald Green) - Success states, volunteer badges, positive reinforcement
- **Accent:** `#f59e0b` (Amber) - Heat map intensity, urgency indicators, highlights
- **Dark:** `#1e293b` (Slate) - Text, dark backgrounds
- **Neutral:** Gray scale (50-900) for backgrounds, borders, text hierarchy

### Typography
- **Display Font:** Outfit (weights: 300-800) - Headers, titles, badges
- **Body Font:** Inter (weights: 400-600) - Body text, labels, descriptions
- **Font Sizes:**
  - Page title: 36-44pt (Outfit, bold)
  - Section header: 20-24pt (Outfit, semi-bold)
  - Body text: 14-16pt (Inter, regular)
  - Labels: 12-14pt (Inter)
  - Captions: 10-12pt (Inter, muted gray)

### Component Library (Tailwind + Custom CSS)
**Reusable Classes:**
- `.btn-primary` → Blue CTA buttons with shadow + hover effect
- `.btn-secondary` → White outline buttons, secondary actions
- `.glass-panel` → Frosted glass effect (bg-white/10, backdrop-blur)

**Custom Component Patterns:**
- HeatMapVisualization (SVG-based, using accent amber colors)
- VolunteerCard (profile + skills + impact score)
- TaskCard (task details + urgency badge + location)
- MeritBadge (gamified reward display)
- DashboardWidget (data cards for NGO command center)

### Visual Motifs (Repeat Across All Pages)
1. **Impact Scoring Badge** - Circular badge with Outfit font, showing points/rank
2. **Urgency Indicator** - Vertical bar (left edge) using accent color gradient
3. **Location Tag** - Pill-shaped element with location icon + text
4. **Skill Matcher** - Color-coded skill pills with secondary green
5. **Heat Map Overlay** - Amber/orange intensity scale (0-100% opacity)

---

## FEATURE SPECIFICATIONS

### 1. Volunteer Features

**Volunteer Profile**
- Avatar + Name (Outfit header)
- Bio (2-3 line max)
- Skills (multi-select: Healthcare, Education, Infrastructure, Food Distribution, etc.)
- Location (city + availability radius in km)
- Impact Score (large number display, Outfit bold)
- Rank Badge (Bronze/Silver/Gold/Platinum based on score)
- Contribution History (last 10 tasks completed, compact list)
- Availability Status (Available / On Task / Break)

**Task Discovery & Matching**
- Heat Map (center piece) showing community need intensity
- Filter sidebar: Skill, Location (radius), Urgency Level, Organization
- Task Cards show:
  - Task title + organization name
  - Urgency badge (Critical/High/Medium/Low = amber gradient)
  - Location distance from volunteer
  - Skills required (green pills)
  - Time commitment (hours)
  - Potential impact points (show calculation: Urgency × Location Match × Skill Match)
  - Apply button (primary blue)

**Application & Progress**
- Applied tasks show status: Pending → Accepted → In Progress → Completed
- Real-time countdown for time-sensitive tasks
- Progress bar if task is in-progress
- Submit completion with proof (photo/notes)

**Gamification Dashboard**
- Current Impact Score (large Outfit display, primary blue)
- Next Rank target + progress bar (secondary green)
- Weekly/Monthly leaderboard (top 5, 10, 50)
- Achievement unlocks (badges, milestones)
- Impact breakdown: By skill, by location, by organization

---

### 2. NGO Features

**Command Center Dashboard** (Main landing for NGOs)
- Real-time Heat Map (large, center) showing all community needs in territory
- Heat Map uses amber/orange gradient: Red = Critical Need, Yellow = Moderate, Green = Covered
- Top metrics row:
  - Active Volunteers (green stat)
  - Open Tasks (blue stat)
  - Impact This Week (secondary stat)
  - Coverage Score (0-100%, progress bar)
- Sidebar widgets:
  - Volunteer roster (quick view, sortable by rank/availability)
  - Task queue (pending applications, urgent unassigned tasks)
  - Alerts (redundant efforts detected, uncovered areas, volunteer burnout risk)

**Task Management**
- Create new task form (simple, inline):
  - Title, Description, Skills required, Location, Urgency Level, Time estimate
  - On submit: system auto-routes based on volunteer pool, shows recommended volunteers
- Edit/Delete tasks (draft or open status only)
- Bulk import tasks (CSV upload → parsed into form prefill)
- Task status pipeline (Open → Applied → Assigned → Completed → Reviewed)

**Volunteer Management**
- Volunteer approval flow (pending → verified)
- Skills validation (match against task library)
- Bulk messaging (send alerts to specific skill/location cohorts)
- Performance insights (top performers, inactive members)

**Paper-to-Pixel Bridge**
- Document upload (scanned surveys, field reports)
- AI-OCR status (processing → completed)
- Auto-extracted fields (names, locations, needs, demographics)
- Manual correction flow (highlight text → edit → confirm)
- Bulk sync to task queue

---

### 3. Heat Map Visualization (Core Feature)

**Design:**
- Center of dashboard, responsive (80vw max, mobile full width)
- Simplistic geography (neighborhood grid or actual map if using Mapbox)
- Color intensity: Amber gradient (hex values: #fff7ed → #f59e0b → #b45309 → #78350f)
- Overlay each neighborhood with:
  - Urgency heat (opacity/color)
  - Volunteer count badge (top-right corner of area)
  - Active tasks count (bottom-left)
- Interactive: Click area → drill-down to specific tasks + available volunteers
- Update frequency: Real-time (WebSocket or polling every 10s)

---

### 4. Data Architecture & Patterns

**User Types:**
- `volunteer` - Skill profile, availability, impact score
- `ngo` - Organization profile, task creation, team management
- `admin` - System-level oversight

**Core Entities:**
- Users (volunteers + NGO admins)
- Organizations (NGOs)
- Tasks (volunteer opportunities)
- Applications (volunteer → task)
- Skills (taxonomy: skill ID, name, category)
- Locations (granular: neighborhood/zone level)
- ImpactScores (calculated: Urgency × SkillMatch × LocationMatch)

**Real-Time Calculations:**
- Heat Map generation: Aggregate open tasks by location + urgency
- Impact Score: (Task Urgency Weight × Volunteer Skill Match × Location Coverage Score) 
- Recommendation Engine: Match volunteer skills + location + rank + availability → top 3 suggestions

---

## INTERACTION PATTERNS

### Navigation
- Header: Logo (left) | Search bar (center) | Notifications (right) | User menu (far right)
- Mobile: Hamburger menu → drawer overlay
- Active section highlighted in primary blue (Outfit font)

### Forms & Validation
- Inline validation (red error text below field, field border accent on error)
- CTA buttons disabled until form is valid (opacity 50%)
- Success toast (green bg, white text, auto-dismiss 4s)
- Error toast (red bg, white text, manual dismiss + retry option)
- Form sections use dividers (light gray border-top)

### Buttons & CTAs
- Primary: `.btn-primary` (blue, shadow, hover lifts up)
- Secondary: `.btn-secondary` (white outline, gray text, hover bg-gray-50)
- Danger: Red bg, white text (used for delete/reject only)
- Disabled: Opacity 50%, cursor not-allowed
- States: default → hover → active → disabled

### Cards & Containers
- Standard card: white bg, subtle shadow, border-radius 12px, padding 20px
- Hover effect: shadow deepens, subtle scale (1.02x)
- Data-heavy cards: use `.glass-panel` for layered visual hierarchy

### Modals & Dialogs
- Backdrop: black 50% opacity
- Modal: centered, max-width 600px, border-radius 12px
- Close button: top-right (X icon in primary blue)
- CTA buttons at bottom: Cancel (secondary) | Confirm (primary)

### Notifications & Alerts
- Success (green): "Task completed! 15 points earned."
- Warning (orange): "Only 2 volunteers available for this skill in this area."
- Error (red): "Failed to upload document. Please try again."
- Info (blue): "Heat Map updated with 5 new tasks in your area."
- Auto-dismiss: 4s (success/info), manual (warning/error)

### Mobile Responsiveness
- Breakpoints: xs (320px), sm (640px), md (768px), lg (1024px), xl (1280px)
- Stack all cards vertically on mobile (sm)
- Heat Map → simplified tile layout on mobile
- Forms → full-width fields on mobile
- Hide secondary info (rank badges, impact breakdown) on mobile (use `hidden sm:block`)

---

## FILE STRUCTURE & NAMING

```
src/
├── components/
│   ├── VolunteerCard.jsx         # Reusable volunteer profile card
│   ├── TaskCard.jsx              # Reusable task opportunity card
│   ├── HeatMap.jsx               # Main heat map visualization
│   ├── MeritBadge.jsx            # Impact score + rank display
│   ├── DashboardWidget.jsx       # Generic data widget
│   ├── SkillPill.jsx             # Skill tag component
│   ├── UrgencyBadge.jsx          # Task urgency indicator
│   ├── LocationTag.jsx           # Location display component
│   ├── Header.jsx                # Navigation header
│   ├── Sidebar.jsx               # Dashboard sidebar (NGO only)
│   └── Modal/
│       ├── TaskModal.jsx         # Create/edit task modal
│       ├── ApplicationModal.jsx  # Apply to task modal
│       └── ConfirmModal.jsx      # Generic confirmation dialog

├── pages/
│   ├── VolunteerDashboard.jsx    # Main volunteer hub
│   ├── TaskDiscovery.jsx         # Browse & filter tasks
│   ├── VolunteerProfile.jsx      # User profile page
│   ├── NGODashboard.jsx          # NGO command center
│   ├── TaskManagement.jsx        # Create/edit tasks
│   ├── VolunteerManagement.jsx   # NGO roster page
│   ├── PaperToPaper.jsx          # Document upload/OCR
│   ├── Leaderboard.jsx           # Gamification rankings
│   ├── Login.jsx                 # Auth page
│   └── NotFound.jsx              # 404 page

├── context/
│   ├── AuthContext.jsx           # User auth state (JWT)
│   └── HeatMapContext.jsx        # Real-time heat map data

├── api/
│   ├── axiosInstance.js          # Axios config + interceptors
│   ├── volunteers.js             # Volunteer API calls
│   ├── tasks.js                  # Task API calls
│   ├── organizations.js          # NGO API calls
│   ├── heatmap.js                # Heat map generation
│   └── gamification.js           # Scores, rankings, rewards

├── utils/
│   ├── validators.js             # Zod schemas for forms
│   ├── constants.js              # Urgency levels, skills, colors
│   ├── calculateImpact.js        # Impact score logic
│   └── formatters.js             # Date, distance, score formatting

├── hooks/
│   ├── useAuth.js                # Auth context hook
│   ├── useHeatMap.js             # Heat map data hook
│   └── useRole.js                # User type check (volunteer vs NGO)

├── App.jsx                       # Main router + layout
├── index.css                     # Global Tailwind + custom CSS
├── main.jsx
└── index.html
```

---

## CODING STANDARDS

### React Best Practices
- Functional components + hooks only (no class components)
- Use `useEffect` cleanup function for subscriptions
- Memoize expensive components with `React.memo()` if they re-render frequently
- Prop destructuring in function params
- No inline function definitions in JSX (declare above or wrap in useCallback)

### State Management
- Auth state in AuthContext (user, token, role)
- Heat Map data in HeatMapContext (updated via WebSocket or polling)
- Local component state for UI (expanded sections, modals open/close, form inputs)
- No Redux unless state tree explodes

### Form Handling
- Controlled inputs (value + onChange)
- Zod schema validation on submit
- Show field-level errors immediately after blur or on submit attempt
- Disable submit button until form is valid

### API Integration
- Axios instance with JWT bearer token in headers
- Interceptor for 401 → logout + redirect to login
- All endpoints return consistent structure: `{ success, data, error }`
- Timeouts: 10s for standard requests, 30s for file uploads

### Styling Rules
- **NO inline styles** - use Tailwind classes only
- **NO CSS modules** - use Tailwind utilities
- Custom animations in `index.css` only (not in component files)
- Spacing: use Tailwind scale (p-4, gap-8, etc.)
- No hardcoded colors - use Tailwind color palette + custom CSS vars

### Accessibility (A11y)
- Semantic HTML (button, a, form, etc.)
- Label every input: `<label htmlFor="skill-input">Skills</label>`
- ARIA labels for icons: `<button aria-label="Delete task">`
- Keyboard navigation: Tab through all interactive elements
- Color is not the only indicator (use icons + text for urgency)
- Contrast ratio: WCAG AA minimum (4.5:1 for text)

---

## COMMON PATTERNS

### Volunteer Task Discovery
```jsx
<div className="flex gap-8">
  {/* Sidebar filters */}
  <aside className="w-64 bg-white p-6 rounded-lg shadow-sm">
    <FilterPanel />
  </aside>
  
  {/* Main: Heat Map + Tasks */}
  <main className="flex-1">
    <HeatMap />
    <div className="mt-8 grid grid-cols-3 gap-4">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  </main>
</div>
```

### NGO Dashboard Widget Pattern
```jsx
<div className="grid grid-cols-4 gap-4 mb-8">
  <Widget icon="volunteer" label="Active Volunteers" value={47} trend="+5" />
  <Widget icon="task" label="Open Tasks" value={12} trend="+3" />
  <Widget icon="impact" label="Impact This Week" value="340 pts" trend="+40" />
  <Widget icon="coverage" label="Coverage Score" value="78%" trend="+2%" />
</div>
```

### Error Handling Pattern
```jsx
try {
  const result = await applyForTask(taskId);
  showToast('success', 'Application submitted!');
  // update state, redirect
} catch (err) {
  if (err.response?.status === 401) {
    logout(); // AuthContext
  } else {
    showToast('error', err.response?.data?.error || 'Something went wrong');
  }
}
```

---

## DEPLOYMENT & ENVIRONMENT

**Frontend:** Vercel
- Auto-deploy on main branch
- Environment variables: `VITE_API_URL`, `VITE_MAP_API_KEY`

**Backend:** Render
- Node.js + Express
- PostgreSQL database
- Environment variables: `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`

---

## What NOT to Do

- ❌ No class components (React.Component, class syntax)
- ❌ No inline CSS or CSS modules
- ❌ No Redux/Zustand without explicit team decision
- ❌ No UI library shortcuts (MUI, Chakra) - build from Tailwind
- ❌ No color hardcoding - use design system palette
- ❌ No form library (React Hook Form, Formik) - just controlled components + Zod
- ❌ No localStorage for auth (use httpOnly cookies via JWT)
- ❌ No arrow functions in JSX props (causes re-renders)
- ❌ Don't skip accessibility - label inputs, ARIA labels for icons
- ❌ Don't ship features without testing on mobile
- ❌ Don't create text-only cards - use icons + visual hierarchy
- ❌ Don't make Heat Map static - wire it to real data

---

## When Building a New Feature

1. **Sketch the UI** - Where does it live? What components does it need?
2. **Design the data flow** - What state? API calls? Real-time updates?
3. **Implement components** - Use naming conventions above, Tailwind for styling
4. **Wire state** - Connect to context/local state, validate with Zod
5. **Connect API** - Call backend endpoints, handle errors
6. **Test on mobile** - Responsive? Touch-friendly? 
7. **Accessibility check** - Keyboard nav, contrast, semantic HTML
8. **Ship** - Push to main, Vercel auto-deploys

---

## Quick Reference Commands

```bash
# Dev
npm run dev              # Vite dev server on localhost:5173

# Build
npm run build            # Production build
npm run preview          # Test production build locally

# Linting
npm run lint             # ESLint check

# New Component
# Create file in src/components/, export as default, use PascalCase
# Example: src/components/HeatMap.jsx
```

---

## Contact & Questions
If a design/feature question comes up and isn't in this file, ask: "What does this solve for volunteers/NGOs?" Ship the simplest version that answers that question.
