"use client"

import { Button } from "@/components/ui/button"
import { useSessionManager } from "@/hooks/use-session-manager"

export default function LogoutButton() {
  const { signOut } = useSessionManager()

  return (
    <Button
      onClick={signOut}
      variant="destructive"
      size="sm"
    >
      Log out
    </Button>
  )
} 