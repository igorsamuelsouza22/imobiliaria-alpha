import { prisma } from './prisma';

const DEFAULT_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export function startErpSync() {
  const url = process.env.ERP_SYNC_URL;
  if (!url) {
    console.error('❌ [ErpSync] ERP_SYNC_URL não configurada no .env — sincronização desativada.');
    return;
  }
  const intervalMs = Number(process.env.ERP_SYNC_INTERVAL_MS) || DEFAULT_INTERVAL_MS;

  const run = () => syncOnce(url);
  run();
  setInterval(run, intervalMs);
  console.log(`✅ [ErpSync] Sincronização ativa a cada ${Math.round(intervalMs / 1000)}s.`);
}

async function syncOnce(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ [ErpSync] Feed retornou HTTP ${res.status}`);
      return;
    }
    const payload = await res.json();
    const items: Record<string, unknown>[] = Array.isArray(payload?.properties) ? payload.properties : [];

    const seenCrmIds = new Set<string>();
    for (const item of items) {
      const crmId = (item.code as string) || (item.id as string);
      if (!crmId) continue;
      seenCrmIds.add(crmId);
      await upsertProperty(item);
    }

    // Reconciliation: anything not in this snapshot got unpublished/deleted
    // on the ERP side since the last poll — remove it here too. This is what
    // makes polling self-correcting without needing an explicit "deleted"
    // event (unlike the old RabbitMQ consumer, which only deleted on an
    // explicit action='deleted' message).
    const existing = await prisma.property.findMany({ select: { crmId: true } });
    const staleCrmIds = existing.map((p) => p.crmId).filter((id) => !seenCrmIds.has(id));
    if (staleCrmIds.length > 0) {
      await prisma.property.deleteMany({ where: { crmId: { in: staleCrmIds } } });
      console.log(`[ErpSync] Removidos ${staleCrmIds.length} imóvel(is) não mais publicados.`);
    }

    console.log(`[ErpSync] Sincronizado: ${seenCrmIds.size} imóvel(is) ativo(s).`);
  } catch (err) {
    console.error('❌ [ErpSync] Erro ao sincronizar:', err);
  }
}

async function upsertProperty(data: Record<string, unknown>) {
  const crmId = (data.code as string) || (data.id as string);
  if (!crmId) return;

  const images = Array.isArray(data.images) ? data.images : [];
  const features = Array.isArray(data.features) ? data.features : null;
  const roomImages = Array.isArray(data.roomImages) ? data.roomImages : null;

  const statusMap: Record<string, string> = {
    ACTIVE: 'active',
    PENDING: 'pending',
    SOLD: 'inactive',
    INACTIVE: 'inactive',
    Ativo: 'active',
    Pendente: 'pending',
  };

  const status = statusMap[data.status as string] || 'active';

  const coverImage = (data.coverImage as string) || null;

  const commonData = {
    title: data.title as string,
    description: data.description as string | null,
    type: (data.propertyType as string) || (data.type as string) || 'house',
    status,
    price: data.salePrice ? Number(data.salePrice) : (data.rentPrice ? Number(data.rentPrice) : null),
    area: data.area ? Number(data.area) : null,
    bedrooms: data.beds ? Number(data.beds) : null,
    bathrooms: data.baths ? Number(data.baths) : null,
    parkingSpaces: data.parkingSpaces ? Number(data.parkingSpaces) : null,
    address: (data.address as string) || null,
    city: (data.city as string) || null,
    state: (data.state as string) || null,
    zipCode: (data.zipcode as string) || null,
    latitude: data.lat ? Number(data.lat) : null,
    longitude: data.lng ? Number(data.lng) : null,
    images: images as string[],
    coverImage,
    roomImages,
    features,
  };

  await prisma.property.upsert({
    where: { crmId },
    update: commonData,
    create: {
      crmId,
      title: commonData.title || 'Sem título',
      description: commonData.description || '',
      type: commonData.type,
      status: commonData.status,
      price: commonData.price,
      area: commonData.area,
      bedrooms: commonData.bedrooms,
      bathrooms: commonData.bathrooms,
      parkingSpaces: commonData.parkingSpaces,
      address: commonData.address,
      city: commonData.city,
      state: commonData.state,
      zipCode: commonData.zipCode,
      latitude: commonData.latitude,
      longitude: commonData.longitude,
      images: commonData.images,
      coverImage: commonData.coverImage,
      roomImages: commonData.roomImages,
      features: commonData.features,
    },
  });
}
