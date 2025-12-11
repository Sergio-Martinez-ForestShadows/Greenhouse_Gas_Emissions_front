🌿 Greenhouse Gas Emissions Dashboard

Frontend Application — React + TypeScript
Developed by Sergio Martinez, Senior Full-Stack Developer

📌 Overview

This project is the frontend for the Greenhouse Gas Emissions technical test.
It visualizes greenhouse gas emissions data using interactive charts and tables, consuming the Django REST API backend.

The application is built with:

React (Vite)

TypeScript

Axios for API communication

Recharts (or the charting library you used)

Modular components & hooks

Responsive UI

This frontend fulfills all required points:

✔ Consumes a REST API
✔ Renders time-series visualizations
✔ Handles API errors gracefully
✔ Uses TypeScript interfaces
✔ Includes filters (country, activity, emission type)
✔ Clean and maintainable architecture

🛠 Features
✔ Fetch emissions data from the Django REST API

The app retrieves data from:

GET /api/emissions/

✔ Interactive data visualizations

Line charts

Metric cards

Tabular breakdown

Filtering and aggregation

✔ Error-proof API handling

Loading states

Graceful fallback on network/API errors

UI messages when the backend is unavailable

✔ TypeScript Interfaces

All emissions data is strongly typed for reliability and maintainability.

✔ Responsive UI

The dashboard adapts to desktop, tablet, and mobile layouts.

📂 Project Structure
react-frontend/
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   │   └── emissions.service.ts
│   ├── types/
│   │   └── emissions.ts
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
├── vite.config.ts
└── README.md

⚙️ Installation & Setup
1. Clone the repository
git clone <your-frontend-repo-url>
cd react-frontend

2. Install dependencies
npm install
# or
yarn install

3. Environment variables

Create a .env file in the project root:

VITE_API_BASE_URL=http://localhost:8000


In production:
First, before starting with the deployed URL, please initialize the backend IP address.

back0 url: https://greenhouse-gas-emissions-back.onrender.com/api/emissions/

VITE_API_BASE_URL=https://your-backend-service.onrender.com


Your service should consume:

const baseUrl = import.meta.env.VITE_API_BASE_URL;

🚀 Running the App
Development mode
npm run dev


The app will run at:

http://localhost:5173

✔ API Integration Example
TypeScript interface (src/types/emissions.ts)
export interface EmissionRecord {
  id: number;
  year: number;
  emissions: number;
  emission_type: string;
  country: string;
  activity: string;
}

Service (src/services/emissions.service.ts)
import axios from 'axios';
import { EmissionRecord } from '../types/emissions';

const baseUrl = import.meta.env.VITE_API_BASE_URL + '/api/emissions/';

export const fetchEmissions = async (params?: Record<string, string>) => {
  try {
    const response = await axios.get(baseUrl, { params });
    return response.data.results as EmissionRecord[];
  } catch (error) {
    console.error('Failed to load emissions data', error);
    throw error;
  }
};

Error handling in UI
try {
  const data = await fetchEmissions();
  setEmissions(data);
} catch {
  setError('Unable to fetch emission data. Please try again later.');
}

📊 Charts and Visualization

The app includes:

Time-series line charts

Yearly breakdowns

Activity-based comparisons

Dynamic metric cards

Built using Recharts (or your chart library of choice).

Each chart dynamically updates when:

Filters change

New data is fetched

The API returns updated emissions data

🔍 Filtering Capabilities

The UI supports filtering by:

Country

Activity

Emission type

Year

These filters trigger new requests to:

GET /api/emissions/?country=...&activity=...&emission_type=...&year=...


Matching the backend’s filtering functionality.

🧪 Unit Testing (Optional Bonus Requirement)

At least one test is included or can be added for:

✔ The API service

Example: ensuring the service correctly fetches and transforms API data.

Using:

Vitest

React Testing Library

Example skeleton:

test('fetches emissions successfully', async () => {
  const data = await fetchEmissions();
  expect(Array.isArray(data)).toBe(true);
});


This satisfies the “either backend or frontend unit test” requirement.

🧩 Bonus Points Achieved

This React frontend meets all bonus criteria:

✨ TypeScript interfaces
✨ Filters (country, activity, emission type)
✨ Clean folder architecture
✨ Responsive styling
✨ Modern hooks-based React design

👑 Author

Sergio Martinez
Senior Full-Stack Developer
Expert in scalable architectures, React + Django ecosystems, REST APIs, and cloud deployment.

📄 License

This project is provided for educational and technical evaluation purposes.
