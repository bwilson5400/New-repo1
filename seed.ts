import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed admin
  const admin = await prisma.user.upsert({
    where: { email: "brayden720@icloud.com" },
    update: { password: "$2b$10$Cia9f6VlXZYxJ4BB30RnL.lhIvz/VQOWKEo5cyDZoLwc.RrE7n3YC" },
    create: { email: "brayden720@icloud.com", password: "$2b$10$Cia9f6VlXZYxJ4BB30RnL.lhIvz/VQOWKEo5cyDZoLwc.RrE7n3YC", name: "Brayden", role: "admin" }
  });

  // Seed a client + site
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: { email: "client@example.com", password: "$2b$10$Cia9f6VlXZYxJ4BB30RnL.lhIvz/VQOWKEo5cyDZoLwc.RrE7n3YC", name: "Client One", role: "client" }
  });
  const site = await prisma.site.upsert({
    where: { subdomain: "bellaspa" },
    update: {},
    create: { name: "Bella Spa", subdomain: "bellaspa", ownerId: client.id }
  });

  // Seed promotions
  await prisma.promotion.createMany({
    data: [
      { name: "14-Day Free Trial", code: "TRIAL14", type: "TRIAL", scope: "SUBSCRIPTION", stackGroup: "trial", priority: 1, durationDays: 14, combinable: true, autoApply: false, active: true },
      { name: "Waive Setup Fee", code: "NOSETUP", type: "ONE_TIME_DISCOUNT", scope: "SETUP_FEE", stackGroup: "setup", priority: 1, amountCents: 9999, combinable: true, autoApply: false, active: true }
    ]
  });

  // Seed simple store product
  const p = await prisma.product.create({
    data: {
      siteId: site.id, title: "Lavender Lotion", slug: "lavender-lotion",
      description: "Soothing lotion 250ml", images: [], category: "Beauty", tags: ["spa","lotion"], visible: true
    }
  });
  await prisma.productVariant.create({
    data: { productId: p.id, sku: "LL-250", optionsJson: {}, priceCents: 1299, stockQty: 20 }
  });

  console.log("Seed complete");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
