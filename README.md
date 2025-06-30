# Hewar Prototype

A bilingual AI assistant for doctors that captures and transcribes patient-doctor conversations (in Arabic + English mix), identifies key clinical data, highlights missing information, and generates structured summaries for EMR integration.

## Project Overview

This prototype demonstrates the key features of the Hewar application as described in the brief:

- Mixed Arabic/English conversation transcription
- Real-time recording interface
- Missing information alerts
- SOAP note generation
- ICD-10 code suggestions
- EMR integration simulation

## Technology Stack

- **Frontend**: React with Material UI
- **Backend**: Flask
- **Languages**: JavaScript (React) and Python (Flask)

## Setup Instructions

### Backend Setup

1. Make sure you have Python installed (Python 3.8+ recommended)
2. Navigate to the project root directory
3. Install required Python packages:
```
pip install -r requirements.txt
```
4. Run the Flask server:
```
python app.py
```
The Flask server will start at http://localhost:5000

### Frontend Setup

1. Make sure you have Node.js installed (Node.js 14+ recommended)
2. Navigate to the frontend directory:
```
cd frontend
```
3. Install required dependencies:
```
npm install
```
4. Start the React development server:
```
npm start
```
The React application will start at http://localhost:3000

## Features & Workflows

### Main User Flow

1. **Login Screen**: Enter credentials (demo mode: no actual authentication)
2. **Dashboard**: View existing consultations or start a new one
3. **Consultation Recording**: Record patient-doctor conversations
4. **Transcript Review**: Review the transcribed conversation with highlighted key clinical data
5. **Missing Information Alert**: Get reminders about missing critical information
6. **Summary Generation**: Review and edit AI-generated SOAP notes
7. **ICD-10 Suggestions**: Select appropriate diagnostic codes
8. **EMR Integration**: Save the final note to an EMR system

## Demo Credentials

- **Email**: dr.huda@hewar.ai
- **Password**: password123

## Notes

- This is a prototype with simulated data and functionality
- The application supports both Arabic and English text display
- For the best experience, use a modern browser like Chrome or Firefox
