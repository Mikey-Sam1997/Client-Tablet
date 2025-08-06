import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ClientPortalNavbar from '@/components/ClientPortalNavbar'

async function getClient(subdomain: string) {
  const client = await prisma.client.findUnique({
    where: { subdomain },
    include: {
      projects: {
        select: { id: true, name: true, status: true }
      }
    }
  })

  return client
}

export default async function ClientPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { subdomain: string }
}) {
  const client = await getClient(params.subdomain)

  if (!client) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientPortalNavbar client={client} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
