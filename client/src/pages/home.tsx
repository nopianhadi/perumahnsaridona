import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { 
  MapPin, 
  Building2, 
  Phone, 
  Mail, 
  Clock,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Shield,
  TreeDeciduous,
  Dumbbell,
  ShoppingCart,
  GraduationCap,
  Hospital,
  Church,
  Users,
  Check
} from "lucide-react";
import heroImage from "@assets/generated_images/Modern_townhouse_complex_hero_7d918190.png";
import unit1Image from "@assets/generated_images/Townhouse_unit_type_1_ff4adf84.png";
import unit2Image from "@assets/generated_images/Townhouse_unit_type_2_ac5451f1.png";
import unit3Image from "@assets/generated_images/Townhouse_unit_type_3_751601dc.png";
import masterplanImage from "@assets/generated_images/Residential_masterplan_site_layout_a48edcbf.png";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { toast } = useToast();

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      nama: "",
      email: "",
      noTelepon: "",
      pesan: "",
    },
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "beranda", "tentang", "tipe-unit", "fasilitas", "lokasi", "kontak"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih atas minat Anda. Tim kami akan segera menghubungi Anda.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Gagal Mengirim",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    contactMutation.mutate(data);
  };

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang Kami" },
    { id: "tipe-unit", label: "Tipe Unit" },
    { id: "fasilitas", label: "Fasilitas" },
    { id: "lokasi", label: "Lokasi" },
    { id: "kontak", label: "Kontak" },
  ];

  const quickLinks = [
    { icon: MapPin, title: "Lokasi Strategis", description: "Akses mudah ke berbagai fasilitas umum", id: "lokasi" },
    { icon: Building2, title: "Tipe Unit Variatif", description: "Pilihan unit sesuai kebutuhan keluarga", id: "tipe-unit" },
    { icon: TreeDeciduous, title: "Fasilitas Lengkap", description: "Taman, keamanan 24 jam, dan lainnya", id: "fasilitas" },
    { icon: Phone, title: "Hubungi Kami", description: "Konsultasi gratis dengan tim kami", id: "kontak" },
  ];

  const unitTypes = [
    {
      name: "Tipe 36/72",
      image: unit1Image,
      luasTanah: "72 m²",
      luasBangunan: "36 m²",
      kamarTidur: 2,
      kamarMandi: 1,
      harga: "Mulai 500 Juta",
      features: ["Carport", "Taman Depan", "Dapur"]
    },
    {
      name: "Tipe 45/90",
      image: unit2Image,
      luasTanah: "90 m²",
      luasBangunan: "45 m²",
      kamarTidur: 2,
      kamarMandi: 2,
      harga: "Mulai 650 Juta",
      features: ["Carport", "Taman Depan & Belakang", "Ruang Keluarga Luas"]
    },
    {
      name: "Tipe 60/120",
      image: unit3Image,
      luasTanah: "120 m²",
      luasBangunan: "60 m²",
      kamarTidur: 3,
      kamarMandi: 2,
      harga: "Mulai 850 Juta",
      features: ["Carport 2 Mobil", "Taman Luas", "Balkon", "Ruang Makan Terpisah"]
    }
  ];

  const facilities = [
    { icon: Shield, label: "Keamanan 24 Jam" },
    { icon: TreeDeciduous, label: "Taman & RTH" },
    { icon: Dumbbell, label: "Fitness Center" },
    { icon: Users, label: "Community Center" },
    { icon: ShoppingCart, label: "Dekat Pusat Belanja" },
    { icon: GraduationCap, label: "Dekat Sekolah" },
    { icon: Hospital, label: "Dekat RS" },
    { icon: Church, label: "Tempat Ibadah" },
  ];

  const advantages = [
    "Lokasi strategis dengan akses mudah ke jalan tol",
    "Lingkungan asri dan hijau dengan banyak ruang terbuka",
    "Desain modern minimalis yang elegan",
    "Sistem keamanan terintegrasi 24/7",
    "Dekat dengan pusat pendidikan, kesehatan, dan perbelanjaan",
    "Harga kompetitif dengan skema pembayaran fleksibel"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2"
              data-testid="button-logo"
            >
              <Building2 className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg" data-testid="text-logo">Pacific Garden Puri</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                  data-testid={`link-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("kontak")}
                variant="default"
                className="ml-2"
                data-testid="button-contact-cta"
              >
                Hubungi Kami
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-border" data-testid="menu-mobile">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${
                    activeSection === item.id
                      ? "text-primary bg-accent"
                      : "text-foreground"
                  }`}
                  data-testid={`link-nav-mobile-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("kontak")}
                variant="default"
                className="w-full mt-2"
                data-testid="button-contact-cta-mobile"
              >
                Hubungi Kami
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Pacific Garden Puri"
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-20 text-center">
          {/* Promo Badge */}
          <Badge className="mb-6 bg-primary text-primary-foreground px-6 py-2 text-base font-bold" data-testid="badge-promo">
            <Sparkles className="w-4 h-4 mr-2" />
            VOUCHER DISCOUNT HINGGA 100 JUTA
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
            Pacific Garden Puri
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Hunian Modern Minimalis dengan Lokasi Strategis dan Fasilitas Lengkap
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("tipe-unit")}
              size="lg"
              variant="default"
              className="backdrop-blur-sm bg-primary/90 hover:bg-primary min-w-[200px]"
              data-testid="button-hero-explore"
            >
              Lihat Tipe Unit
            </Button>
            <Button
              onClick={() => scrollToSection("kontak")}
              size="lg"
              variant="outline"
              className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20 min-w-[200px]"
              data-testid="button-hero-contact"
            >
              Konsultasi Gratis
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("beranda")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
          data-testid="button-scroll-indicator"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </button>
      </section>

      {/* Beranda Section */}
      <section id="beranda" className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-beranda-title">
              Selamat Datang
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-beranda-subtitle">
              Temukan hunian impian Anda dengan berbagai pilihan tipe unit dan fasilitas premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => scrollToSection(link.id)}
                data-testid={`card-quick-link-${index}`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" data-testid={`icon-quick-link-${index}`}>
                    <link.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" data-testid={`text-quick-link-title-${index}`}>{link.title}</h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-quick-link-desc-${index}`}>{link.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section id="tentang" className="py-16 md:py-20 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-about-title">
                Tentang Pacific Garden Puri
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-description">
                Pacific Garden Puri adalah kompleks perumahan modern yang dirancang untuk memberikan
                kenyamanan maksimal bagi keluarga Indonesia. Terletak di lokasi strategis dengan akses
                mudah ke berbagai fasilitas penting.
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-xl mb-4" data-testid="text-about-advantages-title">Keunggulan Kami:</h3>
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`item-advantage-${index}`}>
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground" data-testid={`text-advantage-${index}`}>{advantage}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => scrollToSection("kontak")}
                size="lg"
                data-testid="button-about-contact"
              >
                Hubungi Kami Sekarang
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={masterplanImage}
                  alt="Masterplan Pacific Garden Puri"
                  className="w-full h-auto"
                  data-testid="img-masterplan"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg" data-testid="badge-units-available">
                <p className="text-4xl font-bold" data-testid="text-units-count">100+</p>
                <p className="text-sm" data-testid="text-units-label">Unit Tersedia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipe Unit Section */}
      <section id="tipe-unit" className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-units-title">
              Pilihan Tipe Unit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-units-subtitle">
              Berbagai pilihan tipe unit yang sesuai dengan kebutuhan dan budget keluarga Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unitTypes.map((unit, index) => (
              <Card key={index} className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-xl" data-testid={`card-unit-${index}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-unit-${index}`}
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold" data-testid={`badge-unit-price-${index}`}>
                    {unit.harga}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4" data-testid={`text-unit-name-${index}`}>{unit.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                    <div data-testid={`info-unit-land-${index}`}>
                      <p className="text-sm text-muted-foreground">Luas Tanah</p>
                      <p className="font-semibold" data-testid={`text-unit-land-${index}`}>{unit.luasTanah}</p>
                    </div>
                    <div data-testid={`info-unit-building-${index}`}>
                      <p className="text-sm text-muted-foreground">Luas Bangunan</p>
                      <p className="font-semibold" data-testid={`text-unit-building-${index}`}>{unit.luasBangunan}</p>
                    </div>
                    <div data-testid={`info-unit-bedrooms-${index}`}>
                      <p className="text-sm text-muted-foreground">Kamar Tidur</p>
                      <p className="font-semibold" data-testid={`text-unit-bedrooms-${index}`}>{unit.kamarTidur} Kamar</p>
                    </div>
                    <div data-testid={`info-unit-bathrooms-${index}`}>
                      <p className="text-sm text-muted-foreground">Kamar Mandi</p>
                      <p className="font-semibold" data-testid={`text-unit-bathrooms-${index}`}>{unit.kamarMandi} Kamar</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-medium" data-testid={`text-unit-features-title-${index}`}>Fasilitas:</p>
                    {unit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2" data-testid={`item-unit-feature-${index}-${idx}`}>
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground" data-testid={`text-unit-feature-${index}-${idx}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => scrollToSection("kontak")}
                    className="w-full"
                    data-testid={`button-unit-contact-${index}`}
                  >
                    Tanya Detail Unit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section id="fasilitas" className="py-16 md:py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-facilities-title">
              Fasilitas Terbaik untuk Hidup Nyaman
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto" data-testid="text-facilities-subtitle">
              Nikmati berbagai fasilitas premium yang dirancang untuk kenyamanan hidup Anda
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3"
                data-testid={`item-facility-${index}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center" data-testid={`icon-facility-${index}`}>
                  <facility.icon className="w-8 h-8" />
                </div>
                <p className="font-medium" data-testid={`text-facility-${index}`}>{facility.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi Section */}
      <section id="lokasi" className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-location-title">
              Lokasi Strategis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-location-subtitle">
              Terletak di area strategis dengan akses mudah ke berbagai fasilitas penting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-6" data-testid="container-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.20046281283!2d106.68942834218746!3d-6.229386799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Pacific Garden Puri"
                  data-testid="map-location"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4" data-testid="text-location-access-title">Akses Mudah ke:</h3>
                <div className="space-y-4">
                  {[
                    { label: "Jalan Tol", distance: "2 km" },
                    { label: "Pusat Perbelanjaan", distance: "3 km" },
                    { label: "Sekolah & Universitas", distance: "1.5 km" },
                    { label: "Rumah Sakit", distance: "2.5 km" },
                    { label: "Stasiun Commuter Line", distance: "4 km" },
                    { label: "Bandara", distance: "25 km" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-card"
                      data-testid={`item-location-access-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-medium" data-testid={`text-location-access-label-${index}`}>{item.label}</span>
                      </div>
                      <Badge variant="secondary" data-testid={`badge-location-distance-${index}`}>{item.distance}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-6" data-testid="card-address">
                <h4 className="font-semibold mb-2 flex items-center gap-2" data-testid="text-address-title">
                  <MapPin className="w-5 h-5 text-primary" />
                  Alamat
                </h4>
                <p className="text-muted-foreground" data-testid="text-address-content">
                  Jl. Pacific Garden Boulevard<br />
                  Puri Kembangan, Jakarta Barat<br />
                  DKI Jakarta 11610
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-16 md:py-20 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-contact-title">
              Hubungi Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
              Tertarik dengan Pacific Garden Puri? Hubungi kami untuk informasi lebih lanjut
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama lengkap"
                            {...field}
                            data-testid="input-nama"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="nama@email.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noTelepon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="08xx xxxx xxxx"
                            {...field}
                            data-testid="input-telepon"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pesan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pesan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tulis pesan atau pertanyaan Anda..."
                            rows={5}
                            {...field}
                            data-testid="input-pesan"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="space-y-6">
              <Card className="p-6" data-testid="card-contact-info">
                <h3 className="font-semibold text-xl mb-4" data-testid="text-contact-info-title">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3" data-testid="item-contact-phone">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium" data-testid="text-contact-phone-label">Telepon</p>
                      <p className="text-muted-foreground" data-testid="text-contact-phone-1">+62 21 1234 5678</p>
                      <p className="text-muted-foreground" data-testid="text-contact-phone-2">+62 812 3456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3" data-testid="item-contact-email">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium" data-testid="text-contact-email-label">Email</p>
                      <p className="text-muted-foreground" data-testid="text-contact-email-1">info@pacificgardenpuri.com</p>
                      <p className="text-muted-foreground" data-testid="text-contact-email-2">sales@pacificgardenpuri.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3" data-testid="item-contact-hours">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium" data-testid="text-contact-hours-label">Jam Operasional</p>
                      <p className="text-muted-foreground" data-testid="text-contact-hours-1">Senin - Jumat: 09.00 - 17.00 WIB</p>
                      <p className="text-muted-foreground" data-testid="text-contact-hours-2">Sabtu - Minggu: 09.00 - 15.00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3" data-testid="item-contact-address">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium" data-testid="text-contact-address-label">Marketing Office</p>
                      <p className="text-muted-foreground" data-testid="text-contact-address-content">
                        Jl. Pacific Garden Boulevard<br />
                        Puri Kembangan, Jakarta Barat<br />
                        DKI Jakarta 11610
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground" data-testid="card-promo">
                <h3 className="font-semibold text-xl mb-3" data-testid="text-promo-title">Promo Spesial!</h3>
                <p className="mb-4" data-testid="text-promo-description">
                  Dapatkan voucher discount hingga 100 Juta untuk pembelian unit di bulan ini!
                </p>
                <p className="text-sm text-primary-foreground/90" data-testid="text-promo-terms">
                  *Syarat dan ketentuan berlaku
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4" data-testid="footer-logo">
                <Building2 className="w-6 h-6" />
                <span className="font-bold text-lg" data-testid="text-footer-logo">Pacific Garden Puri</span>
              </div>
              <p className="text-primary-foreground/90 text-sm" data-testid="text-footer-description">
                Hunian modern minimalis dengan lokasi strategis dan fasilitas lengkap untuk keluarga Indonesia.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4" data-testid="text-footer-nav-title">Navigasi Cepat</h4>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-sm text-primary-foreground/90 hover:text-primary-foreground hover-elevate active-elevate-2 rounded px-2 py-1 text-left"
                    data-testid={`link-footer-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4" data-testid="text-footer-contact-title">Kontak Kami</h4>
              <div className="space-y-2 text-sm text-primary-foreground/90">
                <p data-testid="text-footer-phone">+62 21 1234 5678</p>
                <p data-testid="text-footer-email">info@pacificgardenpuri.com</p>
                <p data-testid="text-footer-address">Jl. Pacific Garden Boulevard,<br />Jakarta Barat</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/90">
            <p data-testid="text-footer-copyright">&copy; 2025 Pacific Garden Puri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
