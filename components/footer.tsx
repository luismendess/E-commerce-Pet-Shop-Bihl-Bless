import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  PhoneIcon as WhatsApp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href="https://wa.me/5543998630784"
                  className="hover:underline"
                >
                  (43) 9 9863-0784
                </a>
                <span> | (43) 3338-8067</span>
              </div>

              <a
                href="mailto:petshop.bihlbless@outlook.com"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                petshop.bihlbless@outlook.com
              </a>
              <a
                href="https://wa.me/5543998630784"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaWhatsapp className="h-4 w-4" />
                Mande-nos uma mensagem no WhatsApp.
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Redes Sociais</h3>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/petshopbihlbless/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/bihl.bless.9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Links Úteis</h3>
            <div className="space-y-2">
              <Link href="/sobre" className="block">
                Sobre Nós
              </Link>
              <Link href="/politica-privacidade" className="block">
                Política de Privacidade
              </Link>
              <Link href="/termos-condicoes" className="block">
                Termos e Condições
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p>&copy; 2024 Pet Shop Bihl Bless. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
