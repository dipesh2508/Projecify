"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { User } from "@/types";
import MotionDiv from "@/components/animations/MotionDiv";

export default function ProfilePage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading: isUserLoading,
  } = useApi<User>(`/api/users/${session?.user?.id}`, {
    enabled: !!session?.user?.id,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description:
          "Please try again later or contact support if the problem persists.",
      });
    },
  });


  if (isUserLoading || sessionStatus === "loading") {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto animate-pulse" />
              <div className="space-y-2">
                <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mx-auto" />
                <div className="w-64 h-4 bg-gray-200 rounded animate-pulse mx-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6 space-y-6"
    >
      <Card>
        <CardHeader className="relative">
          <div className="absolute right-6 top-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/profile/edit")}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback className="text-4xl">
                {user?.name?.charAt(0) || user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-sm text-gray-400">
                Member since{" "}
                {new Date(user?.createdAt as Date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {user?.projects?.map((membership) => (
              <Card
                key={membership.project.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() =>
                  router.push(`/dashboard/projects/${membership.project.id}`)
                }
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">{membership.project.name}</h3>
                    <ProjectStatusBadge status={membership.project.status} />
                  </div>
                  <div className="text-sm text-gray-500">
                    Role: {membership.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
