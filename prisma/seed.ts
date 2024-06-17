import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password', 10);

    const user = await prisma.user.upsert({
        where: { email: 'francisco@example.com' },
        update: {},
        create: {
            email: 'francisco@example.com',
            name: 'Francisco Souto',
            password: hashedPassword,
        },
    });

    const user1 = await prisma.user.upsert({
        where: { email: 'alexandre@example.com' },
        update: {},
        create: {
            email: 'alexandre@example.com',
            name: 'Alexandre Lopes',
            password: hashedPassword,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'laercio@example.com' },
        update: {},
        create: {
            email: 'laercio@example.com',
            name: 'Laercio Seila',
            password: hashedPassword,
        },
    });

    console.log({ user, user1, user2 });

    const expense = await prisma.expense.create({
        data: {
            name: 'Pix',
            date: new Date(),
            value: 100.50,
            userId: user.id,
        },
    });

    const expense1 = await prisma.expense.create({
        data: {
            name: 'Pix',
            date: new Date(),
            value: 230.32,
            userId: user.id,
        },
    });

    const expense2 = await prisma.expense.create({
        data: {
            name: 'Gasolina',
            date: new Date(),
            value: 50,
            userId: user.id,
        },
    });

    const expense3 = await prisma.expense.create({
        data: {
            name: 'Lanche',
            date: new Date(),
            value: 72,
            userId: user1.id,
        },
    });

    const expense4 = await prisma.expense.create({
        data: {
            name: 'Conta de Luz',
            date: new Date(),
            value: 150,
            userId: user2.id,
        },
    });

    console.log({ expense, expense1, expense2, expense3, expense4 });

    const rent = await prisma.rent.create({
        data: {
            name: 'Salário',
            date: new Date(),
            value: 1340.72,
            userId: user.id,
        },
    });

    const rent1 = await prisma.rent.create({
        data: {
            name: 'Venda de brownies',
            date: new Date(),
            value: 230.32,
            userId: user.id,
        },
    });

    const rent2 = await prisma.rent.create({
        data: {
            name: 'Sorteio',
            date: new Date(),
            value: 50,
            userId: user.id,
        },
    });

    const rent3 = await prisma.rent.create({
        data: {
            name: 'Achado na rua',
            date: new Date(),
            value: 72,
            userId: user1.id,
        },
    });

    const rent4 = await prisma.rent.create({
        data: {
            name: 'Cashback',
            date: new Date(),
            value: 150,
            userId: user2.id,
        },
    });

    console.log({ rent, rent1, rent2, rent3, rent4 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
