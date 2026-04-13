import cors from 'cors';
import express from 'express';

const app = express();
const port = Number(process.env.PORT ?? 8787);

app.use(
  cors({
    origin: true
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'site-drop-api',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/demo', (_req, res) => {
  res.json({
    service: 'site-drop-api',
    status: 'online',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    message: 'API ready'
  });
});

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});
