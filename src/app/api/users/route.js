import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const getData = await prisma.users.findMany();
  return Response.json({ data: getData });
}

export async function POST(req) {
  const { user, email, password } = await req.json();
  const isEmail = await prisma.users.findMany({ where: { email } });
  if (!(user && email && password))
    return Response.json({ msg: "Data tidak valid" });
  else {
    const upData = await prisma.users.create({
      data: { user, email, password },
      select: { user: true, email: true },
    });
    return Response.json({ isLogin: true, data: upData });
  }
}
