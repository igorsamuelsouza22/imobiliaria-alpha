import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { prisma } from './prisma';
import { startErpSync } from './erp-sync';

dotenv.config({ path: 'server/.env' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.15.59:5173', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get('/properties', async (_req, res) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(properties);
  } catch (err) {
    console.error('Erro ao buscar imóveis:', err);
    res.status(500).json({ error: 'Erro ao buscar imóveis.' });
  }
});

app.get('/properties/:id', async (req, res) => {
  try {
    const property = await prisma.property.findFirst({
      where: {
        OR: [
          { id: req.params.id },
          { crmId: req.params.id },
        ],
      },
    });
    if (!property) return res.status(404).json({ error: 'Imóvel não encontrado.' });
    res.json(property);
  } catch (err) {
    console.error('Erro ao buscar imóvel:', err);
    res.status(500).json({ error: 'Erro ao buscar imóvel.' });
  }
});

app.delete('/properties/:id', async (req, res) => {
  try {
    await prisma.property.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao deletar imóvel:', err);
    res.status(500).json({ error: 'Erro ao deletar imóvel.' });
  }
});

app.get('/site-settings', async (_req, res) => {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { singleton: 1 } });
    res.json(settings ?? null);
  } catch (err) {
    console.error('Erro ao buscar configurações do site:', err);
    res.status(500).json({ error: 'Erro ao buscar configurações do site.' });
  }
});

// Production serves the built frontend (dist/, from `npm run build`) from
// this same process/container — Dokploy deploys one Dockerfile, so there's
// no separate static host. Dev keeps using the Vite dev server on :5173
// instead, so this only runs when actually deployed as a built image.
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  startErpSync();
});
