import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, UserCheck, ShoppingCart, AlertTriangle, Scale, Ban, Server, Lightbulb, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfService = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: UserCheck,
      titleKey: "terms.accountResponsibilities",
      contentKeys: [
        "terms.account1",
        "terms.account2",
        "terms.account3",
        "terms.account4",
        "terms.account5",
        "terms.account6"
      ]
    },
    {
      icon: ShoppingCart,
      titleKey: "terms.marketplace",
      contentKeys: [
        "terms.marketplace1",
        "terms.marketplace2",
        "terms.marketplace3",
        "terms.marketplace4",
        "terms.marketplace5",
        "terms.marketplace6"
      ]
    },
    {
      icon: Ban,
      titleKey: "terms.prohibited",
      contentKeys: [
        "terms.prohibited1",
        "terms.prohibited2",
        "terms.prohibited3",
        "terms.prohibited4",
        "terms.prohibited5",
        "terms.prohibited6",
        "terms.prohibited7",
        "terms.prohibited8"
      ]
    },
    {
      icon: Lightbulb,
      titleKey: "terms.ip",
      contentKeys: [
        "terms.ip1",
        "terms.ip2",
        "terms.ip3",
        "terms.ip4",
        "terms.ip5"
      ]
    },
    {
      icon: Server,
      titleKey: "terms.service",
      contentKeys: [
        "terms.service1",
        "terms.service2",
        "terms.service3",
        "terms.service4",
        "terms.service5"
      ]
    },
    {
      icon: AlertTriangle,
      titleKey: "terms.liability",
      contentKeys: [
        "terms.liability1",
        "terms.liability2",
        "terms.liability3",
        "terms.liability4",
        "terms.liability5"
      ]
    },
    {
      icon: Scale,
      titleKey: "terms.termination",
      contentKeys: [
        "terms.termination1",
        "terms.termination2",
        "terms.termination3",
        "terms.termination4",
        "terms.termination5"
      ]
    },
    {
      icon: RefreshCw,
      titleKey: "terms.changes",
      contentKeys: [
        "terms.changes1",
        "terms.changes2",
        "terms.changes3",
        "terms.changes4",
        "terms.changes5"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-4 md:mb-6 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.backToHome")}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{t("terms.title")}</h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              {t("terms.subtitle")}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
              {t("common.lastUpdated")}: January 6, 2026
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-6 md:mb-8 border-border/50">
            <CardContent className="p-4 md:p-6">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("terms.intro")}
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-4 md:space-y-6">
            {sections.map((section, index) => (
              <Card key={index} className="border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-muted/30 border-b border-border/50">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <h2 className="text-base md:text-lg font-semibold">{t(section.titleKey)}</h2>
                  </div>
                  <div className="p-3 md:p-4">
                    <ul className="space-y-2 md:space-y-3">
                      {section.contentKeys.map((key, itemIndex) => (
                        <li key={itemIndex} className="flex gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{t(key)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Governing Law */}
          <Card className="mt-6 md:mt-8 border-border/50">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3">{t("terms.governingLaw")}</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("terms.governingLawDesc")}
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="mt-4 md:mt-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{t("terms.questions")}</h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3">
                    {t("terms.questionsDesc")}
                  </p>
                  <a 
                    href="mailto:agriverseph@gmail.com" 
                    className="text-sm md:text-base text-primary hover:underline font-medium"
                  >
                    agriverseph@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;