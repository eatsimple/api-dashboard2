import prisma from '../../prisma';
import { Request, Response } from 'express';

const search = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search_query as string) || '';
  const offset = limit * page;

  const totalRows = await prisma.user.count({
    where: {
      OR: [{ nama: { contains: search, case: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
    },
  });

  const totalPage = Math.ceil(totalRows / limit);

  const result = await prisma.user.findMany({
    where: {
      OR: [{ nama: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }],
    },
    skip: offset,
    take: limit,
    orderBy: { id: 'desc' },
  });

  res.json({
    result,
    page,
    limit,
    totalRows,
    totalPage,
  });
};
