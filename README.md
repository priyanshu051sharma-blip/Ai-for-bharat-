# 🚀 CareerSpyke - AI-Powered Career Development Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.10-38B2AC)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> An intelligent career development platform that helps students and professionals prepare for interviews, optimize resumes, and accelerate their learning journey with AI-powered tools.

**🏆 Built for AI for Bharat Hackathon | NIIT University**

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Interview Preparation
- **Mock Interviews** - Practice HR, Technical, and Management rounds with AI
- **Live Interview Analysis** - Real-time feedback on voice, body language, and content
- **Persona-Based Evaluation** - Get role-specific feedback (HR/Tech/Management)
- **Comprehensive Scoring** - Detailed scoring with improvement suggestions

### 📄 Resume Optimization
- **AI-Powered Analysis** - Upload resumes and get instant AI feedback
- **ATS Optimization** - Ensure your resume passes Applicant Tracking Systems
- **Skills Extraction** - Automatic identification of skills and gaps
- **Multi-Format Support** - PDF, DOCX, images, video, and audio resumes

### 🎓 Learning & Productivity Tools
- **Code Explainer** - Paste code and get AI-powered explanations
- **Concept Simplifier** - Break down complex technical concepts
- **Learning Path Generator** - Personalized roadmaps based on career goals
- **Multi-Language Support** - JavaScript, Python, Java, C++, Go, Rust

### 🤖 SAKHA AI Assistant
- **24/7 Career Guidance** - Chat with AI for career advice
- **Interview Tips** - Get preparation strategies and tips
- **Skill Development** - Personalized learning recommendations
- **Course Suggestions** - Tailored educational resources

### 👥 Community & Networking
- **Alumni Network** - Connect with verified alumni from top companies
- **Community Forums** - Participate in discussions and polls
- **Peer Connections** - Network with fellow students and professionals

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14.1.0 (React 18.2.0)
- **Styling:** Tailwind CSS 3.4.10
- **Icons:** Heroicons 2.0.18
- **HTTP Client:** Axios 1.13.2
- **AI SDK:** Google Generative AI 0.24.1

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.18.2
- **Database:** SQLite3 5.1.6
- **Authentication:** JWT + bcryptjs
- **OAuth:** Google Auth Library 8.8.0

### AI/ML
- **Provider:** Google Gemini AI
- **Models:** gemini-2.5-flash, gemini-1.5-flash

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ (LTS recommended)
- npm v9+
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/careerspyke.git
cd careerspyke

# Install dependencies for both frontend and backend
cd frontend
npm install

cd ../backend
npm install
```

---

## 📦 Installation

### 1. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
NEXTAUTH_SECRET=your_nextauth_secret
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
DB_NAME=careerspyke_db
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 🔐 Environment Variables

### Frontend (.env.local)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |
| `GEMINI_API_KEY` | Server-side Gemini API key | ✅ Yes |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | ⚠️ Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | ⚠️ Optional |
| `BACKEND_URL` | Backend API URL | ✅ Yes |

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | ✅ Yes |
| `JWT_SECRET` | JWT signing secret | ✅ Yes |
| `DB_NAME` | Database name | ✅ Yes |

---

## 💻 Usage

### 1. Register/Login
- Create an account or login with Google OAuth
- Access your personalized dashboard

### 2. Upload Resume
- Navigate to "Profile & Resume"
- Upload your resume (PDF/DOCX)
- Get instant AI-powered feedback

### 3. Practice Interviews
- Go to "Mock Interviews"
- Select interview type (HR/Technical/Management)
- Answer questions and receive AI evaluation

### 4. Use Learning Tools
- **Code Explainer:** Paste code for AI explanations
- **Concept Simplifier:** Learn complex topics easily
- **Learning Path:** Get personalized career roadmaps

### 5. Chat with SAKHA
- Click the chat widget (💬)
- Ask career-related questions
- Get instant AI-powered guidance

---

## 📁 Project Structure

```
careerspyke/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Dashboard page
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── code-explainer/ # Code explainer tool
│   │   ├── concept-explainer/ # Concept simplifier
│   │   ├── learning-path/  # Learning path generator
│   │   └── ...
│   ├── components/          # Reusable React components
│   ├── context/            # React Context (Auth)
│   ├── utils/              # Utility functions
│   └── public/             # Static assets
│
├── backend/                 # Express.js backend
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── schema.sql          # Database schema
│
├── REQUIREMENTS.md          # Detailed requirements
├── DESIGN.md               # Design documentation
├── TECHNOLOGY_STACK.md     # Tech stack details
├── FIXES_APPLIED.md        # Bug fixes log
└── README.md               # This file
```

---

## 📚 API Documentation

### Authentication APIs

```
POST /api/auth/login
POST /api/auth/google-signin
```

### AI-Powered APIs

```
POST /api/gemini-chat              # SAKHA AI Assistant
POST /api/resume-analysis          # Resume analysis
POST /api/mock-interview           # Mock interview evaluation
POST /api/live-interview-analysis  # Live interview feedback
POST /api/code-explainer           # Code explanation (via gemini-chat)
POST /api/concept-explainer        # Concept breakdown (via gemini-chat)
POST /api/learning-path            # Learning path generation (via gemini-chat)
```

For detailed API documentation, see [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

---

## 🎨 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Mock Interview
![Mock Interview](screenshots/interview.png)

### Code Explainer
![Code Explainer](screenshots/code-explainer.png)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues

- Resume upload limited to 10MB
- AI response time varies (2-8 seconds)
- Video analysis requires good lighting

See [FIXES_APPLIED.md](FIXES_APPLIED.md) for recent bug fixes.

---

## 🔮 Future Enhancements

- [ ] Video interview practice with webcam
- [ ] Peer-to-peer mock interviews
- [ ] Job board integration
- [ ] Certificate generation
- [ ] Mobile application (iOS/Android)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] LinkedIn integration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**CareerSpyke Development Team**  
NIIT University  
AI for Bharat Hackathon 2025

---

## 🙏 Acknowledgments

- Google Gemini AI for powering our AI features
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- NIIT University for support and guidance
- All contributors and testers

---

## 📞 Support

For issues or questions:
- Email: support@careerspyke.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/careerspyke/issues)

---

## ⭐ Star Us!

If you find this project helpful, please give it a star! ⭐

---

**Made with ❤️ by the CareerSpyke Team**
