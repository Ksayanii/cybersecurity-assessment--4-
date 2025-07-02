"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, BarChart3, Users, Building2, CheckCircle, Star, ArrowRight, Play, User } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: Shield,
      title: "Comprehensive Assessment",
      description: "10-question security evaluation covering all critical areas",
      color: "bg-blue-500",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Visual reports with radar charts and risk distribution",
      color: "bg-purple-500",
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with certified cybersecurity professionals",
      color: "bg-green-500",
    },
    {
      icon: Building2,
      title: "Enterprise Ready",
      description: "Company dashboards with employee management",
      color: "bg-orange-500",
    },
  ]

  const stats = [
    { label: "Assessments Completed", value: "10,000+", icon: BarChart3 },
    { label: "Companies Protected", value: "500+", icon: Building2 },
    { label: "Security Experts", value: "50+", icon: Users },
    { label: "Success Rate", value: "99.9%", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CyberGuard</h1>
                <p className="text-sm text-white/70">Security Assessment Platform</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/signin")}
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Trusted by 500+ Companies</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Secure Your
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                Digital{" "}
              </span>
              Future
            </h1>

            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Comprehensive cybersecurity assessment platform that evaluates your security posture, provides actionable
              insights, and connects you with expert guidance.
            </p>

            {/* Main Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center" onClick={() => router.push("/quiz")}>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Take Assessment</h3>
                  <p className="text-white/70 mb-6">
                    Start with our comprehensive 10-question security evaluation to understand your current posture
                  </p>
                  <div className="flex items-center justify-center gap-2 text-cyan-400 font-medium">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center" onClick={() => router.push("/signin")}>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Access Dashboard</h3>
                  <p className="text-white/70 mb-6">
                    Sign in to view your security analytics, track progress, and manage your organization
                  </p>
                  <div className="flex items-center justify-center gap-2 text-pink-400 font-medium">
                    Sign In <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose CyberGuard?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border-white/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Organization?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of organizations that trust CyberGuard to assess and improve their cybersecurity posture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/quiz")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Free Assessment
                </Button>
                <Button
                  onClick={() => router.push("/signin")}
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-8 py-3 text-lg"
                >
                  <User className="h-5 w-5 mr-2" />
                  Access Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
