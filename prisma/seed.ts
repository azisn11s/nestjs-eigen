/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    const hashedPassword = await bcrypt.hash('password', 10);

    // Clear All
    await prisma.user.deleteMany();

    // Seed 1
    await prisma.user.create({
        data: {
            id: faker.datatype.uuid(),
            username: 'popaket',
            password: hashedPassword,
            msisdn: '6285794313256',
            name: 'Popaket'
        }
    });

    // Seed 2
    await prisma.user.create({
        data: {
            id: faker.datatype.uuid(),
            username: 'backend',
            password: hashedPassword,
            msisdn: '6285794313257',
            name: 'Backend Team'
        }
    });
    
}

main()
.catch((e)=> {
    console.log(e);
    process.exit(1);
})
.finally(async ()=> {
    await prisma.$disconnect();
});
