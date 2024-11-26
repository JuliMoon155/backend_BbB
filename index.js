const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL;

// Configuración de CORS
const corsOptions = {
    origin: 'https://ladrilloaladrillo-production.up.railway.app',  // Asegúrate de que esta URL sea la correcta
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Permitir el uso de cookies o credenciales
  };

app.use(cors(corsOptions));

const pool = new Pool({
    connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false, 
  },
  });


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  