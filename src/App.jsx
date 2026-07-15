import React, { useState, useEffect, useRef } from 'react'

// ข้อมูลเมนูเส้นก๋วยเตี๋ยว (ปรับคำบรรยายให้ดูพรีเมียมและเป็นธรรมชาติ)
const noodleTypes = [
  { id: 'thin', name: 'เส้นเล็กสด', desc: 'ทำจากข้าวเจ้าออร์แกนิก เหนียวนุ่ม ซึมซับรสชาติซุปได้ดีเยี่ยม', rating: 'Signature', lineClass: 'stroke-orange-200', color: '#fed7aa', thickness: 3, speed: '2.5s' },
  { id: 'mama', name: 'บะหมี่หยักอบกรอบ', desc: 'เส้นสปริงตัวสวย นำเข้าพิเศษ เข้ากันได้ดีกับซุปจัดจ้าน', rating: 'Popular', lineClass: 'stroke-yellow-400', color: '#facc15', thickness: 4, speed: '1.8s' },
  { id: 'egg', name: 'บะหมี่ไข่โฮมเมด', desc: 'นวดมือวันต่อวัน หอมกลิ่นไข่แท้ สัมผัสบางเบาแต่นุ่มหนึบ', rating: 'Premium', lineClass: 'stroke-amber-400', color: '#fbbf24', thickness: 3.5, speed: '2.2s' },
  { id: 'white', name: 'เส้นหมี่ขาว', desc: 'เส้นละเอียด บางเบา ทานง่าย เหมาะสำหรับมื้อที่ต้องการความสบายท้อง', rating: 'Light', lineClass: 'stroke-stone-200', color: '#e7e5e4', thickness: 1.5, speed: '3.0s' },
  { id: 'glass', name: 'วุ้นเส้นถั่วเขียว', desc: 'ผลิตจากถั่วเขียวแท้ 100% เส้นใส ดึ๋งดั๋ง แคลอรีต่ำ', rating: 'Healthy', lineClass: 'stroke-teal-100', color: '#ccfbf1', thickness: 2.5, speed: '2.8s' },
]

// ข้อมูลน้ำซุป
const soupTypes = [
  { id: 'clear', name: 'ซุปกระดูกหมูน้ำใส', desc: 'เคี่ยวนาน 8 ชั่วโมง หอมกลิ่นรากผักชีและพริกไทยขาว', bg: 'rgba(241, 245, 249, 0.8)', border: 'border-slate-200', fxColor: '#f8fafc' },
  { id: 'blood', name: 'น้ำตกสูตรเข้มข้น', desc: 'หอมเครื่องเทศสมุนไพรจีน ปรุงรสกลมกล่อมลงตัว', bg: 'rgba(120, 53, 15, 0.7)', border: 'border-amber-900', fxColor: '#78350f' },
  { id: 'tomyum', name: 'ต้มยำมะนาวสด', desc: 'พริกเผาทำเอง บีบมะนาวสดแท้ รสชาติจัดจ้านถึงเครื่อง', bg: 'rgba(239, 68, 68, 0.6)', border: 'border-red-500', fxColor: '#ef4444' },
  { id: 'yentafo', name: 'เย็นตาโฟเต้าหู้ยี้', desc: 'ซอสเย็นตาโฟสูตรดั้งเดิม สีชมพูสวยธรรมชาติ เปรี้ยวหวานพอดี', bg: 'rgba(244, 63, 94, 0.5)', border: 'border-rose-400', fxColor: '#fb7185' },
  { id: 'dry', name: 'แห้งซีอิ๊วดำหอมเจียว', desc: 'คลุกเคล้าน้ำมันกระเทียมเจียวและซีอิ๊วดำสูตรลับของทางร้าน', bg: 'rgba(255, 255, 255, 0)', border: 'border-stone-200', fxColor: 'transparent' }
]

