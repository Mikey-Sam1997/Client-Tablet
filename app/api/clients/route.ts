import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, email, company, subdomain, brandColor } = await request.json()

    // Validate required fields
    if (!name || !email || !subdomain) {
      return NextResponse.json(
        { error: 'Name, email, and subdomain are required' },
        { status: 400 }
      )
    }

    // Validate subdomain format
    if (!/^[a-z0-9-]+$/.test(subdomain)) {
      return NextResponse.json(
        { error: 'Subdomain must only contain lowercase letters, numbers, and hyphens' },
        { status: 400 }
      )
    }

    // Check if subdomain is already taken
    const existingClient = await prisma.client.findUnique({
      where: { subdomain }
    })

    if (existingClient) {
      return NextResponse.json(
        { error: 'This subdomain is already taken' },
        { status: 400 }
      )
    }

    // Create client
    const client = await prisma.client.create({
      data: {
        name,
        email,
        company: company || null,
        subdomain,
        brandColor: brandColor || '#3B82F6',
        userId: user.id,
      },
    })

    return NextResponse.json({
      client,
      message: 'Client portal created successfully',
    })
  } catch (error) {
    console.error('Create client error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clients = await prisma.client.findMany({
      where: { userId: user.id },
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

    return NextResponse.json({ clients })
  } catch (error) {
    console.error('Get clients error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
