import { useState } from 'react';
import Layout from '@/components/Layout';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, MessageCircle } from 'lucide-react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual form only - no backend
    alert('Obrigado pelo contato! Em breve retornaremos.');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <Layout>
      {/* Header */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="section-title text-center mb-4">Contato</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Entre em contato para informações sobre obras, exposições, 
            encomendas ou parcerias artísticas.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-light tracking-wider mb-8">Fale comigo</h2>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/5551999999999" target="_blank" rel="noopener noreferrer" className="whatsapp-btn text-lg mb-10 inline-flex">
                <MessageCircle size={24} />
                Conversar no WhatsApp
              </a>

              <div className="space-y-6 mb-10">
                <a href="mailto:contato@paulodearaujo.art.br" className="flex items-start gap-4 text-foreground hover:text-primary transition-colors group">EMAIL
paulodearaujo.arte@gmail.com <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      Email
                    </span>
                    <span>contato@paulodearaujo.art.br</span>
                  </div>
                </a>

                <a href="tel:+5551999999999" className="flex items-start gap-4 text-foreground hover:text-primary transition-colors group">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      Telefone
                    </span>
                    <span>+55 51 98484-6665</span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      Atelier
                    </span>
                    <span className="text-foreground">Porto Alegre, RS - Brasil

                    <br />
                      Cidade Baixa - Porto Alegre, RS<br />
                      CEP 90050-000
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  Redes Sociais
                </h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/atelierpaulodearaujo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="https://facebook.com/paulodearaujo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border p-6 lg:p-8 rounded-sm">
              <h2 className="text-2xl font-light tracking-wider mb-6">Envie uma Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Nome
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Seu nome completo" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Email
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="seu@email.com" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Assunto
                  </label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                    <option value="">Selecione um assunto</option>
                    <option value="purchase">Interesse em obra</option>
                    <option value="commission">Encomenda personalizada</option>
                    <option value="exhibition">Exposição / Parceria</option>
                    <option value="press">Imprensa</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Mensagem
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" placeholder="Escreva sua mensagem..." />
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground tracking-widest uppercase text-sm font-medium hover:bg-primary/90 transition-colors">
                  <Send size={18} />
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-80 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              Porto Alegre, RS - Brasil<br />
              <span className="text-sm"></span>
            </p>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Contact;