// ท็อปปิ้ง
const toppingsData = [
  { id: 'pork_slice', name: 'หมูนุ่มหมักงา', icon: '🥩', price: 15, desc: 'หมูสไลด์แผ่นบาง หมักจนนุ่มละมุน' },
  { id: 'pork_minced', name: 'หมูสับรวน', icon: '🍖', price: 10, desc: 'หมูสับติดมันเล็กน้อย รวนรสกลมกล่อม' },
  { id: 'pork_stewed', name: 'หมูตุ๋นยาจีน', desc: 'ตุ๋นจนเปื่อยยุ่ย ละลายในปาก', icon: '🐖', price: 20 },
  { id: 'chicken', name: 'ไก่ฉีก', icon: '🍗', price: 10, desc: 'เนื้ออกไก่นุ่ม ไม่กระด้าง' },
  { id: 'meatball', name: 'ลูกชิ้นหมูล้วน', icon: '⚪', price: 10, desc: 'ลูกชิ้นหมูแท้ ไม่ผสมแป้ง เด้งสู้ฟัน' },
  { id: 'coriander', name: 'ผักชีและต้นหอม', icon: '🌿', price: 0, desc: 'ผักโรยสดใหม่ เพิ่มความหอม' },
  { id: 'sprouts', name: 'ถั่วงอกลวก', icon: '🌱', price: 0, desc: 'ถั่วงอกคัดพิเศษ ลวกสุกกำลังดี' },
]

// เครื่องเคียง
const premiumSides = [
  { id: 'crispy_pork', name: 'แคบหมูไร้มัน', icon: '🥓', price: 15, desc: 'ทอดใหม่ทุกวัน กรอบฟู ไม่เหม็นหืน' },
  { id: 'wonton', name: 'เกี๊ยวกรอบ', icon: '🥟', price: 10, desc: 'แผ่นเกี๊ยวบาง ทอดเหลืองทอง' }
]

