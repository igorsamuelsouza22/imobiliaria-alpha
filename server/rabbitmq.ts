import amqp from 'amqplib';
import { prisma } from './prisma';

const QUEUE_NAME = 'vitrine_webhooks';

export async function startRabbitMQConsumer() {
  const RABBITMQ_URL = process.env.RABBITMQ_URL;
  if (!RABBITMQ_URL) {
    console.error('❌ [RabbitMQ] RABBITMQ_URL não configurada no .env');
    return;
  }
  try {
    const conn = await amqp.connect(RABBITMQ_URL, { heartbeat: 30, timeout: 30000 });
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.prefetch(10);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (!msg) return;

      try {
        const payload = JSON.parse(msg.content.toString());
        const { action, data } = payload;

        console.log(`[RabbitMQ] Mensagem recebida: action=${action}, crmId=${data?.code || data?.id}`);
        console.log(`[RabbitMQ] roomImages presente: ${data?.roomImages ? 'SIM' : 'NÃO'}`);
        if (data?.roomImages) {
          console.log(`[RabbitMQ] roomImages: ${JSON.stringify(data.roomImages)}`);
        }
        console.log(`[RabbitMQ] images count: ${Array.isArray(data?.images) ? data.images.length : 0}`);
        console.log(`[RabbitMQ] features count: ${Array.isArray(data?.features) ? data.features.length : 0}`);

        if (action === 'created' || action === 'updated') {
          await upsertProperty(data);
          channel.ack(msg);
        } else if (action === 'deleted') {
          await deleteProperty(data);
          channel.ack(msg);
        } else {
          channel.ack(msg);
        }
      } catch (err) {
        console.error('[RabbitMQ] Erro ao processar mensagem:', err);
        channel.nack(msg, false, false);
      }
    });

    console.log('✅ [RabbitMQ] Consumer conectado. Escutando fila:', QUEUE_NAME);

    conn.on('close', () => {
      console.error('❌ [RabbitMQ] Conexão perdida. Reconectando em 5s...');
      setTimeout(startRabbitMQConsumer, 5000);
    });

    conn.on('error', (err) => {
      console.error('❌ [RabbitMQ] Erro na conexão:', err);
    });
  } catch (err) {
    console.error('❌ [RabbitMQ] Erro ao conectar consumer. Tentando em 5s...', err);
    setTimeout(startRabbitMQConsumer, 5000);
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

  console.log(`[RabbitMQ] Property upserted: crmId=${crmId}, roomImages=${roomImages ? JSON.stringify(roomImages) : 'null'}, images=${images.length}, features=${features ? JSON.stringify(features) : 'null'}`);
}

async function deleteProperty(data: Record<string, unknown>) {
  const crmId = (data.code as string) || (data.id as string);
  if (!crmId) return;

  try {
    await prisma.property.delete({ where: { crmId } });
    console.log(`[RabbitMQ] Property deleted: crmId=${crmId}`);
  } catch {
    console.log(`[RabbitMQ] Property not found for deletion: crmId=${crmId}`);
  }
}
