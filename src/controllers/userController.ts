import prisma from '../../prisma';
import { Request, Response } from 'express';
import * as argon2 from 'argon2';

const getUser = async (req: Request, res: Response) => {
  try {
    const pengguna = await prisma.user.findMany();
    res.status(200).json(pengguna);
  } catch (error: any) {
    res.status(404).json(error.message);
  }
};

const getUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) res.status(404).json({ msg: 'Pengguna tidak ditemukan' });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const createUser = async (req: Request, res: Response) => {
  const { nama, email, role, confPassword } = req.body;

  const password = req.body.password;
  console.log('Received password:', password); // Tambahkan ini

  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password tidak sama' });
  }

  const hash = await argon2.hash(password);

  try {
    await prisma.$transaction(async (tx) => {
      //   const hash = await argon2.hash(password);
      await tx.user.create({
        data: {
          nama: nama,
          email: email,
          password: hash,
          role: role,
        },
      });
    });
    res.status(201).json({ msg: 'User has been created' });
  } catch (error: any) {
    res.status(500).json({ msg: 'Terjadi kesalahan dalam membuat pengguna' });
    console.error(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, nama, role, password } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: {
          nama: nama,
          email: email,
          password: password,
          role: role,
        },
      });
    });

    res.status(200).json({ msg: 'User updated' });
  } catch (error: any) {
    res.status(500).json({ msg: 'Terjadi kesalahan dalam memperbarui pengguna' });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.delete({
        where: { id },
      });
    });

    res.status(200).json({ msg: 'User has been deleted' });
  } catch (error: any) {
    res.status(500).json({ msg: 'Terjadi kesalahan dalam menghapus pengguna' });
  }
};

export default { getUser, getUserId, createUser, updateUser, deleteUser };
