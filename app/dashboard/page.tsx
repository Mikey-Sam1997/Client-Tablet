import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Users, FileText, Activity } from 'lucide-react'

async function getDashboardData(userId: string) {
  const [clients, totalProjects, totalFiles] = await Promise.all([
    prisma.client.findMany({
      where: { userId },
      include: {
        projects: {
          select: { id: true, status: true }
        },
        _count: {
          select: { files: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.project.count({
      where: {
        client: { userId }
      }
    }),
    prisma.file.count({
      where: {
        client: { userId }
      }
    })
  ])

  return { clients, totalProjects, totalFiles }
}

export default async function DashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')?.value
  const payload = verifyToken(token!)
  
  const { clients, totalProjects, totalFiles } = await getDashboardData(payload!.userId)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your client portals and projects</p>
        </div>
        <Link href="/dashboard/clients/new" className="btn btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Client Portal
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Clients</p>
              <p className="text-2xl font-semibold text-gray-900">{clients.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Projects</p>
              <p className="text-2xl font-semibold text-gray-900">{totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Files Shared</p>
              <p className="text-2xl font-semibold text-gray-900">{totalFiles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Clients */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Client Portals</h2>
          <Link href="/dashboard/clients" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            View all
          </Link>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No client portals yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first client portal.</p>
            <div className="mt-6">
              <Link href="/dashboard/clients/new" className="btn btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Client Portal
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {clients.map((client) => {
              const activeProjects = client.projects.filter(p => p.status === 'active').length
              const completedProjects = client.projects.filter(p => p.status === 'completed').length
              
              return (
                <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{client.name}</h3>
                        <p className="text-sm text-gray-500">{client.company || client.email}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>{activeProjects} active projects</span>
                      <span>{completedProjects} completed</span>
                      <span>{client._count.files} files</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link 
                      href={`/client/${client.subdomain}`}
                      target="_blank"
                      className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                    >
                      View Portal
                    </Link>
                    <Link 
                      href={`/dashboard/clients/${client.id}`}
                      className="btn btn-secondary text-xs py-1 px-3"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
