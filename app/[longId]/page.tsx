import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface PageParams {
  params: {
    longId: string
  }
}

export default async function RedirectPage({ params }: PageParams) {
  try {
    // Cari data dari database
    const linkData = await prisma.tautan.findUnique({
      where: {
        link_panjang: params.longId
      }
    })

    // Jika tidak ditemukan
    if (!linkData) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">404 - Link Tidak Ditemukan</h1>
        </div>
      )
    }

    // Redirect ke URL tujuan
    return redirect(linkData.link_asli)
    
  } catch (error) {
    console.error('Gagal redirect:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">500 - Error Server</h1>
        <p className="mt-4">Gagal memproses permintaan redirect</p>
      </div>
    )
  }
}