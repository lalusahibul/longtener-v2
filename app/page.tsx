'use client'

import { Toaster, toast } from 'react-hot-toast'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [url, setUrl] = useState("")
  const [lUrl, setLongUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return toast.error("URL nya di isi dulu tolol!")

    const res = await fetch('/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    const data = await res.json()

    if (res.ok) {
      setLongUrl(data.lUrl)
      toast.success('URL sudah memanjaaang!')
    } else {
      toast('Ups ada error bro!')
    }
  }

  const handleCopy = () => {
    if (lUrl) {
      navigator.clipboard.writeText(lUrl)
      toast.success('Berhasil disalin!')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-sm space-y-4">
      <Toaster position="bottom-center" reverseOrder={false} />
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full"
          />
          <Button type="submit">Panjangkan😎👌</Button>
        </form>

        {/* Menampilkan shortUrl jika ada */}
        {lUrl && (
          <div className="w-full mt-4">
            <textarea
              value={lUrl}
              readOnly
              placeholder="Short URL"
              className="w-full mb-2"
            />
            <Button onClick={handleCopy} className="w-full">Salin</Button>
          </div>
        )}
      </div>
    </div>
  )
}
