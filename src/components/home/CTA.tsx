import { ArrowRight, Check } from "lucide-react";
import MotionDiv from "@/components/animations/MotionDiv"
import H2 from "@/components/animations/MotionH2"
import MotionP from "@/components/animations/MotionP"

const features = [
  "Unlimited Projects",
  "Priority Support",
  "Advanced Analytics",
  "Custom Workflows",
  "Team Collaboration",
  "API Access"
]

const CallToAction = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black" id="cta">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-[1]" />

      <div className="container relative z-[2] mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800">
          <MotionDiv
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -right-20 -top-20 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"
          />
          <MotionDiv
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"
          />

          <div className="relative grid md:grid-cols-2 gap-12 p-8 md:p-12">
            <div>
              <H2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Ready to Transform Your
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                  Project Management?
                </span>
              </H2>
              <MotionP
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-300 mb-8"
              >
                Join thousands of teams who have already revolutionized their workflow with our platform.
              </MotionP>
              <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {features.map((feature, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-2 text-gray-300 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-0.5 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-400" />
                      </div>
                    </div>
                    {feature}
                  </MotionDiv>
                ))}
              </MotionDiv>
            </div>

            <div className="flex items-center justify-center">
              <MotionDiv
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-md"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 group-hover:border-gray-700/50 transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Start Your Free Trial
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300"
                      />
                      <MotionDiv
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 group transition-all duration-300"
                      >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </MotionDiv>
                    </div>
                    <p className="text-sm text-gray-400 mt-4 text-center">
                      No credit card required
                    </p>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction;