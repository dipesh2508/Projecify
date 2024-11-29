"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    content: "This platform has transformed how our team collaborates. The intuitive interface and powerful features make project management a breeze.",
    author: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&crop=face",
    gradient: "from-blue-600/20 to-indigo-600/20",
    delay: 0.2
  },
  {
    content: "The analytics and reporting features have given us unprecedented insights into our project performance. Highly recommended!",
    author: "Michael Chen",
    role: "Engineering Lead",
    company: "InnovateLabs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=face",
    gradient: "from-purple-600/20 to-pink-600/20",
    delay: 0.4
  },
  {
    content: "We've seen a 40% increase in project completion rates since switching to this platform. The ROI has been incredible.",
    author: "Emily Rodriguez",
    role: "Operations Director",
    company: "GlobalTech",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&crop=face",
    gradient: "from-primary-600/20 to-secondary-600/20",
    delay: 0.6
  }
]

export function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden bg-black/50" id="testimonials">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-black/90 backdrop-blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Industry Leaders</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: testimonial.delay }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gray-900/30 backdrop-blur-xl rounded-3xl p-8 h-full overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient}`} />
                  <div className="absolute inset-0 backdrop-blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <Quote className="w-10 h-10 text-primary-500/50 mb-6" />
                  
                  <p className="text-gray-300 mb-8 leading-relaxed group-hover:text-white transition-colors duration-300">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-primary-400 transition-colors duration-300">
                        {testimonial.author}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                {/* Hover Border */}
                <div className="absolute inset-0 rounded-3xl border border-gray-800 group-hover:border-gray-700/50 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}