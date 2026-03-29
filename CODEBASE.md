# EduAssist-AI Frontend - Code Graph & UI/UX Analysis

## Project Overview
**EduAssist-AI** is a React/TypeScript educational platform for summarizing videos and slides. Built with Vite, TailwindCSS, Redux Toolkit, and React Router.

---

## 📁 Project Structure

```
EduAssist-AI-FE/
├── src/
│   ├── api/                    # API layer
│   ├── components/             # Reusable UI components
│   ├── context/                # React Context providers
│   ├── hooks/                  # Custom React hooks
│   ├── icons/                  # Icon components
│   ├── layout/                 # Layout components
│   ├── pages/                  # Page components
│   ├── store/                  # Redux store
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main app router
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── tests/                      # Test files
└── [config files]
```

---

## 🔗 Code Dependency Graph

### Entry Point
```
main.tsx
├── App.tsx
│   ├── Router Configuration
│   ├── PrivateRoute
│   └── AppLayout
├── ThemeProvider (ThemeContext)
├── AppWrapper (PageMeta)
└── Redux Provider (store)
```

---

## 📊 Complete File & Function Map

### **1. Entry Files**

#### `src/main.tsx`
- **Function**: Application entry point
- **Functions**:
  - `createRoot()` - Renders the app with providers
- **Dependencies**: App, ThemeProvider, PageMeta, Redux store

#### `src/App.tsx`
- **Function**: Main router configuration
- **Functions**:
  - `App()` - Defines all routes
- **Routes**:
  - `/` → Redirect to `/signin`
  - `/signin` → SignIn
  - `/signup` → SignUp
  - `/home` → Home (Dashboard)
  - `/courses/:courseId` → CourseDetail
  - `/courses/:courseId/modules/:moduleId` → ModuleDetail
  - `/courses/:courseId/modules/:moduleId/summaries` → SummaryManagementPage
  - `/profile` → UserProfiles
  - `/test-suites/:id` → TestSuiteDetails
  - `/calendar` → Calendar
  - `/form-elements` → FormElements
  - `/basic-tables` → BasicTables
  - `/alerts`, `/avatars`, `/badge`, `/buttons`, `/images`, `/videos` → UI Elements
  - `/line-chart`, `/bar-chart` → Charts
  - `*` → NotFound

---

### **2. API Layer**

#### `src/api/axios.ts`
- **Functions**:
  - `api.create()` - Axios instance with baseURL
  - `api.interceptors.request.use()` - Adds auth token to requests
- **Exports**: `default api`

#### `src/api/modules.ts`
- **Types**: ChatMessage, Video, Resource, SummaryCreate, SummaryRequest, SummaryResponse, ResourceWithSummary, etc.
- **API Functions** (`moduleApi` object):
  - `getModuleChatHistory(moduleId)` - Get chat history
  - `getModuleVideos(moduleId)` - Get module videos
  - `getModuleResources(moduleId)` - Get module resources
  - `uploadModuleVideo(moduleId, file, title, uploadToDrive)` - Upload video
  - `uploadModuleResource(moduleId, file, title, uploadToDrive)` - Upload resource
  - `getResourcesWithSummaries(courseId)` - Get resources with summaries
  - `generateResourceSummary(resourceId, requestData)` - Generate summary
  - `getSummary(summaryId)` - Get specific summary
  - `updateSummary(summaryId, summaryData)` - Update summary
  - `deleteSummary(summaryId)` - Delete summary
  - `updateSummaryPublishStatus(summaryId, isPublished)` - Toggle publish status
  - `getModuleSummaries(moduleId)` - Get all module summaries

---

### **3. State Management**

#### `src/store/store.ts`
- **Functions**:
  - `configureStore()` - Creates Redux store with auth reducer
- **Exports**: `store`, `RootState`, `AppDispatch`

#### `src/store/authSlice.ts`
- **State**: `user`, `token`
- **Reducers**:
  - `loginSuccess(state, action)` - Store user & token
  - `logout(state)` - Clear user & token
