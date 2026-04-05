import Link from 'next/link'
import { LatticeFrame } from "@/components/ui/lattice-frame"

{/* Heritage/Culture View */}
          {activeSection === "culture" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-sm" />
                AAPI Heritage Resources
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "East Asian Heritage", regions: "China, Japan, Korea", icon: "🏯" },
                  { title: "Southeast Asian Heritage", regions: "Vietnam, Philippines, Thailand", icon: "🛕" },
                  { title: "South Asian Heritage", regions: "India, Pakistan, Bangladesh", icon: "🕌" },
                  { title: "Pacific Islander Heritage", regions: "Hawaii, Samoa, Fiji", icon: "🏝️" },
                  { title: "Central Asian Heritage", regions: "Kazakhstan, Uzbekistan", icon: "⛺" },
                  { title: "AAPI History", regions: "Immigration & Civil Rights", icon: "📚" },
                ].map((resource) => (
                  <LatticeFrame key={resource.title} variant="default" size="sm">
                    <Link href={`/heritage/${resource.title.toLowerCase().replace(/ /g, '-')}`}>
                      <div className="p-4 bg-card rounded-sm hover:bg-muted/30 transition-colors cursor-pointer">
                        <div className="text-3xl mb-3">{resource.icon}</div>
                        <h3 className="font-serif font-semibold">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{resource.regions}</p>
                      </div>
                    </Link>
                  </LatticeFrame>
                ))}
              </div>
            </div>
          )}
