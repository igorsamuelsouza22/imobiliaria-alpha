import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
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

app.post('/api/imgproxy/sign', (req, res) => {
  try {
    const { imageUrl, width = 0, height = 0, quality = 80, format = 'webp', resizingType = 'fill' } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl é obrigatório.' });

    const KEY = process.env.IMGPROXY_KEY;
    const SALT = process.env.IMGPROXY_SALT;
    const BASE_URL = process.env.IMGPROXY_URL;

    if (!KEY || !SALT || !BASE_URL) {
      return res.json({ url: imageUrl });
    }

    const encodedUrl = Buffer.from(imageUrl).toString('base64url');
    const path = `/rs:${resizingType}:${width}:${height}:0/g:ce/q:${quality}/f:${format}/${encodedUrl}`;

    const hmac = crypto.createHmac('sha256', Buffer.from(KEY, 'hex'));
    hmac.update(Buffer.from(SALT, 'hex'));
    hmac.update(path);
    const signature = hmac.digest('base64url');

    res.json({ url: `${BASE_URL.replace(/\/$/, '')}/${signature}${path}` });
  } catch {
    res.status(500).json({ error: 'Erro ao assinar imagem.' });
  }
});

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

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  startErpSync();
});
