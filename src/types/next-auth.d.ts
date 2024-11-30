import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string
      emailVerified: Date | null
      image?: string | null
    }
  }

  interface User {
    id: string
    name: string | null
    email: string
    emailVerified: Date | null
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    emailVerified: Date | null
  }
} 