# EduAssist-AI - Visual Architecture Diagrams

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client["React Frontend"]
        App[App.tsx - Router]
        Layout[AppLayout]
        Sidebar[AppSidebar]
        Header[AppHeader]
        
        subgraph State["State Management"]
            Redux[Redux Store - Auth]
            Theme[Theme Context]
            Sidebar_Ctx[Sidebar Context]
        end
        
        subgraph Pages["Pages"]
            Home[Home - Dashboard]
            Course[CourseDetail]
            Module[ModuleDetail]
            Summary[SummaryManagement]
            Auth[SignIn/SignUp]
        end
        
        subgraph Components["Components"]
            Courses[Courses]
            Modules_[Modules]
            RAG[RAGView - Chat]
            Upload[ResourceUpload]
            SummaryList[SummaryList]
        end
        
        subgraph API["API Layer"]
            Axios[axios.ts]
            ModuleAPI[modules.ts]
        end
    end
    
    subgraph Backend["Backend API"]
        AuthAPI[Auth API]
        CourseAPI[Course API]
        ModuleAPI_Back[Module API]
        ResourceAPI[Resource API]
        SummaryAPI[Summary API]
        RAG_API[RAG API]
    end
    
    subgraph External["External Services"]
        AI[AI/LLM Service]
        Storage[Cloud Storage]
        Drive[Google Drive]
    end
    
    App --> Layout
    Layout --> Sidebar
    Layout --> Header
    Layout --> Pages
    
    Pages --> Components
    Components --> API
    API --> Backend
    
    Redux -.-> Components
    Theme -.-> Components
    Sidebar_Ctx -.-> Sidebar
    
    Backend --> External
```

---

## 📱 User Flow Diagram

```mermaid
graph LR
    Start([User Visits App]) --> Auth{Authenticated?}
    Auth -->|No| SignIn[Sign In Page]
    Auth -->|Yes| Home[Home Dashboard]
    
    SignIn --> Login[Enter Credentials]
    Login --> AuthCheck{Valid?}
    AuthCheck -->|No| Error[Show Error]
    AuthCheck -->|Yes| Home
    
    Home --> SelectCourse[Select Course]
    SelectCourse --> CourseDetail[Course Detail]
    CourseDetail --> SelectModule[Select Module]
    SelectModule --> ModuleDetail[Module Detail]
    
    ModuleDetail --> View{Choose Action}
    View --> Chat[AI Chat - RAGView]
    View --> Resources[View Resources]
    View --> Upload[Upload Resource]
    View --> Summaries[View Summaries]
    
    Chat --> SelectRes[Select Resources]
    SelectRes --> TypeMsg[Type Message]
    TypeMsg --> Send[Send to AI]
    Send --> Response[Show Response]
    
    Upload --> SelectFile[Select File]
    SelectFile --> Process[Upload & Process]
    Process --> Complete[Upload Complete]
    
    Summaries --> GenSummary[Generate Summary]
    GenSummary --> Config[Configure Settings]
    Config --> Generate[AI Generates]
    Generate --> ViewSummary[View/Edit Summary]
```

---

## 🗂️ Component Tree

```mermaid
graph TD
    App[App.tsx] --> Router[React Router]
    Router --> Public[Public Routes]
    Router --> Protected[Protected Routes]
    
    Public --> SignIn[SignIn]
    Public --> SignUp[SignUp]
    
    Protected --> PrivateRoute[PrivateRoute]
    PrivateRoute --> AppLayout[AppLayout]
    
    AppLayout --> Sidebar[AppSidebar]
    AppLayout --> Header[AppHeader]
    AppLayout --> Content[Outlet]
    
    Sidebar --> NavItems[Navigation Items]
    Sidebar --> SubMenus[Submenus]
    
    Header --> Search[Search Bar]
    Header --> Theme[Theme Toggle]
    Header --> Notif[Notification Dropdown]
    Header --> User[User Dropdown]
    
    Content --> Home[Home/Dashboard]
    Content --> CourseDetail[CourseDetail]
    Content --> ModuleDetail[ModuleDetail]
    Content --> Profile[UserProfiles]
    
    Home --> Courses[Courses Component]
    
    CourseDetail --> Modules[Modules Component]
    
    ModuleDetail --> LeftCol[Left: Resources]
    ModuleDetail --> Center[Center: Viewer]
    ModuleDetail --> RightCol[Right: Features]
    
    LeftCol --> ResourceUpload[ResourceUpload]
    LeftCol --> ResourceList[Resource List]
    
    Center --> RAGView[RAGView - Chat]
    Center --> SummaryNotes[Summary Notes]
    Center --> ModuleSummaries[Module Summaries]
    
    RightCol --> Cards[Feature Cards]
