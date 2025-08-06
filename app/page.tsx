import Link from 'next/link'
import { CheckCircle, Users, FileText, MessageSquare } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Client Tablet</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-500 hover:text-gray-700">
                Sign In
              </Link>
              <Link href="/auth/register" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Stop Chasing Clients for
            <span className="text-primary-600"> Updates</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Create professional client portals that keep your projects organized, 
            files accessible, and communication centralized. No more "what's the status?" emails.
          </p>
          <div className="mt-10">
            <Link href="/auth/register" className="btn btn-primary text-lg px-8 py-3">
              Create Your First Portal - Free
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-primary-600">
              <Users className="h-12 w-12" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Client Portals</h3>
            <p className="mt-2 text-gray-600">
              Custom branded portals for each client with their own subdomain
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-primary-600">
              <FileText className="h-12 w-12" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">File Sharing</h3>
            <p className="mt-2 text-gray-600">
              Drag-and-drop file sharing with automatic versioning
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-primary-600">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Project Timeline</h3>
            <p className="mt-2 text-gray-600">
              Keep clients informed with milestone updates and progress tracking
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-primary-600">
              <MessageSquare className="h-12 w-12" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Organized Communication</h3>
            <p className="mt-2 text-gray-600">
              All project discussions in one place, no more scattered emails
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple, Transparent Pricing
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
            <div className="card text-center">
              <h4 className="text-xl font-semibold text-gray-900">Free</h4>
              <p className="text-3xl font-bold text-primary-600 mt-4">$0</p>
              <p className="text-gray-600 mt-2">2 active client portals</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Custom branding</li>
                <li>✓ File sharing (1GB storage)</li>
                <li>✓ Project updates</li>
                <li>✓ Basic support</li>
              </ul>
              <Link href="/auth/register" className="btn btn-secondary w-full mt-8">
                Get Started
              </Link>
            </div>
            
            <div className="card text-center border-primary-500 border-2">
              <h4 className="text-xl font-semibold text-gray-900">Solo</h4>
              <p className="text-3xl font-bold text-primary-600 mt-4">$15</p>
              <p className="text-gray-600 mt-2">5 active client portals</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Everything in Free</li>
                <li>✓ 10GB storage</li>
                <li>✓ Priority support</li>
                <li>✓ Custom domains</li>
              </ul>
              <Link href="/auth/register" className="btn btn-primary w-full mt-8">
                Start Free Trial
              </Link>
            </div>
            
            <div className="card text-center">
              <h4 className="text-xl font-semibold text-gray-900">Pro</h4>
              <p className="text-3xl font-bold text-primary-600 mt-4">$29</p>
              <p className="text-gray-600 mt-2">15 active client portals</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Everything in Solo</li>
                <li>✓ 50GB storage</li>
                <li>✓ Advanced branding</li>
                <li>✓ Analytics dashboard</li>
              </ul>
              <Link href="/auth/register" className="btn btn-secondary w-full mt-8">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Client Tablet. Built for freelancers, by freelancers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
