import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'
import { Clock, CheckCircle, AlertCircle, FileText, Activity } from 'lucide-react'

async function getClientData(subdomain: string) {
  const client = await prisma.client.findUnique({
    where: { subdomain },
    include: {
      projects: {
        include: {
          updates: {
            orderBy: { createdAt: 'desc' },
            take: 3
          },
          _count: {
            select: { files: true, updates: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      },
      files: {
        where: { projectId: null },
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      _count: {
        select: { files: true, projects: true }
      }
    }
  })

  return client
}

export default async function ClientPortalPage({ params }: { params: { subdomain: string } }) {
  const client = await getClientData(params.subdomain)

  if (!client) {
    notFound()
  }

  const activeProjects = client.projects.filter(p => p.status === 'active')
  const completedProjects = client.projects.filter(p => p.status === 'completed')
  const recentUpdates = client.projects
    .flatMap(p => p.updates.map(u => ({ ...u, projectName: p.name, projectId: p.id })))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-blue-500" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'paused': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
        <div 
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
          style={{ backgroundColor: client.brandColor }}
        >
          {client.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {client.name}!</h1>
        {client.company && (
          <p className="text-gray-600 mt-2">{client.company}</p>
        )}
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          This is your dedicated project portal where you can track progress, 
          access files, and stay updated on all your projects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-900">{activeProjects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{completedProjects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Files</p>
              <p className="text-2xl font-semibold text-gray-900">{client._count.files}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
            <Link 
              href={`/client/${client.subdomain}/projects`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View all
            </Link>
          </div>

          {recentUpdates.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No updates yet</h3>
              <p className="mt-1 text-sm text-gray-500">Project updates will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{update.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        in <Link 
                          href={`/client/${client.subdomain}/projects`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {update.projectName}
                        </Link>
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(new Date(update.createdAt), 'MMM d')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{update.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Projects */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Active Projects</h2>
            <Link 
              href={`/client/${client.subdomain}/projects`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View all
            </Link>
          </div>

          {activeProjects.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No active projects</h3>
              <p className="mt-1 text-sm text-gray-500">Active projects will show here when available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(project.status)}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{project.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{project._count.updates} updates</span>
                        <span>{project._count.files} files</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Files */}
      {client.files.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Files</h2>
            <Link 
              href={`/client/${client.subdomain}/files`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {client.files.map((file) => (
              <div key={file.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-gray-400 mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.originalName}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(file.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
