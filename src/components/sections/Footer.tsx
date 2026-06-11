import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const memberColumns = [
    {
      titleKey: "footer.boardOfDirectors",
      members: ["Creus Rodrigo Alano", "Mojica Eduardo Rollo", "Alano Jaime Rupido", "Rupido Noel Callejas", "Mojica Marjo Pasion"]
    },
    {
      titleKey: "footer.officers", 
      members: ["Tapan Angelina Notario (Treasurer)", "Climacosa Edgardo Lucero (Secretary)"]
    },
    {
      titleKey: "footer.auditElection",
      members: ["Sicat Rolando Laylo (Audit)", "Cruzate Ignacia Fidel (Election)"]
    },
    {
      titleKey: "footer.committees",
      members: ["Dinglasan Edgar Rodil (Credit)", "Ronato Geronimo Mojica (Med-Con)", "Rodriguez Ramil Mojica (Ethics)", "Alano Reynaldo Mojica (GAD)"]
    }
  ];

  return (
    <footer className="bg-agricultural-dark text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <img src="/lovable-uploads/f960b5f8-af7c-4db7-ae5f-3d9d7ca79dba.png" alt="BCFIAC" className="h-12 w-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:drop-shadow-none" />
            <div>
              <h3 className="text-xl font-bold">BCFIAC</h3>
              <p className="text-sm opacity-80">Banaba Cerca Farmers and Irrigators Agriculture Cooperative</p>
            </div>
          </div>
          <p className="text-agricultural-light max-w-md leading-relaxed mb-4">
            {t("footer.description")}
          </p>
          <a 
            href="https://maps.app.goo.gl/PJRUUVGH4PQGYBa76" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-agricultural-light hover:text-white transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Brgy. Banaba Cerca, Indang, Cavite</span>
          </a>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {memberColumns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold text-agricultural-light mb-4">{t(column.titleKey)}</h4>
              <ul className="space-y-2">
                {column.members.map((member, memberIndex) => (
                  <li key={memberIndex} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AGRIVERSE Brand */}
        <div className="text-center py-12 border-t border-agricultural/30">
          <h2 className="text-6xl md:text-8xl font-bold opacity-20 mb-4">
            AGRIVERSE
          </h2>
          <p className="text-agricultural-light">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-agricultural/30">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/privacy-policy" className="text-sm hover:text-agricultural-light transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms-of-service" className="text-sm hover:text-agricultural-light transition-colors">
              {t("footer.terms")}
            </Link>
            <Link to="/contact-admin" className="text-sm hover:text-agricultural-light transition-colors">
              {t("footer.contact")}
            </Link>
          </div>
          <p className="text-sm opacity-60">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}