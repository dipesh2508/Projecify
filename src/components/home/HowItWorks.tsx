"use client"

import { motion } from "motion/react"
import { Code2, Users2, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Create Project",
    description: "Set up your project in minutes with our intuitive interface. Import existing data or start fresh.",
    icon: Code2,
    gradient: "from-blue-600 to-indigo-600",
    delay: 0.2
  },
  {
    number: "02",
    title: "Add Team",
    description: "Invite team members and assign roles easily. Real-time collaboration starts immediately.",
    icon: Users2,
    gradient: "from-purple-600 to-pink-600",
    delay: 0.4
  },
  {
    number: "03",
    title: "Launch & Scale",
    description: "Monitor progress, track milestones, and scale your projects effortlessly.",
    icon: Rocket,
    gradient: "from-primary-600 to-secondary-600",
    delay: 0.6
  }
]

export function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Success</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps and transform how your team collaborates
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute hidden lg:block top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-800 to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  {/* Gradient Orb */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Number & Title */}
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className={`text-4xl font-bold bg-gradient-to-r ${step.gradient} text-transparent bg-clip-text`}>
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}