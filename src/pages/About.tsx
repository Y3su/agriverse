import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Heart, Sprout, Milestone, Calendar, Award, Leaf, Code, Palette, ClipboardList, TestTube, FileText } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const teamMembers = [
    { name: "Lourence Lariosa", roleKey: "aboutPage.leadDeveloper", icon: Code },
    { name: "John Michael Serdon", roleKey: "aboutPage.uiuxDesigner", icon: Palette },
    { name: "Brent Cruspe", roleKey: "aboutPage.projectManager", icon: ClipboardList },
    { name: "Dale Barro", roleKey: "aboutPage.tester", icon: TestTube },
    { name: "Nikolai Genesela", roleKey: "aboutPage.documenter", icon: FileText },
  ];

  const milestones = [
    { 
      year: "2019", 
      titleKey: "aboutPage.foundation", 
      descKey: "aboutPage.foundationDesc",
      icon: Milestone
    },
    { 
      year: "2020", 
      titleKey: "aboutPage.recognition", 
      descKey: "aboutPage.recognitionDesc",
      icon: Award
    },
    { 
      year: "2023", 
      titleKey: "aboutPage.growth", 
      descKey: "aboutPage.growthDesc",
      icon: Calendar
    },
    { 
      year: "Present", 
      titleKey: "aboutPage.impact", 
      descKey: "aboutPage.impactDesc",
      icon: Leaf
    },
  ];

  const values = [
    { icon: Users, titleKey: "aboutPage.unity", descKey: "aboutPage.unityDesc" },
    { icon: Target, titleKey: "aboutPage.empowerment", descKey: "aboutPage.empowermentDesc" },
    { icon: Heart, titleKey: "aboutPage.community", descKey: "aboutPage.communityDesc" },
    { icon: Sprout, titleKey: "aboutPage.sustainability", descKey: "aboutPage.sustainabilityDesc" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Agricultural landscape of Banaba Cerca, Indang, Cavite" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-agricultural/20 via-background/90 to-background" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <Badge variant="secondary" className="mb-2 sm:mb-4 bg-primary/10 text-primary border-primary/30">
              {t("aboutPage.badge")}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight break-words">
              <span className="block sm:inline">{t("aboutPage.heroTitle1")}</span>
              <span className="text-primary block mt-1 sm:mt-2">{t("aboutPage.heroTitle2")}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
              {t("aboutPage.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Brief About Section */}
      <section className="py-16 bg-agricultural/5 dark:bg-agricultural/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("aboutPage.whoWeAre")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("aboutPage.whoWeAreDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20 text-sm">
                {t("aboutPage.doleRegistered")}
              </Badge>
              <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20 text-sm">
                {t("aboutPage.secRegistered")}
              </Badge>
              <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20 text-sm">
                {t("aboutPage.location")}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <Card className="p-8 border-primary/20 bg-gradient-to-br from-background to-agricultural/5 dark:to-agricultural/10">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                  <Sprout className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t("aboutPage.visionTitle")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.visionDesc")}
                </p>
              </div>
            </Card>

            {/* Mission Card */}
            <Card className="p-8 border-primary/20 bg-gradient-to-br from-background to-agricultural/5 dark:to-agricultural/10">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t("aboutPage.missionTitle")}</h2>
                <ul className="text-muted-foreground leading-relaxed space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t("aboutPage.mission1")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t("aboutPage.mission2")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t("aboutPage.mission3")}</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-agricultural/5 dark:bg-agricultural/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                {t("aboutPage.storyBadge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("aboutPage.journeyTitle")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("aboutPage.journeyDesc")}
              </p>
            </div>
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={index} 
                      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10 ring-4 ring-background" />
                      
                      {/* Content */}
                      <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                        <Card className="p-6 hover:shadow-lg transition-all border-primary/20 bg-background">
                          <div className={`flex items-start gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                            </div>
                            <div className={isEven ? 'md:text-right' : ''}>
                              <Badge variant="default" className="mb-2 bg-primary text-primary-foreground">
                                {milestone.year}
                              </Badge>
                              <h3 className="text-xl font-semibold text-foreground mb-2">{t(milestone.titleKey)}</h3>
                              <p className="text-muted-foreground text-sm">{t(milestone.descKey)}</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("aboutPage.valuesTitle")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("aboutPage.valuesDesc")}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all border-primary/10 hover:border-primary/30">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-agricultural/10 dark:bg-agricultural/20 mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{t(value.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Agriverse Team Section */}
      <section className="py-16 bg-agricultural/5 dark:bg-agricultural/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                {t("aboutPage.developedBy")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Agriverse</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("aboutPage.agriverseDesc")}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {teamMembers.map((member, index) => {
                const Icon = member.icon;
                return (
                  <Card key={index} className="p-5 text-center hover:shadow-lg transition-all border-primary/10 hover:border-primary/30 bg-background">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{t(member.roleKey)}</p>
                  </Card>
                );
              })}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground italic">
                {t("aboutPage.teamQuote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;