export default function App() {
  const [selectedNoodle, setSelectedNoodle] = useState(noodleTypes[0])
  const [selectedSoup, setSelectedSoup] = useState(soupTypes[2])
  const [activeToppings, setActiveToppings] = useState([toppingsData[0], toppingsData[4], toppingsData[5]])
  const [activeSides, setActiveSides] = useState([])
  const [spicy, setSpicy] = useState(2) // 0-4
  const [orderState, setOrderState] = useState('idle') // 'idle' | 'cooking' | 'printed'
  const [ticketNo, setTicketNo] = useState('')
  const [splashes, setSplashes] = useState([])
  
  // สไตล์สำหรับแอนิเมชันที่นุ่มนวลขึ้น
  useEffect(() => {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
      
      body {
        font-family: 'Prompt', sans-serif;
        background-color: #fafaf9; /* stone-50 */
        color: #1c1917; /* stone-900 */
      }
      
      @keyframes softWave {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-3px) rotate(0.5deg); }
      }
      .noodle-wave {
        animation: softWave 4s ease-in-out infinite;
      }

      @keyframes gentleSteam {
        0% { transform: translateY(0px) scale(0.9); opacity: 0; }
        50% { opacity: 0.4; transform: translateY(-15px) scale(1.1); filter: blur(4px); }
        100% { transform: translateY(-30px) scale(1.2); opacity: 0; filter: blur(6px); }
      }
      .steam-1 { animation: gentleSteam 3s infinite ease-out; }
      .steam-2 { animation: gentleSteam 3.5s infinite ease-out 1s; }
      .steam-3 { animation: gentleSteam 2.5s infinite ease-out 0.5s; }

      @keyframes slideUpFade {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      .animate-receipt {
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      /* ซ่อน Scrollbar แต่ยังเลื่อนได้ */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()

      if (type === 'select') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(600, ctx.currentTime)
        gain.gain.setValueAtTime(0.05, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.1)
      } else if (type === 'splash') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(300, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.15)
      }
    } catch (e) {
      // Ignore audio errors
    }
  }

  const handleToggleTopping = (topping) => {
    const exists = activeToppings.find(t => t.id === topping.id)
    if (exists) {
      setActiveToppings(prev => prev.filter(t => t.id !== topping.id))
      playSound('select')
    } else {
      const newSplash = {
        id: Date.now(),
        icon: topping.icon,
        x: 60 + Math.random() * 80,
        y: 70 + Math.random() * 20,
        rotation: (Math.random() - 0.5) * 30
      }
      setSplashes(prev => [...prev, newSplash])
      setActiveToppings(prev => [...prev, topping])
      playSound('splash')
      setTimeout(() => setSplashes(prev => prev.filter(s => s.id !== newSplash.id)), 1000)
    }
    setOrderState('idle')
  }

  const handleToggleSide = (side) => {
    const exists = activeSides.find(s => s.id === side.id)
    if (exists) {
      setActiveSides(prev => prev.filter(s => s.id !== side.id))
      playSound('select')
    } else {
      setActiveSides(prev => [...prev, side])
      playSound('splash')
    }
    setOrderState('idle')
  }

  const handleCheckout = () => {
    playSound('select')
    setOrderState('cooking')
    setTimeout(() => {
      setTicketNo(`SB-${Math.floor(1000 + Math.random() * 9000)}`)
      setOrderState('printed')
    }, 1500)
  }

  const basePrice = 45
  const toppingsPrice = activeToppings.reduce((total, t) => total + t.price, 0)
  const sidesPrice = activeSides.reduce((total, s) => total + s.price, 0)
  const totalPrice = basePrice + toppingsPrice + sidesPrice

  return (
    <div className="min-h-screen bg-stone-50 pb-24 text-stone-800">
      
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
              🍜
            </div>
            <span className="font-semibold tracking-tight text-lg">SBAC Kin sen</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-stone-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              เปิดให้บริการ
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 mb-4">
          ร้านกินเส้น <br className="md:hidden" />
          <span className="text-orange-600">SBAC</span>
        </h1>
        <p className="max-w-2xl mx-auto text-stone-500 text-base md:text-lg">
          เลือกสรรวัตถุดิบคุณภาพเยี่ยม ปรุงสดใหม่ชามต่อชาม สัมผัสประสบการณ์การทานก๋วยเตี๋ยวที่ประณีตและใส่ใจในทุกรายละเอียด ณ โรงอาหาร SBAC
        </p>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-12 items-start">
        
        {/* Left Column: Selections (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">
          
          {/* Step 1: Noodles */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase">Step 01</span>
                <h2 className="text-2xl font-bold text-stone-800">เลือกเส้นก๋วยเตี๋ยว</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {noodleTypes.map((noodle) => {
                const active = selectedNoodle.id === noodle.id
                return (
                  <button
                    key={noodle.id}
                    onClick={() => { setSelectedNoodle(noodle); playSound('select'); setOrderState('idle'); }}
                    className={`relative p-5 rounded-2xl text-left transition-all duration-200 border bg-white ${
                      active
                        ? 'border-orange-500 shadow-[0_4px_20px_-4px_rgba(234,88,12,0.15)] ring-1 ring-orange-500'
                        : 'border-stone-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-stone-900">{noodle.name}</h3>
                      {active && <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">✓</span>}
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{noodle.desc}</p>
                    <div className="mt-3 inline-block px-2 py-1 bg-stone-100 rounded text-[10px] text-stone-600 font-medium">
                      {noodle.rating}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Step 2: Soups */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase">Step 02</span>
                <h2 className="text-2xl font-bold text-stone-800">เลือกน้ำซุป</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {soupTypes.map((soup) => {
                const active = selectedSoup.id === soup.id
                return (
                  <button
                    key={soup.id}
                    onClick={() => { setSelectedSoup(soup); playSound('select'); setOrderState('idle'); }}
                    className={`relative p-5 rounded-2xl text-left transition-all duration-200 border bg-white ${
                      active
                        ? 'border-orange-500 shadow-[0_4px_20px_-4px_rgba(234,88,12,0.15)] ring-1 ring-orange-500'
                        : 'border-stone-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-stone-900">{soup.name}</h3>
                      {active && <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">✓</span>}
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{soup.desc}</p>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Step 3: Spice Level */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase">Step 03</span>
                <h2 className="text-2xl font-bold text-stone-800">ระดับความเผ็ด</h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-stone-600">ปรับระดับรสชาติ:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  spicy === 0 ? 'bg-stone-100 text-stone-600' :
                  spicy <= 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {spicy === 0 && 'ไม่เผ็ดเลย'}
                  {spicy === 1 && 'เผ็ดน้อย (พริก 1/2 ช้อน)'}
                  {spicy === 2 && 'เผ็ดกลาง (มาตรฐาน)'}
                  {spicy === 3 && 'เผ็ดมาก (รสจัดจ้าน)'}
                  {spicy === 4 && 'เผ็ดจัด (พริกเน้นๆ)'}
                </span>
              </div>
              <input
                type="range" min="0" max="4" value={spicy}
                onChange={(e) => { setSpicy(Number(e.target.value)); setOrderState('idle'); }}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-3 font-medium px-1">
                <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
              </div>
            </div>
          </section>

          {/* Step 4: Toppings */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase">Step 04</span>
                <h2 className="text-2xl font-bold text-stone-800">เพิ่มท็อปปิ้ง</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {toppingsData.map((topping) => {
                const active = activeToppings.some(t => t.id === topping.id)
                return (
                  <button
                    key={topping.id}
                    onClick={() => handleToggleTopping(topping)}
                    className={`relative p-4 rounded-2xl text-left transition-all duration-200 border bg-white flex flex-col justify-between ${
                      active
                        ? 'border-emerald-500 bg-emerald-50/30 shadow-sm ring-1 ring-emerald-500'
                        : 'border-stone-200 hover:border-emerald-200 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-2xl mb-2 block">{topping.icon}</span>
                        {active && <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>}
                      </div>
                      <h3 className="font-semibold text-stone-900 text-sm">{topping.name}</h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">{topping.desc}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                      <span className="text-stone-400">ราคา</span>
                      <span className="font-semibold text-stone-700">{topping.price === 0 ? 'ฟรี' : `+฿${topping.price}`}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Step 5: Sides */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase">Step 05</span>
                <h2 className="text-2xl font-bold text-stone-800">เครื่องเคียง</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {premiumSides.map((side) => {
                const active = activeSides.some(s => s.id === side.id)
                return (
                  <button
                    key={side.id}
                    onClick={() => handleToggleSide(side)}
                    className={`relative p-4 rounded-2xl text-left transition-all duration-200 border bg-white flex items-center gap-4 ${
                      active
                        ? 'border-emerald-500 bg-emerald-50/30 shadow-sm ring-1 ring-emerald-500'
                        : 'border-stone-200 hover:border-emerald-200 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-3xl bg-stone-50 p-2 rounded-xl">{side.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-stone-900 text-sm">{side.name}</h3>
                        <span className="font-semibold text-stone-700 text-xs">+฿{side.price}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{side.desc}</p>
                    </div>
                    {active && <span className="absolute top-4 right-4 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Visualizer & Checkout (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Live Preview Bowl */}
          <div className="bg-white rounded-[2rem] p-6 border border-stone-200 shadow-sm text-center relative overflow-hidden">
            <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-[10px] font-semibold text-stone-500 tracking-widest uppercase mb-4">
              Preview
            </span>
            
            <div className="relative mx-auto w-56 h-48 flex items-center justify-center">
              {/* ชามก๋วยเตี๋ยวแบบมินิมอล */}
              <svg viewBox="0 0 200 150" className="w-full h-full relative z-10">
                
                {/* ไอควันบางๆ */}
                {selectedSoup.id !== 'dry' && (
                  <g stroke="#d6d3d1" strokeWidth="2" strokeLinecap="round" fill="none">
                    <path d="M 85 45 Q 80 30 88 15" className="steam-1" />
                    <path d="M 100 40 Q 105 25 95 10" className="steam-2" />
                    <path d="M 115 45 Q 110 30 118 15" className="steam-3" />
                  </g>
                )}

                {/* สีน้ำซุป (โปร่งแสงเบาๆ) */}
                {selectedSoup.id !== 'dry' && (
                  <path 
                    d="M 35 75 Q 100 82 165 75 Q 155 115 100 120 Q 45 115 35 75 Z" 
                    fill={selectedSoup.fxColor} 
                    className="transition-colors duration-500 opacity-60"
                  />
                )}

                {/* เส้นก๋วยเตี๋ยว (ลายเส้นสะอาดตา) */}
                <g className="noodle-wave opacity-90">
                  <path d="M 50 78 Q 70 105 90 85 Q 110 110 130 82 Q 145 105 150 78" fill="none" stroke={selectedNoodle.color} strokeWidth={selectedNoodle.thickness} strokeLinecap="round" />
                  <path d="M 55 82 Q 80 115 100 90 Q 120 118 140 85" fill="none" stroke={selectedNoodle.color} strokeWidth={selectedNoodle.thickness} strokeLinecap="round" />
                </g>

                {/* ความเผ็ด (จุดสีส้ม/แดงเล็กๆ) */}
                {spicy > 0 && (
                  <g opacity={0.4 + (spicy * 0.1)}>
                    <circle cx="80" cy="85" r={spicy * 1.5} fill="#ef4444" />
                    <circle cx="120" cy="90" r={spicy * 1.2} fill="#ea580c" />
                    <circle cx="100" cy="82" r={spicy * 1.8} fill="#dc2626" />
                  </g>
                )}

                {/* ตัวแทนท็อปปิ้งลอยอยู่ */}
                {activeToppings.map((item, idx) => {
                  const pos = [{x: 60, y: 75}, {x: 100, y: 70}, {x: 130, y: 78}, {x: 80, y: 90}, {x: 115, y: 85}][idx % 5]
                  return (
                    <text key={item.id} x={pos.x} y={pos.y} fontSize="16" className="noodle-wave" style={{animationDelay: `${idx * 0.2}s`}}>
                      {item.icon}
                    </text>
                  )
                })}

                {/* รูปทรงชาม (ลายเส้น) */}
                <path 
                  d="M 30 70 L 170 70 C 160 120 135 130 100 130 C 65 130 40 120 30 70 Z" 
                  fill="none" 
                  stroke="#44403c" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <line x1="25" y1="70" x2="175" y2="70" stroke="#44403c" strokeWidth="3" strokeLinecap="round" />
              </svg>

              {/* เอฟเฟกต์ Splash */}
              {splashes.map((s) => (
                <div key={s.id} className="absolute pointer-events-none select-none text-xl animate-bounce"
                     style={{ left: `${s.x}px`, top: `${s.y}px`, transform: `rotate(${s.rotation}deg)` }}>
                  {s.icon}
                </div>
              ))}
            </div>

            <div className="mt-2 text-sm font-medium text-stone-700">
              {selectedNoodle.name} <span className="text-stone-400 mx-1">•</span> {selectedSoup.name}
            </div>
          </div>

          {/* Order Summary Receipt */}
          <div className="bg-white rounded-[2rem] p-6 border border-stone-200 shadow-sm relative">
            <h3 className="text-lg font-bold text-stone-800 mb-5 border-b border-stone-100 pb-4">สรุปรายการสั่งซื้อ</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>{selectedNoodle.name}</span>
                <span className="font-medium text-stone-900">฿{basePrice}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="pl-3 text-stone-400">- {selectedSoup.name}</span>
                <span className="text-stone-400">รวมแล้ว</span>
              </div>

              {activeToppings.length > 0 && (
                <div className="pt-2">
                  {activeToppings.map(t => (
                    <div key={t.id} className="flex justify-between text-stone-600 mb-1">
                      <span className="pl-3">{t.name}</span>
                      <span>{t.price === 0 ? 'ฟรี' : `+฿${t.price}`}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeSides.length > 0 && (
                <div className="pt-2 border-t border-dashed border-stone-200">
                  {activeSides.map(s => (
                    <div key={s.id} className="flex justify-between text-stone-600 mb-1 mt-2">
                      <span>{s.name}</span>
                      <span>+฿{s.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 mt-2 border-t border-stone-200 flex justify-between items-end">
                <span className="font-medium text-stone-500">ราคาสุทธิ</span>
                <span className="text-3xl font-bold text-orange-600">฿{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={orderState === 'cooking'}
              className={`w-full mt-6 py-4 rounded-xl font-semibold text-base transition-all ${
                orderState === 'cooking'
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-900 text-white hover:bg-stone-800 shadow-md hover:shadow-lg active:scale-[0.98]'
              }`}
            >
              {orderState === 'cooking' ? 'กำลังเตรียมออเดอร์...' : 'ยืนยันการสั่งซื้อ'}
            </button>
          </div>

          {/* Printed Ticket */}
          {orderState === 'printed' && (
            <div className="animate-receipt bg-white p-6 rounded-2xl border border-stone-200 shadow-xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
              
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 text-xl">✓</span>
              </div>
              <h4 className="font-bold text-stone-900 text-lg">สั่งอาหารสำเร็จ</h4>
              <p className="text-xs text-stone-500 mt-1">โปรดแสดงหมายเลขนี้เพื่อรับอาหาร</p>
              
              <div className="my-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest block mb-1">Order No.</span>
                <span className="text-3xl font-bold text-stone-900 tracking-widest">{ticketNo}</span>
              </div>
              
              <p className="text-[10px] text-stone-400">ขอบคุณที่ใช้บริการ SBAC Artisanal Craft</p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}