- **Exports**: `loginSuccess`, `logout`, `default authReducer`

#### `src/store/hooks.ts`
- **Hooks**:
  - `useAppSelector()` - Typed selector hook
  - `useAppDispatch()` - Typed dispatch hook

---

### **4. Custom Hooks**

#### `src/hooks/useAuth.ts`
- **Functions**:
  - `useAuth()` - Returns auth state (user, token, isAuthenticated, isFaculty, isStudent, role)

#### `src/hooks/useGoBack.ts`
- **Functions**:
  - `useGoBack()` - Navigate to previous page

#### `src/hooks/useModal.ts`
- **Functions**:
  - `useModal()` - Modal open/close state management

---

### **5. Context Providers**

#### `src/context/ThemeContext.tsx`
- **State**: `theme`, `isDarkMode`
- **Functions**:
  - `toggleTheme()` - Switch between light/dark mode
- **Exports**: `ThemeProvider`, `useTheme`

#### `src/context/SidebarContext.tsx`
- **State**: `isExpanded`, `isHovered`, `isMobileOpen`
- **Functions**:
  - `toggleSidebar()` - Toggle desktop sidebar
  - `toggleMobileSidebar()` - Toggle mobile sidebar
  - `setIsHovered()` - Set hover state
- **Exports**: `SidebarProvider`, `useSidebar`

#### `src/context/TestSuitecontext.tsx`
- **Functions**: Test suite state management

---

### **6. Layout Components**

#### `src/layout/AppLayout.tsx`
- **Functions**:
  - `AppLayout()` - Main app layout wrapper
  - `LayoutContent()` - Layout with sidebar, header, and outlet
- **Components**: AppSidebar, AppHeader, Backdrop, Outlet

#### `src/layout/AppSidebar.tsx`
- **Functions**:
  - `AppSidebar()` - Navigation sidebar
  - `renderMenuItems()` - Render menu items with submenus
  - `handleSubmenuToggle()` - Toggle submenu visibility
  - `isActive()` - Check if route is active
- **Navigation Items**: Dashboard, User Profile, Authentication

#### `src/layout/AppHeader.tsx`
- **Functions**:
  - `AppHeader()` - Top header bar
  - `handleToggle()` - Toggle sidebar
  - `toggleApplicationMenu()` - Toggle mobile menu
- **Components**: ThemeToggleButton, NotificationDropdown, UserDropdown, Search input

#### `src/layout/Backdrop.tsx`
- **Functions**:
  - `Backdrop()` - Mobile sidebar backdrop overlay

#### `src/layout/SidebarWidget.tsx`
- **Functions**:
  - `SidebarWidget()` - Sidebar promotional widget

---

### **7. Page Components**

#### `src/pages/AuthPages/SignIn.tsx`
- **Functions**:
  - `SignInForm()` - Login form
  - `handleLogin()` - Submit login credentials
- **State**: email, password, showPassword, isChecked, error
- **Components**: Form inputs, Checkbox, Button

#### `src/pages/AuthPages/SignUp.tsx`
- **Functions**:
  - `SignUpForm()` - Registration form
  - `handleSignUp()` - Submit registration
- **State**: name, email, password, showPassword, error

#### `src/pages/AuthPages/AuthPageLayout.tsx`
- **Functions**:
  - `AuthPageLayout()` - Layout for auth pages

#### `src/pages/Dashboard/Home.tsx`
- **Functions**:
  - `Home()` - Dashboard showing courses list
  - `fetchCourses()` - Load courses from API
  - Filter courses by search query
- **State**: courses, loading, searchQuery
- **Components**: Courses, Search input

#### `src/pages/Dashboard/CourseDetail.tsx`
- **Functions**:
  - `CourseDetail()` - Show course details and modules
  - `fetchCourseAndModules()` - Load course & modules
- **State**: course, modules, loading
- **Components**: Modules list

