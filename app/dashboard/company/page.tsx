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
  Users,
  AlertTriangle,
  LogOut,
  BarChart3,
  Building2,
  Clock,
  Award,
  Target,
  CheckCircle,
  XCircle,
  FileText,
  Home,
} from "lucide-react"

const complianceFrameworks = {
  nist: {
    name: "NIST Cybersecurity Framework",
    description: "National Institute of Standards and Technology framework for managing cybersecurity risk",
    requirements: [
      { category: "Identify", description: "Asset management, governance, risk assessment", status: "good" },
      { category: "Protect", description: "Access control, awareness training, data security", status: "good" },
      { category: "Detect", description: "Anomaly detection, continuous monitoring", status: "partial" },
      { category: "Respond", description: "Response planning, communications, analysis", status: "partial" },
      { category: "Recover", description: "Recovery planning, improvements, communications", status: "partial" },
    ],
    overallCompliance: 75,
    recommendations: [
      "Implement 24/7 security monitoring",
      "Conduct quarterly incident response drills",
      "Establish automated backup procedures",
    ],
  },
  iso27001: {
    name: "ISO 27001",
    description: "International standard for information security management systems",
    requirements: [
      { category: "Leadership", description: "Management commitment and policy", status: "good" },
      { category: "Planning", description: "Risk assessment and treatment", status: "good" },
      { category: "Support", description: "Resources, competence, awareness", status: "partial" },
      { category: "Operation", description: "Operational planning and control", status: "partial" },
      { category: "Evaluation", description: "Monitoring, audit, management review", status: "partial" },
      { category: "Improvement", description: "Nonconformity and corrective action", status: "needs-work" },
    ],
    overallCompliance: 65,
    recommendations: [
      "Establish formal ISMS documentation",
      "Conduct annual security audits",
      "Implement continuous improvement process",
    ],
  },
  gdpr: {
    name: "GDPR",
    description: "General Data Protection Regulation for data privacy",
    requirements: [
      { category: "Lawfulness", description: "Legal basis for processing", status: "good" },
      { category: "Consent", description: "Valid consent mechanisms", status: "good" },
      { category: "Rights", description: "Data subject rights implementation", status: "good" },
      { category: "Security", description: "Technical and organizational measures", status: "partial" },
      { category: "Breach", description: "Breach notification procedures", status: "partial" },
      { category: "DPO", description: "Data Protection Officer appointment", status: "good" },
    ],
    overallCompliance: 85,
    recommendations: [
      "Enhance data encryption standards",
      "Automate breach detection systems",
      "Regular privacy impact assessments",
    ],
  },
  soc2: {
    name: "SOC 2",
    description: "Service Organization Control 2 for service providers",
    requirements: [
      { category: "Security", description: "System protection against unauthorized access", status: "good" },
      { category: "Availability", description: "System availability for operation and use", status: "good" },
      {
        category: "Processing Integrity",
        description: "System processing completeness and accuracy",
        status: "partial",
      },
      { category: "Confidentiality", description: "Information designated as confidential", status: "partial" },
      { category: "Privacy", description: "Personal information collection and use", status: "partial" },
    ],
    overallCompliance: 70,
    recommendations: [
      "Implement comprehensive logging",
      "Establish data retention policies",
      "Conduct regular penetration testing",
    ],
  },
}

