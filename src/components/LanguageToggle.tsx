import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      onClick={() => setLanguage(language === "en" ? "tl" : "en")}
      className="flex items-center gap-2 h-9 px-3"
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold text-sm">
        {language === "en" ? "EN" : "TL"}
      </span>
    </Button>
  );
};
