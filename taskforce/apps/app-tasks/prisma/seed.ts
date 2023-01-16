import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.task.create({
    data: {
      title: 'Перевезти груз на новое место',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie.',
      category: 'Грузоперевозки',
      price: 18750,
      deadline: '2022-12-12',
      image: 'asdfsadfsadf.png',
      address: 'Санкт-Петербург, Центральный район',
      tags: ['грузоперевозки'],
      status: 'New',
      customerId: '6385aaacc05cd5e757d37764',
      contractorId: '1234aaacc05cd5e757d37764',
      respondedUsers: ['1234aaacc05cd5e757d37764', '5678aaacc05cd5e757d37764']
    },
  });
  await prisma.task.create({
    data:
      {
        title: 'Перевести войну и мир на клингонский',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie.',
        category: 'Переводы',
        price: 7500,
        deadline: '2022-12-22',
        image: 'asdfsadf.png',
        address: 'Санкт-Петербург, Центральный район',
        tags: ['переводы'],
        status: 'AtWork',
        customerId: '6385aaacc05cd5e757d37764',
        contractorId: '1234aaacc05cd5e757d37764',
        respondedUsers: ['1234aaacc05cd5e757d37764', '5678aaacc05cd5e757d37764']
      },
  });
  await prisma.task.create({
    data:
      {
        title: 'Перевести войну и мир на клингонский',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie.',
        category: 'Переводы',
        price: 7500,
        deadline: '2022-12-22',
        image: 'asdfsadf.png',
        address: 'Санкт-Петербург, Центральный район',
        tags: ['переводы'],
        status: 'Completed',
        customerId: '6385aaacc05cd5e757d37764',
        contractorId: '5678aaacc05cd5e757d37764',
        respondedUsers: ['1234aaacc05cd5e757d37764', '5678aaacc05cd5e757d37764']
      },
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
