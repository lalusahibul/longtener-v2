// import { prisma } from '@/lib/prisma'
// import { NextResponse } from 'next/server'

// export async function GET(
//   request: Request,
//   { params }: { params: { longId: string } }
// ) {
//   try {
//     // Pastikan params sudah diakses dengan benar
//     const { longId } = params;

//     const data = await prisma.tautan.findUnique({
//       where: { link_panjang: longId }
//     })

//     if (!data) {
//       return NextResponse.json(
//         { error: 'Not found' },
//         { status: 404 }
//       )
//     }

//     // Redirect ke link asli (link_asli)
//     return NextResponse.redirect(data.link_asli, { status: 301 })
    
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }
  
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/')
  const longId = pathParts[pathParts.length - 1] // Ambil [longId] dari URL

  try {
    const data = await prisma.tautan.findUnique({
      where: { link_panjang: longId }
    })

    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.redirect(data.link_asli, { status: 301 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
