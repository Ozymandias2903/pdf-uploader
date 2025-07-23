AI-Powered PDF Q&A Web App
Overview
This project is a simple yet powerful web application that allows users to upload PDF documents and ask questions about their content. The backend extracts text from PDFs and stores it in MongoDB, while the frontend offers a clean interface to interact with the document through AI-powered Q&A.

Tech Stack
Frontend: React.js, Vite, TailwindCSS

Backend: FastAPI, Python

Database: MongoDB (Atlas or local)

PDF Processing: pdfplumber

Containerization: Docker, Docker Compose

Deployment: AWS compatible (EC2, S3 for storage, etc.)

AI Integration: (Planned / To be integrated) Anthropic or OpenAI API

Features
Upload PDFs through a drag-and-drop or click interface with filename display and preview.

Extract and store PDF text securely in the backend MongoDB.

Real-time chat interface to ask questions and get answers based on uploaded PDF content.

Responsive and accessible UI using TailwindCSS.

Dockerized for easy local development and production deployment.

Getting Started
Prerequisites
Python 3.10+

Node.js 16+ and npm

Docker & Docker Compose (optional but recommended)

MongoDB Atlas account or local MongoDB server

Backend Setup
Navigate to backend folder:

bash
cd backend
Create and activate virtual environment:

bash
python -m venv venv
source venv/bin/activate      # Linux/MacOS
.\venv\Scripts\activate       # Windows
Install dependencies:

bash
pip install -r requirements.txt
Create .env file and set MongoDB connection string:

text
MONGODB_URI=your_mongodb_connection_uri
Run backend API server locally:

bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
Frontend Setup
Navigate to frontend folder:

bash
cd frontend
Install npm dependencies:

bash
npm install
Create .env file with API URL:

text
VITE_API_URL=http://localhost:8000
Run the development server:

bash
npm run dev
Open http://localhost:5173 in your browser

Using Docker (Optional)
At the project root, you can start both frontend, backend, and MongoDB services with:

bash
docker-compose up --build
Project Structure
text
/
├── backend/            # FastAPI backend source code
│   ├── app/
│   ├── venv/           # Python virtual environment (ignored)
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/           # React frontend source code
│   ├── src/
│   ├── node_modules/
│   ├── vite.config.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
Future Improvements
Integrate AI model (Anthropic, OpenAI GPT) for real-time question answering.

Add PDF content preview thumbnails with paging.

Implement chat session persistence and multi-document support.

Add user authentication and upload history management.

Optimize extraction using embeddings and semantic search.

Deploy on AWS with CI/CD pipelines.

Troubleshooting
Ensure your Python environment is activated when running backend.

MongoDB connection errors likely originate from incorrect connection URI or network issues.

For frontend issues, verify your VITE_API_URL matches backend endpoint URL.

Pylance or import errors? Check you selected the correct Python interpreter in VS Code (linked to your virtual environment).


Happy coding! 🚀