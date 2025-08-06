'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface DeleteClientButtonProps {
  clientId: string
  clientName: string
}

export default function DeleteClientButton({ clientId, clientName }: DeleteClientButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Client portal deleted successfully')
        router.refresh()
      } else {
        toast.error('Failed to delete client portal')
      }
    } catch (error) {
      toast.error('Error deleting client portal')
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Client Portal</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete the portal for <strong>{clientName}</strong>? 
            This will permanently delete all projects, files, and updates. This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="btn btn-secondary"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Portal'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-red-600 hover:text-red-700"
      title="Delete Client"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}Deleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn bg-red-600 text-white hover:bg-red-700"
              disabled={is
