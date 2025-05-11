const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const services = {
  'pdf': 'http://pdf-processor.internal.happymushroom-aa9a5f31.eastus2.azurecontainerapps.io:3000/ping',
  'ips': 'http://ips-adapter.internal.happymushroom-aa9a5f31.eastus2.azurecontainerapps.io:3000/ping',
  'afp': 'http://afp-adapter.internal.happymushroom-aa9a5f31.eastus2.azurecontainerapps.io:3000/ping',
  'ci': 'http://ci-adapter.internal.happymushroom-aa9a5f31.eastus2.azurecontainerapps.io:3000/ping'
};

// ✅ Ruta múltiple (all) — DEBE IR ANTES
app.get('/test/all', async (req, res) => {
  const results = {};

  await Promise.all(Object.entries(services).map(async ([key, url]) => {
    try {
      const response = await axios.get(url);
      results[key] = `✅ ${response.data}`;
    } catch (err) {
      results[key] = `❌ Error: ${err.message}`;
    }
  }));

  res.json(results);
});

// Ruta individual
app.get('/test/:service', async (req, res) => {
  const serviceUrl = services[req.params.service];
  if (!serviceUrl) {
    return res.status(404).send('Unknown service');
  }

  try {
    const response = await axios.get(serviceUrl);
    res.send(`✅ ${req.params.service}: ${response.data}`);
  } catch (err) {
    res.status(500).send(`❌ Failed to reach ${req.params.service}: ${err.message}`);
  }
});

// Ruta base
app.get('/', (req, res) => {
  res.send('BFF en ejecución');
});

app.listen(port, () => {
  console.log(`Servidor BFF escuchando en http://localhost:${port}`);
});

