"use client"

import { motion } from "motion/react"
import Image from "next/image"
import TNT from '@/assets/TNT.png'

const achievements = [
  { value: "10K+", label: "Active Users" },
  { value: "30+", label: "Countries" },
  { value: "50+", label: "Team Members" },
  { value: "99.9%", label: "Uptime" }
]

export function About() {
  return (
    <>
      {/* First section remains exactly the same */}
      <section className="relative py-32 overflow-hidden bg-black" id="about">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-[1]" />

        <div className="container relative z-[2] mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Building the Future of
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                Project Management
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              We&apos;re on a mission to transform how teams collaborate. Our platform 
              brings together intuitive design and powerful features to help you 
              deliver exceptional results.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {achievements.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="group relative">
                  {/* Card */}
                  <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 h-full overflow-hidden">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-transparent" />
                      <div className="absolute inset-0 backdrop-blur-3xl" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                    {/* Hover Border */}
                    <div className="absolute inset-0 rounded-3xl border border-gray-800 group-hover:border-gray-700/50 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Try N' Test Organization Section */}
      <section className="relative py-32 overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-[1]" />

        <div className="container relative z-[2] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Logo Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-96 h-96 mx-auto lg:mx-0 flex items-center">
                {/* Enhanced Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/30 to-[#0088ff]/30 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ffff]/20 to-transparent rounded-full blur-3xl" />
                
                {/* Logo Container */}
                <div className="relative w-full h-64 my-auto">
                  <Image
                    src={TNT}
                    alt="Try N' Test Logo"
                    fill
                    className="object-contain relative z-10"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left relative"
            >
              {/* Enhanced Background Effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#00ffff]/10 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#0088ff]/10 to-transparent rounded-full blur-3xl" />

              {/* Content with Better Typography */}
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  The Project is Made under the
                  <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#0088ff]">
                    Organisation Try N&apos; Test
                  </span>
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="h-px w-24 bg-gradient-to-r from-[#00ffff] to-[#0088ff] mb-6 mx-auto lg:mx-0" />
                  <p className="text-2xl font-semibold italic text-gray-300 mb-8">
                    Exploring, Innovating, Perfecting
                  </p>
                </motion.div>

                {/* Est. Year Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#00ffff]/10 to-[#0088ff]/10 backdrop-blur-sm border border-[#00ffff]/20"
                >
                  <span className="text-[#00ffff] font-medium">Est. 2023</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}