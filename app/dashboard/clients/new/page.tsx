'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const BRAND_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
]

export default function NewClientPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subdomain: '',
    brandColor: '#3B82F6',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Client portal created successfully!')
        router.push(`/dashboard/clients/${data.client.id}`)
      } else {
        toast.error(data.error || 'Failed to create client portal')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate subdomain from name if name is being changed
      ...(name === 'name' && {
        subdomain: value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      })
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/clients" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create Client Portal</h1>
        <p className="text-gray-600 mt-2">Set up a new client portal with custom branding</p>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Client Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="e.g., John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="client@example.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="input"
              placeholder="Acme Corp (optional)"
            />
          </div>

          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-2">
              Portal URL *
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">yourdomain.com/client/</span>
              <input
                type="text"
                id="subdomain"
                name="subdomain"
                required
                value={formData.subdomain}
                onChange={handleChange}
                className="input flex-1"
                placeholder="client-name"
                pattern="[a-z0-9-]+"
                title="Only lowercase letters, numbers, and hyphens allowed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Only lowercase letters, numbers, and hyphens allowed
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Color
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                {BRAND_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, brandColor: color }))}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.brandColor === color ? 'border-gray-400' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={formData.brandColor}
                onChange={(e) => setFormData(prev => ({ ...prev, brandColor: e.target.value }))}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Portal Preview</h3>
            <div className="bg-white rounded border p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: formData.brandColor }}
                >
                  {formData.name.charAt(0).toUpperCase() || 'C'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {formData.name || 'Client Name'}
                  </h4>
                  {formData.company && (
                    <p className="text-sm text-gray-500">{formData.company}</p>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                URL: yourdomain.com/client/{formData.subdomain || 'client-url'}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link href="/dashboard/clients" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Creating...' : 'Create Portal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
