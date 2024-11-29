import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"
import logo from '@/assets/projecify full logo white.png'
import MotionDiv from "@/components/animations/MotionDiv"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api" },
    { label: "Guides", href: "/guides" },
    { label: "Support", href: "/support" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Cookies", href: "/cookies" },
  ],
}

const socialLinks = [
  { Icon: Github, href: "https://github.com" },
  { Icon: Twitter, href: "https://twitter.com" },
  { Icon: Linkedin, href: "https://linkedin.com" },
]
const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-[1]" />

      <div className="container relative z-[2] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 relative w-auto h-16 -ml-32 md:-ml-44">
                <Image
                  src={logo}
                  alt="Projecify"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-gray-400">
                Modern project management for modern teams.
              </p>
            </MotionDiv>
          </div>

          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={title} className="col-span-1 md:col-span-2">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="ml-auto text-center md:text-left"
              >
                <h4 className="text-white font-semibold mb-4 capitalize">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            </div>
          ))}
        </div>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Try N Test Foundation, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href }, index) => (
              <Link 
                key={index}
                href={href}
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </MotionDiv>
      </div>
    </footer>
  )
}

export default Footer;