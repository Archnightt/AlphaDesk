import { builder } from './builder';
import { prisma } from '@/lib/prisma';

builder.queryType({});

builder.prismaObject('Snapshot', {
  fields: (t) => ({
    id: t.exposeID('id'),
    price: t.exposeFloat('price'),
    changePercent: t.exposeFloat('changePercent'),
    narrative: t.exposeString('narrative'),
    sentiment: t.exposeString('sentiment'), 
    timestamp: t.expose('timestamp', { type: 'DateTime' }),
  }),
});

builder.prismaObject('Stock', {
  fields: (t) => ({
    symbol: t.exposeID('symbol'),
    name: t.exposeString('name'),
    latestSnapshot: t.field({
      type: 'Snapshot',
      nullable: true,
      resolve: (root) => {
        return prisma.snapshot.findFirst({
          where: { stockId: root.symbol },
          orderBy: { timestamp: 'desc' },
        });
      },
    }),
  }),
});

builder.queryField('dashboardStocks', (t) =>
  t.prismaField({
    type: ['Stock'],
    resolve: (query) =>
      prisma.stock.findMany({
        ...query,
      }),
  })
);

export const schema = builder.toSchema();