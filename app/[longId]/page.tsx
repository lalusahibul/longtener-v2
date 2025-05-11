import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

// Generate metadata dinamis
export async function generateMetadata({ params }: { params: { longId: string } }): Promise<Metadata> {
  return {
    title: `Redirect: ${params.longId}`,
  }
}

export const dynamic = 'force-dynamic' // Pastikan halaman ini selalu dinamis

export default async function Page({ params }: { params: { longId: string } }) {
  try {
    const data = await prisma.tautan.findUnique({
      where: { link_panjang: params.longId },
    })

    if (!data) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">404 - Link tidak ditemukan</h1>
        </div>
      )
    }

    // Lakukan redirect
    redirect(data.link_asli)
    
    // Fallback UI (tidak akan pernah di-render karena ada redirect)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Sedang mengalihkan...</p>
      </div>
    )
    
  } catch (error) {
    console.error('Error redirect:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">500 - Error Server</h1>
        <p className="mt-2">Gagal memproses redirect</p>
      </div>
    )
  }
}