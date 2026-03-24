import { useLanguage } from "@/i18n/LanguageContext";
import { Instagram } from "lucide-react";

const VimeoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 0 0 3.501-3.123C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
  </svg>
);

const XiaohongshuIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.08 13.254h-2.14v-1.48h-1.2v1.48H10.6v-1.48H9.4v1.48H7.26v-1.2h1.08v-1.48H7.26v-1.2h1.08V9.894H7.26v-1.2H9.4v1.48h1.2v-1.48h2.14v1.48h1.2v-1.48h2.14v1.2h-1.08v1.48h1.08v1.2h-1.08v1.48h1.08v1.2zm-4.54-3.88h1.2v1.48h-1.2v-1.48zm-2.4 0h1.2v1.48H9.14v-1.48zm2.4-1.2H10.34v-1.48h1.2v1.48zm2.4 0h-1.2v-1.48h1.2v1.48zm-2.4 2.4h1.2v1.48h-1.2v-1.48zm-2.4 0h1.2v1.48H9.14v-1.48zm4.8 0h1.2v1.48h-1.2v-1.48zm0-2.4h1.2v1.48h-1.2v-1.48z"/>
  </svg>
);

const socialLinks = [
  { label: "Vimeo", url: "https://vimeo.com/user19098354?fl=pp&fe=sh", icon: VimeoIcon },
  { label: "Instagram", url: "https://www.instagram.com/rabbitvsbear?igsh=c3A5M3ZqZDNhaHVh&utm_source=qr", icon: Instagram },
  { label: "小红书", url: "https://xhslink.com/m/3DRP9qkCo88", icon: XiaohongshuIcon },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-12 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 active:text-blue-300 hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label={link.label}
            >
              <link.icon className="w-7 h-7" />
            </a>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} QINLONG&CHENJIE experiment animation. {t("footer", "rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
