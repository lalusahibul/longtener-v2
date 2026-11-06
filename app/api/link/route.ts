import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { url } = await req.json()

  if (!url) {
    return NextResponse.json({ error: 'URL tidak boleh kosong' }, { status: 400 })
  }

  function generateRandomString(length: number): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    
    return result;
  }
  const longId = generateRandomString(2692)

  try {
    const newTautan = await prisma.tautan.create({
      data: {
        link_asli: url,
        link_panjang: longId,
      },
    })

    return NextResponse.json(
      { lUrl: `${process.env.BASE_URL}/${longId}` },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan URL' }, { status: 500 })
  }
}
