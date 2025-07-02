"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  TrendingUp,
  Award,
  Target,
  LogOut,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Home,
} from "lucide-react"

const complianceFrameworks = {
  nist: {
    name: "NIST Cybersecurity Framework",
    description: "National Institute of Standards and Technology framework for managing cybersecurity risk",
    requirements: [
      { category: "Identify", description: "Asset management, governance, risk assessment", status: "partial" },
      { category: "Protect", description: "Access control, awareness training, data security", status: "good" },
      { category: "Detect", description: "Anomaly detection, continuous monitoring", status: "needs-work" },
      { category: "Respond", description: "Response planning, communications, analysis", status: "partial" },
      { category: "Recover", description: "Recovery planning, improvements, communications", status: "needs-work" },
    ],
    overallCompliance: 65,
    recommendations: [
      "Implement continuous monitoring solutions",
      "Develop incident response procedures",
      "Establish recovery time objectives",
    ],
  },
  iso27001: {
    name: "ISO 27001",
    description: "International standard for information security management systems",
    requirements: [
      { category: "Leadership", description: "Management commitment and policy", status: "good" },
      { category: "Planning", description: "Risk assessment and treatment", status: "partial" },
      { category: "Support", description: "Resources, competence, awareness", status: "needs-work" },
      { category: "Operation", description: "Operational planning and control", status: "partial" },
      { category: "Evaluation", description: "Monitoring, audit, management review", status: "needs-work" },
      { category: "Improvement", description: "Nonconformity and corrective action", status: "needs-work" },
    ],
    overallCompliance: 45,
    recommendations: [
      "Establish formal ISMS documentation",
      "Conduct regular security audits",
      "Implement employee security training",
    ],
  },
  gdpr: {
    name: "GDPR",
    description: "General Data Protection Regulation for data privacy",
    requirements: [
      { category: "Lawfulness", description: "Legal basis for processing", status: "good" },
      { category: "Consent", description: "Valid consent mechanisms", status: "good" },
      { category: "Rights", description: "Data subject rights implementation", status: "partial" },
      { category: "Security", description: "Technical and organizational measures", status: "partial" },
      { category: "Breach", description: "Breach notification procedures", status: "needs-work" },
      { category: "DPO", description: "Data Protection Officer appointment", status: "needs-work" },
    ],
    overallCompliance: 70,
    recommendations: [
      "Implement data breach notification system",
      "Appoint Data Protection Officer",
      "Enhance data subject rights procedures",
    ],
  },
  soc2: {
    name: "SOC 2",
    description: "Service Organization Control 2 for service providers",
    requirements: [
      { category: "Security", description: "System protection against unauthorized access", status: "partial" },
      { category: "Availability", description: "System availability for operation and use", status: "good" },
      {
        category: "Processing Integrity",
        description: "System processing completeness and accuracy",
        status: "partial",
      },
      { category: "Confidentiality", description: "Information designated as confidential", status: "needs-work" },
      { category: "Privacy", description: "Personal information collection and use", status: "partial" },
    ],
    overallCompliance: 55,
    recommendations: [
      "Implement access controls and monitoring",
      "Establish data classification policies",
      "Conduct regular penetration testing",
    ],
  },
}