#### `src/pages/Dashboard/ModuleDetail.tsx`
- **Functions**:
  - `ModuleDetail()` - Module detail with 3-column layout
  - `fetchModule()` - Load module details
  - `fetchResources()` - Load module resources
  - `handleRenameResource()` - Rename resource
  - `handleDeleteResource()` - Delete resource
  - `renderActiveView()` - Render center column based on active view
- **State**: module, resources, loading, leftColumnExpanded, rightColumnExpanded, activeView, showUploadForm
- **Views**: chat, notes, resources, moduleSummaries
- **Components**: RAGView, ResourcesWithSummaries, SummaryList, ResourceUpload, Card

#### `src/pages/Dashboard/SummaryManagementPage.tsx`
- **Functions**:
  - `SummaryManagementPage()` - Manage summaries

#### `src/pages/UserProfiles.tsx`
- **Functions**:
  - `UserProfiles()` - User profile page
- **Components**: UserInfoCard, UserAddressCard, UserMetaCard

#### `src/pages/TestsuiteDetails.tsx`
- **Functions**:
  - `TestSuiteDetails()` - Test suite detail view

#### `src/pages/Calendar.tsx`
- **Functions**:
  - `Calendar()` - Calendar view with FullCalendar

#### `src/pages/Forms/FormElements.tsx`
- **Functions**:
  - `FormElements()` - Form elements showcase

#### `src/pages/Tables/BasicTables.tsx`
- **Functions**:
  - `BasicTables()` - Table examples

#### `src/pages/UiElements/*`
- **Functions**: Various UI component demos (Alerts, Avatars, Badges, Buttons, Images, Videos)

#### `src/pages/Charts/LineChart.tsx`, `BarChart.tsx`
- **Functions**: Chart examples with ApexCharts

#### `src/pages/Blank.tsx`
- **Functions**: Blank page template

#### `src/pages/OtherPage/NotFound.tsx`
- **Functions**: 404 error page

---

### **8. Course Management Components**

#### `src/components/CourseManagement/Courses.tsx`
- **Functions**:
  - `Courses()` - Display course cards grid
  - `handleCreateOrEdit()` - Create/update course
  - `handleDelete()` - Delete course
  - `handleJoinCourse()` - Join course action
- **State**: showCreateForm, formValues, editingCourse, activeMenu, confirmId
- **Components**: Course cards with menu (Edit, Delete, View Details)

#### `src/components/CourseManagement/Modules.tsx`
- **Functions**:
  - `Modules()` - Display module cards grid
  - `handleCreateOrEdit()` - Create/update module
  - `handleDelete()` - Delete module
- **State**: showCreateForm, formValues, editingModule, activeMenu, confirmId

#### `src/components/CourseManagement/Card.tsx`
- **Functions**:
  - `Card()` - Feature card component

#### `src/components/CourseManagement/ChatHistory.tsx`
- **Functions**:
  - `ChatHistory()` - Display chat history

#### `src/components/CourseManagement/RAGView.tsx`
- **Functions**:
  - `RAGView()` - Chat interface with RAG (Retrieval-Augmented Generation)
  - `fetchChatHistory()` - Load chat history
  - `sendMessage()` - Send message to AI
  - `handleResourceSelect()` - Select resources for context
  - `handleApplyResources()` - Apply selected resources
  - `handleClearResources()` - Clear selected resources
- **State**: messages, inputMessage, isLoading, selectedResourceIds, showResourcesDropdown
- **Features**: Module-specific chat, resource selection, persistent storage

#### `src/components/CourseManagement/ResourceUpload.tsx`
- **Functions**:
  - `ResourceUpload()` - Upload resources (PDF, DOCX, TXT, video)
  - `handleFileSelect()` - Handle file selection
  - `handleUpload()` - Upload file to API
- **State**: file, title, uploadToDrive, uploading, error

#### `src/components/CourseManagement/VideoUpload.tsx`
- **Functions**:
  - `VideoUpload()` - Upload videos

#### `src/components/CourseManagement/ResourcesDropdown.tsx`
- **Functions**:
  - `ResourcesDropdown()` - Dropdown to select resources for chat context
  - `handleToggleAll()` - Toggle all resources
  - `handleToggleResource()` - Toggle individual resource
