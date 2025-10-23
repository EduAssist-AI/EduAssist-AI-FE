# EduAssist-AI

EduAssist-AI is an AI-powered educational platform designed to transform how students learn from educational videos. The platform provides tools for processing videos, generating smart summaries, creating interactive Q&A systems, and generating personalized quizzes to enhance the learning experience.

## 🚀 Features

### Core Features
- **Video Processing**: Upload educational videos and our AI processes them to extract key information, generate transcripts, and identify important segments
- **Smart Summaries**: Get concise, well-structured notes that capture the essence of video content, making it easier to review and understand
- **RAG System**: Interact with video content through our Retrieval-Augmented Generation system that answers questions based on detailed notes and transcripts  
- **Quiz Generator**: Automatically generate quizzes from videos to test knowledge and reinforce learning with AI-generated questions
- **Classroom Management**: Create and manage classrooms to organize videos and track learning progress across different subjects or courses
- **Personalized Learning**: Get personalized recommendations and insights based on learning patterns and quiz performance

### Technical Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: AWS Cognito & Better Auth
- **UI Components**: Custom component library with reusable UI elements
- **Architecture**: Next.js App Router with protected and public route groups

### Application Structure
The application follows a modern Next.js architecture with:
- `(auth)` - Authentication-related routes (login, register, forgot password)
- `(protected)` - Protected routes requiring authentication (dashboard, classroom management)
- API routes for backend functionality
- Component library with reusable UI elements
- Comprehensive type definitions and configuration files

## 📁 Project Structure
```
eduai-fe/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/       # Authentication routes
│   │   ├── (protected)/  # Protected routes
│   │   └── api/          # API routes
│   ├── components/       # Reusable UI components
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and libraries
│   ├── services/         # API services and integrations
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
```

## 🛠️ How It Works

1. **Create Classroom**: Start by creating a classroom for your course, subject, or learning group
2. **Upload Videos**: Upload educational videos to the classroom - AI processes each video automatically
3. **Learn & Interact**: Access AI-generated summaries, engage with the RAG system, and take quizzes

## 📊 Current Work Done

- **Frontend Application**: Complete Next.js 16 frontend with modern React and TypeScript
- **Authentication System**: Implementation with AWS Cognito and Better Auth
- **UI/UX Design**: Responsive design with Tailwind CSS and custom component library
- **Homepage**: Landing page with hero section, features showcase, and how-it-works section
- **Route Structure**: Organized route groups for authentication and protected content
- **Component Architecture**: Modular component system with reusable UI elements
- **API Integration Ready**: Structured for backend API integration
- **Type Safety**: Comprehensive TypeScript type definitions
- **Dashboard Components**: Ready-made components for classroom management and learning tools
- **Video Processing UI**: Components designed for video upload and processing workflows

## 🚧 Future Work

### Core Features
- **Backend API Development**: Implement server-side functionality for video processing, authentication, and data management
- **AI Integration**: Connect to AI services for video analysis, summarization, and quiz generation
- **Database Integration**: Set up database schema for user accounts, classrooms, videos, and learning data
- **Video Processing Pipeline**: Implement video upload, storage, and processing workflows
- **Real-time Features**: Add progress tracking, notifications, and collaborative features

### Enhancements
- **Advanced RAG Implementation**: Complete the Retrieval-Augmented Generation system for interactive Q&A
- **Quiz Engine**: Develop comprehensive quiz generation and grading system
- **Performance Analytics**: Add learning analytics and progress tracking
- **Mobile Responsiveness**: Optimize UI for all device sizes
- **Accessibility**: Implement WCAG compliance features
- **Internationalization**: Add multi-language support

### Additional Features
- **Note-Taking Tools**: Advanced note-taking and annotation features
- **Collaboration Tools**: Student collaboration and discussion features
- **Progress Reports**: Detailed learning progress and analytics reports
- **Content Import**: Import from various video platforms and educational resources
- **Offline Access**: Caching and offline access to study materials
- **Gamification**: Add badges, achievements, and learning streaks
- **Integration APIs**: Connect with LMS platforms like Canvas, Blackboard, etc.

### Technical Improvements
- **Testing Framework**: Implement comprehensive unit, integration, and e2e testing
- **CI/CD Pipeline**: Set up continuous integration and deployment processes
- **Performance Optimization**: Optimize loading times and resource usage
- **Security Enhancements**: Implement advanced security measures and data protection
- **Monitoring**: Add application monitoring and error tracking
- **Caching Strategy**: Implement efficient caching for better performance
