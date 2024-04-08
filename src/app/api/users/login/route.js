import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const { user, password } = await req.json();
  if (!(user && password)) return Response.json({ msg: "Data tidak lengkap" });
  else {
    const searchData = await prisma.users.findMany({
      where: { user, password },
      select: { id: true, user: true, email: true },
    });
    if (searchData.length === 0)
      return Response.json({ isLogin: false, msg: "Data tidak ditemukan" });
    else return Response.json({ isLogin: true, data: searchData });
  }
}
