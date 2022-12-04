import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Грузоперевозки',
      tasks: {
        create: [
          {
            title: 'Перевезти груз на новое место',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie.',
            price: '18750',
            deadline: '2022-12-12',
            image: 'asdfsadfsadf.png',
            address: 'Санкт-Петербург, Центральный район',
            tegs: ['грузоперевозки'],
            status: 'Новое',
            userId: '6385aaacc05cd5e757d37764'
          },
        ]
      },
    }
  });
  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Переводы',
      tasks: {
        create: [
          {
            title: 'Перевести войну и мир на клингонский',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie.',
            price: '7500',
            deadline: '2022-12-22',
            image: 'asdfsadf.png',
            address: 'Санкт-Петербург, Центральный район',
            tegs: ['переводы'],
            status: 'В работе',
            userId: '6385aaacc05cd5e757d37764'
          },
        ]
      }
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