- **State**: localSelectedIds

#### `src/components/CourseManagement/CourseTypes.ts`
- **Types**: Course, Module, Resource interfaces

---

### **9. Resource Summary Components**

#### `src/components/ResourceSummary/ResourceSummaryGenerator.tsx`
- **Functions**:
  - `ResourceSummaryGenerator()` - Form to generate resource summary
  - `handleSubmit()` - Submit summary generation request
- **State**: lengthType, focusAreas, customPrompt, loading, error
- **Options**: Brief, Detailed, Comprehensive length

#### `src/components/ResourceSummary/ResourcesWithSummaries.tsx`
- **Functions**:
  - `ResourcesWithSummaries()` - Display resources with their summaries

---

### **10. Summary Management Components**

#### `src/components/SummaryManagement/SummaryList.tsx`
- **Functions**:
  - `SummaryList()` - List all summaries for a module
  - `fetchResourcesWithSummaries()` - Load resources with summaries
  - `handleTogglePublish()` - Toggle summary publish status
  - `handleDelete()` - Delete summary
  - `downloadSummaryAsPDF()` - Download summary as text file
  - `viewSummaryDetails()` - Open summary modal
  - `toggleExpand()` - Expand/collapse summary preview
  - `toggleDropdown()` - Toggle action dropdown
- **State**: resources, loading, error, selectedSummary, openDropdownId, expandedSummaryId
- **Actions**: Publish/Unpublish, Download, View Details, Delete

#### `src/components/SummaryManagement/SummaryCreator.tsx`
- **Functions**:
  - `SummaryCreator()` - Create new summary

#### `src/components/SummaryManagement/SummaryForm.tsx`
- **Functions**:
  - `SummaryForm()` - Summary form component

---

### **11. Authentication Components**

#### `src/components/auth/SignInForm.tsx`
- **Functions**:
  - `SignInForm()` - Sign in form
  - `handleLogin()` - Process login
- **State**: email, password, showPassword, isChecked, error

#### `src/components/auth/SignUpForm.tsx`
- **Functions**:
  - `SignUpForm()` - Sign up form
  - `handleSignUp()` - Process registration

#### `src/components/auth/RoleBasedComponent.tsx`
- **Functions**:
  - `RoleBasedComponent()` - Render based on user role

#### `src/components/PrivateRoute/privateRoute.tsx`
- **Functions**:
  - `PrivateRoute()` - Protect routes requiring authentication

---

### **12. UI Components**

#### `src/components/ui/button/Button.tsx`
- **Functions**:
  - `Button()` - Reusable button component
- **Props**: variant, size, children

#### `src/components/ui/dropdown/Dropdown.tsx`, `DropdownItem.tsx`
- **Functions**: Dropdown menu components

#### `src/components/ui/modal/index.tsx`
- **Functions**:
  - `Modal()` - Modal dialog component

#### `src/components/ui/table/index.tsx`
- **Functions**:
  - `Table()` - Table component

#### `src/components/ui/alert/Alert.tsx`
- **Functions**:
  - `Alert()` - Alert notification component

#### `src/components/ui/avatar/Avatar.tsx`
- **Functions**:
  - `Avatar()` - Avatar component

#### `src/components/ui/badge/Badge.tsx`
- **Functions**:
  - `Badge()` - Badge/tag component

#### `src/components/ui/images/*`, `videos/*`
- **Functions**: Responsive image and video components

---

### **13. Form Components**

#### `src/components/form/Form.tsx`
- **Functions**: Form wrapper

#### `src/components/form/Label.tsx`
- **Functions**:
  - `Label()` - Form label component

#### `src/components/form/Select.tsx`, `MultiSelect.tsx`
- **Functions**: Select input components

#### `src/components/form/input/InputField.tsx`
- **Functions**:
  - `Input()` - Text input component

