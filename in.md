I need you to modify my HomeTab.tsx file to 
implement a swippable widget that toggles between a 
Discord status and live phone specifications. 
Please follow these steps: Add Imports: Add 
Smartphone, Cpu, Battery, and Database to the 
lucide-react imports. Add useState and useEffect to 
the react imports. Setup State & Fetching: Inside 
the HomeTab component, initialize state for view 
(defaulting to 'discord') and stats. Use a 
useEffect hook to fetch data every 60 seconds from 
this Supabase endpoint: 
https://fmanvkvojvgfrzvmofvb.supabase.co/rest/v1/phone_health. 
Headers: Use apikey and Authorization with the 
value: 
sb_publishable_svGUx4oII8O-ORDI8C0DhQ_DVRcVcVb. 
Implement Math Logic: Create a helper function toGB 
that divides the numeric values by 1024 and formats 
them to 2 decimal places. Create the Swippable UI: 
Replace the existing Discord image section with a 
container that uses Framer Motion's 
AnimatePresence. Gestures: Enable drag="x" so users 
can swipe between the two views. Wobble: Apply a 
continuous subtle rotation and scale animation if 
the isMaxWobble prop is true. Indicators: Add two 
small pagination dots at the bottom of the card 
that update based on the current view.
Merge into the current file: Here is the raw code for the logic and the UI component to be integrated:
ui

```// DATA FETCHING LOGIC const [view, setView] = 
useState<'discord' | 'specs'>('discord'); const 
[stats, setStats] = useState<any>(null); 
useEffect(() => {
  const fetchStats = async () => { try { const res 
      = await 
      fetch('https://fmanvkvojvgfrzvmofvb.supabase.co/rest/v1/phone_health?select=*&order=updated_at.desc&limit=1', 
      {
        headers: { 'apikey': 
          'sb_publishable_svGUx4oII8O-ORDI8C0DhQ_DVRcVcVb', 
          'Authorization': 'Bearer 
          sb_publishable_svGUx4oII8O-ORDI8C0DhQ_DVRcVcVb'
        }
      });
      const data = await res.json(); if (data[0]) 
      setStats(data[0]);
    } catch (e) { console.error(e); }
  };
  fetchStats(); const interval = 
  setInterval(fetchStats, 60000); return () => 
  clearInterval(interval);
}, []);
const toGB = (mb: number) => (mb / 
1024).toFixed(2);
// UI SECTION REPLACEMENT
<section className="space-y-4"> <div 
  className="relative group overflow-hidden 
  rounded-2xl border border-slate-700/50 
  bg-slate-900/60 backdrop-blur-xl shadow-2xl">
    <AnimatePresence mode="wait"> {view === 
      'discord' ? (
        <motion.div key="discord" initial={{ x: 50, 
          opacity: 0 }} animate={{ x: 0, opacity: 
          1, rotate: isMaxWobble ? [0, -1, 1, 0] : 
          0 }} exit={{ x: -50, opacity: 0 }} 
          drag="x" dragConstraints={{ left: 0, 
          right: 0 }} onDragEnd={(_, info) => 
          info.offset.x < -50 && setView('specs')} 
          className="cursor-grab 
          active:cursor-grabbing"
        >
          <img 
          src="https://lanyard.cnrad.dev/api/752899252866515025?showDisplayName=true&bg=0F172A" 
          className="w-full h-auto opacity-90" />
        </motion.div> ) : ( <motion.div key="specs" 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1, rotate: 
          isMaxWobble ? [0, 1, -1, 0] : 0 }} 
          exit={{ x: -50, opacity: 0 }} drag="x" 
          dragConstraints={{ left: 0, right: 0 }} 
          onDragEnd={(_, info) => info.offset.x > 
          50 && setView('discord')} className="p-6 
          cursor-grab active:cursor-grabbing 
          space-y-4"
        >
          <div className="flex items-center 
          gap-3"><Smartphone size={20}/><span 
          className="font-bold">Motorola G 
          Stylus</span></div> <div className="grid 
          grid-cols-2 gap-4 text-sm">
            <div><Database size={12}/> {stats ? 
            toGB(stats.free_storage_mb) : '--'} 
            GB</div> <div><Cpu size={12}/> {stats ? 
            toGB(stats.free_ram_mb) : '--'} 
            GB</div> <div><Battery size={12}/> 
            {stats?.battery_percent}% 
            {stats?.is_charging && '⚡'}</div>
          </div> </motion.div> )} 
    </AnimatePresence> <div className="absolute 
    bottom-3 left-1/2 -translate-x-1/2 flex 
    gap-1.5">
        <div className={view === 'discord' ? 
        "bg-primary w-4 h-1.5 rounded-full" : 
        "bg-slate-700 w-1.5 h-1.5 rounded-full"} /> 
        <div className={view === 'specs' ? 
        "bg-primary w-4 h-1.5 rounded-full" : 
        "bg-slate-700 w-1.5 h-1.5 rounded-full"} />
    </div> </div> </section>
`


