# 🎓 EduAssist-AI

> **Your Intelligent Educational Companion for Smarter Learning**

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-brightgreen?style=for-the-badge)](https://pritesh24gurjar.github.io/EduAssist-AI-FE/)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.8-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Try It Now

### 👉 [**🚀 Launch Live Demo**](https://pritesh24gurjar.github.io/EduAssist-AI-FE/)

Experience the future of educational technology right in your browser!

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**EduAssist-AI** is a cutting-edge educational platform that leverages artificial intelligence to transform how students and educators interact with learning content. Built with modern web technologies, it provides an intuitive interface for uploading, organizing, and intelligently summarizing educational videos and documents.

Whether you're a faculty member organizing course materials or a student seeking quick comprehension of complex topics, EduAssist-AI delivers personalized, AI-powered insights that make learning more efficient and engaging.

---

## ✨ Key Features

### 📚 Course & Module Management
- **Create and organize** courses with structured modules
- **Intuitive card-based interface** for easy navigation
- **Real-time search** and filtering capabilities
- **Role-based access** for faculty and students

### 📤 Smart Resource Upload
- **Multi-format support**: PDF, DOCX, TXT, and Video files
- **Drag-and-drop** upload interface
- **Automatic processing** with status tracking
- **Cloud storage integration** ready

### 🤖 AI-Powered Summarization
- **Customizable summary length**: Brief, Detailed, or Comprehensive
- **Focus area targeting** for specific learning objectives
- **Custom prompts** for tailored output
- **One-click generation** with real-time progress

### 💬 Intelligent RAG Chat
- **Context-aware conversations** trained on your course content
- **Resource selection** for targeted Q&A
- **Persistent chat history** for each module
- **Real-time responses** with typing indicators

### 📝 Summary Management
- **Centralized dashboard** for all summaries
- **Publish/Unpublish** controls
- **Download as PDF** for offline reading
- **Version tracking** and editing capabilities

### 🎨 Modern User Experience
- **Dark/Light theme** with seamless toggle
- **Fully responsive** design for all devices
- **Toast notifications** for instant feedback
- **Smooth animations** and transitions
- **Collapsible sidebars** for focused viewing

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Latest React with modern hooks
- **TypeScript 5.7** - Full type safety
- **Vite 6.1** - Lightning-fast build tool

### State Management
- **Redux Toolkit** - Global state management
- **React Context** - Theme and sidebar state

### Styling & UI
- **TailwindCSS 4.0** - Utility-first CSS framework
- **Custom Components** - Reusable UI library
- **Responsive Design** - Mobile-first approach

### Routing & Navigation
- **React Router 7** - Client-side routing
- **Protected Routes** - Authentication guards

### API & Data
- **Axios** - HTTP client with interceptors
- **Full TypeScript Types** - API response typing

### Libraries & Tools
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **Flatpickr** - Date picker
- **ApexCharts** - Data visualization
- **FullCalendar** - Calendar integration

---

## 📸 Screenshots

> *Visual tour of EduAssist-AI's intuitive interface*

### Dashboard - Course Overview
```
┌─────────────────────────────────────────────────────────┐
│  🎓 My Courses                              [🔍 Search] │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │   📘 C1  │  │   📘 C2  │  │   📘 C3  │  │   📘 C4  ││
│  │ Course 1 │  │ Course 2 │  │ Course 3 │  │ Course 4 ││
│  │ [View]   │  │ [View]   │  │ [View]   │  │ [View]   ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│                                              [+] Create] │
└─────────────────────────────────────────────────────────┘
```

### Module Detail - 3-Column View
```
┌─────────────┬──────────────────────┬─────────────────┐
│  Resources  │   🤖 Module Chat     │    Features     │
├─────────────┤                      ├─────────────────┤
│ [📄 Upload] │  User: Question?     │  [💬 Chat]      │
│             │  AI: Answer...       │  [📝 Notes]     │
│ 📄 PDF 1    │  User: Follow-up     │  [📋 Summaries] │
│ 📄 DOCX 2   │  ⏳ Typing...        │  [📁 Resources] │
│ 🎥 Video 3  │                      │                 │
└─────────────┴──────────────────────┴─────────────────┘
```

### AI Summary Generation
```
┌──────────────────────────────────────────────────────┐
│  Generate Resource Summary                           │
├──────────────────────────────────────────────────────┤
│  Length: [Detailed ▼]                                │
│  Focus: [algorithms, applications]                   │
│  Custom: [Optional prompt...]                        │
│                                                      │
│           [⚡ Generate Summary]                       │
└──────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pritesh24gurjar/EduAssist-AI-FE.git
   cd EduAssist-AI-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=https://your-api-endpoint.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

---

## 📖 Usage Guide

### For Educators

1. **Create a Course**
   - Click the **+** button on the dashboard
   - Enter course name and description
   - Save to create your course

2. **Add Modules**
   - Navigate to your course
   - Click **+** to create modules
   - Organize content by topics

3. **Upload Resources**
   - Open a module
   - Click **Upload Resource**
   - Select files (PDF, DOCX, TXT, Video)
   - Add titles and upload

4. **Generate Summaries**
   - Go to module detail
   - Select **Summary Notes** or **Module Summaries**
   - Configure length and focus areas
   - Click **Generate Summary**

5. **Enable AI Chat**
   - Select relevant resources
   - Students can ask questions
   - AI responds based on selected content

### For Students

1. **Join a Course**
   - Use the invitation code provided by faculty
   - Access course materials

2. **Study with AI**
   - Open module chat
   - Select resources for context
   - Ask questions and get instant answers

3. **Review Summaries**
   - Access AI-generated summaries
   - Download for offline study
   - Focus on key concepts

---

## 📁 Project Structure

```
EduAssist-AI-FE/
├── src/
│   ├── api/                    # API layer
│   │   ├── axios.ts           # Axios configuration
│   │   └── modules.ts         # Module API functions
│   ├── components/             # Reusable components
│   │   ├── auth/              # Authentication forms
│   │   ├── CourseManagement/  # Course & module components
│   │   ├── ResourceSummary/   # Summary generation
│   │   ├── SummaryManagement/ # Summary list & management
│   │   ├── ui/                # Base UI components
│   │   ├── form/              # Form components
│   │   ├── header/            # Header components
│   │   └── common/            # Common utilities
│   ├── context/                # React Context providers
│   │   ├── ThemeContext.tsx   # Dark/Light theme
│   │   └── SidebarContext.tsx # Sidebar state
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.ts         # Authentication hook
│   │   ├── useModal.ts        # Modal management
│   │   └── useGoBack.ts       # Navigation helper
│   ├── layout/                 # Layout components
│   │   ├── AppLayout.tsx      # Main layout
│   │   ├── AppSidebar.tsx     # Navigation sidebar
│   │   └── AppHeader.tsx      # Top header
│   ├── pages/                  # Page components
│   │   ├── Dashboard/         # Dashboard pages
│   │   ├── AuthPages/         # Sign In/Up
│   │   └── UiElements/        # UI demos
│   ├── store/                  # Redux store
│   │   ├── store.ts           # Store configuration
│   │   └── authSlice.ts       # Auth state
│   └── utils/                  # Utility functions
├── public/                     # Static assets
├── .env                        # Environment variables
├── package.json                # Dependencies
└── vite.config.ts              # Vite configuration
```

---

## 🔌 API Integration

### Authentication
```typescript
POST /auth/login
{
  "email": "user@example.com",
  "password": "********"
}

Response: { "access_token": "jwt_token_here" }
```

### Courses
```typescript
GET  /api/v1/courses/           // List all courses
POST /api/v1/courses/           // Create course
GET  /api/v1/courses/:id        // Get course details
PUT  /api/v1/courses/:id        // Update course
DELETE /api/v1/courses/:id      // Delete course
```

### Modules
```typescript
GET  /api/v1/courses/:id/modules     // List modules
POST /api/v1/modules/                // Create module
GET  /api/v1/modules/:id             // Get module details
PUT  /api/v1/modules/:id             // Update module
DELETE /api/v1/modules/:id           // Delete module
```

### Resources & Summaries
```typescript
POST /api/v1/courses/modules/:id/resources-sync  // Upload resource
GET  /api/v1/resources/:id/resources-with-summaries  // Get with summaries
POST /api/v1/resources/:id/summaries    // Generate summary
PATCH /api/v1/summaries/:id/publish     // Toggle publish
GET  /api/v1/summaries/:id              // Get summary
DELETE /api/v1/summaries/:id            // Delete summary
```

### AI Chat (RAG)
```typescript
POST /api/v1/modules/:id/chat
{
  "message": "What is machine learning?",
  "resource_ids": ["id1", "id2"]
}

Response: { "response": "AI-generated answer..." }
```

---

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Adding New Components

1. Create component in `src/components/`
2. Export from index file
3. Import and use in pages

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 📦 Deployment

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the production bundle
2. Copy 404.html for SPA routing
3. Deploy to `gh-pages` branch

### Deploy to Vercel/Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- **TailAdmin** - Base admin template
- **React Community** - Amazing framework
- **All Contributors** - Your support makes this possible

---

## 📞 Support

For questions, issues, or feature requests:

- **Create an Issue** on GitHub
- **Contact**: [Project Maintainer](mailto:pritesh.gurjar2018@gmail.com)

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| 🚀 Live Demo | [Launch App](https://pritesh24gurjar.github.io/EduAssist-AI-FE/) |
| 📚 Codebase Documentation | [View Codebase](./CODEBASE.md) |
| 🏗️ Architecture | [View Architecture](./ARCHITECTURE.md) |
| 📖 User Guide | [Read Guide](./USER_GUIDE.md) |
| 🚀 Deployment Guide | [Deploy App](./DEPLOYMENT.md) |
| 📄 Design Specification | [View Design](./docs/DESIGN_SPECIFICATION.pdf) |
| 📊 Project Portfolio | [View Portfolio](./docs/PROJECT_PORTFOLIO.pdf) |
| 🐛 Report Bug | [GitHub Issues](https://github.com/pritesh24gurjar/EduAssist-AI-FE/issues) |

---

<div align="center">

### 🌟 Ready to Transform Your Learning Experience?

## [🚀 Launch Live Demo](https://pritesh24gurjar.github.io/EduAssist-AI-FE/)

**Made with ❤️ by the EduAssist-AI Team**

[![TypeScript](https://img.shields.io/badge/-TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-blue?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-teal?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>
