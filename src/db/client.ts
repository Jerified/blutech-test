import { PrismaClient } from '@prisma/client'

const PrismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    var prisma: ReturnType<typeof PrismaClientSingleton> | undefined;
}
const db = globalThis.prisma ?? PrismaClientSingleton();
// console.log(db)

export default db

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;