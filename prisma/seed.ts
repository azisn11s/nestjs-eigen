/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const bookSeeder = [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
];

const memberSeeder = [
    {
        code: "M001",
        name: "Angga",
    },
    {
        code: "M002",
        name: "Ferry",
    },
    {
        code: "M003",
        name: "Putri",
    },
];

async function main() {

    const hashedPassword = await bcrypt.hash('password', 10);

    // Clear All
    await prisma.user.deleteMany();
    await prisma.book.deleteMany();
    await prisma.member.deleteMany();

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

    // Book Seeding
    await prisma.book.createMany({
        data: bookSeeder
    });
    // bookSeeder.forEach((book)=>{
        
    // });

    // Member Seeding
    await prisma.member.createMany({
        data: memberSeeder
    });
    // memberSeeder.forEach((member)=>{
        
    // })
    
}

main()
.catch((e)=> {
    console.log(e);
    process.exit(1);
})
.finally(async ()=> {
    await prisma.$disconnect();
});
