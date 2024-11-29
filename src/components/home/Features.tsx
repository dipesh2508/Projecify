import MotionDiv from "@/components/animations/MotionDiv"
import { 
  BarChart2, 
  Users, 
  Target, 
  Calendar, 
  Bell, 
  Shield 
} from "lucide-react"

const features = [
  {
    icon: BarChart2,
    title: "Project Analytics",
    description: "Get detailed insights into your project's progress with real-time analytics and reporting.",
    gradient: "from-blue-500/20 via-blue-500/10 to-blue-500/0",
    iconGradient: "from-blue-600 to-indigo-600",
    delay: 0.1
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with your team members, assign tasks, and track progress.",
    gradient: "from-purple-500/20 via-purple-500/10 to-purple-500/0",
    iconGradient: "from-purple-600 to-pink-600",
    delay: 0.2
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and monitor project goals, milestones, and deadlines with our intuitive interface.",
    gradient: "from-primary-500/20 via-primary-500/10 to-primary-500/0",
    iconGradient: "from-primary-600 to-secondary-600",
    delay: 0.3
  },
  {
    icon: Calendar,
    title: "Timeline Management",
    description: "Visualize project timelines and manage deadlines effectively with interactive calendars.",
    gradient: "from-green-500/20 via-green-500/10 to-green-500/0",
    iconGradient: "from-green-600 to-emerald-600",
    delay: 0.4
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Stay informed with instant notifications and real-time project status updates.",
    gradient: "from-orange-500/20 via-orange-500/10 to-orange-500/0",
    iconGradient: "from-orange-600 to-yellow-600",
    delay: 0.5
  },
  {
    icon: Shield,
    title: "Secure Workspace",
    description: "Enterprise-grade security to keep your project data safe and protected.",
    gradient: "from-red-500/20 via-red-500/10 to-red-500/0",
    iconGradient: "from-red-600 to-rose-600",
    delay: 0.6
  }
]

export default function Features() {
  return (
    <section className="relative py-32 bg-black" id="features">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      <div className="container relative mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Modern Teams
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage projects effectively and boost team productivity
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              className="group relative"
            >
              <div className="relative h-full bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                  <div className="absolute inset-0 backdrop-blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconGradient} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-3xl border border-gray-800 group-hover:border-gray-700/50 transition-colors duration-300" />
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}