export default function CompanyDashboard() {
  const [user, setUser] = useState<any>(null)
  const [employees, setEmployees] = useState<any[]>([])
  const [companyStats, setCompanyStats] = useState<any>({})
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
    if (userData.userType !== "company") {
      router.push("/dashboard/individual")
      return
    }
    setUser(userData)

    // Generate mock employee data
    const mockEmployees = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@company.com",
        department: "Engineering",
        role: "Senior Developer",
        lastAssessment: "2024-01-15",
        score: 3.8,
        status: "compliant",
        assessments: 4,
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@company.com",
        department: "Marketing",
        role: "Marketing Manager",
        lastAssessment: "2024-01-10",
        score: 2.1,
        status: "at-risk",
        assessments: 2,
      },
      {
        id: 3,
        name: "Carol Davis",
        email: "carol@company.com",
        department: "HR",
        role: "HR Specialist",
        lastAssessment: "2024-01-12",
        score: 3.2,
        status: "needs-improvement",
        assessments: 3,
      },
      {
        id: 4,
        name: "David Wilson",
        email: "david@company.com",
        department: "Engineering",
        role: "DevOps Engineer",
        lastAssessment: "2024-01-14",
        score: 3.9,
        status: "compliant",
        assessments: 5,
      },
      {
        id: 5,
        name: "Eva Brown",
        email: "eva@company.com",
        department: "Sales",
        role: "Sales Representative",
        lastAssessment: "2024-01-08",
        score: 2.8,
        status: "needs-improvement",
        assessments: 1,
      },
    ]

    setEmployees(mockEmployees)

    // Calculate company stats
    const totalEmployees = mockEmployees.length
    const compliantEmployees = mockEmployees.filter((emp) => emp.status === "compliant").length
    const atRiskEmployees = mockEmployees.filter((emp) => emp.status === "at-risk").length
    const averageScore = mockEmployees.reduce((sum, emp) => sum + emp.score, 0) / totalEmployees

    setCompanyStats({
      totalEmployees,
      compliantEmployees,
      atRiskEmployees,
      averageScore,
      complianceRate: (compliantEmployees / totalEmployees) * 100,
    })
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("user_session")
    router.push("/")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>
      case "needs-improvement":
        return <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
      case "at-risk":
        return <Badge className="bg-red-100 text-red-800">At Risk</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 3.5) return "text-green-400"
    if (score >= 2.5) return "text-yellow-400"
    return "text-red-400"
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

  const departmentStats = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { total: 0, averageScore: 0, scores: [] }
    }
    acc[emp.department].total++
    acc[emp.department].scores.push(emp.score)
    acc[emp.department].averageScore =
      acc[emp.department].scores.reduce((sum, score) => sum + score, 0) / acc[emp.department].scores.length
    return acc
  }, {} as any)

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
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Company Dashboard</h1>
                  <p className="text-white/70">Security overview for your organization</p>
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
          {/* Company Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Total Employees</p>
                    <p className="text-2xl font-bold text-white">{companyStats.totalEmployees}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Compliance Rate</p>
                    <p className="text-2xl font-bold text-green-400">{companyStats.complianceRate?.toFixed(0)}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">Average Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(companyStats.averageScore)} text-white`}>
                      {companyStats.averageScore?.toFixed(1)}/4
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">At Risk</p>
                    <p className="text-2xl font-bold text-red-400">{companyStats.atRiskEmployees}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
              <TabsTrigger value="employees" className="data-[state=active]:bg-white/20 text-white">
                Employee Overview
              </TabsTrigger>
              <TabsTrigger value="departments" className="data-[state=active]:bg-white/20 text-white">
                Department Analysis
              </TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-white/20 text-white">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white/20 text-white">
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="employees" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="h-5 w-5" />
                    Employee Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employees.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-300">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{employee.name}</p>
                            <p className="text-sm text-white/70">
                              {employee.role} • {employee.department}
                            </p>
                            <p className="text-xs text-white/50">
                              Last assessment: {new Date(employee.lastAssessment).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className={`font-bold ${getScoreColor(employee.score)} text-white`}>
                            {employee.score.toFixed(1)}/4
                          </div>
                          {getStatusBadge(employee.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(departmentStats).map(([department, stats]: [string, any]) => (
                  <Card key={department} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">{department}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/70">Employees</span>
                          <span className="font-semibold text-white">{stats.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/70">Average Score</span>
                          <span className={`font-semibold ${getScoreColor(stats.averageScore)} text-white`}>
                            {stats.averageScore.toFixed(1)}/4
                          </span>
                        </div>
                        <Progress value={(stats.averageScore / 4) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

            <TabsContent value="leaderboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Award className="h-5 w-5" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employees
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 5)
                        .map((employee, index) => (
                          <div
                            key={employee.id}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
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
                                <p className="font-medium text-white">{employee.name}</p>
                                <p className="text-xs text-white/60">{employee.department}</p>
                              </div>
                            </div>
                            <div className={`font-bold ${getScoreColor(employee.score)} text-white`}>
                              {employee.score.toFixed(1)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertTriangle className="h-5 w-5" />
                      Needs Attention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employees
                        .filter((emp) => emp.status === "at-risk" || emp.score < 2.5)
                        .map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center justify-between p-3 bg-red-500/10 border border-red-400/30 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <XCircle className="h-5 w-5 text-red-400" />
                              <div>
                                <p className="font-medium text-white">{employee.name}</p>
                                <p className="text-xs text-white/60">{employee.department}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-red-400">{employee.score.toFixed(1)}</div>
                              <p className="text-xs text-red-400">Requires training</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Company-wide Recommendations */}
          <Card className="mt-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5" />
                Company-wide Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-300">Mandatory MFA Training</p>
                      <p className="text-sm text-red-200">40% of employees need MFA setup assistance</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-300">Regular Assessments</p>
                      <p className="text-sm text-yellow-200">Schedule monthly security assessments</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-300">Security Policies</p>
                      <p className="text-sm text-blue-200">Update and distribute security guidelines</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
