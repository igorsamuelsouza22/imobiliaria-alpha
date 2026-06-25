import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
async function main() {
  const prop = await p.property.findFirst({ select: { id: true, crmId: true, images: true, roomImages: true, features: true } });
  console.log(JSON.stringify(prop, null, 2));
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); });