```

---

## 🔄 Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant S as State (Redux/Context)
    participant A as API Layer
    participant B as Backend
    
    U->>C: Click Action
    C->>S: Read Auth State
    S-->>C: Token & User Info
    C->>A: API Call with Token
    A->>B: HTTP Request
    B-->>A: JSON Response
    A-->>C: Return Data
    C->>S: Update State
    S-->>C: Re-render
    C->>U: Show Result
    Note over A,B: Token auto-attached by interceptor
```

---

## 📊 State Management Flow

```mermaid
graph TD
    subgraph GlobalState["Global State"]
        Redux[Redux Store]
        AuthSlice[authSlice]
        Token[JWT Token]
        User[User Info]
    end
    
    subgraph Context["React Context"]
        Theme[ThemeContext]
        Sidebar[SidebarContext]
    end
    
    subgraph Local["Local State"]
        ComponentState[useState]
        FormState[Form Data]
        UIState[UI State]
    end
    
    Redux --> AuthSlice
    AuthSlice --> Token
    AuthSlice --> User
    
    Theme --> isDarkMode
    Theme --> toggleTheme
    
    Sidebar --> isExpanded
    Sidebar --> isHovered
    Sidebar --> isMobileOpen
    
    ComponentState --> FormState
    ComponentState --> UIState
    
    Redux -.-> Components
    Context -.-> Components
    Local -.-> Component
```

---

## 🛡️ Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as SignIn Form
    participant Redux as Redux Store
    participant API as Backend API
    
    U->>UI: Enter Email/Password
    U->>UI: Click Sign In
    UI->>API: POST /auth/login
    API-->>UI: { access_token, user }
    UI->>Redux: dispatch(loginSuccess)
    Redux->>LocalStorage: Save token
    Redux-->>UI: Auth State Updated
    UI->>U: Navigate to /home
    
    Note over U,API: Subsequent requests
    U->>API: API Call
    Note over API: Token from Redux/LocalStorage
    API->>API: Verify Token
    API-->>U: Authorized Response
```

---

## 📁 File Upload Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant API as API Layer
    participant B as Backend
    participant S as Storage
    
    U->>C: Click Upload Resource
    C->>U: Show File Picker
    U->>C: Select File
    C->>U: Enter Title
    U->>C: Click Upload
    C->>API: POST FormData
    API->>B: Multipart Upload
    B->>S: Store File
    S-->>B: File URL
    B->>AI[AI Service]: Process Content
    AI-->>B: Processing Status
    B-->>API: { resourceId, status }
    API-->>C: Upload Success
    C->>C: Refresh Resource List
    C->>U: Show Success Toast
```

---

## 🤖 AI Summary Generation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as SummaryGenerator
    participant API as API Layer
    participant B as Backend
    participant AI as AI/LLM
    
    U->>C: Select Resource
    U->>C: Choose Length Type
    U->>C: Enter Focus Areas
    U->>C: Click Generate
    C->>API: POST Summary Request
    API->>B: Create Summary Task
    B->>AI: Generate Summary
    AI-->>B: Summary Content
    B->>B: Save to Database
    B-->>API: { summaryId, content }
    API-->>C: Summary Generated
    C->>U: Show Success + Display Summary
```

---

## 💬 RAG Chat Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as RAGView
    participant API as API Layer
    participant B as Backend
    participant AI as AI/LLM
    participant DB as Vector DB
    
    U->>C: Select Resources
    U->>C: Type Message
    U->>C: Send Message
    C->>C: Add User Message to Chat
    C->>API: POST Chat Request
    API->>B: Get Resource Context
    B->>DB: Query Vectors
    DB-->>B: Relevant Chunks
    B->>AI: Prompt + Context
    AI-->>B: AI Response
    B-->>API: { response }
    API-->>C: AI Response
    C->>C: Add AI Message to Chat
    C->>U: Display Response
    Note over C,U: Auto-scroll to bottom
```

---

## 🎨 UI Component Hierarchy

