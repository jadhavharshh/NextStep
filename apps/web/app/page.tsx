"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  GraduationCap,
  MapPin,
  Users,
  TrendingUp,
  BookOpen,
  Target,
  Calendar,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Brain,
  Globe,
  Clock,
  ChevronRight,
  PlayCircle
} from 'lucide-react';

const Page = () => {
  const router = useRouter();

  const stats = [
    { label: "Career Streams", value: "4", icon: TrendingUp },
    { label: "Districts Covered", value: "22", icon: MapPin },
    { label: "Assessment Areas", value: "8", icon: Target },
    { label: "Launch Ready", value: "2024", icon: Calendar }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Advanced algorithms analyze your interests and aptitude to suggest perfect career paths"
    },
    {
      icon: MapPin,
      title: "Local College Directory",
      description: "Comprehensive database of government colleges in Jammu & Kashmir with real-time updates"
    },
    {
      icon: Calendar,
      title: "Timeline Tracker",
      description: "Never miss important deadlines for admissions, scholarships, and entrance exams"
    },
    {
      icon: BookOpen,
      title: "Open Educational Resources",
      description: "Access free study materials and resources tailored to your chosen career path"
    },
    {
      icon: Shield,
      title: "Verified Information",
      description: "All data is verified and updated regularly through official government sources"
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get immediate results from our comprehensive aptitude and interest assessments"
    }
  ];

  const upcomingFeatures = [
    {
      title: "Smart Career Assessment",
      description: "Discover your strengths and interests through our comprehensive evaluation",
      icon: Brain,
      status: "Coming Soon"
    },
    {
      title: "College Discovery",
      description: "Find the perfect government college in J&K that matches your goals",
      icon: GraduationCap,
      status: "In Development"
    },
    {
      title: "Timeline Tracking",
      description: "Never miss important admission deadlines and scholarship opportunities",
      icon: Calendar,
      status: "Planned"
    }
  ];

  const careerPaths = [
    { stream: "Science", courses: "PCM, PCB, Medical", careers: "Engineering, Medicine, Research" },
    { stream: "Commerce", courses: "Accounts, Economics", careers: "CA, Banking, Business" },
    { stream: "Arts", courses: "History, Political Science", careers: "Civil Services, Law, Teaching" },
    { stream: "Vocational", courses: "IT, Tourism, Agriculture", careers: "Technical Skills, Industry Jobs" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NextStep
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#features-preview" className="text-slate-600 hover:text-orange-600 transition-all duration-300 hover:scale-105 relative group">
                Coming Soon
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <Button
                onClick={() => router.push('/auth')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 animate-pulse">
              <Zap className="w-4 h-4 mr-2" />
              Built for J&K Students - Launching Soon
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight animate-in fade-in-50 duration-1000">
              Your Journey to the
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                Perfect Career
              </span>
              <span className="animate-in slide-in-from-bottom-4 duration-1000 delay-500">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-in fade-in-50 duration-1000 delay-700">
              Get personalized career guidance, discover government colleges in Jammu & Kashmir,
              and never miss important educational opportunities. Your future starts with the right guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in fade-in-50 duration-1000 delay-1000">
              <Button
                onClick={() => router.push('/auth')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              >
                Be the First to Try
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 px-8 py-4 text-lg hover:bg-slate-50 hover:scale-105 transition-all duration-300"
              >
                <PlayCircle className="mr-2 w-5 h-5" />
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-0 shadow-lg bg-white/70 backdrop-blur-md hover:shadow-xl hover:bg-white/80 transition-all duration-500 hover:scale-105 group cursor-pointer">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600 group-hover:scale-110 group-hover:text-indigo-600 transition-all duration-300" />
                    <div className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{stat.value}</div>
                    <div className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need for
              <span className="text-indigo-600"> Career Success</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge technology with local expertise to guide your educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-md bg-gradient-to-br from-white to-slate-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:scale-105 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                    <feature.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">How It Works</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Your Path to Success in
              <span className="text-blue-600">4 Simple Steps</span>
            </h2>
          </div>

          <Tabs defaultValue="assessment" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-12 bg-white shadow-lg">
              <TabsTrigger value="assessment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                1. Assessment
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                2. Recommendations
              </TabsTrigger>
              <TabsTrigger value="exploration" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                3. Exploration
              </TabsTrigger>
              <TabsTrigger value="planning" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                4. Planning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assessment" className="space-y-8">
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="text-center">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-2xl">Comprehensive Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center mb-6">
                    Take our scientifically designed aptitude and interest assessment to discover your strengths and passions.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {careerPaths.map((path, index) => (
                      <Card key={index} className="text-center p-4">
                        <div className="text-sm font-semibold text-blue-600 mb-2">{path.stream}</div>
                        <div className="text-xs text-slate-500 mb-1">{path.courses}</div>
                        <div className="text-xs text-slate-700">{path.careers}</div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations">
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="text-center">
                  <Target className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
                  <CardTitle className="text-2xl">AI-Powered Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center mb-6">
                    Our AI analyzes your results and provides personalized career and course recommendations.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="text-green-700">Engineering Stream Match</span>
                      <Progress value={95} className="w-32" />
                      <span className="text-green-700 font-semibold">95%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-blue-700">Computer Science Aptitude</span>
                      <Progress value={88} className="w-32" />
                      <span className="text-blue-700 font-semibold">88%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <span className="text-purple-700">Problem Solving Skills</span>
                      <Progress value={92} className="w-32" />
                      <span className="text-purple-700 font-semibold">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exploration">
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="text-center">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <CardTitle className="text-2xl">Explore Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center mb-6">
                    Discover government colleges, scholarships, and career opportunities in your area of interest.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 text-center">
                      <GraduationCap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold">200+ Colleges</div>
                      <div className="text-sm text-slate-500">Government & Aided</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <Award className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className="font-semibold">150+ Scholarships</div>
                      <div className="text-sm text-slate-500">Central & State</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-semibold">50+ Career Paths</div>
                      <div className="text-sm text-slate-500">Detailed Roadmaps</div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="planning">
              <Card className="p-8 border-0 shadow-xl bg-white">
                <CardHeader className="text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                  <CardTitle className="text-2xl">Timeline Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center mb-6">
                    Create your personalized timeline with important deadlines and never miss an opportunity.
                  </p>
                  <div className="space-y-4">
                    {[
                      { date: "March 2024", event: "Board Exam Results", status: "completed" },
                      { date: "April 2024", event: "College Applications Open", status: "upcoming" },
                      { date: "May 2024", event: "Entrance Exam Registration", status: "upcoming" },
                      { date: "June 2024", event: "Scholarship Deadlines", status: "upcoming" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <CheckCircle className={`w-6 h-6 ${item.status === 'completed' ? 'text-green-600' : 'text-slate-400'}`} />
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{item.event}</div>
                          <div className="text-sm text-slate-500">{item.date}</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section id="features-preview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700 animate-pulse">What's Coming</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Features in
              <span className="text-orange-600"> Development</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're building something amazing for J&K students. Here's what you can expect soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className={`${
                    feature.status === 'Coming Soon' ? 'bg-green-100 text-green-700' :
                    feature.status === 'In Development' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  } text-xs`}>
                    {feature.status}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 border-2 border-dashed border-slate-300 group-hover:border-blue-400">
                    <feature.icon className="w-8 h-8 text-slate-500 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 mb-6">Want to be notified when we launch?</p>
            <Button
              onClick={() => router.push('/auth')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 hover:scale-105 transition-all duration-300"
            >
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Be among the first students in Jammu & Kashmir to experience AI-powered career guidance.
            Join our waitlist and get early access when we launch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => router.push('/auth')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-xl group"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 text-blue-100 text-sm">
            ✓ Free forever &nbsp;&nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp;&nbsp; ✓ Instant results
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NextStep</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Empowering students in Jammu & Kashmir with personalized career guidance and educational opportunities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-slate-400">
                <div>Career Assessment</div>
                <div>College Directory</div>
                <div>Timeline Tracker</div>
                <div>Resources</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-slate-400">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-2 text-slate-400">
                <div>WhatsApp Support</div>
                <div>Email Updates</div>
                <div>Social Media</div>
                <div>Community</div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-slate-700" />

          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
            <div>© 2024 NextStep. All rights reserved.</div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div>Made with ❤️ for J&K Students</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
