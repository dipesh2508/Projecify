"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MotionDiv from "@/components/animations/MotionDiv";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { UploadDropzone } from "@/lib/uploadthing";
import { User } from "@/types";
import Image from "next/image";
import { X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
});

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const { data: user, isLoading: isLoadingUser } = useApi<User>(
    `/api/users/${session?.user?.id}`,
    {
      enabled: !!session?.user?.id,
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        router.push("/dashboard/profile");
      },
    }
  );

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user, form]);

  const { mutate, isLoading } = useApi(`/api/users/${session?.user?.id}`, {
    method: "PUT",
    enabled: false,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
        className:
          "bg-green-100 dark:bg-slate-950 border-green-600 dark:border-green-800",
      });
      router.push("/dashboard/profile");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await mutate({ body: values });
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {" "}
      {/* Removed MotionDiv temporarily */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <UploadDropzone
                        endpoint="profileImage"
                        onUploadProgress={(progress) => {
                          console.log(`Upload progress: ${progress}%`);
                        }}
                        onClientUploadComplete={async (res) => {
                          if (res?.[0]?.url) {
                            field.onChange(res[0].url);
                            try {
                              await mutate({
                                body: {
                                  ...form.getValues(),
                                  image: res[0].url,
                                },
                              });
                              toast({
                                title: "Success",
                                description:
                                  "Profile image updated successfully",
                              });
                            } catch (error) {
                              toast({
                                variant: "destructive",
                                title: "Error",
                                description: "Failed to update profile image",
                              });
                            }
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            variant: "destructive",
                            title: "Error",
                            description: error.message,
                          });
                        }}
                        appearance={{
                          container:
                            "flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition cursor-pointer",
                          allowedContent:
                            "text-sm text-gray-500 dark:text-gray-400",
                          button:
                            "ut-ready:bg-primary-600 ut-ready:hover:bg-primary-500 ut-uploading:bg-gray-500 ut-uploading:hover:bg-gray-500",
                          uploadIcon: "w-12 h-12 text-gray-400 mb-4",
                        }}
                        content={{
                          allowedContent: ({ isUploading }) =>
                            isUploading
                              ? "Uploading..."
                              : "Drop your image here or click to browse & Click on Upload Image button after selecting",
                          button: ({ isUploading }) =>
                            isUploading ? "Uploading..." : "Upload Image",
                        }}
                      />
                      {field.value && (
                        <div className="mt-4 flex">
                          <Image
                            src={field.value}
                            alt="Profile preview"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-full ring-2 ring-primary-500/20"
                          />
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => field.onChange("")}
                              className="absolute right-2 bg-red-500 text-white p-1.5 rounded-full transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500"
                isLoading={isLoading}
                loadingText="Updating..."
              >
                Update Profile
              </LoadingButton>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