#### `src/components/form/input/Checkbox.tsx`, `Radio.tsx`, `RadioSm.tsx`
- **Functions**: Checkbox and radio components

#### `src/components/form/input/FileInput.tsx`
- **Functions**:
  - `FileInput()` - File upload input

#### `src/components/form/input/TextArea.tsx`
- **Functions**:
  - `TextArea()` - Text area component

#### `src/components/form/switch/Switch.tsx`
- **Functions**:
  - `Switch()` - Toggle switch

#### `src/components/form/form-elements/*`
- **Functions**: Various form element examples (CheckboxComponents, DefaultInputs, SelectInputs, etc.)

#### `src/components/form/date-picker.tsx`
- **Functions**: Date picker with flatpickr

#### `src/components/form/group-input/PhoneInput.tsx`
- **Functions**: Phone input with country code

---

### **14. Header Components**

#### `src/components/header/Header.tsx`
- **Functions**: Header component

#### `src/components/header/NotificationDropdown.tsx`
- **Functions**:
  - `NotificationDropdown()` - Notification menu dropdown

#### `src/components/header/UserDropdown.tsx`
- **Functions**:
  - `UserDropdown()` - User profile dropdown menu

---

### **15. Common Components**

#### `src/components/common/Breadcrumbs.tsx`
- **Functions**:
  - `Breadcrumbs()` - Breadcrumb navigation

#### `src/components/common/PageBreadCrumb.tsx`
- **Functions**:
  - `PageBreadCrumb()` - Page breadcrumb

#### `src/components/common/PageMeta.tsx`
- **Functions**:
  - `PageMeta()` - Set page title and meta
  - `AppWrapper()` - Wrapper with metadata

#### `src/components/common/ScrollToTop.tsx`
- **Functions**:
  - `ScrollToTop()` - Scroll to top on route change

#### `src/components/common/ThemeToggleButton.tsx`, `ThemeTogglerTwo.tsx`
- **Functions**:
  - `ThemeToggleButton()` - Toggle light/dark mode

#### `src/components/common/ChartTab.tsx`
- **Functions**: Chart tab component

#### `src/components/common/ComponentCard.tsx`
- **Functions**: Component showcase card

#### `src/components/common/ConfirmDeleteModel.tsx`
- **Functions**:
  - `ConfirmDeleteModal()` - Confirmation dialog for deletions

#### `src/components/common/GridShape.tsx`
- **Functions**: Decorative grid shape

---

### **16. Chart Components**

#### `src/components/charts/line/LineChartOne.tsx`
- **Functions**: Line chart with ApexCharts

#### `src/components/charts/bar/BarChartOne.tsx`
- **Functions**: Bar chart with ApexCharts

---

### **17. Table Components**

#### `src/components/tables/BasicTables/BasicTableOne.tsx`
- **Functions**: Basic table example

---

### **18. E-commerce Components** (Template components, mostly commented out)

#### `src/components/ecommerce/*`
- **Components**: EcommerceMetrics, MonthlySalesChart, MonthlyTarget, RecentOrders, DemographicCard, CountryMap, StatisticsChart, TestSuites

---

### **19. User Profile Components**

#### `src/components/UserProfile/UserInfoCard.tsx`
- **Functions**: User information card

#### `src/components/UserProfile/UserAddressCard.tsx`
- **Functions**: User address card

#### `src/components/UserProfile/UserMetaCard.tsx`
- **Functions**: User metadata card

---

### **20. Test Pilot Components**

#### `src/components/TestPilot/TestSuites.tsx`
- **Functions**: Test suites display

#### `src/components/TestPilot/TestCases.tsx`
- **Functions**: Test cases display

#### `src/components/TestPilot/CodePreviewModel.tsx`
- **Functions**: Code preview modal

---

### **21. Icons**

#### `src/icons/index.ts`
- **Exports**: Various icon components (ChevronDownIcon, GridIcon, UserCircleIcon, etc.)

---

### **22. Utilities**

#### `src/utils/imagePaths.ts`
- **Functions**:
  - `getImagePath(path)` - Get image path

---

