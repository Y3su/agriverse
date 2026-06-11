import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Apple, Carrot, Beef, Wheat } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { t } = useLanguage();

  const categories = [
    { icon: Apple, nameKey: "faq.gettingStarted", color: "text-red-500" },
    { icon: Carrot, nameKey: "faq.buyingProcess", color: "text-orange-500" },
    { icon: Beef, nameKey: "faq.qualitySafety", color: "text-red-600" },
    { icon: Wheat, nameKey: "faq.sellerSupport", color: "text-yellow-600" }
  ];

  const faqs = [
    [
      { question: "How do I create an account?", answer: "Simply click the Sign Up button and follow the registration process." },
      { question: "Is registration required to browse?", answer: "You can browse the marketplace, but registration is required to make purchases." },
      { question: "What types of products are available?", answer: "We offer fresh fruits, vegetables, livestock, and grain products from local farmers." }
    ],
    [
      { question: "How do I place an order?", answer: "Browse products, add items to your cart, and proceed to checkout with your preferred payment method." },
      { question: "Can I contact sellers directly?", answer: "Yes, you can message sellers directly through our platform for any questions." },
      { question: "What payment methods are accepted?", answer: "We accept various payment methods, all processed securely through BCFIAC." }
    ],
    [
      { question: "How is product quality ensured?", answer: "All products are vetted by BCFIAC and our partner farmers maintain high quality standards." },
      { question: "What if I'm not satisfied with my purchase?", answer: "Contact us immediately and we'll work with the seller to resolve any quality issues." },
      { question: "Are products organic?", answer: "Many of our farmers practice organic farming. Product descriptions include farming method details." }
    ],
    [
      { question: "How do I become a seller?", answer: "Cooperative members can be added by our admin team. Contact BCFIAC for membership information." },
      { question: "How are seller payments processed?", answer: "Payments are processed through BCFIAC, with our commission deducted before transfer to sellers." },
      { question: "Can I track my sales?", answer: "Yes, sellers have access to inventory management and sales tracking tools." }
    ]
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="bg-agricultural-light text-agricultural-dark">
              {t("faq.badge")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t("faq.title1")}
              <br />
              <span className="text-primary">{t("faq.title2")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("faq.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Categories */}
            <div className="space-y-3">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={index}
                    variant={selectedCategory === index ? "default" : "ghost"}
                    className={`w-full justify-start p-4 h-auto ${
                      selectedCategory === index 
                        ? "bg-primary text-primary-foreground shadow-card" 
                        : "hover:bg-agricultural-light/50"
                    }`}
                    onClick={() => setSelectedCategory(index)}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${selectedCategory === index ? "text-primary-foreground" : category.color}`} />
                    <span className="font-medium">{t(category.nameKey)}</span>
                    <ChevronRight className={`h-4 w-4 ml-auto ${selectedCategory === index ? "rotate-90" : ""} transition-transform`} />
                  </Button>
                );
              })}
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-2 space-y-4">
              {faqs[selectedCategory].map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-card transition-shadow">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed pl-5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}