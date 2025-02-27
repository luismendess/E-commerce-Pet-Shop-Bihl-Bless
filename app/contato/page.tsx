import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Entre em Contato
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Informações de Contato
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a
                      href="https://wa.me/5543998630784"
                      target="_blank"
                      className="hover:underline"
                    >
                      (43) 9 9863-0784
                    </a>
                    <span> | (43) 3338-8067</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:petshop.bihlbless@outlook.com"
                    className="hover:text-primary"
                  >
                    petshop.bihlbless@outlook.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <address className="not-italic">
                    R. Serra do Maracaju, 189
                    <br />
                    Bandeirantes - Londrina, PR
                    <br />
                    CEP: 86065-400
                  </address>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Redes Sociais</h2>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/bihl.bless.9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/petshopbihlbless/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Horário de Funcionamento
              </h2>
              <div className="space-y-2">
                <p>Segunda a Sexta: 9h às 19h</p>
                <p>Sábado: 9h às 17h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Como podemos ajudar?"
                className="min-h-[150px]"
              />
            </div>
            <Button className="w-full">Enviar Mensagem</Button>
          </div>
        </div>

        {/* Seção do Google Maps */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Localização</h2>
          <div className="w-full h-64">
            <iframe
              title="Localização da Loja"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.441481966264!2d-51.187091484785456!3d-23.31613068477552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd1b6b3432847%3A0x35367efc1426a2e7!2sR.%20Serra%20do%20Maracaju%2C%20189%20-%20Bandeirantes%2C%20Londrina%20-%20PR%2C%2086065-400!5e0!3m2!1spt-BR!2sbr!4v1685461264841!5m2!1spt-BR!2sbr"
              loading="lazy"
              className="w-full h-full rounded-md border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
