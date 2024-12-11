import MotionHeader from "@/components/animations/MotionHeader"
import MotionDiv from '@/components/animations/MotionDiv'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import logo from '@/assets/projecify full logo.png'

const Header = () => {

  return (
    <MotionHeader
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="relative w-48 h-12">
            <Image
              src={logo}
              alt="Projecify"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-200"
            >
              Login
            </Link>
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/register">
                <Button 
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20 dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-white"
                >
                  Get Started
                </Button>
              </Link>
            </MotionDiv>
          </div>
        </div>
      </div>
    </MotionHeader>
  )
}

export default Header;