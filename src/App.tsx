import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Bath, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Linkedin,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';

// --- Mock Data ---
const PROPERTIES = [
  {
    id: 1,
    title: "VERT VILA NOVA",
    address: "RUA BUENO BRANDÃO, 459",
    location: "Vila Nova Conceição - São Paulo/SP",
    description: "Uma sinfonia de vidro e concreto suspensa sobre a cidade.",
    price: "Sob consulta",
    area: "450m²",
    beds: "4 Suítes",
    baths: 6,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    category: "LANÇAMENTOS",
    badge: "EXCLUSIVO"
  },
  {
    id: 2,
    title: "LUMINE HIGH RESIDENCE",
    address: "RUA DOS PINHEIROS, 1200",
    location: "Campo Belo - São Paulo/SP",
    description: "Onde o minimalismo encontra a alma paulistana.",
    price: "Sob consulta",
    area: "320m²",
    beds: "3 Suítes",
    baths: 4,
    image: "https://images.unsplash.com/photo-1600607687940-4e7a6a953c14?auto=format&fit=crop&q=80&w=1600",
    category: "LANÇAMENTOS"
  },
  {
    id: 3,
    title: "RYT PAULISTA APARTMENTS",
    address: "AV. PAULISTA, 88",
    location: "Bela Vista - São Paulo/SP",
    description: "Um refúgio orgânico esculpido na natureza.",
    price: "Sob consulta",
    area: "600m²",
    beds: "5 Suítes",
    baths: 7,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
    category: "LANÇAMENTOS",
    badge: "HMP"
  },
  {
    id: 4,
    title: "ESSENCE JARDINS",
    address: "ALAMEDA LORENA, 1500",
    location: "Jardins - São Paulo/SP",
    description: "Exclusividade em cada detalhe.",
    price: "Sob consulta",
    area: "280m²",
    beds: "3 Suítes",
    baths: 5,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600",
    category: "BREVE LANÇAMENTO"
  },
  {
    id: 5,
    title: "SKYLINE PINHEIROS",
    address: "RUA DOS PINHEIROS, 500",
    location: "Pinheiros - São Paulo/SP",
    description: "Vista panorâmica para o pôr do sol mais bonito da cidade.",
    price: "Sob consulta",
    area: "180m²",
    beds: "2 Suítes",
    baths: 3,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1600",
    category: "EM CONSTRUÇÃO"
  },
  {
    id: 6,
    title: "LEGACY ITAIM",
    address: "RUA TABAPUÃ, 100",
    location: "Itaim Bibi - São Paulo/SP",
    description: "O novo marco do Itaim Bibi.",
    price: "Sob consulta",
    area: "550m²",
    beds: "4 Suítes",
    baths: 6,
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1600",
    category: "CONCLUÍDOS"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1800px] mx-auto px-8 flex justify-between items-center">
          {/* Left Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {['Empreendimentos', 'Sobre a Nogueira', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`} 
                className={`text-[10px] uppercase tracking-[0.4em] font-light transition-colors ${isScrolled ? 'text-brand-dark hover:text-brand-blue' : 'text-white/80 hover:text-white'}`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <img 
              src={isScrolled ? "https://i.postimg.cc/QF7xpLT3/logo-azul.png" : "https://i.postimg.cc/vghmcW6V/logo-branca.png"} 
              alt="Nogueira Vendas" 
              className="h-8 md:h-10 w-auto object-contain transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] uppercase tracking-[0.3em] font-light transition-all ${isScrolled ? 'border-brand-dark/10 text-brand-dark hover:bg-brand-dark hover:text-white' : 'border-white/20 text-white hover:bg-white hover:text-brand-dark'}`}>
              <span>Área dos Corretores</span>
              <ChevronRight size={10} className="rotate-90" />
            </div>
            
            <div className={`flex items-center gap-4 ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
              <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
              <button className="hidden lg:block hover:text-brand-blue transition-colors" onClick={() => setIsSideMenuOpen(true)}>
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 bg-white z-[60] p-8 flex flex-col gap-8"
            >
              <div className="flex justify-between items-center">
                <img 
                  src="https://i.postimg.cc/QF7xpLT3/logo-azul.png" 
                  alt="Nogueira Vendas" 
                  className="h-7 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              {['Empreendimentos', 'Sobre a Nogueira', 'Contato'].map((item) => (
                <a key={item} href="#" className="text-lg uppercase tracking-[0.3em] font-light text-brand-dark border-b border-gray-100 pb-4">{item}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Side Menu */}
      <AnimatePresence>
        {isSideMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSideMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 150 }}
              className="fixed top-0 right-0 h-full w-full md:w-[700px] lg:w-[900px] bg-black/40 backdrop-blur-[40px] z-[101] p-12 lg:p-24 text-white overflow-y-auto border-l border-white/5"
            >
              <button 
                onClick={() => setIsSideMenuOpen(false)}
                className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-500 border border-white/10 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <div className="flex flex-col gap-24 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  {/* Empreendimentos */}
                  <div className="space-y-10">
                    <h3 className="text-[10px] uppercase tracking-[0.6em] text-brand-blue font-light border-b border-white/10 pb-6">Empreendimentos</h3>
                    <ul className="space-y-5">
                      {['Todos os Empreendimentos', 'Breve Lançamento', 'Lançamento', 'Em Construção', 'Concluídos'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-sm uppercase tracking-[0.4em] hover:text-brand-blue transition-all duration-700 font-light opacity-60 hover:opacity-100 block">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Atendimento */}
                  <div className="space-y-10">
                    <h3 className="text-[10px] uppercase tracking-[0.6em] text-brand-blue font-light border-b border-white/10 pb-6">Atendimento</h3>
                    <ul className="space-y-5">
                      {['Fale Conosco', 'Trabalhe Conosco', 'Portal do Cliente', 'Corretores e Imobiliárias', 'Ouvidoria'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-sm uppercase tracking-[0.4em] hover:text-brand-blue transition-all duration-700 font-light opacity-60 hover:opacity-100 block">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Institucional - Occupying full width */}
                <div className="space-y-10">
                  <h3 className="text-[10px] uppercase tracking-[0.6em] text-brand-blue font-light border-b border-white/10 pb-6">Institucional</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                    {['Sobre a Nogueira', 'Portal LGPD', 'Forma', 'Hub On', 'Política de Privacidade', 'Linha de Ética', 'Termo de Uso'].map((item) => (
                      <div key={item}>
                        <a href="#" className="text-sm uppercase tracking-[0.4em] hover:text-brand-blue transition-all duration-700 font-light opacity-60 hover:opacity-100 block">{item}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                <img 
                  src="https://i.postimg.cc/vghmcW6V/logo-branca.png" 
                  alt="Nogueira Vendas" 
                  className="h-9 w-auto object-contain opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="flex gap-10 text-white/30">
                  <a href="https://www.instagram.com/nogueiravendadeimoveis/" target="_blank" rel="noopener noreferrer">
                    <Instagram size={18} className="hover:text-brand-blue cursor-pointer transition-all duration-500" />
                  </a>
                  <a href="https://www.facebook.com/nogueiracorretores" target="_blank" rel="noopener noreferrer">
                    <Facebook size={18} className="hover:text-brand-blue cursor-pointer transition-all duration-500" />
                  </a>
                  <a href="https://www.linkedin.com/company/nogueira-venda-de-imoveis/" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={18} className="hover:text-brand-blue cursor-pointer transition-all duration-500" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PROPERTIES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PROPERTIES.length) % PROPERTIES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-hero-bg">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={PROPERTIES[currentIndex].image} 
            alt={PROPERTIES[currentIndex].title} 
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-blue text-[10px] md:text-xs uppercase tracking-[0.6em] font-medium mb-4">
              {PROPERTIES[currentIndex].category}
            </span>
            <h1 className="text-5xl md:text-8xl font-thin text-white mb-4 tracking-[0.1em] uppercase">
              {PROPERTIES[currentIndex].title}
            </h1>
            <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.4em] font-light mb-12">
              {PROPERTIES[currentIndex].address}
            </p>
            
            <div className="flex items-center gap-8 w-full max-w-md">
              <div className="h-[1px] flex-1 bg-white/20" />
              <button className="px-10 py-3 bg-brand-blue text-white text-[10px] uppercase tracking-[0.3em] font-light rounded-full hover:bg-white hover:text-brand-blue transition-all duration-300 shadow-lg shadow-brand-blue/20">
                Conheça
              </button>
              <div className="h-[1px] flex-1 bg-white/20" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-12 left-0 w-full z-20 flex justify-center items-center gap-12">
        <button onClick={prevSlide} className="text-white/40 hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex items-center gap-3">
          {PROPERTIES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-8 h-1.5 bg-brand-blue' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white'}`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="text-white/40 hover:text-white transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Floating Contact Icons */}
      <div className="fixed right-6 bottom-10 z-50 flex flex-col gap-3">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-3"
        >
          <a 
            href="mailto:sergiomoura@hubnogueira.com.br" 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white hover:scale-110 hover:-rotate-6 transition-all duration-500 shadow-xl group"
            title="E-mail"
          >
            <Mail size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="tel:8130193333" 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-xl group"
            title="Telefone"
          >
            <Phone size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://wa.me/558130193333" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white hover:scale-110 hover:-rotate-6 transition-all duration-500 shadow-xl group"
            title="WhatsApp"
          >
            <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://meuprontopramorar.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 bg-[#f45e0b] rounded-full flex items-center justify-center text-white hover:scale-115 hover:rotate-12 transition-all duration-500 shadow-xl p-2 overflow-hidden border border-[#f45e0b]/20 group"
            title="Pronto pra Morar"
          >
            <img 
              src="https://meuprontopramorar.com.br/logo.svg" 
              alt="Pronto pra Morar" 
              className="w-full h-full object-contain brightness-0 invert group-hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface PropertyCardProps {
  property: typeof PROPERTIES[0];
  index: number;
  key?: number | string;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white border border-gray-100 rounded-[24px] overflow-hidden hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-700 flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden p-5">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover rounded-[18px] transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Badge like reference */}
        {property.badge && (
          <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-brand-blue/20 flex items-center justify-center shadow-lg">
            <span className="text-[9px] font-bold text-brand-blue tracking-tighter">{property.badge}</span>
          </div>
        )}

        <div className="absolute top-10 left-10">
          <span className="px-3 py-1 bg-brand-dark/80 backdrop-blur-md text-[8px] uppercase tracking-[0.2em] text-white font-light rounded-full">
            {property.category}
          </span>
        </div>
      </div>
      
      <div className="px-8 pt-2 pb-12 text-center flex flex-col items-center gap-2">
        <h3 className="text-xl font-medium text-brand-dark group-hover:text-brand-blue transition-colors tracking-[0.02em] uppercase">
          {property.title}
        </h3>
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-light">
          {property.location}
        </p>
        
        <div className="mt-8 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center gap-2 text-gray-500">
            <Maximize2 size={14} className="text-brand-blue/40" />
            <span className="text-[10px] font-light uppercase tracking-widest">{property.area}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <BedDouble size={14} className="text-brand-blue/40" />
            <span className="text-[10px] font-light uppercase tracking-widest">{property.beds}</span>
          </div>
          <button className="ml-4 px-6 py-2 bg-brand-blue text-white text-[9px] uppercase tracking-[0.2em] font-medium rounded-full hover:bg-brand-dark transition-colors shadow-lg shadow-brand-blue/20">
            Conhecer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Collection = () => {
  const [activeTab, setActiveTab] = useState('LANÇAMENTOS');
  const tabs = ['LANÇAMENTOS', 'BREVE LANÇAMENTO', 'EM CONSTRUÇÃO', 'CONCLUÍDOS'];

  const filteredProperties = PROPERTIES.filter(p => p.category === activeTab);

  return (
    <section id="empreendimentos" className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        {/* Header with Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-b border-gray-200 pb-4">
          <h2 className="text-xs uppercase tracking-[0.6em] text-gray-400 font-light">
            Destaques
          </h2>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] uppercase tracking-[0.2em] font-light transition-all relative pb-4 -mb-4 ${
                  activeTab === tab 
                    ? 'text-brand-dark font-medium' 
                    : 'text-gray-400 hover:text-brand-dark'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-blue"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} index={idx} />
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-20 text-center">
          <button className="px-10 py-4 border border-gray-200 rounded-full text-[10px] uppercase tracking-[0.3em] text-gray-500 font-light hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-500">
            Todos Empreendimentos
          </button>
        </div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section id="sobre-a-nogueira" className="relative py-32 bg-brand-blue text-white overflow-hidden">
      {/* Subtle architectural overlay */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Architecture Texture" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-white/30" />
              <span className="text-white/50 text-[10px] uppercase tracking-[0.5em] font-medium">Consultoria Estratégica</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-thin mb-10 leading-[1.1] uppercase tracking-tight text-white">
              Inteligência que <br />
              <span className="italic font-light text-white/90">transforma</span> <br />
              lançamentos.
            </h2>
            
            <div className="space-y-8 text-white/60 text-lg leading-relaxed font-light max-w-lg">
              <p>
                A Nogueira Vendas transcende o papel de uma imobiliária tradicional. Somos o braço estratégico das maiores incorporadoras do país.
              </p>
              <p>
                Nossa metodologia integra análise preditiva de mercado e curadoria de produto, garantindo que cada projeto nasça com o DNA do sucesso e exclusividade.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-12">
              <div className="border-l border-white/10 pl-8">
                <div className="text-6xl font-thin text-white mb-2">5+</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Anos de Expertise</div>
              </div>
              <div className="border-l border-white/10 pl-8">
                <div className="text-6xl font-thin text-white mb-2">R$ 1B+</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Volume de Vendas</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
                alt="Luxury Real Estate Business" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent" />
            </div>
            
            {/* Sophisticated Logo Placement removed as requested */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Comprar para Morar',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const bitrixUrl = "https://hubnogueira.bitrix24.com.br/rest/1326/d3x2401nf7j6sq8h/batch.json";
    
    const payload = {
      cmd: {
        contato: `crm.contact.add?fields[NAME]=${formData.name}&fields[PHONE][0][VALUE]=${formData.phone}&fields[PHONE][0][VALUE_TYPE]=WORK&fields[EMAIL][0][VALUE]=${formData.email}&fields[EMAIL][0][VALUE_TYPE]=WORK&fields[COMMENTS]=Interesse: ${formData.interest}. Mensagem: ${formData.message}`,
        negocio: `crm.deal.add?fields[TITLE]=Lead - ${formData.name}&fields[CATEGORY_ID]=16&fields[CONTACT_ID]=$result[contato]&fields[UF_CRM_1775571651119]=${formData.name}&fields[UF_CRM_1775572034300]=${formData.phone}&fields[UF_CRM_1775572268751]=${formData.email}&fields[UF_CRM_1726667595972]=Portal |  Nogueira Venda`
      }
    };

    try {
      const response = await fetch(bitrixUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: 'Comprar para Morar', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting to Bitrix:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-thin text-brand-dark mb-8 uppercase tracking-tight">Saiba qual <br /> imóvel comprar</h2>
            <p className="text-gray-500 text-base mb-12 max-w-md font-light">
              Nossos especialistas estão prontos para ajudar você a encontrar o imóvel ideal, seja para morar ou investir nos melhores lançamentos do mercado.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-brand-blue">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1 font-light">Endereço</div>
                  <div className="text-brand-dark font-light tracking-wide">
                    Rua Antonio Lumack do Monte n° 128 sala 1401 <br />
                    Rua Antonio Lumack do Monte n° 96 sala 1201
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-brand-blue">
                  <Instagram size={20} />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1 font-light">Social</div>
                  <a 
                    href="https://www.instagram.com/nogueiravendadeimoveis/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-dark font-light tracking-wide hover:text-brand-blue transition-colors"
                  >
                    @nogueiravendadeimoveis
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-8 md:p-12 relative">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <ArrowRight className="rotate-[-45deg]" size={32} />
                </div>
                <h3 className="text-2xl font-light text-brand-dark mb-2 uppercase tracking-widest">Solicitação Enviada</h3>
                <p className="text-gray-500 font-light">Em breve um de nossos consultores entrará em contato.</p>
                <button 
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[10px] uppercase tracking-[0.3em] text-brand-blue font-medium"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-light">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-brand-blue transition-colors font-light" 
                  placeholder="Seu nome" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-light">E-mail</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-brand-blue transition-colors font-light" 
                  placeholder="seu@email.com" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-light">Telefone</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-brand-blue transition-colors font-light" 
                  placeholder="(00) 00000-0000" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-light">Interesse</label>
                <select 
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-brand-blue transition-colors appearance-none font-light"
                >
                  <option>Comprar para Morar</option>
                  <option>Investimento Imobiliário</option>
                  <option>Lançamentos Exclusivos</option>
                  <option>Outros Interesses</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-light">Mensagem</label>
              <textarea 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-brand-blue transition-colors resize-none font-light" 
                placeholder="Como podemos ajudar?" 
              />
            </div>

            <button 
              disabled={status === 'loading'}
              className="w-full py-4 bg-brand-dark text-white uppercase tracking-[0.3em] text-[10px] font-light hover:bg-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">Ocorreu um erro. Tente novamente.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white/40 py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <img 
            src="https://i.postimg.cc/vghmcW6V/logo-branca.png" 
            alt="Nogueira Vendas" 
            className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          
          <div className="flex gap-8">
            <a href="https://www.instagram.com/nogueiravendadeimoveis/" target="_blank" rel="noopener noreferrer">
              <Instagram className="hover:text-brand-blue cursor-pointer transition-colors" size={20} />
            </a>
            <a href="https://www.facebook.com/nogueiracorretores" target="_blank" rel="noopener noreferrer">
              <Facebook className="hover:text-brand-blue cursor-pointer transition-colors" size={20} />
            </a>
            <a href="https://www.linkedin.com/company/nogueira-venda-de-imoveis/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="hover:text-brand-blue cursor-pointer transition-colors" size={20} />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
          <div className="space-y-4">
            <div className="text-white font-light uppercase tracking-[0.3em] text-[9px]">Institucional</div>
            <ul className="space-y-2 text-[11px] font-light">
              <li><a href="#" className="hover:text-white transition-colors">Hub On</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Axis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nogueira Venda de Imóveis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pronto pra Morar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CredIm</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-white font-light uppercase tracking-[0.3em] text-[9px]">Legal</div>
            <ul className="space-y-2 text-[11px] font-light">
              <li>
                <a 
                  href="https://portal-de-consulta-lgpd.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Lei Geral de Proteção de Dados
                </a>
              </li>
              <li>CRECI 17135-J</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-[9px] uppercase tracking-[0.4em] font-light">
          © 2026 Nogueira Vendas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="font-sans selection:bg-brand-blue selection:text-white">
      <Navbar />
      <Hero />
      <Collection />
      <Manifesto />
      <Contact />
      <Footer />
    </main>
  );
}
