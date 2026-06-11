import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      setAnnouncements(data);
      setIsOpen(true);
    }
  };

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  if (announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-2 border-primary/20 gap-0">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-sm hover:bg-background rounded-full shadow-lg"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Navigation buttons for multiple announcements */}
          {announcements.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevAnnouncement}
                className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm hover:bg-background rounded-full shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextAnnouncement}
                className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm hover:bg-background rounded-full shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Featured Image */}
          {currentAnnouncement.image_url && (
            <div className="w-full h-72 bg-gradient-to-br from-primary/20 to-agricultural-light/20 overflow-hidden">
              <img
                src={currentAnnouncement.image_url}
                alt={currentAnnouncement.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-agricultural-light bg-clip-text text-transparent">
                {currentAnnouncement.title}
              </DialogTitle>
            </DialogHeader>
            
            <p className="text-center text-muted-foreground leading-relaxed">
              {currentAnnouncement.content}
            </p>

            {/* Pagination dots */}
            {announcements.length > 1 && (
              <div className="flex justify-center gap-2 pt-2">
                {announcements.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-muted'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
