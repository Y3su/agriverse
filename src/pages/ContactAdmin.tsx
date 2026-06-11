import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ContactAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    subject: "Seller Request",
    message: "Hi, I would like to become a seller on AgriVerse.",
  });

  const formatEmailBody = (): string => {
    return `${formData.message}

---
From: ${formData.name}
Reply To: ${formData.email}
---`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: t("contact.missingFields"),
        description: t("contact.fillRequired"),
        variant: "destructive",
      });
      return;
    }

    const emailBody = formatEmailBody();
    
    // Use Gmail compose URL to open Gmail directly
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=agriverseph@gmail.com&su=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');

    toast({
      title: t("contact.openingGmail"),
      description: t("contact.gmailDesc"),
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-6 md:py-12 max-w-2xl">
          {/* Back Button */}
          <Link to="/marketplace">
            <Button variant="ghost" className="mb-4 md:mb-6 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.backToMarketplace")}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              {t("contact.title")}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground px-2">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Contact Form */}
          <Card className="shadow-md border-border/50">
            <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
              <CardTitle className="text-base md:text-lg">{t("contact.sendMessage")}</CardTitle>
              <CardDescription className="text-sm">
                {t("contact.formDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="name" className="text-sm">
                      {t("contact.yourName")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder={t("contact.namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="email" className="text-sm">
                      {t("contact.yourEmail")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="subject" className="text-sm">
                    {t("contact.subject")} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="subject"
                    placeholder={t("contact.subjectPlaceholder")}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="text-sm md:text-base"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="message" className="text-sm">
                    {t("contact.message")} <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[100px] md:min-h-[120px] resize-none text-sm md:text-base"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-sm md:text-base"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t("contact.sendMessage")}
                </Button>
              </form>

              <div className="mt-4 md:mt-5 p-2.5 md:p-3 bg-muted/50 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> {t("contact.note")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Direct Contact */}
          <Card className="mt-4 md:mt-5 bg-primary/5 border-primary/20">
            <CardContent className="p-3 md:p-4 flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs md:text-sm text-muted-foreground">
                {t("contact.directContact")}
              </p>
              <a 
                href="mailto:agriverseph@gmail.com" 
                className="text-xs md:text-sm text-primary hover:underline font-medium"
              >
                agriverseph@gmail.com
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactAdmin;