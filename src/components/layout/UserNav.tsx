'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface UserNavProps {
  user: {
    email?: string
    user_metadata?: {
      name?: string
      avatar_url?: string
    }
  }
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User'

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt={displayName}
              className="h-7 w-7 rounded-full"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
        </div>
        <span className="hidden md:inline">{displayName}</span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-background shadow-lg z-50">
            <div className="p-3 border-b">
              <p className="font-medium text-sm">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="p-2 space-y-1">
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
                  <User className="h-4 w-4" />
                  Profile
                </button>
              </Link>
              <Link href="/settings" onClick={() => setIsOpen(false)}>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </Link>
            </div>
            <div className="p-2 border-t">
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
