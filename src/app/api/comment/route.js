import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const getData = await prisma.comment.findMany({});
  return Response.json({ data: getData });
}

export async function POST(req) {
  const { email, comment } = await req.json();
  if (!(email && comment)) return Response.json({ msg: "data tidak lengkap" });
  else {
    const upData = await prisma.comment.create({
      data: { email, comment },
    });
    return Response.json({ data: upData });
  }
}
