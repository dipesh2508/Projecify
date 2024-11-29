"use client"

import { motion } from "motion/react"
import { Users, CheckCircle, Clock, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Active Users",
    gradient: "from-blue-600 to-indigo-600",
    bgGradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    delay: 0.1
  },
  {
    icon: CheckCircle,
    value: "50K+",
    label: "Projects Completed",
    gradient: "from-purple-600 to-pink-600",
    bgGradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    delay: 0.2
  },
  {
    icon: Clock,
    value: "98%",
    label: "On-time Delivery",
    gradient: "from-primary-600 to-secondary-600",
    bgGradient: "from-primary-500/10 via-primary-500/5 to-transparent",
    delay: 0.3
  },
  {
    icon: Award,
    value: "4.9/5",
    label: "User Rating",
    gradient: "from-green-600 to-emerald-600",
    bgGradient: "from-green-500/10 via-green-500/5 to-transparent",
    delay: 0.4
  }
]

export function Stats() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden bg-black" id="stats">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-[1]" />

      <div className="container relative z-[2] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 h-full overflow-hidden">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient}`} />
                    <div className="absolute inset-0 backdrop-blur-3xl" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Stats */}
                    <motion.h3
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 rounded-3xl border border-gray-800 group-hover:border-gray-700/50 transition-colors duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}