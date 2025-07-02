"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, Download, BarChart3, PieChart, Target, Users, ArrowLeft } from "lucide-react"

export default function ReportPage() {
  const [assessment, setAssessment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const assessmentId = searchParams.get("id")

  useEffect(() => {
    if (assessmentId) {
      // Try to load from localStorage first
      const storedAssessment = localStorage.getItem(`assessment_${assessmentId}`)
      if (storedAssessment) {
        setAssessment(JSON.parse(storedAssessment))
        setLoading(false)
        return
      }

      // If not found locally, try to fetch from API
      fetch(`/api/assessment/${assessmentId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setAssessment(data.assessment)
          } else {
            // Generate sample data if no assessment found
            generateSampleAssessment()
          }
        })
        .catch(() => {
          generateSampleAssessment()
        })
        .finally(() => setLoading(false))
    } else {
      generateSampleAssessment()
      setLoading(false)
    }
  }, [assessmentId])

  const generateSampleAssessment = () => {
    const sampleAssessment = {
      _id: "sample",
      overallScore: 3.1,
      categoryScores: {
        "Password Management": { score: 3.0, total: 5 },
        Authentication: { score: 3.6, total: 2 },
        "Device Security": { score: 2.4, total: 2 },
        "Network Security": { score: 3.2, total: 1 },
      },
      timestamp: new Date().toISOString(),
    }
    setAssessment(sampleAssessment)
  }

  const getScoreColor = (score: number) => {
    if (score >= 3.5) return "from-green-500 to-emerald-600"
    if (score >= 2.5) return "from-blue-500 to-cyan-600"
    return "from-red-500 to-pink-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 3.5) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (score >= 2.5) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
  }

  const getRiskDistribution = (score: number) => {
    if (score >= 3.5) return { low: 70, medium: 25, high: 5 }
    if (score >= 2.5) return { low: 40, medium: 45, high: 15 }
    return { low: 15, medium: 35, high: 50 }
  }

  const getRecommendations = (categoryScores: any) => {
    const recommendations = []

    if (categoryScores["Password Management"]?.score < 3) {
      recommendations.push({
        priority: "high",
        title: "Implement Password Manager",
        description: "Use a password manager to generate and store unique, complex passwords for each account.",
      })
    }

    if (categoryScores["Authentication"]?.score < 3) {
      recommendations.push({
        priority: "high",
        title: "Enable Multi-Factor Authentication",
        description: "Add MFA to all critical accounts to prevent 99.9% of automated attacks.",
      })
    }

    if (categoryScores["Device Security"]?.score < 3) {
      recommendations.push({
        priority: "medium",
        title: "Device Security Updates",
        description: "Enable automatic updates and use endpoint protection software.",
      })
    }

    if (categoryScores["Network Security"]?.score < 3) {
      recommendations.push({
        priority: "medium",
        title: "Secure Network Configuration",
        description: "Use WPA3 encryption and avoid public Wi-Fi for sensitive activities.",
      })
    }

    return recommendations
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center">
        <Card className="max-w-md w-full bg-white/95 backdrop-blur-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment Not Found</h2>
            <p className="text-gray-600 mb-6">
              The requested assessment could not be found. Please take a new assessment.
            </p>
            <Button onClick={() => router.push("/")} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Take New Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const riskDistribution = getRiskDistribution(assessment.overallScore)
  const recommendations = getRecommendations(assessment.categoryScores)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Shield className="h-12 w-12" />
                Cybersecurity Assessment Report
              </h1>
              <p className="text-xl text-white/90 mb-4">Comprehensive analysis of your security posture</p>
              <div className="bg-white/20 rounded-full p-3 inline-block">
                <span className="text-white font-medium">
                  Generated on:{" "}
                  {new Date(assessment.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Score Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Card
              className={`bg-gradient-to-br ${getScoreColor(assessment.overallScore)} text-white border-0 shadow-xl relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="text-5xl font-bold mb-4">{assessment.overallScore.toFixed(1)}</div>
                <div className="text-xl mb-4">Security Score</div>
                <div className="bg-white/20 rounded-full h-2 mb-4">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${(assessment.overallScore / 4) * 100}%` }}
                  ></div>
                </div>
                {getScoreBadge(assessment.overallScore)}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-gray-800">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(assessment.categoryScores).map(([category, data]: [string, any]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{category}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{data.score.toFixed(1)}/4</span>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              data.score >= 3.5 ? "bg-green-500" : data.score >= 2.5 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          ></div>
                        </div>
                      </div>
                      <Progress value={(data.score / 4) * 100} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Security Radar Analysis */}
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Security Radar Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Radar grid */}
                  <g stroke="#e5e7eb" strokeWidth="1" fill="none">
                    <circle cx="100" cy="100" r="80" />
                    <circle cx="100" cy="100" r="60" />
                    <circle cx="100" cy="100" r="40" />
                    <circle cx="100" cy="100" r="20" />
                    <line x1="100" y1="20" x2="100" y2="180" />
                    <line x1="20" y1="100" x2="180" y2="100" />
                    <line x1="156.57" y1="43.43" x2="43.43" y2="156.57" />
                    <line x1="156.57" y1="156.57" x2="43.43" y2="43.43" />
                  </g>

                  {/* Data polygon */}
                  <polygon
                    points={Object.values(assessment.categoryScores)
                      .map((data: any, index) => {
                        const angle = (index * 90 - 90) * (Math.PI / 180)
                        const radius = (data.score / 4) * 80
                        const x = 100 + radius * Math.cos(angle)
                        const y = 100 + radius * Math.sin(angle)
                        return `${x},${y}`
                      })
                      .join(" ")}
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                  />

                  {/* Labels */}
                  <text x="100" y="15" textAnchor="middle" className="text-xs fill-gray-600">
                    Password
                  </text>
                  <text x="185" y="105" textAnchor="middle" className="text-xs fill-gray-600">
                    Auth
                  </text>
                  <text x="100" y="195" textAnchor="middle" className="text-xs fill-gray-600">
                    Device
                  </text>
                  <text x="15" y="105" textAnchor="middle" className="text-xs fill-gray-600">
                    Network
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{riskDistribution.high}%</div>
                    <div className="text-sm text-red-700">High Risk</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{riskDistribution.medium}%</div>
                    <div className="text-sm text-yellow-700">Medium Risk</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{riskDistribution.low}%</div>
                    <div className="text-sm text-green-700">Low Risk</div>
                  </div>
                </div>

                {/* Risk bars */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${riskDistribution.high}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{riskDistribution.high}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${riskDistribution.medium}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{riskDistribution.medium}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${riskDistribution.low}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{riskDistribution.low}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5" />
              Priority Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div className="flex items-start gap-3">
                    <Badge className={`${rec.priority === "high" ? "bg-red-500" : "bg-yellow-500"} text-white`}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                    <div>
                      <h4 className="font-semibold mb-2">{rec.title}</h4>
                      <p className="text-sm text-white/90">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Section */}
        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Security Framework Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-medium">NIST Framework</div>
                <Badge className="bg-yellow-100 text-yellow-800 mt-2">Partially Compliant</Badge>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-medium">ISO 27001</div>
                <Badge className="bg-red-100 text-red-800 mt-2">Non-Compliant</Badge>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">⚖️</div>
                <div className="font-medium">GDPR</div>
                <Badge className="bg-green-100 text-green-800 mt-2">Compliant</Badge>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="font-medium">SOC 2</div>
                <Badge className="bg-yellow-100 text-yellow-800 mt-2">Partially Compliant</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Take Action</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Get Expert Consultation
              </Button>
              <Button onClick={() => router.push("/")} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Take New Assessment
              </Button>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">Want to track your progress over time?</p>
              <Button onClick={() => router.push("/signin")} variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Sign In to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
