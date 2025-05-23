import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { longId: string } }
) {
  try {
    // Pastikan params sudah diakses dengan benar
    const { longId } = params;

    const data = await prisma.tautan.findUnique({
      where: { link_panjang: longId }
    })

    if (!data) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      )
    }

    // Redirect ke link asli (link_asli)
    return NextResponse.redirect(data.link_asli, { status: 301 })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
