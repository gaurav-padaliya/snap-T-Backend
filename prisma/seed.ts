import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The menu data to insert
export const menuData = [
  {
    id: '0',
    name: 'System Management',
    depth: 1,
    parent: null,
    children: [
      {
        id: '1',
        name: 'System Management',
        depth: 1,
        parent: null,
        children: [
          {
            id: '2',
            name: 'Systems',
            depth: 2,
            parent: 'System Management',
            children: [
              {
                id: '3',
                name: 'System Code',
                depth: 3,
                parent: 'Systems',
                children: [
                  {
                    id: '4',
                    name: 'Code Registration',
                    depth: 4,
                    parent: 'System Code',
                  },
                  {
                    id: '5',
                    name: 'Code Registration - 2',
                    depth: 4,
                    parent: 'System Code',
                  },
                ],
              },
              {
                id: '6',
                name: 'Properties',
                depth: 3,
                parent: 'Systems',
              },
              {
                id: '7',
                name: 'Menus',
                depth: 3,
                parent: 'Systems',
                children: [
                  {
                    id: '8',
                    name: 'Menu Registration',
                    depth: 4,
                    parent: 'Menus',
                  },
                ],
              },
              {
                id: '9',
                name: 'API List',
                depth: 3,
                parent: 'Systems',
                children: [
                  {
                    id: '10',
                    name: 'API Registration',
                    depth: 4,
                    parent: 'API List',
                  },
                  {
                    id: '11',
                    name: 'API Edit',
                    depth: 4,
                    parent: 'API List',
                  },
                ],
              },
            ],
          },
          {
            id: '12',
            name: 'Users & Groups',
            depth: 2,
            parent: 'System Management',
            children: [
              {
                id: '13',
                name: 'Users',
                depth: 3,
                parent: 'Users & Groups',
                children: [
                  {
                    id: '14',
                    name: 'User Account Registration',
                    depth: 4,
                    parent: 'Users',
                  },
                ],
              },
              {
                id: '15',
                name: 'Groups',
                depth: 3,
                parent: 'Users & Groups',
                children: [
                  {
                    id: '16',
                    name: 'User Group Registration',
                    depth: 4,
                    parent: 'Groups',
                  },
                ],
              },
            ],
          },
          {
            id: '17',
            name: '사용자 승인',
            depth: 2,
            parent: 'System Management',
            children: [
              {
                id: '18',
                name: '사용자 승인 상세',
                depth: 3,
                parent: '사용자 승인',
              },
            ],
          },
        ],
      },
    ],
  },
];

// Recursive function to insert menu data
async function insertMenu(data: any, parentId: string | null = null) {
  for (const item of data) {
    console.log(`Inserting menu: ${item.name} with parentId: ${parentId}`);
    const menu = await prisma.menu.create({
      data: {
        id: item.id,
        name: item.name,
        depth: item.depth,
        parentId: parentId,
      },
    });
    console.log(`Inserted menu: ${menu.id}`);

    if (item.children && item.children.length > 0) {
      await insertMenu(item.children, menu.id);
    }
  }
}

async function main() {
  console.log('Seeding database...');
  await insertMenu(menuData);
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
