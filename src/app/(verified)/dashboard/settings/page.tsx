"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Settings2 } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: deleteAccount, isLoading: isDeleting } = useApi(
    `/api/users/${session?.user?.id}`,
    {
      method: "DELETE",
      enabled: false,
      onSuccess: async () => {
        toast({
          title: "Account deleted",
          description: "Your account has been permanently deleted.",
        });
        setIsDialogOpen(false);
        await signOut({ 
          redirect: false 
        });
        router.push("/login");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete account. Please try again.",
        });
      },
    }
  );

  const handleDeleteAccount = async () => {
    if (!session?.user?.id) return;
    await deleteAccount();
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings
        </p>
      </div>

      <div className="grid gap-6">
        {/* Coming Soon Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Profile Settings", "Notification Preferences", "Theme Customization", "Security Settings", "Integration Settings"].map((feature) => (
            <Card key={feature} className="p-6 opacity-60">
              <div className="flex items-center gap-2 mb-2">
                <Settings2 className="h-5 w-5" />
                <h3 className="font-semibold">{feature}</h3>
              </div>
              <p className="text-sm text-gray-500">Coming soon</p>
            </Card>
          ))}
        </div>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your data from our servers.
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirm"
                  checked={isConfirmChecked}
                  onCheckedChange={(checked) => setIsConfirmChecked(checked as boolean)}
                />
                <label
                  htmlFor="confirm"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I understand that this action is irreversible
                </label>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={!isConfirmChecked || isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </div>
  );
}