```mermaid
graph TD
    subgraph Layout["Layout Components"]
        AL[AppLayout]
        AS[AppSidebar]
        AH[AppHeader]
    end
    
    subgraph UI["Base UI Components"]
        Button[Button]
        Input[Input]
        Select[Select]
        Modal[Modal]
        Table[Table]
        Badge[Badge]
        Avatar[Avatar]
        Alert[Alert]
        Dropdown[Dropdown]
    end
    
    subgraph Form["Form Components"]
        Form_[Form]
        Label[Label]
        Checkbox[Checkbox]
        Radio[Radio]
        Switch[Switch]
        TextArea[TextArea]
        FileInput[FileInput]
        DatePicker[DatePicker]
    end
    
    subgraph Common["Common Components"]
        Breadcrumb[Breadcrumb]
        PageMeta[PageMeta]
        ThemeToggle[ThemeToggle]
        ScrollToTop[ScrollToTop]
    end
    
    subgraph Feature["Feature Components"]
        Courses[Courses]
        Modules[Modules]
        RAGView[RAGView]
        ResourceUpload[ResourceUpload]
        SummaryList[SummaryList]
    end
    
    Layout --> UI
    Layout --> Form
    Layout --> Common
    Layout --> Feature
```

---

## 📱 Responsive Breakpoints

```mermaid
graph LR
    subgraph Mobile["Mobile<br/>< 640px"]
        M1[Single Column]
        M2[Hamburger Menu]
        M3[Full Width Cards]
    end
    
    subgraph Small["Small<br/>640px - 768px"]
        S1[2 Columns]
        S2[Compact Sidebar]
    end
    
    subgraph Medium["Medium<br/>768px - 1024px"]
        M4[2-3 Columns]
        M5[Expanded Sidebar]
    end
    
    subgraph Large["Large<br/>1024px - 1280px"]
        L1[3-4 Columns]
        L2[Full Sidebar]
    end
    
    subgraph XLarge["Extra Large<br/>1280px+"]
        XL1[4-5 Columns]
        XL2[Max Width Container]
    end
```

---

## 🔐 Route Protection

```mermaid
graph TD
    Route[Route Request] --> Auth{Authenticated?}
    Auth -->|No Token| Redirect[Redirect to /signin]
    Auth -->|Has Token| Check{Valid Route?}
    
    Check -->|Invalid| NotFound[404 Page]
    Check -->|Valid| Protected[Protected Route]
    
    Protected --> Layout[AppLayout]
    Layout --> Render[Render Page]
    
    Redirect --> SignIn[SignIn Page]
    
    style Protected fill:#90EE90
    style Redirect fill:#FFB6C1
    style NotFound fill:#FFD700
```

---

## 📦 API Endpoint Mapping

```mermaid
graph TD
    subgraph Auth["Authentication"]
        A1[POST /auth/login]
        A2[POST /auth/signup]
    end
    
    subgraph Courses["Courses"]
        C1[GET /api/v1/courses/]
        C2[GET /api/v1/courses/:id]
        C3[POST /api/v1/courses/]
        C4[PUT /api/v1/courses/:id]
        C5[DELETE /api/v1/courses/:id]
    end
    
    subgraph Modules["Modules"]
        M1[GET /api/v1/modules/:id]
        M2[GET /api/v1/courses/:id/modules]
        M3[PUT /api/v1/modules/:id]
        M4[DELETE /api/v1/modules/:id]
        M5[POST /api/v1/modules/:id/chat]
    end
    
    subgraph Resources["Resources"]
        R1[GET /api/v1/courses/modules/:id/resources]
        R2[POST /api/v1/courses/modules/:id/resources-sync]
        R3[DELETE /api/v1/courses/resources/:id]
        R4[GET /api/v1/resources/:id/resources-with-summaries]
    end
    
    subgraph Summaries["Summaries"]
        S1[POST /api/v1/resources/:id/summaries]
        S2[GET /api/v1/summaries/:id]
        S3[PUT /api/v1/summaries/:id]
        S4[DELETE /api/v1/summaries/:id]
        S5[PATCH /api/v1/summaries/:id/publish]
    end
    
    subgraph Chat["Chat"]
        CH1[GET /api/v1/modules/:id/chat/history]
        CH2[POST /api/v1/modules/:id/chat]
    end
```

---

## 🎯 Key Features Map

```mermaid
mindmap
  root((EduAssist-AI))
    Course Management
      Create Course
      Edit Course
      Delete Course
      Join Course
    Module Management
      Create Module
      Edit Module
      Delete Module
      View Module
    Resource Handling
      Upload Video
      Upload PDF/DOCX/TXT
      Rename Resource
      Delete Resource
    AI Features
      Generate Summary
      RAG Chat
      Context Selection
      Custom Prompts
    Summary Management
      View Summaries
      Edit Summary
      Publish/Unpublish
      Download PDF
      Delete Summary
    User Features
      Sign In/Up
      Profile Management
      Role-based Access
      Theme Toggle
    UI/UX
      Dark Mode
      Responsive Design
      Toast Notifications
      Loading States
      Error Handling
```

---

**Generated**: 2026-03-29  
**Version**: 2.0.2
