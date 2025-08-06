import Link from 'next/link'
import { FileText, FolderOpen, MessageSquare } from 'lucide-react'

interface Client {
  id: string
  name: string
  company: string | null
  brandColor: string
  subdomain: string
  projects: {
    id: string
    name: string
    status: string
  }[]
}

interface ClientPortalNavbarProps {
  client: Client
}

export default function ClientPortalNavbar({ client }: ClientPortalNavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/client/${client.subdomain}`} className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: client.brandColor }}
            >
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{client.name}</h1>
              {client.company && (
                <p className="text-xs text-gray-500">{client.company}</p>
              )}
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              href={`/client/${client.subdomain}`} 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <Link 
              href={`/client/${client.subdomain}/projects`} 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </Link>
            <Link 
              href={`/client/${client.subdomain}/files`} 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Files</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