export default function IndividualDashboard() {
  const [user, setUser] = useState<any>(null)
  const [assessments, setAssessments] = useState<any[]>([])
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [selectedCompliance, setSelectedCompliance] = useState("nist")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("user_session")
    if (!session) {
      router.push("/signin")
      return
    }

    const userData = JSON.parse(session)
    setUser(userData)

    // Load user assessments
    const userAssessments = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("assessment_")) {
        const assessment = JSON.parse(localStorage.getItem(key) || "{}")
        userAssessments.push(assessment)
      }
    }
    setAssessments(userAssessments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))

    // Generate mock leaderboard
    setLeaderboard([
      { name: "Alex Chen", score: 3.8, assessments: 5, rank: 1 },
      { name: "Sarah Johnson", score: 3.6, assessments: 4, rank: 2 },
      { name: "You", score: userAssessments[0]?.overallScore || 0, assessments: userAssessments.length, rank: 3 },
      { name: "Mike Wilson", score: 3.2, assessments: 3, rank: 4 },
      { name: "Emma Davis", score: 3.0, assessments: 6, rank: 5 },
    ])
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("user_session")
    router.push("/")
  }

  const latestAssessment = assessments[0]
  const averageScore =
    assessments.length > 0 ? assessments.reduce((sum, a) => sum + a.overallScore, 0) / assessments.length : 0

  const getScoreColor = (score: number) => {
    if (score >= 3.5) return "text-green-600"
    if (score >= 2.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 3.5) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (score >= 2.5) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
  }

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "needs-work":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getComplianceStatusLabel = (status: string) => {
    switch (status) {
      case "good":
        return "Compliant"
      case "partial":
        return "Partially Compliant"
      case "needs-work":
        return "Needs Work"
      default:
        return "Unknown"
    }
  }

  if (!user) return null

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
        <div className="bg-white/10 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Individual Dashboard</h1>
                  <p className="text-white/70">Welcome back, {user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => router.push("/")}
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Latest Score</p>
                    <p
                      className={`text-2xl font-bold ${getScoreColor(latestAssessment?.overallScore || 0)} text-white`}
                    >
                      {latestAssessment?.overallScore?.toFixed(1) || "N/A"}/4
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Average Score</p>
                    <p className="text-2xl font-bold text-white">{averageScore.toFixed(1)}/4</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Assessments</p>
                    <p className="text-2xl font-bold text-white">{assessments.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Rank</p>
                    <p className="text-2xl font-bold text-white">#3</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-white/20 text-white">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white/20 text-white">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Latest Assessment */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <BarChart3 className="h-5 w-5" />
                        Latest Assessment Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {latestAssessment ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white">Overall Security Score</h3>
                              <p className="text-sm text-white/70">
                                Taken on {new Date(latestAssessment.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-white">
                                {latestAssessment.overallScore.toFixed(1)}
                              </div>
                              {getScoreBadge(latestAssessment.overallScore)}
                            </div>
                          </div>

                          <div className="space-y-4">
                            {Object.entries(latestAssessment.categoryScores).map(([category, data]: [string, any]) => (
                              <div key={category} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-white/90">{category}</span>
                                  <span className="font-semibold text-white">{data.score.toFixed(1)}/4</span>
                                </div>
                                <Progress value={(data.score / 4) * 100} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <AlertTriangle className="h-12 w-12 text-white/40 mx-auto mb-4" />
                          <p className="text-white/70 mb-4">No assessments taken yet</p>
                          <Button
                            onClick={() => router.push("/quiz")}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Take Your First Assessment
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Leaderboard */}
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Award className="h-5 w-5" />
                        Leaderboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leaderboard.map((user, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              user.name === "You"
                                ? "bg-blue-500/20 border border-blue-400/30"
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  index === 0
                                    ? "bg-yellow-500 text-white"
                                    : index === 1
                                      ? "bg-gray-400 text-white"
                                      : index === 2
                                        ? "bg-orange-500 text-white"
                                        : "bg-white/20 text-white/70"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <p className={`font-medium ${user.name === "You" ? "text-blue-300" : "text-white/90"}`}>
                                  {user.name}
                                </p>
                                <p className="text-xs text-white/60">{user.assessments} assessments</p>
                              </div>
                            </div>
                            <div className="font-bold text-white">{user.score.toFixed(1)}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        onClick={() => router.push("/quiz")}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                      >
                        Take New Assessment
                      </Button>
                      <Button
                        onClick={() => router.push("/signup")}
                        variant="outline"
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Get Expert Consultation
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Compliance Framework Selection */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Frameworks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(complianceFrameworks).map(([key, framework]) => (
                      <Button
                        key={key}
                        onClick={() => setSelectedCompliance(key)}
                        variant={selectedCompliance === key ? "default" : "ghost"}
                        className={`w-full justify-start text-left ${
                          selectedCompliance === key
                            ? "bg-blue-600 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {framework.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Compliance Details */}
                <div className="lg:col-span-3">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">
                        {complianceFrameworks[selectedCompliance as keyof typeof complianceFrameworks].name}
                      </CardTitle>
                      <p className="text-white/70">
                        {complianceFrameworks[selectedCompliance as keyof typeof complianceFrameworks].description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Overall Compliance */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-white">Overall Compliance</span>
                          <span className="text-2xl font-bold text-white">
                            {
                              complianceFrameworks[selectedCompliance as keyof typeof complianceFrameworks]
                                .overallCompliance
                            }
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            complianceFrameworks[selectedCompliance as keyof typeof complianceFrameworks]
                              .overallCompliance
                          }
                          className="h-3"
                        />
                      </div>

                      {/* Requirements */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white">Requirements</h4>
                        {complianceFrameworks[selectedCompliance as keyof typeof complianceFrameworks].requirements.map(
                          (req, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <div>
                                <div className="font-medium text-white">{req.category}</div>
                                <div className="text-sm text-white/70">{req.description}</div>
                              </div>
                              <Badge className={getComplianceStatusColor(req.status)}>
                                {getComplianceStatusLabel(req.status)}
                              </Badge>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Recommendations */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white">Recommendations</h4>
                        <div className="space-y-2">
                          {complianceFrameworks[
                            selectedCompliance as keyof typeof complianceFrameworks
                          ].recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-white/90 text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock className="h-5 w-5" />
                    Assessment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {assessments.length > 0 ? (
                    <div className="space-y-4">
                      {assessments.map((assessment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <p className="font-medium text-white">Assessment #{assessments.length - index}</p>
                            <p className="text-sm text-white/70">
                              {new Date(assessment.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">{assessment.overallScore.toFixed(1)}/4</div>
                            {getScoreBadge(assessment.overallScore)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white/70 text-center">No assessment history available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
