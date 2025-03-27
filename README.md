# **DSD Cohort 2025: Dine Flow | Team Deja and Mike**

## **Table of Contents**

1. [Overview](#overview)

2. [Technologies Used](#technologies-used)

3. [Project Structure](#project-structure)

4. [Setup Instructions](#setup-instructions)

5. [Frontend](#frontend)

6. [Backend](#backend)

7. [API Endpoints](#api-endpoints)

8. [Contributors](#contributors)

9. [License](#license)

## **Overview**

Digital ticket system that tracks orders from POS to kitchen  
Real-time inventory management that automatically deducts ingredients as orders are completed  
Predictive prep recommendations based on historical order patterns (e.g., "Prep 3 extra batches of fries between 11:30-12:30")  
Menu engineering dashboard showing profitability per dish, waste metrics, and ingredient cost tracking  
Integration with supplier APIs for automatic reordering when ingredients hit threshold levels  

### Project Overview

- Digital ticket system that tracks orders from POS to kitchen
- Real-time inventory management that automatically deducts ingredients as orders are completed.
- Predictive prep recommendations based on historical order patterns.
- Menu engineering dashboard showing profitability per dish, waste metrics and ingredient cost tracking
- Integration with supplier APIs for automatic reordering when ingredients hit threshold levels.

## **Technologies Used**

- **Frontend UI**: React, Tailwind CSS, Next JS, Typescript
- **Backend**: Node.js, Express, Typescript
- **Database**: Prisma DB, PostgreSQL
- **Machine Learning / Forecasting Tools:** Python, NumPy, Pandas, Matplotlib, Statsmodels (SARIMAX), Psycopg2

## **Project Structure**

```bash
SMART-KITCHEN-MANAGEMENT/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   ├── inventoryTracker/
│   │   │   ├── menuManagement/
│   │   │   ├── orderTracking/
│   │   │   ├── pos/
│   │   │   ├── productivityMetrics/
│   │   │   ├── select-portal/
│   │   │   └── settings/
│   │   ├── components/
│   │   │   └── POS/
│   │   ├── customHooks/
│   │   ├── styles/
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── svgIcons.tsx
│   └── package.json
├── management/
│   ├── app/
│   │   ├── DB/
│   │   ├── routers/
│   │   └── server.ts
│   ├── build/
│   └── package.json
└── README.md
```

## **Setup Instructions**

1. **Clone the repository:**

```bash
git clone <repository-url>
cd project-directory
```

2. **Set up the backend:**

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

3. **Set up the frontend:**

```bash
cd frontend
npm install
npm run dev
```

4. **Database setup:**

Ensure PostgreSQL is installed and running:

- Run migrations if applicable.

## **Frontend**

The frontend is built using React (TypeScript) and styled with Tailwind CSS.

### **Key Features**

- User-friendly interface

- API integration for real-time data

### **Available Scripts**

```bash
npm run dev      # Starts the development server
npm run build    # Builds the project
```

## **Backend**

The backend is powered by **Node.js** and **Express**, written in **TypeScript**.

### Key Features

- RESTful API endpoints
- Input validation and error handling
- Environment-based configuration

### Available Scripts

```bash
npm run dev      # Starts the development server
npm run build    # Compiles TypeScript to JavaScript
npm run start    # Starts the production server
```

## **API Endpoints**

### **Menu Items**

#### GET /api/menuItems

- Fetches all menu items

### **Metrics**

#### GET /api/metrics/waste

- Fetches all waste metrics

#### GET /api/metrics/productivity

- Fetches all profit, total orders, best/worst sellers metrics

### **Orders**

#### GET /api/orders

- Fetches all orders

#### GET /api/orders/:id

- Fetches order by id

#### POST /api/orders

- Creates an order

#### PUT /api/orders/:id

- Updates an order by id

### **Stock/Inventory**

#### GET /api/stocks

- Fetches all stocks/inventory

#### GET /api/stocks/:id

- Fetch stock by id

#### POST /api/stocks

- Creates a stock

## Contributors

- Belle

  - [Github](https://github.com/bduran04)
  - [LinkedIn](https://www.linkedin.com/in/belle-duran-127760204/)

- Brandon

  - [Github](https://github.com/CodenamePianist)
  - [LinkedIn](https://www.linkedin.com/in/brandon-k-hamilton/)

- Sean

  - [Github](https://github.com/Seanpacheco)
  - [LinkedIn](https://www.linkedin.com/in/sean-michael-pacheco-ruiz/)

- Gilbert

  - [Github](https://github.com/treblig-punisher)
  - [LinkedIn](https://www.linkedin.com/in/gilbert-m-900105119/)

- Jacob

  - [Github](https://github.com/kevinmarindev)
  - [LinkedIn](https://www.linkedin.com/in/kevinj-marin/)

- Keelen

  - [Github](https://github.com/Keelen-Fisher)
  - [LinkedIn](https://www.linkedin.com/in/keelen-fisher-b63766148/)

## License

This project is licensed under the MIT License.
