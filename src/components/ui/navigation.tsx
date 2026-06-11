import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import bcfiacLogo from "@/assets/bcfiac-logo.png";
interface NavigationProps {
  variant?: "default" | "transparent";
  children?: React.ReactNode;
}
export function Navigation({
  variant = "default",
  children
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user,
    userRole,
    signOut
  } = useAuth();
  const {
    t
  } = useLanguage();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const navLinks = [{
    href: "/",
    label: t("nav.home")
  }, {
    href: "/marketplace",
    label: t("nav.marketplace")
  }, {
    href: "/about",
    label: t("nav.about")
  }];
  const userNavLinks = user ? [...(userRole === "seller" || userRole === "admin" || userRole === "superadmin" ? [{
    href: "/add-product",
    label: t("nav.sellProduct")
  }] : []), {
    href: "/my-orders",
    label: t("nav.myOrders")
  }, ...(userRole === "admin" || userRole === "superadmin" ? [{
    href: "/admin",
    label: t("nav.admin")
  }] : [])] : [];
  return <nav className={`w-full z-50 fixed top-0 left-0 right-0 ${variant === "transparent" ? "bg-transparent" : "bg-background/95 backdrop-blur-sm border-b"}`}>
      <div className="container mx-auto px-3 sm:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img alt="BCFIAC" className="h-10 sm:h-12 md:h-14 w-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:drop-shadow-none" src="/lovable-uploads/f960b5f8-af7c-4db7-ae5f-3d9d7ca79dba.png" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-4 xl:space-x-6">
            {navLinks.map(link => <Link key={link.href} to={link.href} className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md whitespace-nowrap ${variant === "transparent" ? "text-foreground dark:text-white hover:text-agricultural-light hover:bg-foreground/10 dark:hover:bg-white/10" : "text-foreground hover:bg-accent"}`}>
                {link.label}
              </Link>)}
          </div>

          {/* Auth Section - Fixed minimum width to prevent navigation shift */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-shrink-0 justify-end">
            <LanguageToggle />
            {children}
            <ThemeToggle />
            {user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={variant === "transparent" ? "secondary" : "ghost"} size="sm" className="flex items-center space-x-1.5 xl:space-x-2">
                    <User className="h-4 w-4" />
                    <span className="capitalize text-xs xl:text-sm">{userRole || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <Link to="/auth">
                <Button variant={variant === "transparent" ? "secondary" : "default"} size="sm" className="text-xs xl:text-sm">
                  {t("nav.signUp")}
                </Button>
              </Link>}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className={`${variant === "transparent" ? "text-foreground" : "text-foreground"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>

      </div>

      {/* Mobile Menu - Full width overlay with solid background */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[56px] sm:top-[64px] z-50 bg-background border-b border-border shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  className="text-base font-medium transition-colors hover:text-primary py-3 px-4 rounded-md text-foreground hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user && userNavLinks.map(link => (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  className="text-base font-medium transition-colors hover:text-primary py-3 px-4 rounded-md text-foreground hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-2 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground capitalize px-4">
                      Logged in as {userRole || 'User'}
                    </div>
                    <Button 
                      variant="outline" 
                      size="default" 
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }} 
                      className="w-full justify-start text-base py-3"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("nav.logout")}
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" size="default" className="w-full text-base py-3">
                      {t("nav.signUp")}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>;
}