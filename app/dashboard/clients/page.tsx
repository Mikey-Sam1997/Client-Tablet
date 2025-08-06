import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, ExternalLink, Edit, Trash2 } from 'lucide-react'
import DeleteClientButton from '@/components/DeleteClientButton'

async function getClients(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    include: {
      projects: {
        select: { id: true, status: true }
      },
      _count: {
        select: { files: true, projects: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function ClientsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')?.value
  const payload = verifyToken(token!)
  
  const clients = await getClients(payload!.userId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Portals</h1>
          <p className="text-gray-600 mt-2">Manage all your client portals in one place</p>
        </div>
        <Link href="/dashboard/clients/new" className="btn btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Client Portal
        </Link>
      </div>

      {/* Clients List */}
      {clients.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No client portals yet</h3>
          <p className="text-gray-500 mb-6">Create your first client portal to get started with organized project management.</p>
          <Link href="/dashboard/clients/new" className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Portal
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => {
            const activeProjects = client.projects.filter(p => p.status === 'active').length
            const completedProjects = client.projects.filter(p => p.status === 'completed').length
            
            return (
              <div key={client.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-500">{client.company}</p>
                    )}
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: client.brandColor }}
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Projects:</span>
                    <span className="text-gray-900">{client._count.projects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active:</span>
                    <span className="text-green-600">{activeProjects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Files:</span>
                    <span className="text-gray-900">{client._count.files}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Link 
                    href={`/client/${client.subdomain}`}
                    target="_blank"
                    className="text-primary-600 hover:text-primary-500 text-sm font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Portal
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/dashboard/clients/${client.id}`}
                      className="text-gray-600 hover:text-gray-700"
                      title="Edit Client"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteClientButton clientId={client.id} clientName={client.name} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
