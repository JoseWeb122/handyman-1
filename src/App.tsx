import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight,
  Clock, Drill, Hammer, HeartHandshake, Home, ImagePlus, Leaf, Mail, MapPin, Menu, MessageSquare,
  PaintRoller, Phone, Ruler, SearchCheck, ShieldCheck, Sparkles, Star, User, Wrench, X,
  DoorOpen, Sofa, ClipboardList, Send, CheckCircle2, Quote, Share2, AtSign, Globe
} from "lucide-react";

/* ---------- IMAGES ---------- */
const IMG = {
  hero: "https://images.pexels.com/photos/6473978/pexels-photo-6473978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1400",
  heroSmall: "https://images.pexels.com/photos/7285920/pexels-photo-7285920.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  craftLarge: "https://images.pexels.com/photos/8961339/pexels-photo-8961339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
  craft1: "https://images.pexels.com/photos/11427055/pexels-photo-11427055.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  craft2: "https://images.pexels.com/photos/6473982/pexels-photo-6473982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  quote: "https://images.pexels.com/photos/5974365/pexels-photo-5974365.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  interior: "https://images.pexels.com/photos/6238684/pexels-photo-6238684.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  kitchen: "https://images.pexels.com/photos/5524068/pexels-photo-5524068.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

const SERVICES = [
  { id:"repairs", num:"01", title:"General Home Repairs", desc:"Get help with everyday household repairs, adjustments, and maintenance tasks.", long:"Everyday fixes handled carefully — from minor damage and loose fittings to the small jobs that have been waiting on your list. Share what needs attention and Brian will talk through the most practical next step.", includes:["Minor wall & surface repairs","Fixture tightening & adjustments","Small carpentry fixes","Punch-list help"], img:"https://images.pexels.com/photos/6790808/pexels-photo-6790808.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", icon: Wrench },
  { id:"painting", num:"02", title:"Painting & Wall Repairs", desc:"Refresh your living spaces with wall touch-ups, painting, and surface repairs.", long:"A fresh coat and a smooth wall can change how a room feels. Help with prep, touch-ups, patching and interior painting — discussed room by room so the finish matches your home.", includes:["Interior touch-ups & repainting","Drywall patching & smoothing","Trim & detail painting","Colour-refresh projects"], img:"https://images.pexels.com/photos/5798972/pexels-photo-5798972.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", icon: PaintRoller },
  { id:"furniture", num:"03", title:"Furniture Assembly", desc:"Professional assistance putting together furniture and getting your space organized.", long:"Flat-pack, ready-to-assemble and custom pieces — assembled carefully, levelled and placed where you want it, with packaging tidied away. One piece or a whole room.", includes:["Flat-pack assembly","Beds, wardrobes & shelving","Desk & storage setup","Anchoring & levelling"], img:"https://images.pexels.com/photos/6232443/pexels-photo-6232443.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", icon: Sofa },
  { id:"doors", num:"04", title:"Doors & Hardware", desc:"Door adjustments, hardware installation, and everyday fixture improvements.", long:"Sticking doors, loose handles and dated hardware are small frustrations with simple fixes. Adjustments, replacements and new fittings installed neatly and tested before we leave.", includes:["Door alignment & adjustments","Handles, hinges & locks*","Cabinet hardware","Fixture replacements"], img:"https://images.pexels.com/photos/9051071/pexels-photo-9051071.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", icon: DoorOpen },
  { id:"improvements", num:"05", title:"Home Improvements", desc:"Practical improvements that make your home more comfortable and functional.", long:"The upgrades that make daily life easier — shelving, storage, mounting and finishing touches that make a house feel more complete. Tell us the outcome you want; we'll find the practical route.", includes:["Shelving & storage","TV & fixture mounting","Finishing details","Room refresh projects"], img:"https://images.pexels.com/photos/15124970/pexels-photo-15124970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon: Home },
  { id:"maintenance", num:"06", title:"General Maintenance", desc:"Routine maintenance and small projects that help keep your home in great condition.", long:"Stay ahead of wear and tear with routine checks and small seasonal jobs handled in one visit. Build a list — we'll work through it methodically.", includes:["Seasonal home check-ups","Caulking & sealing touch-ups","Minor exterior tasks","Ongoing punch lists"], img:"https://images.pexels.com/photos/7647233/pexels-photo-7647233.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", icon: ClipboardList },
];

type GalleryItem = { title:string; cat:string; catLabel:string; desc:string; img:string; tall?:boolean };
const GALLERY: GalleryItem[] = [
  { title:"Fresh Interior Painting", cat:"painting", catLabel:"Painting", desc:"Walls prepped, taped and rolled for a clean, even finish in a bright living space.", img:"https://images.pexels.com/photos/7218683/pexels-photo-7218683.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100", tall:true },
  { title:"Precision Repair Work", cat:"repairs", catLabel:"Repairs", desc:"Detailed repair work carried out with the right tools and a tidy workspace.", img:"https://images.pexels.com/photos/6473968/pexels-photo-6473968.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { title:"Hinge & Hardware Fitting", cat:"installation", catLabel:"Installation", desc:"New hardware fitted, aligned and tested for smooth everyday use.", img:"https://images.pexels.com/photos/7285919/pexels-photo-7285919.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { title:"Open-Plan Living Refresh", cat:"improvements", catLabel:"Improvements", desc:"A warm, modern living space finished with thoughtful detail work.", img: IMG.interior, tall:true },
  { title:"Two-Tone Wall Refresh", cat:"painting", catLabel:"Painting", desc:"A playful, careful repaint that gives a family room a whole new feel.", img:"https://images.pexels.com/photos/7218007/pexels-photo-7218007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { title:"Carpentry Repairs", cat:"repairs", catLabel:"Repairs", desc:"Timber measured, drilled and finished for a repair that blends right in.", img:"https://images.pexels.com/photos/5974387/pexels-photo-5974387.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { title:"Custom Build & Assembly", cat:"installation", catLabel:"Installation", desc:"Pieces built and assembled piece-by-piece for a result that lasts.", img:"https://images.pexels.com/photos/7285926/pexels-photo-7285926.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", tall:true },
  { title:"Kitchen Finishing Touches", cat:"improvements", catLabel:"Improvements", desc:"Bright kitchen improvements — practical, clean and made for daily life.", img: IMG.kitchen },
];

const TESTIMONIALS = [
  { quote:"Sample review placeholder — replace with a genuine customer review before launch. This space is reserved for real words from real homeowners Brian has helped.", name:"Customer Name — Placeholder", detail:"Project type · Town (to be added)", stars:5 },
  { quote:"Sample review placeholder — a short, specific story about the repair, the communication, and how the finished work felt at home will live here.", name:"Customer Name — Placeholder", detail:"Project type · Town (to be added)", stars:5 },
  { quote:"Sample review placeholder — add verified reviews here once collected. No ratings or testimonials have been fabricated for this demonstration.", name:"Customer Name — Placeholder", detail:"Project type · Town (to be added)", stars:5 },
];

const FAQS = [
  { q:"What types of handyman services do you offer?", a:"BTH can help with general home repairs, painting & wall repairs, furniture assembly, doors & hardware, practical home improvements and general maintenance. The service list on this site shows example categories — share your specific job in the quote form and Brian will confirm how he can help." },
  { q:"How do I request a quote?", a:"Use the 'Request My Free Quote' form on this page. Tell us your name, how to reach you, the type of service and a short description of the project. You can also note your preferred contact method and an ideal date. This demo form doesn't send to a real inbox yet — before launch it will be connected to Brian's email." },
  { q:"Can I request help with multiple repairs?", a:"Yes — that's very common. List everything in the project description, even small items. Combining jobs into one visit is often the most practical approach, and it helps Brian plan time and any materials in advance." },
  { q:"Do I need to provide materials?", a:"It depends on the job. Some homeowners already have paint, hardware or furniture ready to go; for other projects, materials can be discussed first. Mention what you already have in your quote request and Brian will advise on the rest — no assumptions are made here." },
  { q:"How do I know if my location is covered?", a:"Service coverage depends on Brian's current service area, which will be confirmed here before launch. Send a quote request mentioning your town or area, or use the 'Check Service Availability' section, and availability will be confirmed directly with you." },
  { q:"How far in advance should I schedule?", a:"It varies by project size and current bookings. Small repairs are often easier to fit in; larger improvements benefit from more notice. Share your preferred date in the form — even an approximate one helps — and Brian will discuss realistic timing with you." },
  { q:"How can I contact Brian?", a:"The quickest way is the quote form on this page. Direct phone and email details will be published here once confirmed for launch, so the contact information you see is always accurate." },
];

/* ---------- HELPERS ---------- */
function scrollToId(id:string){ document.getElementById(id)?.scrollIntoView({behavior:"smooth", block:"start"}); }

function Reveal({children, className="", delay=""}:{children:React.ReactNode; className?:string; delay?:string}){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.classList.add("is-visible"); io.disconnect(); } },{threshold:.12});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

function Logo({dark=false}:{dark?:boolean}){
  return (
    <button onClick={()=>scrollToId("home")} className="flex items-center gap-3 text-left shrink-0" aria-label="Brian The Handyman Services — home">
      <span className="relative grid h-11 w-11 place-items-center rounded-[14px] bg-[#496B52] text-[#F4F0E6] shadow-lg shadow-[#496B52]/25">
        <Hammer className="h-5 w-5" strokeWidth={2.2}/>
        <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#B58C66] text-[8px] font-extrabold tracking-tighter text-white ring-2 ring-[#F4F0E6]">B</span>
      </span>
      <span className="leading-none">
        <span className={`block font-display-d text-[19px] font-bold tracking-tight ${dark?"text-[#F4F0E6]":"text-[#263E30]"}`}>BTH <span className="text-[#B58C66]">•</span> Brian</span>
        <span className={`mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] ${dark?"text-[#A5B59D]":"text-[#74796F]"}`}>The Handyman Services</span>
      </span>
    </button>
  );
}

function Eyebrow({children, light=false}:{children:React.ReactNode; light?:boolean}){
  return <p className={`flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] ${light?"text-[#A5B59D]":"text-[#496B52]"}`}><span className={`h-px w-8 ${light?"bg-[#A5B59D]":"bg-[#B58C66]"}`}/>{children}</p>;
}

/* ---------- APP ---------- */
export default function App(){
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeService, setActiveService] = useState<typeof SERVICES[0] | null>(null);
  const [selectedService, setSelectedService] = useState("General Home Repairs");
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [testi, setTesti] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [toast, setToast] = useState("");

  useEffect(()=>{ const f=()=>setScrolled(window.scrollY>24); f(); window.addEventListener("scroll",f,{passive:true}); return ()=>window.removeEventListener("scroll",f); },[]);
  useEffect(()=>{ document.body.style.overflow = (mobileOpen || activeService || lightbox!==null) ? "hidden" : ""; return ()=>{document.body.style.overflow="";} },[mobileOpen, activeService, lightbox]);

  const filtered = filter==="all" ? GALLERY : GALLERY.filter(g=>g.cat===filter);
  const requestService = useCallback((title:string)=>{ setSelectedService(title); setActiveService(null); setTimeout(()=>scrollToId("quote"),80); showToast(`${title} selected in the quote form`); },[]);
  function showToast(msg:string){ setToast(msg); window.setTimeout(()=>setToast(""),3200); }

  // lightbox keyboard
  useEffect(()=>{
    if(lightbox===null) return;
    const h=(e:KeyboardEvent)=>{ if(e.key==="Escape") setLightbox(null); if(e.key==="ArrowRight") setLightbox(v=> v===null? v : (v+1)%filtered.length); if(e.key==="ArrowLeft") setLightbox(v=> v===null? v : (v-1+filtered.length)%filtered.length); };
    window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h);
  },[lightbox, filtered.length]);

  const nav = [{label:"Home",id:"home"},{label:"Services",id:"services"},{label:"About",id:"about"},{label:"Our Work",id:"work"},{label:"FAQ",id:"faq"}];
  const go=(id:string)=>{ setMobileOpen(false); setTimeout(()=>scrollToId(id), mobileOpen?120:0); };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#292D29] antialiased selection:bg-[#496B52]">
      {/* Toast */}
      {toast && <div className="fixed left-1/2 top-24 z-[90] -translate-x-1/2 animate-fadeIn"><div className="flex items-center gap-2 rounded-full bg-[#263E30] px-4 py-2.5 text-sm font-semibold text-white shadow-2xl"><CheckCircle2 className="h-4 w-4 text-[#A5B59D]"/>{toast}</div></div>}

      {/* ===== NAV ===== */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled?"bg-[#F4F0E6]/92 shadow-[0_10px_40px_rgba(38,62,48,0.10)] backdrop-blur-xl":"bg-[#F4F0E6]/70 backdrop-blur-md"}`}>
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo/>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map(n=> <button key={n.id} onClick={()=>go(n.id)} className="rounded-full px-4 py-2 text-[14px] font-semibold text-[#3c423c] transition hover:bg-white/70 hover:text-[#263E30]">{n.label}</button>)}
          </nav>
          <div className="flex items-center gap-2.5">
            <button onClick={()=>go("quote")} className="hidden items-center gap-2 rounded-full bg-[#496B52] py-3 pl-5 pr-4 text-sm font-bold text-white shadow-lg shadow-[#496B52]/25 transition hover:bg-[#263E30] sm:flex">Get a Free Quote <ArrowRight className="h-4 w-4"/></button>
            <button onClick={()=>setMobileOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-[#263E30]/10 bg-white/80 lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5"/></button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#496B52]/25 to-transparent"/>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-[#263E30]/45 backdrop-blur-sm" onClick={()=>setMobileOpen(false)}/>
          <div className="animate-slideIn absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[#F4F0E6] p-6 shadow-2xl">
            <div className="flex items-center justify-between"><Logo/><button onClick={()=>setMobileOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Close menu"><X className="h-5 w-5"/></button></div>
            <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
              {nav.map((n,i)=> <button key={n.id} onClick={()=>go(n.id)} className="flex items-center justify-between rounded-2xl px-4 py-4 text-left font-display-d text-2xl font-semibold text-[#263E30] hover:bg-white"><span>{n.label}</span><span className="text-xs font-sans font-bold text-[#B58C66]">0{i+1}</span></button>)}
            </nav>
            <button onClick={()=>go("quote")} className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#496B52] py-4 font-bold text-white">Request a Free Quote <ArrowRight className="h-4 w-4"/></button>
            <p className="mt-4 text-center text-xs leading-relaxed text-[#74796F]">Reliable Service. Quality Work.<br/>Peace of Mind.</p>
          </div>
        </div>
      )}

      <main id="home">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden pt-[76px]">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#A5B59D]/25 blur-3xl"/>
          <div className="pointer-events-none absolute -left-52 top-72 h-[420px] w-[420px] rounded-full bg-[#B58C66]/15 blur-3xl"/>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="flex flex-col justify-center lg:col-span-6">
              <Reveal><div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#496B52]/20 bg-white/70 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#496B52]"><Sparkles className="h-3.5 w-3.5 text-[#B58C66]"/> Brian The Handyman Services</div></Reveal>
              <Reveal delay="reveal-delay-1"><h1 className="mt-6 font-display-d text-[52px] font-semibold leading-[0.98] tracking-tight text-[#263E30] sm:text-[68px] lg:text-[76px]">Your Home<br/>Deserves<br/><span className="font-serif-d italic font-medium text-[#496B52]">A Helping Hand.</span></h1></Reveal>
              <Reveal delay="reveal-delay-2"><p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#5f665e]">From everyday repairs to home improvements, Brian delivers dependable handyman services with attention to detail and pride in every project.</p></Reveal>
              <Reveal delay="reveal-delay-3">
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button onClick={()=>scrollToId("quote")} className="group flex items-center gap-2.5 rounded-full bg-[#496B52] py-4 pl-6 pr-5 text-[15px] font-bold text-white shadow-xl shadow-[#496B52]/25 transition hover:bg-[#263E30]">Request a Free Quote <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition group-hover:translate-x-0.5"><ArrowRight className="h-3.5 w-3.5"/></span></button>
                  <button onClick={()=>scrollToId("services")} className="rounded-full border border-[#263E30]/15 bg-white/70 px-6 py-4 text-[15px] font-bold text-[#263E30] transition hover:border-[#496B52]/40 hover:bg-white">Explore Our Services</button>
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-[#263E30]/10 pt-6">
                  <div className="flex -space-x-1">{[ShieldCheck, BadgeCheck, HeartHandshake].map((Icon,i)=><span key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#F4F0E6] bg-[#EAE5D8] text-[#496B52]"><Icon className="h-4 w-4"/></span>)}</div>
                  <p className="text-sm font-semibold text-[#3c423c]">Reliable Service. Quality Work. <span className="text-[#74796F] font-medium">Peace of Mind.</span></p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay="reveal-delay-1">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[36px] border border-[#496B52]/15 hidden sm:block"/>
                  <div className="group relative overflow-hidden rounded-[28px] shadow-2xl shadow-[#263E30]/25 sm:rounded-[32px]">
                    <img src={IMG.hero} alt="Professional handyman sanding a wall during a home renovation" className="img-zoom aspect-[4/3.4] w-full object-cover sm:aspect-[4/3]" loading="eager"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#263E30]/35 via-transparent to-transparent"/>
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#263E30] backdrop-blur"><span className="h-2 w-2 rounded-full bg-[#496B52] animate-pulse"/> Now discussing new projects</div>
                  </div>
                  {/* overlapping card */}
                  <div className="relative z-10 mx-4 -mt-10 rounded-3xl bg-[#263E30] p-5 text-white shadow-2xl sm:absolute sm:bottom-6 sm:left-6 sm:right-auto sm:mx-0 sm:mt-0 sm:w-[320px] sm:p-6 grain overflow-hidden">
                    <div className="flex items-start gap-3.5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#496B52]"><Ruler className="h-5 w-5 text-[#DCE5D8]"/></span>
                      <div><p className="font-display-d text-lg font-semibold leading-tight">Quality Workmanship</p><p className="mt-1 text-sm leading-relaxed text-white/70">Every project deserves attention to detail.</p></div>
                    </div>
                    <button onClick={()=>scrollToId("about")} className="mt-4 flex items-center gap-1.5 text-sm font-bold text-[#A5B59D] hover:text-white">See how Brian works <ArrowUpRight className="h-4 w-4"/></button>
                  </div>
                  <div className="animate-float absolute -right-2 top-8 hidden rounded-2xl bg-white p-3.5 shadow-xl sm:block lg:-right-4">
                    <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#74796F]"><Hammer className="h-3.5 w-3.5 text-[#B58C66]"/> This week</p>
                    <p className="mt-1 font-display-d text-base font-bold text-[#263E30]">Repairs · Painting · Assembly</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Trust strip */}
          <div className="relative border-y border-[#263E30]/10 bg-[#EAE5D8]/70">
            <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
              {[{icon:Clock,t:"Dependable Service",d:"Help you can count on"},{icon:SearchCheck,t:"Attention to Detail",d:"Finished properly, checked twice"},{icon:Hammer,t:"Professional Workmanship",d:"Care in every task"},{icon:HeartHandshake,t:"Customer-Focused Approach",d:"Built around your home"}].map((x,i)=>(
                <div key={x.t} className={`flex items-center gap-3.5 px-5 py-6 sm:px-7 ${i!==0?"border-l border-[#263E30]/8":""} ${i>=2?"max-lg:border-t max-lg:border-[#263E30]/8":""} ${i===2?"max-lg:border-l-0":""}`}>
                  <x.icon className="h-6 w-6 shrink-0 text-[#496B52]" strokeWidth={1.7}/>
                  <div className="min-w-0"><p className="truncate text-sm font-extrabold text-[#263E30]">{x.t}</p><p className="truncate text-xs text-[#74796F]">{x.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="services" className="scroll-mt-24 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal><div><Eyebrow>What we can help with</Eyebrow><h2 className="mt-4 max-w-xl font-display-d text-4xl font-semibold leading-[1.05] tracking-tight text-[#263E30] sm:text-5xl">Making Home Maintenance <span className="font-serif-d italic font-medium text-[#496B52]">Easier.</span></h2></div></Reveal>
              <Reveal delay="reveal-delay-1"><p className="max-w-md text-[15px] leading-relaxed text-[#74796F]">Whether it's a small repair or a home improvement project, get the help you need to keep your home looking and working its best.</p></Reveal>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s,i)=>(
                <Reveal key={s.id} delay={i%3===1?"reveal-delay-1":i%3===2?"reveal-delay-2":""}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#263E30]/8 bg-white shadow-[0_10px_35px_rgba(38,62,48,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(38,62,48,0.13)]">
                    <div className="relative overflow-hidden">
                      <img src={s.img} alt={s.title} loading="lazy" className="img-zoom aspect-[16/10] w-full object-cover"/>
                      <span className="absolute left-4 top-4 rounded-full bg-[#F4F0E6]/95 px-3 py-1 text-[11px] font-extrabold tracking-widest text-[#496B52]">SERVICE {s.num}</span>
                      <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#263E30]/90 text-white backdrop-blur transition group-hover:bg-[#496B52]"><s.icon className="h-4.5 w-4.5"/></span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display-d text-[22px] font-semibold text-[#263E30]">{s.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#74796F]">{s.desc}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-dashed border-[#263E30]/10 pt-4">
                        <button onClick={()=>setActiveService(s)} className="flex items-center gap-1.5 text-sm font-extrabold text-[#496B52] hover:gap-2.5 transition-all">Learn More <ArrowRight className="h-4 w-4"/></button>
                        <button onClick={()=>requestService(s.title)} className="text-sm font-bold text-[#9A7554] hover:text-[#263E30]">Request this →</button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal><p className="mt-6 text-center text-xs text-[#74796F]">Service categories shown as examples — final offerings to be confirmed by Brian before launch. <button onClick={()=>scrollToId("quote")} className="font-bold text-[#496B52] underline underline-offset-2">Ask about your project →</button></p></Reveal>
          </div>
        </section>

        {/* ===== CRAFTSMANSHIP / ABOUT ===== */}
        <section id="about" className="relative scroll-mt-24 overflow-hidden bg-[#EAE5D8]/60 py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%] bg-[#496B52] hidden lg:block" style={{clipPath:"polygon(18% 0,100% 0,100% 100%,0 100%)"}}/>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="relative">
                    <div className="overflow-hidden rounded-[28px] shadow-2xl shadow-[#263E30]/20 group"><img src={IMG.craftLarge} alt="Handyman drilling timber on a renovation project" loading="lazy" className="img-zoom aspect-[16/11] w-full object-cover"/></div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="overflow-hidden rounded-3xl group"><img src={IMG.craft1} alt="Applying plaster to a wall" loading="lazy" className="img-zoom aspect-[16/10] w-full object-cover"/></div>
                      <div className="overflow-hidden rounded-3xl group"><img src={IMG.craft2} alt="Measuring a wall during renovation" loading="lazy" className="img-zoom aspect-[16/10] w-full object-cover"/></div>
                    </div>
                    <div className="absolute -top-4 right-5 rounded-full bg-[#B58C66] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg rotate-2">Done with care</div>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-5 lg:pl-4">
                <Reveal><Eyebrow light={false}>Featured craftsmanship</Eyebrow></Reveal>
                <Reveal delay="reveal-delay-1"><h2 className="mt-4 font-display-d text-4xl font-semibold leading-[1.05] text-[#263E30] sm:text-5xl lg:text-white">Good Work Shows in the <span className="font-serif-d italic font-medium text-[#496B52] lg:text-[#DCE5D8]">Details.</span></h2></Reveal>
                <Reveal delay="reveal-delay-2">
                  <p className="mt-5 text-[16px] leading-relaxed text-[#5f665e] lg:text-white/75">Every home has its own needs. The goal is simple: provide practical solutions, take care of the details, and leave every project looking its best.</p>
                  <ul className="mt-7 space-y-3.5">
                    {["Measured, levelled and finished properly","Clean, respectful work in your home","Practical advice — no unnecessary upsells"].map(t=> <li key={t} className="flex items-start gap-3 text-[15px] font-semibold text-[#263E30] lg:text-white"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#496B52] lg:bg-white/15"><Check className="h-3 w-3 text-white"/></span>{t}</li>)}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={()=>scrollToId("quote")} className="rounded-full bg-[#263E30] px-6 py-3.5 font-bold text-white shadow-lg transition hover:bg-[#496B52] lg:bg-[#F4F0E6] lg:text-[#263E30] lg:hover:bg-white">Let's Discuss Your Project</button>
                    <button onClick={()=>scrollToId("work")} className="rounded-full border border-[#263E30]/20 px-6 py-3.5 font-bold text-[#263E30] lg:border-white/30 lg:text-white">See examples ↓</button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE ===== */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><div className="mx-auto max-w-2xl text-center"><Eyebrow><span className="mx-auto">Why choose BTH</span></Eyebrow><h2 className="mt-4 font-display-d text-4xl font-semibold text-[#263E30] sm:text-5xl">Reliable Help. <span className="font-serif-d italic font-medium text-[#496B52]">Thoughtful Workmanship.</span></h2></div></Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[{n:"01",icon:User,t:"Personal Attention",d:"Every project deserves care, communication, and attention to detail."},{n:"02",icon:Wrench,t:"Practical Solutions",d:"Straightforward help for the repairs and improvements your home needs."},{n:"03",icon:BadgeCheck,t:"Quality-Focused Work",d:"A commitment to doing the job carefully and professionally."},{n:"04",icon:MessageSquare,t:"Easy Communication",d:"Clear communication from the first inquiry through project completion."}].map((c,i)=>(
                <Reveal key={c.t} delay={i===1?"reveal-delay-1":i===2?"reveal-delay-2":""}>
                  <div className="group h-full rounded-[24px] border border-[#263E30]/8 bg-white p-6 shadow-[0_8px_30px_rgba(38,62,48,0.05)] transition hover:-translate-y-1 hover:border-[#496B52]/30">
                    <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EAE5D8] text-[#496B52] transition group-hover:bg-[#496B52] group-hover:text-white"><c.icon className="h-5 w-5"/></span><span className="font-display-d text-sm font-bold text-[#B58C66]">{c.n}</span></div>
                    <h3 className="mt-5 font-display-d text-xl font-semibold text-[#263E30]">{c.t}</h3><p className="mt-2 text-sm leading-relaxed text-[#74796F]">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section id="work" className="scroll-mt-24 bg-white/50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal><div><Eyebrow>Project gallery</Eyebrow><h2 className="mt-4 font-display-d text-4xl font-semibold text-[#263E30] sm:text-5xl">Real Work. <span className="font-serif-d italic font-medium text-[#496B52]">Beautiful Results.</span></h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-[#74796F]">Visual placeholders representing the kind of work BTH helps with — to be replaced with Brian's own project photos before launch.</p></div></Reveal>
              <Reveal delay="reveal-delay-1">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
                  {[{k:"all",l:"All Projects"},{k:"repairs",l:"Repairs"},{k:"painting",l:"Painting"},{k:"installation",l:"Installation"},{k:"improvements",l:"Improvements"}].map(f=> <button key={f.k} onClick={()=>{setFilter(f.k); setLightbox(null);}} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${filter===f.k?"bg-[#263E30] text-white shadow-lg":"bg-white text-[#5f665e] border border-[#263E30]/10 hover:border-[#496B52]/40"}`}>{f.l}</button>)}
                </div>
              </Reveal>
            </div>

            <div key={filter} className="mt-10 columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4 [column-fill:balance]">
              {filtered.map((g,i)=>(
                <button key={g.title} onClick={()=>setLightbox(i)} className="group relative block w-full break-inside-avoid overflow-hidden rounded-[22px] text-left shadow-md animate-fadeIn" style={{animationDelay:`${i*60}ms`}}>
                  <img src={g.img} alt={g.title} loading="lazy" className={`img-zoom w-full object-cover ${g.tall?"aspect-[3/4]":"aspect-[4/3]"}`}/>
                  <span className="absolute inset-0 bg-gradient-to-t from-[#263E30]/85 via-[#263E30]/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"/>
                  <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A5B59D]">{g.catLabel}</span><span className="block font-display-d text-lg font-semibold text-white">{g.title}</span><span className="mt-0.5 flex items-center gap-1 text-xs font-bold text-white/80">View project <ArrowUpRight className="h-3.5 w-3.5"/></span></span>
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#496B52] backdrop-blur">{g.catLabel}</span>
                </button>
              ))}
            </div>
            {filtered.length===0 && <p className="py-16 text-center text-[#74796F]">No projects in this category yet.</p>}
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><div className="text-center"><Eyebrow><span className="mx-auto">Simple process</span></Eyebrow><h2 className="mt-4 font-display-d text-4xl font-semibold text-[#263E30] sm:text-5xl">Getting Help Is <span className="font-serif-d italic font-medium text-[#496B52]">Simple.</span></h2></div></Reveal>
            <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
              <div className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-[#A5B59D]/60 md:block"/>
              {[{n:"01",t:"Tell Us What You Need",d:"Share a few details about your repair or home improvement project.",icon:ClipboardList},{n:"02",t:"Discuss Your Project",d:"Connect with Brian to discuss the work, requirements, and next steps.",icon:MessageSquare},{n:"03",t:"Get the Job Done",d:"Move forward with a practical solution for your home.",icon:CheckCircle2}].map((s,i)=>(
                <Reveal key={s.n} delay={i===1?"reveal-delay-1":i===2?"reveal-delay-2":""}>
                  <div className="relative text-center">
                    <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#496B52] text-white shadow-xl shadow-[#496B52]/25 ring-8 ring-[#F4F0E6]"><s.icon className="h-6 w-6"/></div>
                    <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#B58C66]">Step {s.n}</p>
                    <h3 className="mt-2 font-display-d text-[22px] font-semibold text-[#263E30]">{s.t}</h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#74796F]">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal><div className="mt-12 text-center"><button onClick={()=>scrollToId("quote")} className="rounded-full bg-[#263E30] px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-[#496B52]">Start with Step 1 — it's free</button></div></Reveal>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="bg-[#EAE5D8]/70 py-20 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal><Eyebrow>Customer stories</Eyebrow><h2 className="mt-4 font-display-d text-4xl font-semibold leading-tight text-[#263E30] sm:text-5xl">Peace of Mind Starts With the <span className="font-serif-d italic font-medium text-[#496B52]">Right Help.</span></h2><p className="mt-4 text-sm leading-relaxed text-[#74796F]">Genuine customer reviews will be featured here before launch. The cards shown are clearly-labelled placeholders — no reviews have been fabricated.</p>
                <div className="mt-7 flex gap-2.5">
                  <button onClick={()=>setTesti((testi-1+TESTIMONIALS.length)%TESTIMONIALS.length)} className="grid h-12 w-12 place-items-center rounded-full border border-[#263E30]/15 bg-white transition hover:bg-[#263E30] hover:text-white" aria-label="Previous testimonial"><ChevronLeft className="h-5 w-5"/></button>
                  <button onClick={()=>setTesti((testi+1)%TESTIMONIALS.length)} className="grid h-12 w-12 place-items-center rounded-full bg-[#496B52] text-white shadow-lg transition hover:bg-[#263E30]" aria-label="Next testimonial"><ChevronRight className="h-5 w-5"/></button>
                  <div className="ml-2 flex items-center gap-1.5">{TESTIMONIALS.map((_,i)=><button key={i} onClick={()=>setTesti(i)} aria-label={`Go to testimonial ${i+1}`} className={`h-2 rounded-full transition-all ${i===testi?"w-7 bg-[#496B52]":"w-2 bg-[#263E30]/20"}`}/>)}</div>
                </div></Reveal>
              </div>
              <div className="lg:col-span-7">
                <Reveal delay="reveal-delay-1">
                  <div key={testi} className="animate-fadeIn relative rounded-[28px] bg-white p-7 shadow-xl shadow-[#263E30]/8 sm:p-9">
                    <Quote className="h-9 w-9 text-[#A5B59D]"/>
                    <div className="mt-4 flex gap-1">{Array.from({length:TESTIMONIALS[testi].stars}).map((_,i)=><Star key={i} className="h-4.5 w-4.5 fill-[#B58C66] text-[#B58C66]"/>) }<span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#9A7554]">Sample placeholder</span></div>
                    <p className="mt-4 font-serif-d text-[21px] italic leading-relaxed text-[#3c423c] sm:text-[23px]">“{TESTIMONIALS[testi].quote}”</p>
                    <div className="mt-7 flex items-center gap-3.5 border-t border-dashed border-[#263E30]/10 pt-5">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EAE5D8] font-display-d font-bold text-[#496B52]">{TESTIMONIALS[testi].name.charAt(0)}</span>
                      <div><p className="font-bold text-[#263E30]">{TESTIMONIALS[testi].name}</p><p className="text-xs text-[#74796F]">{TESTIMONIALS[testi].detail}</p></div>
                      <span className="ml-auto hidden text-xs font-bold text-[#74796F] sm:block">{testi+1} / {TESTIMONIALS.length}</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SERVICE AREA ===== */}
        <ServiceArea onCheck={(msg)=>showToast(msg)} />

        {/* ===== QUOTE ===== */}
        <QuoteSection selectedService={selectedService} onServiceChange={setSelectedService} onDone={()=>showToast("Quote request prepared — thank you!")} />

        {/* ===== FAQ ===== */}
        <section id="faq" className="scroll-mt-24 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal><Eyebrow>Questions, answered</Eyebrow><h2 className="mt-4 font-display-d text-4xl font-semibold text-[#263E30] sm:text-5xl">Everything You're <span className="font-serif-d italic font-medium text-[#496B52]">Wondering.</span></h2><p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#74796F]">Can't find your answer? Send a quote request with your question — Brian will reply when confirming your project details.</p><button onClick={()=>scrollToId("quote")} className="mt-6 rounded-full bg-[#496B52] px-6 py-3.5 font-bold text-white shadow-lg hover:bg-[#263E30]">Ask a question →</button></Reveal>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-3.5">
                  {FAQS.map((f,i)=>{ const open=openFaq===i; return (
                    <Reveal key={f.q} delay={i<3?`reveal-delay-${i}` as any:""}>
                      <div className={`overflow-hidden rounded-[22px] border transition ${open?"border-[#496B52]/35 bg-white shadow-lg":"border-[#263E30]/8 bg-white/70 hover:bg-white"}`}>
                        <button onClick={()=>setOpenFaq(open?null:i)} aria-expanded={open} className="flex w-full items-center gap-4 px-6 py-5 text-left">
                          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${open?"bg-[#496B52] text-white":"bg-[#EAE5D8] text-[#496B52]"}`}>{String(i+1).padStart(2,"0")}</span>
                          <span className="flex-1 font-display-d text-[17px] font-semibold text-[#263E30] sm:text-lg">{f.q}</span>
                          <ChevronDown className={`h-5 w-5 shrink-0 text-[#496B52] transition duration-300 ${open?"rotate-180":""}`}/>
                        </button>
                        <div className={`grid transition-all duration-300 ${open?"grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><p className="px-6 pb-6 pl-[72px] text-sm leading-relaxed text-[#5f665e]">{f.a}</p></div></div>
                      </div>
                    </Reveal>);})}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <Reveal>
            <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#263E30] px-6 py-16 text-center shadow-2xl sm:px-12 lg:py-20">
              <img src={IMG.interior} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"/>
              <div className="absolute inset-0 bg-gradient-to-b from-[#263E30]/60 via-transparent to-[#1E3327]/80"/>
              <div className="relative">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur"><Leaf className="h-6 w-6 text-[#A5B59D]"/></span>
                <h2 className="mx-auto mt-6 max-w-3xl font-display-d text-4xl font-semibold leading-[1.05] text-[#F4F0E6] sm:text-5xl lg:text-6xl">Your Next Home Project <span className="font-serif-d italic font-medium text-[#A5B59D]">Starts Here.</span></h2>
                <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">From the small things on your to-do list to the improvements you've been planning, let's get started.</p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <button onClick={()=>scrollToId("quote")} className="rounded-full bg-[#F4F0E6] px-7 py-4 font-bold text-[#263E30] shadow-xl transition hover:bg-white">Request a Free Quote</button>
                  <button onClick={()=>scrollToId("services")} className="rounded-full border border-white/25 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10">View Our Services</button>
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">No obligation · Clear communication · Quality workmanship</p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1E3327] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo dark/>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">Dependable handyman services focused on practical home repairs, thoughtful improvements, and quality workmanship.</p>
              <div className="mt-6 flex gap-2.5">
                {[{icon:Share2,l:"Facebook"},{icon:AtSign,l:"Instagram"},{icon:Globe,l:"Website"}].map(s=> <button key={s.l} onClick={()=>showToast(`${s.l} link placeholder — to be added before launch`)} aria-label={s.l} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 transition hover:bg-[#496B52]"><s.icon className="h-4 w-4"/></button>)}
              </div>
              <p className="mt-3 text-[11px] text-white/40">Social links are placeholders until Brian's accounts are confirmed.</p>
            </div>
            <div className="lg:col-span-2"><h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A5B59D]">Quick Links</h4><ul className="mt-5 space-y-3 text-sm font-semibold text-white/75">{nav.map(n=><li key={n.id}><button onClick={()=>go(n.id)} className="hover:text-white">{n.label}</button></li>)}<li><button onClick={()=>go("quote")} className="hover:text-white">Get a Quote</button></li></ul></div>
            <div className="lg:col-span-3"><h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A5B59D]">Our Services</h4><ul className="mt-5 space-y-3 text-sm font-semibold text-white/75">{SERVICES.map(s=><li key={s.id}><button onClick={()=>requestService(s.title)} className="hover:text-white">{s.title}</button></li>)}</ul></div>
            <div className="lg:col-span-3"><h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A5B59D]">Contact</h4><ul className="mt-5 space-y-3.5 text-sm text-white/75">
              <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#A5B59D]"/><span>Phone — <em className="text-white/50 not-italic">to be added before launch</em></span></li>
              <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#A5B59D]"/><span>Email — <em className="text-white/50 not-italic">to be added before launch</em></span></li>
              <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A5B59D]"/><span>Service area — <em className="text-white/50 not-italic">confirm via quote form</em></span></li>
              <li className="flex gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#A5B59D]"/><span>Hours — <em className="text-white/50 not-italic">to be confirmed</em></span></li></ul>
              <button onClick={()=>go("quote")} className="mt-6 rounded-full bg-[#496B52] px-5 py-3 text-sm font-bold hover:bg-[#F4F0E6] hover:text-[#263E30] transition">Request a Free Quote</button>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row">
            <p>© {new Date().getFullYear()} Brian The Handyman Services (BTH). All rights reserved.</p>
            <p>Front-end demonstration — quote form does not yet send to a real inbox.</p>
            <button onClick={()=>scrollToId("home")} className="font-bold text-[#A5B59D] hover:text-white">Back to top ↑</button>
          </div>
        </div>
      </footer>

      {/* ===== SERVICE MODAL ===== */}
      {activeService && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={activeService.title}>
          <div className="absolute inset-0 bg-[#263E30]/55 backdrop-blur-sm" onClick={()=>setActiveService(null)}/>
          <div className="animate-fadeIn relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] bg-[#F4F0E6] shadow-2xl sm:rounded-[28px]">
            <div className="relative"><img src={activeService.img} alt={activeService.title} className="aspect-[16/8] w-full object-cover"/><button onClick={()=>setActiveService(null)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg" aria-label="Close"><X className="h-5 w-5"/></button><span className="absolute bottom-4 left-5 rounded-full bg-[#263E30]/90 px-3 py-1 text-[11px] font-extrabold tracking-widest text-white">SERVICE {activeService.num}</span></div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display-d text-3xl font-semibold text-[#263E30]">{activeService.title}</h3>
              <p className="mt-3 leading-relaxed text-[#5f665e]">{activeService.long}</p>
              <h4 className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[#496B52]">Commonly included</h4>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">{activeService.includes.map(x=><li key={x} className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#3c423c]"><Check className="h-4 w-4 shrink-0 text-[#496B52]"/>{x}</li>)}</ul>
              <p className="mt-4 text-xs text-[#74796F]">* Lock & security work subject to confirmation. Final scope confirmed with Brian before any work begins.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={()=>requestService(activeService.title)} className="flex-1 rounded-full bg-[#496B52] py-4 font-bold text-white shadow-lg hover:bg-[#263E30] min-w-[200px]">Request This Service</button>
                <button onClick={()=>setActiveService(null)} className="rounded-full border border-[#263E30]/15 bg-white px-6 py-4 font-bold">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== LIGHTBOX ===== */}
      {lightbox!==null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-[#141f18]/97 backdrop-blur" role="dialog" aria-modal="true" aria-label="Project viewer">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#A5B59D]">{filtered[lightbox].catLabel} · {lightbox+1} / {filtered.length}</span>
            <button onClick={()=>setLightbox(null)} className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#263E30]" aria-label="Close viewer"><X className="h-5 w-5"/></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20">
            <button onClick={()=>setLightbox((lightbox-1+filtered.length)%filtered.length)} className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg sm:left-6" aria-label="Previous project"><ChevronLeft className="h-5 w-5"/></button>
            <figure key={filtered[lightbox].title} className="animate-fadeIn w-full max-w-4xl">
              <img src={filtered[lightbox].img} alt={filtered[lightbox].title} className="max-h-[62vh] w-full rounded-[24px] object-cover shadow-2xl"/>
              <figcaption className="mx-auto mt-5 max-w-2xl text-center"><h3 className="font-display-d text-2xl font-semibold text-white">{filtered[lightbox].title}</h3><p className="mt-1.5 text-sm leading-relaxed text-white/65">{filtered[lightbox].desc}</p><p className="mt-2 text-[11px] uppercase tracking-wider text-white/35">Visual placeholder — replace with Brian's project photo</p></figcaption>
            </figure>
            <button onClick={()=>setLightbox((lightbox+1)%filtered.length)} className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg sm:right-6" aria-label="Next project"><ChevronRight className="h-5 w-5"/></button>
          </div>
          <div className="flex justify-center gap-2 pb-6">{filtered.map((_,i)=><button key={i} onClick={()=>setLightbox(i)} aria-label={`View project ${i+1}`} className={`h-2 rounded-full transition-all ${i===lightbox?"w-8 bg-[#A5B59D]":"w-2 bg-white/25"}`}/>)}</div>
        </div>
      )}
    </div>
  );
}

/* ---------- SERVICE AREA ---------- */
function ServiceArea({onCheck}:{onCheck:(m:string)=>void}){
  const [place, setPlace] = useState(""); const [result, setResult] = useState<null | {ok:boolean; msg:string}>(null); const [checking,setChecking]=useState(false);
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); if(!place.trim()){ setResult({ok:false,msg:"Please enter your town, suburb or area first."}); return; } setChecking(true); setResult(null); setTimeout(()=>{ setChecking(false); setResult({ok:true,msg:`Thank you — "${place.trim()}" has been noted. Brian's confirmed service area will be published before launch, so please also mention your location in a quote request and availability will be confirmed directly with you.`}); onCheck("Location noted — please confirm via your quote request"); },700); };
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[32px] bg-[#263E30] lg:grid-cols-2 grain relative">
          {/* map-inspired visual */}
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-[480px]">
            <img src={IMG.interior} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25"/>
            <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(165,181,157,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(165,181,157,.18) 1px, transparent 1px)", backgroundSize:"44px 44px"}}/>
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 600 480" fill="none" preserveAspectRatio="none"><path d="M-20 340 C120 300 180 380 300 320 S480 180 640 220" stroke="#A5B59D" strokeWidth="14" strokeLinecap="round" opacity=".35"/><path d="M80 -20 C140 120 90 240 180 480" stroke="#F4F0E6" strokeWidth="8" opacity=".25"/><path d="M-20 140 C160 170 320 90 640 150" stroke="#F4F0E6" strokeWidth="6" opacity=".2"/></svg>
            {[{x:"22%",y:"30%",l:"Your neighbourhood"},{x:"58%",y:"52%",l:"Surrounding suburbs"},{x:"76%",y:"24%",l:"Nearby towns"}].map((p,i)=>(
              <div key={p.l} className="absolute" style={{left:p.x, top:p.y}}><span className="animate-float relative grid h-11 w-11 place-items-center rounded-full bg-[#F4F0E6] text-[#496B52] shadow-xl" style={{animationDelay:`${i*0.7}s`}}><MapPin className="h-5 w-5"/></span><span className="mt-2 block -translate-x-1/4 whitespace-nowrap rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">{p.l}</span></div>
            ))}
            <span className="absolute bottom-5 left-5 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white/80 ring-1 ring-white/15 backdrop-blur">Map-inspired visual · Coverage to be confirmed</span>
          </div>
          <div className="relative p-7 sm:p-10 lg:p-12">
            <Reveal><Eyebrow light>Service area</Eyebrow><h2 className="mt-4 font-display-d text-4xl font-semibold leading-tight text-[#F4F0E6] sm:text-[42px]">Helping Homeowners Take Better Care of Their Homes.</h2><p className="mt-4 leading-relaxed text-white/70">Looking for dependable handyman help? Get in touch to discuss your project and confirm service availability in your area.</p>
            <form onSubmit={submit} className="mt-7">
              <label htmlFor="area-input" className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#A5B59D]">Your town / area</label>
              <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1"><MapPin className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/40"/><input id="area-input" value={place} onChange={e=>setPlace(e.target.value)} placeholder="e.g. Your suburb or town" className="w-full rounded-full border border-white/15 bg-white/10 py-3.5 pl-11 pr-4 text-white placeholder:text-white/40 outline-none backdrop-blur focus:border-[#A5B59D] focus:bg-white/15"/></div>
                <button type="submit" disabled={checking} className="rounded-full bg-[#F4F0E6] px-6 py-3.5 font-bold text-[#263E30] transition hover:bg-white disabled:opacity-60">{checking?"Checking…":"Check Service Availability"}</button>
              </div>
              {result && <p className={`mt-4 rounded-2xl p-4 text-sm leading-relaxed animate-fadeIn ${result.ok?"bg-[#496B52]/60 text-[#DCE5D8] ring-1 ring-[#A5B59D]/30":"bg-red-500/15 text-red-200 ring-1 ring-red-300/20"}`}>{result.msg}</p>}
            </form>
            <p className="mt-5 text-xs leading-relaxed text-white/40">Brian's exact service area and radius will be listed here once confirmed — nothing has been invented for this demonstration.</p></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- QUOTE FORM ---------- */
function QuoteSection({selectedService, onServiceChange, onDone}:{selectedService:string; onServiceChange:(v:string)=>void; onDone:()=>void}){
  const [form, setForm] = useState({name:"", email:"", phone:"", desc:"", contact:"Phone", date:""});
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");
  const [photo, setPhoto] = useState<{name:string; url:string} | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const serviceOptions = [...SERVICES.map(s=>s.title), "Other"];

  useEffect(()=>{ /* selectedService kept in parent, select reads it directly */ },[selectedService]);

  const set=(k:string,v:string)=>{ setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); };
  function validate(){
    const e:Record<string,string>={};
    if(!form.name.trim()) e.name="Please enter your full name.";
    if(!form.email.trim()) e.email="Please enter your email address."; else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email="Please enter a valid email (e.g. name@example.com).";
    if(!form.phone.trim()) e.phone="Please enter your phone number."; else if(form.phone.replace(/\D/g,"").length<7) e.phone="Please enter a valid phone number.";
    if(!selectedService) e.service="Please choose a type of service.";
    if(!form.desc.trim()) e.desc="Please briefly describe your project."; else if(form.desc.trim().length<10) e.desc="A little more detail helps (at least 10 characters).";
    setErrors(e); return Object.keys(e).length===0;
  }
  function submit(ev:React.FormEvent){ ev.preventDefault(); if(!validate()){ document.querySelector("[data-error='true']")?.scrollIntoView({behavior:"smooth", block:"center"}); return; } setStatus("loading"); setTimeout(()=>{ setStatus("success"); onDone(); },1400); }
  function reset(){ setForm({name:"",email:"",phone:"",desc:"",contact:"Phone",date:""}); onServiceChange("General Home Repairs"); setPhoto(null); setErrors({}); setStatus("idle"); }
  const onPhoto=(file:File|undefined)=>{ if(!file) return; setPhoto({name:file.name, url:URL.createObjectURL(file)}); };

  const inputCls=(err?:string)=>`w-full rounded-2xl border bg-white px-4 py-3.5 text-[15px] text-[#292D29] placeholder:text-[#74796F]/60 outline-none transition focus:ring-4 ${err?"border-red-300 focus:border-red-400 focus:ring-red-100":"border-[#263E30]/12 focus:border-[#496B52] focus:ring-[#496B52]/12"}`;
  const Err=({msg}:{msg?:string})=> msg ? <p className="mt-1.5 flex items-center gap-1 text-[13px] font-semibold text-red-600"><span aria-hidden>⚠</span>{msg}</p> : null;

  return (
    <section id="quote" className="scroll-mt-24 bg-[#EAE5D8]/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Request a free quote</Eyebrow><h2 className="mt-4 font-display-d text-4xl font-semibold leading-tight text-[#263E30] sm:text-5xl">Let's Take Care of That <span className="font-serif-d italic font-medium text-[#496B52]">To-Do List.</span></h2><p className="mt-4 max-w-md leading-relaxed text-[#5f665e]">Tell us a little about your project. We'll make it easy to get the conversation started.</p></Reveal>
            <Reveal delay="reveal-delay-1">
              <div className="group relative mt-8 overflow-hidden rounded-[28px] shadow-xl">
                <img src={IMG.quote} alt="Handyman with a screwdriver ready to work in a home" loading="lazy" className="img-zoom aspect-[16/11] w-full object-cover"/>
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-[#263E30]/92 p-4 text-white backdrop-blur"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#496B52]"><Drill className="h-5 w-5"/></span><p className="text-sm leading-snug"><strong className="block font-display-d text-[15px]">Not sure where to start?</strong><span className="text-white/65">Describe the problem — Brian will suggest the practical next step.</span></p></div>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm font-semibold text-[#3c423c]">{["Free to request — no obligation","Clear next steps, in plain language","Your details are only used to reply to you"].map(t=><li key={t} className="flex items-center gap-2.5"><CheckCircle2 className="h-4.5 w-4.5 text-[#496B52]"/>{t}</li>)}</ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay="reveal-delay-1">
              <div className="rounded-[28px] border border-[#263E30]/8 bg-[#FFFEFA] p-6 shadow-[0_24px_60px_rgba(38,62,48,0.10)] sm:p-8">
                {status==="success" ? (
                  <div className="animate-fadeIn py-8 text-center">
                    <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#496B52]/10" style={{animation:"pulseRing 1.8s infinite"}}><CheckCircle2 className="h-10 w-10 text-[#496B52]"/></span>
                    <h3 className="mt-6 font-display-d text-3xl font-semibold text-[#263E30]">Thank you{form.name?`, ${form.name.split(" ")[0]}`:""} — request received!</h3>
                    <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#74796F]">Your <strong className="text-[#263E30]">{selectedService}</strong> enquiry is ready. In the live version, Brian would reply via your preferred method ({form.contact.toLowerCase()}).</p>
                    <div className="mx-auto mt-6 max-w-md rounded-2xl bg-[#F4F0E6] p-4 text-left text-sm"><p className="font-bold text-[#263E30]">What happens next?</p><ol className="mt-2 list-decimal space-y-1 pl-5 text-[#5f665e]"><li>Brian reviews your project details.</li><li>You discuss scope, timing and any materials.</li><li>You agree the next step — no surprises.</li></ol></div>
                    <p className="mt-5 text-xs text-[#74796F]">Demo notice: this front-end form does not transmit submissions to a real inbox yet.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3"><button onClick={reset} className="rounded-full bg-[#496B52] px-6 py-3.5 font-bold text-white hover:bg-[#263E30]">Send Another Request</button><button onClick={()=>scrollToId("services")} className="rounded-full border border-[#263E30]/15 px-6 py-3.5 font-bold">Browse Services</button></div>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="flex items-center justify-between gap-3"><h3 className="font-display-d text-2xl font-semibold text-[#263E30]">Request My Free Quote</h3><span className="hidden rounded-full bg-[#496B52]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#496B52] sm:block">Free · No obligation</span></div>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div data-error={!!errors.name}><label htmlFor="q-name" className="mb-1.5 block text-sm font-bold text-[#263E30]">Full Name *</label><div className="relative"><User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#74796F]"/><input id="q-name" value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Jordan Smith" className={`${inputCls(errors.name)} pl-10`} autoComplete="name"/></div><Err msg={errors.name}/></div>
                      <div data-error={!!errors.phone}><label htmlFor="q-phone" className="mb-1.5 block text-sm font-bold text-[#263E30]">Phone Number *</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#74796F]"/><input id="q-phone" type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="Your best contact number" className={`${inputCls(errors.phone)} pl-10`} autoComplete="tel"/></div><Err msg={errors.phone}/></div>
                      <div className="sm:col-span-2" data-error={!!errors.email}><label htmlFor="q-email" className="mb-1.5 block text-sm font-bold text-[#263E30]">Email Address *</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#74796F]"/><input id="q-email" type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="name@example.com" className={`${inputCls(errors.email)} pl-10`} autoComplete="email"/></div><Err msg={errors.email}/></div>
                      <div data-error={!!errors.service}><label htmlFor="q-service" className="mb-1.5 block text-sm font-bold text-[#263E30]">Type of Service *</label><div className="relative"><select id="q-service" value={selectedService} onChange={e=>{onServiceChange(e.target.value); setErrors(er=>({...er,service:""}));}} className={`${inputCls(errors.service)} appearance-none pr-10`}><option value="" disabled>Choose a service…</option>{serviceOptions.map(o=><option key={o} value={o}>{o}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#74796F]"/></div><Err msg={errors.service}/></div>
                      <div><label htmlFor="q-date" className="mb-1.5 block text-sm font-bold text-[#263E30]">Preferred Project Date <span className="font-medium text-[#74796F]">(optional)</span></label><div className="relative"><Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#74796F]"/><input id="q-date" type="date" value={form.date} onChange={e=>set("date",e.target.value)} className={`${inputCls()} pl-10`}/></div></div>
                      <div className="sm:col-span-2" data-error={!!errors.desc}><label htmlFor="q-desc" className="mb-1.5 block text-sm font-bold text-[#263E30]">Project Description *</label><textarea id="q-desc" rows={4} value={form.desc} onChange={e=>set("desc",e.target.value)} placeholder="Tell us what needs fixing, painting, assembling or improving — include rooms, sizes or anything you've noticed…" className={`${inputCls(errors.desc)} resize-none`}/><div className="mt-1 flex justify-between"><Err msg={errors.desc}/><span className="ml-auto text-xs text-[#74796F]">{form.desc.length} characters</span></div></div>
                      <fieldset className="sm:col-span-2"><legend className="mb-2 text-sm font-bold text-[#263E30]">Preferred Contact Method</legend><div className="grid grid-cols-3 gap-2.5">{[{v:"Phone",icon:Phone},{v:"Email",icon:Mail},{v:"Text Message",icon:MessageSquare}].map(o=> <button type="button" key={o.v} onClick={()=>set("contact",o.v)} aria-pressed={form.contact===o.v} className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-bold transition ${form.contact===o.v?"border-[#496B52] bg-[#496B52] text-white shadow-lg shadow-[#496B52]/20":"border-[#263E30]/12 bg-white text-[#5f665e] hover:border-[#496B52]/40"}`}><o.icon className="h-4 w-4"/><span className="hidden sm:inline">{o.v}</span><span className="sm:hidden">{o.v==="Text Message"?"Text":o.v}</span></button>)}</div></fieldset>
                      <div className="sm:col-span-2">
                        <span className="mb-1.5 block text-sm font-bold text-[#263E30]">Add a Photo <span className="font-medium text-[#74796F]">(optional)</span></span>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>onPhoto(e.target.files?.[0])}/>
                        {photo ? (
                          <div className="flex items-center gap-4 rounded-2xl border border-[#496B52]/25 bg-[#496B52]/5 p-3.5"><img src={photo.url} alt="Your project upload preview" className="h-14 w-14 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#263E30]">{photo.name}</p><p className="text-xs text-[#74796F]">Preview only — not uploaded in this demo.</p></div><button type="button" onClick={()=>setPhoto(null)} className="rounded-full bg-white p-2 shadow" aria-label="Remove photo"><X className="h-4 w-4"/></button></div>
                        ) : (
                          <button type="button" onClick={()=>fileRef.current?.click()} className="flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#263E30]/15 bg-white px-4 py-5 text-sm font-bold text-[#5f665e] transition hover:border-[#496B52]/45 hover:text-[#496B52]"><ImagePlus className="h-5 w-5"/> Tap to attach a photo of your project</button>
                        )}
                      </div>
                    </div>
                    <button type="submit" disabled={status==="loading"} className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#496B52] py-4 text-[16px] font-bold text-white shadow-xl shadow-[#496B52]/25 transition hover:bg-[#263E30] disabled:opacity-70">
                      {status==="loading" ? <><span className="h-5 w-5 rounded-full border-2 border-white/35 border-t-white" style={{animation:"spinSlow .7s linear infinite"}}/> Sending your request…</> : <>Request My Free Quote <Send className="h-4.5 w-4.5"/></>}
                    </button>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2"><p className="text-xs leading-relaxed text-[#74796F]">Demo: submissions aren't sent to a real inbox yet.</p><button type="button" onClick={reset} className="text-xs font-bold text-[#496B52] underline underline-offset-2">Clear form</button></div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
