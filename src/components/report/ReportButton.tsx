'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReportDialog } from './ReportDialog'

interface ReportButtonProps {
  postId?: string
  commentId?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ReportButton({
  postId,
  commentId,
  variant = 'ghost',
  size = 'sm',
}: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground hover:text-destructive"
      >
        <Flag className="h-4 w-4 mr-1" />
        Report
      </Button>

      <ReportDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        postId={postId}
        commentId={commentId}
      />
    </>
  )
}
