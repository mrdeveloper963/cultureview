import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertTriangle, Shield } from 'lucide-react'

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Community Guidelines</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us maintain a respectful, authentic, and educational community by following these guidelines
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Core Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Our Core Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2">✨ Authenticity</h3>
                  <p className="text-sm text-muted-foreground">
                    Share genuine, first-hand experiences based on real interactions with cultures
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2">🤝 Respect</h3>
                  <p className="text-sm text-muted-foreground">
                    Treat all cultures, people, and perspectives with dignity and understanding
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2">🎓 Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Focus on learning and sharing knowledge rather than judging or generalizing
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2">🌍 Nuance</h3>
                  <p className="text-sm text-muted-foreground">
                    Recognize that every country and culture has diversity and complexity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DO: Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                DO: Encouraged Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Share Personal Experiences</h4>
                  <p className="text-sm text-muted-foreground">
                    "During my 2 years working in Japan, I noticed that..." or "When I visited Morocco, I experienced..."
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Provide Context</h4>
                  <p className="text-sm text-muted-foreground">
                    Mention when and where your experience occurred, as cultures evolve over time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Acknowledge Regional Differences</h4>
                  <p className="text-sm text-muted-foreground">
                    "In northern Italy..." instead of generalizing about the entire country
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Use "I" Statements</h4>
                  <p className="text-sm text-muted-foreground">
                    "I found that..." or "In my experience..." rather than absolute statements
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Be Specific and Detailed</h4>
                  <p className="text-sm text-muted-foreground">
                    Share concrete observations rather than vague generalizations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Engage Respectfully</h4>
                  <p className="text-sm text-muted-foreground">
                    When disagreeing, share your own experience rather than dismissing others
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DON'T: Prohibited Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-6 w-6" />
                DON'T: Prohibited Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-1">✗</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Hate Speech or Discrimination</h4>
                  <p className="text-sm text-muted-foreground">
                    Content that attacks or demeans people based on ethnicity, nationality, religion, or other protected characteristics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-1">✗</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Harmful Stereotypes</h4>
                  <p className="text-sm text-muted-foreground">
                    Sweeping generalizations that reduce diverse populations to simplistic caricatures
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-1">✗</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Misinformation</h4>
                  <p className="text-sm text-muted-foreground">
                    Presenting false information as fact, especially about laws, customs, or cultural practices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-1">✗</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Political Propaganda</h4>
                  <p className="text-sm text-muted-foreground">
                    Content primarily aimed at promoting political agendas rather than sharing cultural experiences
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-1">✗</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Personal Attacks</h4>
                  <p className="text-sm text-muted-foreground">
                    Insulting, harassing, or threatening other users
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-1">✗</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Spam or Self-Promotion</h4>
                  <p className="text-sm text-muted-foreground">
                    Advertising, promotional content, or repetitive posts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Type Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                Experience Type Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please select the experience type that best matches how you gained your knowledge:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Native</Badge>
                    <span className="text-sm font-semibold">I am from this country</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You grew up in or are a citizen of this country. Highest credibility for cultural insights.
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">Lived There</Badge>
                    <span className="text-sm font-semibold">I lived/worked there</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You spent extended time (6+ months) living or working in this country.
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500/10 text-purple-700 border-purple-500/20">Visited</Badge>
                    <span className="text-sm font-semibold">I visited there</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You visited as a tourist or for a short stay. Share what you observed during your visit.
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/20">Heard from Others</Badge>
                    <span className="text-sm font-semibold">I heard from others</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your knowledge comes from friends, family, or reliable sources. Please cite your source when possible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                If you see content that violates these guidelines, please use the <strong>Report</strong> button to flag it for review.
              </p>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-semibold mb-2">Our moderation team will review reports and take action including:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Warning the user</li>
                  <li>Removing the content</li>
                  <li>Temporarily or permanently suspending accounts for repeated violations</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> False or malicious reports may result in action against your account.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you have questions about these guidelines or concerns about specific content, please contact us.
              </p>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm">
                  <strong>Remember:</strong> CultureView is a learning platform. We all come from different backgrounds and have different perspectives. Let's keep our discussions educational, respectful, and grounded in genuine experiences.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Notice */}
        <div className="mt-12 p-6 rounded-lg bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground">
            By using CultureView, you agree to follow these community guidelines. We reserve the right to update these guidelines at any time.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}