## 🎨 UI/UX Analysis

### **Design System**

#### **Color Palette**
- **Primary**: Blue/Indigo (`blue-600`, `indigo-100`)
- **Secondary**: Purple (`purple-100`, `purple-600`)
- **Success**: Green (`green-100`, `green-800`)
- **Warning**: Yellow (`yellow-100`, `yellow-800`)
- **Error**: Red (`red-100`, `red-600`, `error-500`)
- **Neutral**: Gray scale (`gray-50` to `gray-900`)
- **Dark Mode**: Full support with `dark:` variants

#### **Typography**
- **Heading Classes**: `heading-xl`, `heading-md`, `heading-sm`, `title-sm`, `title-md`
- **Body Classes**: `body-sm`, `body-md`
- **Font Weights**: `font-normal`, `font-medium`, `font-semibold`, `font-bold`

#### **Spacing**
- **Padding**: Consistent use of Tailwind spacing (`p-4`, `p-6`, `px-4`, `py-2`)
- **Margin**: `m-4`, `mx-auto`, `mb-6`, `mt-4`
- **Gap**: `gap-2`, `gap-3`, `gap-4`, `gap-5`

#### **Components Styling**
- **Cards**: `rounded-2xl`, `border`, `shadow-lg`, `hover:shadow-lg`
- **Buttons**: `button-primary`, `button-secondary`, `button-ghost`
- **Inputs**: `rounded-lg`, `border`, `focus:ring`, `focus:border`
- **Badges**: `rounded-full`, `px-2 py-1`, `text-xs`

---

### **Layout Structure**

```
┌─────────────────────────────────────────┐
│           AppHeader                      │
│  [Sidebar Toggle] [Search] [Theme] [🔔] │
├──────────┬──────────────────────────────┤
│          │                              │
│  Sidebar │    Main Content Area         │
│          │    - Dashboard               │
│  [Logo]  │    - Course Cards            │
│  [Menu]  │    - Module Grid             │
│          │    - 3-Column Module View    │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

---

### **Key UI Features**

#### **1. Responsive Design**
- **Mobile**: Hamburger menu, collapsible sidebar
- **Tablet**: 2-column grids (`sm:grid-cols-2`)
- **Desktop**: 3-5 column grids (`lg:grid-cols-3`, `xl:grid-cols-4`)
- **Breakpoints**: `sm`, `md`, `lg`, `xl`, `2xl`

#### **2. Dark Mode**
- Toggle button in header
- All components have `dark:` variants
- Persistent theme preference

#### **3. Interactive Elements**
- **Hover Effects**: `hover:bg-gray-100`, `hover:shadow-lg`, `hover:scale-[1.02]`
- **Transitions**: `transition-all`, `duration-300`, `ease-in-out`
- **Animations**: `animate-spin`, `animate-bounce`, `animate-pulse`

#### **4. Loading States**
- Spinner animations
- Skeleton screens
- Disabled button states

#### **5. Feedback**
- **Toast Notifications**: `react-toastify` (bottom-right, 3s auto-close)
- **Error Messages**: Inline error display
- **Success Messages**: Toast on successful actions

#### **6. Navigation**
- **Sidebar**: Collapsible, hover-expandable
- **Breadcrumbs**: Page navigation context
- **Back Buttons**: Consistent back navigation

---

### **User Experience Flows**

#### **Authentication Flow**
```
Sign In → Home (Dashboard)
   ↓
Sign Up → Home (Dashboard)
   ↓
Logout → Sign In
```

#### **Course Management Flow**
```
Home (Courses List)
   ↓
Course Detail (Modules List)
   ↓
Module Detail (Resources, Chat, Summaries)
   ↓
