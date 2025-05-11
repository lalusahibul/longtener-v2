import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic' // Diperlukan untuk redirect dinamis

export default async function Page({ params }: { params: { longId: string } }) {
  try {
    // Cari data tautan dari database
    const data = await prisma.tautan.findUnique({
      where: { link_panjang: params.longId }
    })

    // Jika tautan tidak ditemukan
    if (!data) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1>404 - Link tidak ditemukan</h1>
        </div>
      )
    }

    // Redirect ke URL asli
    redirect(data.link_asli)
    
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>500 - Terjadi kesalahan server</h1>
      </div>
    )
  }
}