Summary Management
```

#### **Resource Upload Flow**
```
Module Detail → Upload Resource → Select File → Enter Title → Upload → Processing → Complete
```

#### **Summary Generation Flow**
```
Module Detail → Summary Notes → Select Resource → Generate Summary → Configure (Length, Focus) → Generate → View/Edit
```

#### **AI Chat Flow**
```
Module Detail → Chat View → Select Resources → Type Message → Send → AI Response
```

---

### **Component Hierarchy**

```
App
├── Router
│   ├── Public Routes
│   │   ├── SignIn
│   │   └── SignUp
│   └── Protected Routes (PrivateRoute)
│       └── AppLayout
│           ├── AppSidebar
│           ├── AppHeader
│           │   ├── ThemeToggleButton
│           │   ├── NotificationDropdown
│           │   └── UserDropdown
│           └── Outlet (Page Content)
│               ├── Home
│               │   └── Courses
│               ├── CourseDetail
│               │   └── Modules
│               ├── ModuleDetail
│               │   ├── ResourceUpload
│               │   ├── RAGView
│               │   ├── ResourcesWithSummaries
│               │   └── SummaryList
│               └── [Other Pages]
```

---

### **State Management Architecture**

```
Redux Store
├── auth (authSlice)
│   ├── user
│   └── token
└── [Other slices]

Context Providers
├── ThemeProvider (ThemeContext)
│   ├── theme
│   └── toggleTheme()
└── SidebarProvider (SidebarContext)
    ├── isExpanded
    ├── isHovered
    ├── isMobileOpen
    └── [actions]

Local State (useState)
├── Component-specific state
└── Form state
```

---

### **API Integration Pattern**

```
Component
   ↓
useAuth() [Get Token]
   ↓
axiosInstance [Auto-attached token]
   ↓
API Endpoint
   ↓
Response Handler
   ↓
State Update + Toast Notification
```

---

### **Accessibility Features**

- **ARIA Labels**: `aria-label` on buttons
- **Keyboard Navigation**: Tab indices, Enter key handlers
- **Focus States**: `focus:ring`, `focus:outline-none`
- **Screen Reader**: Proper heading hierarchy
- **Color Contrast**: WCAG compliant colors

---

### **Performance Optimizations**

- **Lazy Loading**: Route-based code splitting
- **Memoization**: `useCallback`, `useMemo` where needed
- **Debouncing**: Search inputs
- **Image Optimization**: Responsive images
- **Bundle Size**: Tree-shaking with ES modules

---

## 📈 Metrics & Analytics

### **File Statistics**
- **Total TSX Files**: 118
- **Total TS Files**: 13
- **Total Components**: ~100+
- **Total Pages**: 22
- **Total API Functions**: 12+

### **Code Quality**
- **TypeScript**: Full type coverage
- **ESLint**: Configured with React hooks plugin
- **Prettier**: Consistent formatting
- **Component Reusability**: High

---

## 🔐 Security Features

- **Authentication**: JWT token-based
- **Protected Routes**: PrivateRoute wrapper
- **Role-based Access**: FACULTY/STUDENT roles
- **Token Storage**: localStorage + Redux
- **API Security**: Bearer token in headers
- **Input Validation**: Form validation

---

## 🚀 Key Features Summary

1. **Course Management**: Create, edit, delete courses
2. **Module Management**: Organize content into modules
3. **Resource Upload**: Support for PDF, DOCX, TXT, Video
4. **AI Summarization**: Generate summaries with customizable length
5. **RAG Chat**: Context-aware AI chat with resource selection
6. **Summary Management**: View, edit, publish, download summaries
7. **Dark Mode**: Full theme support
8. **Responsive Design**: Mobile-first approach
9. **Toast Notifications**: User feedback system
10. **Role-based Access**: Faculty/Student differentiation

---

## 📝 Notes

- The project uses a **template-based admin dashboard** (TailAdmin) customized for educational purposes
- Many e-commerce and chart components are **commented out** as they're not needed
- The **3-column layout** in ModuleDetail is a key UX feature for multitasking
- **Persistent storage** is used for selected resources in chat (localStorage)
- The API base URL is configurable via environment variables (`.env`, `.env.production`)

---

**Generated**: 2026-03-29
**Project Version**: 2.0.2
**Framework**: React 19 + TypeScript + Vite
