/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Flame,
  Scale,
  Apple,
  Dumbbell,
  Clock,
  Heart,
  Droplets,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Star,
  Settings,
  Lock,
  Gift,
  CreditCard,
  Zap,
  Check,
  Bell,
  X,
  Target
} from 'lucide-react';
import { SiteConfig } from './types';
import { DEFAULT_SITE_CONFIG } from './defaultConfig';
import { AdminPanel } from './components/AdminPanel';
import { CaktoLogo } from './components/CaktoLogo';

export default function App() {
  // Load config from localStorage or fallback to default
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('vidaleve_site_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old texts or prices if still saved in user browser
        if (parsed.ctaButtonText === 'Quero Garantir Minha Vaga na Cakito') {
          parsed.ctaButtonText = 'Quero Começar Agora';
        }
        if (parsed.originalPrice === '197,00' || !parsed.originalPrice) {
          parsed.originalPrice = '69,90';
        }
        if (parsed.currentPrice === '67,90' || !parsed.currentPrice) {
          parsed.currentPrice = '29,90';
        }
        if (!parsed.installments || parsed.installments.includes('8x')) {
          parsed.installments = 'ou 3x de R$ 10,48 no cartão ou Pix';
        }
        return { ...DEFAULT_SITE_CONFIG, ...parsed };
      }
    } catch (e) {
      console.error('Error loading config:', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Admin Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Calculator Result Buy Modal State
  const [showResultModal, setShowResultModal] = useState(false);

  // Countdown timer in seconds
  const [timeLeft, setTimeLeft] = useState<number>(config.countdownMinutes * 60);

  useEffect(() => {
    if (!config.showCountdown) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 20 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [config.showCountdown]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Save config handler
  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('vidaleve_site_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Error saving config:', e);
    }
  };

  // Reset config handler
  const handleResetConfig = () => {
    setConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.removeItem('vidaleve_site_config');
    } catch (e) {
      console.error('Error resetting config:', e);
    }
  };

  // Recent sales simulation notification
  const [currentSale, setCurrentSale] = useState<{ name: string; city: string; time: string } | null>(null);

  useEffect(() => {
    if (!config.showRecentSalesPopup) {
      setCurrentSale(null);
      return;
    }

    const sales = [
      { name: 'Ana Paula M.', city: 'São Paulo - SP', time: 'há 3 minutos' },
      { name: 'Juliana Ferreira', city: 'Belo Horizonte - MG', time: 'há 6 minutos' },
      { name: 'Carla Silveira', city: 'Curitiba - PR', time: 'há 2 minutos' },
      { name: 'Beatriz Costa', city: 'Rio de Janeiro - RJ', time: 'há 8 minutos' },
      { name: 'Renata Albuquerque', city: 'Brasília - DF', time: 'há 4 minutos' },
      { name: 'Mariana Lima', city: 'Fortaleza - CE', time: 'há 1 minuto' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      setCurrentSale(sales[index % sales.length]);
      index++;
      setTimeout(() => {
        setCurrentSale(null);
      }, 5000);
    }, 14000);

    return () => clearInterval(interval);
  }, [config.showRecentSalesPopup]);

  // Calculator State
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(78);
  const [height, setHeight] = useState<number>(168);
  const [targetWeight, setTargetWeight] = useState<number>(65);
  const [activity, setActivity] = useState<number>(1.375);
  const [deficitRate, setDeficitRate] = useState<number>(500);

  // Calculations
  const imc = +(weight / ((height / 100) * (height / 100))).toFixed(1);
  const getImcCategory = (val: number) => {
    if (val < 18.5) return { label: 'Abaixo do peso', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    if (val < 25) return { label: 'Peso ideal', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val < 30) return { label: 'Sobrepeso', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { label: 'Obesidade', color: 'text-rose-600 bg-rose-50 border-rose-200' };
  };

  const bmr = Math.round(
    gender === 'female'
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5
  );

  const tdee = Math.round(bmr * activity);
  const targetCalories = Math.max(1200, tdee - deficitRate);
  const weightToLose = Math.max(0, weight - targetWeight);
  const weeksToGoal = weightToLose > 0 ? Math.ceil((weightToLose * 7700) / (deficitRate * 7)) : 0;

  // Meal Plan Tabs
  const [activeMealTab, setActiveMealTab] = useState<'cafe' | 'almoco' | 'lanche' | 'jantar'>('cafe');

  const meals = {
    cafe: {
      title: 'Café da Manhã Energético',
      calories: '340 kcal',
      protein: '24g',
      carbs: '28g',
      fat: '11g',
      items: [
        '2 ovos mexidos com orégano e açafrão',
        '1 fatia de pão 100% integral ou tapioca leve',
        '1 fatia média de mamão com 1 colher de chia',
        'Café ou chá verde sem açúcar'
      ]
    },
    almoco: {
      title: 'Almoço Completo & Sacietógeno',
      calories: '460 kcal',
      protein: '38g',
      carbs: '35g',
      fat: '14g',
      items: [
        '130g de peito de frango grelhado ou filé de tilápia',
        '3 colheres de sopa de arroz integral com feijão',
        'Prato farto de salada verde (rúcula, alface, tomate, pepino)',
        '1 fio de azeite de oliva extra virgem'
      ]
    },
    lanche: {
      title: 'Lanche da Tarde Anti-Compulsão',
      calories: '190 kcal',
      protein: '16g',
      carbs: '18g',
      fat: '5g',
      items: [
        '1 iogurte natural ou desnatado proteico',
        '1 porção de morangos frescos picados',
        '1 colher de sopa de aveia em flocos finos'
      ]
    },
    jantar: {
      title: 'Jantar Leve de Fácil Digestão',
      calories: '360 kcal',
      protein: '30g',
      carbs: '20g',
      fat: '12g',
      items: [
        'Omelete de 2 ovos com espinafre e ricota fresca',
        'Sopa rústica de legumes com abóbora e gengibre',
        'Mix de legumes no vapor (brócolis, cenoura, abobrinha)'
      ]
    }
  };

  // WhatsApp Link Helper
  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    config.whatsappMessage
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Urgency / Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white py-2.5 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="truncate">{config.announcementText}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {config.showCountdown && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Restam {formatCountdown(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-white/20"
              title="Acesso com usuário e senha"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Vida<span className="text-emerald-600">Leve</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Método Oficial
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#calculadora" className="hover:text-emerald-600 transition-colors">Calculadora</a>
            <a href="#cardapio" className="hover:text-emerald-600 transition-colors">Cardápio Modelo</a>
            <a href="#metodo" className="hover:text-emerald-600 transition-colors">Como Funciona</a>
            <a href="#depoimentos" className="hover:text-emerald-600 transition-colors">Resultados</a>
            <a href="#oferta" className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Garantir Vaga (R$ {config.currentPrice})
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={config.cakitoCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 transition-all hover:scale-102 cursor-pointer flex items-center gap-2"
            >
              <CaktoLogo className="w-4 h-4" />
              <span>Quero Emagrecer</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-emerald-50/60 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Método científico de emagrecimento acelerado e sem efeito sanfona
              </div>

              {/* Headline with NO black dot at the end */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                {config.heroHeadline}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  {config.heroHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {config.heroSubtitle}
              </p>

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={config.cakitoCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-center shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2.5 text-base hover:-translate-y-0.5"
                >
                  <CaktoLogo className="w-5 h-5" />
                  <span>{config.ctaButtonText || 'Quero Começar Agora'}</span>
                </a>

                <a
                  href="#calculadora"
                  className="px-5 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold border border-slate-200 text-center transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Scale className="w-4 h-4 text-emerald-600" />
                  Calcular Meu Déficit Grátis
                </a>
              </div>

              {/* Checkout Cakto Guarantee Indicators */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <CaktoLogo className="w-4 h-4" />
                  <span className="text-slate-700 font-bold">Checkout Seguro Cakto</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Garantia de {config.guaranteeDays} Dias
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  Acesso Imediato no E-mail
                </div>
              </div>

              {/* Social Proof */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">+12.400</div>
                  <div className="text-xs text-slate-500 font-medium">Alunas transformadas</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600">-7.2 kg</div>
                  <div className="text-xs text-slate-500 font-medium">Média no 1º mês</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">4.9 / 5.0</div>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-400" /> 1.8k avaliações
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Card Offer Preview */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-25" />
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Oferta Promocional
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{config.productName}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Flame className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Price display: De R$ 69,90 por R$ 29,90 */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                    <div className="text-xs text-slate-400 line-through">De R$ {config.originalPrice}</div>
                    <div className="text-3xl font-black text-emerald-600 tracking-tight my-0.5">
                      R$ {config.currentPrice}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">{config.installments}</div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {config.featuresList.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button: 'Comprar na Cakto com desconto' with Cakto Logo */}
                  <a
                    href={config.cakitoCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all hover:scale-102 cursor-pointer"
                  >
                    <CaktoLogo className="w-5 h-5" />
                    <span>Comprar na Cakto com desconto</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                    <CaktoLogo className="w-3.5 h-3.5" />
                    <span>Pagamento auditado e 100% protegido pela plataforma <strong>Cakto</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Weight Loss & Calorie Calculator */}
      <section id="calculadora" className="py-16 sm:py-24 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Calculadora Metabólica
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Descubra suas calorias e o prazo para seu objetivo
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Preencha seus dados corporais abaixo para gerar seu plano calórico individualizado.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              1. Seus Dados Corporais
            </h3>

            {/* Gender Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Gênero Biológico</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Feminino
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Masculino
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Idade</label>
                <div className="relative">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Math.max(14, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">anos</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Altura</label>
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Math.max(100, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">cm</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Peso Atual</label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Math.max(30, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Meta Desejada</label>
                <div className="relative">
                  <input
                    type="number"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(Math.max(30, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">kg</span>
                </div>
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Nível de Atividade Física</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value={1.2}>Sedentário (pouco exercício)</option>
                <option value={1.375}>Levemente ativo (caminhadas ou treino 1-3x por semana)</option>
                <option value={1.55}>Moderadamente ativo (musculação ou treino 3-5x por semana)</option>
                <option value={1.725}>Muito ativo (treinos intensos quase todos os dias)</option>
              </select>
            </div>

            {/* Deficit Speed */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Ritmo de Emagrecimento</label>
                <span className="text-xs font-bold text-emerald-700">
                  {deficitRate === 350 ? 'Suave (-0,35 kg/sem)' : deficitRate === 500 ? 'Recomendado (-0,5 kg/sem)' : 'Acelerado (-0,75 kg/sem)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 350, label: 'Suave (350 kcal)' },
                  { rate: 500, label: 'Padrão Ouro (500 kcal)' },
                  { rate: 750, label: 'Acelerado (750 kcal)' }
                ].map((item) => (
                  <button
                    key={item.rate}
                    type="button"
                    onClick={() => setDeficitRate(item.rate)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      deficitRate === item.rate
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action button that finishes calculation and triggers the purchase screen */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowResultModal(true)}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-101 cursor-pointer"
              >
                <Target className="w-5 h-5 text-amber-300" />
                <span>Ver Meu Resultado & Liberar Protocolo (R$ {config.currentPrice})</span>
              </button>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border border-emerald-800/30">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Seu Diagnóstico</span>
                <h3 className="text-xl font-bold">Plano Calórico Individual</h3>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getImcCategory(imc).color}`}>
                IMC {imc} • {getImcCategory(imc).label}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Metabolismo Basal (TMB)</span>
                  <span className="text-xl font-bold">{bmr} <span className="text-xs font-normal text-slate-300">kcal/dia</span></span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Gasto Total Diário (TDEE)</span>
                  <span className="text-xl font-bold">{tdee} <span className="text-xs font-normal text-slate-300">kcal/dia</span></span>
                </div>
              </div>

              {/* Main highlighted target calorie */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Calorias Sugeridas para Queima Constante
                </span>
                <div className="text-4xl font-black text-emerald-400 my-1">
                  {targetCalories} <span className="text-base font-medium text-emerald-200">kcal/dia</span>
                </div>
                <p className="text-xs text-slate-300">
                  Déficit diário de {deficitRate} kcal preservando sua saúde e energia.
                </p>
              </div>

              {/* Goal Timeline */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Tempo até sua meta ({targetWeight} kg):
                  </span>
                  <span className="font-bold text-emerald-300">
                    {weightToLose > 0 ? `~${weeksToGoal} semanas` : 'Já no objetivo!'}
                  </span>
                </div>
                {weightToLose > 0 && (
                  <p className="text-xs text-slate-400">
                    Eliminação saudável de <strong>{weightToLose.toFixed(1)} kg</strong> sem perder tônus muscular.
                  </p>
                )}
              </div>

              {/* Water requirement */}
              <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-teal-200">
                  <Droplets className="w-4 h-4 text-teal-400" /> Ingestão de água indicada:
                </span>
                <span className="font-bold text-white">{(weight * 0.035).toFixed(1)} Litros/dia</span>
              </div>
            </div>

            {/* Opens buy screen / direct Cakto */}
            <button
              type="button"
              onClick={() => setShowResultModal(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/20 hover:scale-102"
            >
              <CaktoLogo className="w-4 h-4" />
              <span>Receber Cardápio na Cakto por R$ {config.currentPrice}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Meal Plan / Sample Daily Menu */}
      <section id="cardapio" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Guia Prático
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Exemplo de Cardápio com Foco em Saciedade
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Refeições nutritivas e fáceis de preparar que controlam a insulina e aniquilam a vontade de doces.
            </p>
          </div>

          {/* Meal Tabs */}
          <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'cafe', label: 'Café da Manhã' },
              { id: 'almoco', label: 'Almoço Completo' },
              { id: 'lanche', label: 'Lanche da Tarde' },
              { id: 'jantar', label: 'Jantar Leve' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMealTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeMealTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Meal Details */}
          <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{meals[activeMealTab].title}</h3>
                <span className="text-xs text-slate-500 font-medium">Aproximadamente {meals[activeMealTab].calories}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-semibold">
                  Proteína: {meals[activeMealTab].protein}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-semibold">
                  Carboidratos: {meals[activeMealTab].carbs}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-semibold">
                  Gorduras boas: {meals[activeMealTab].fat}
                </span>
              </div>
            </div>

            <div className="py-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">O que colocar no prato:</h4>
              <ul className="space-y-2.5">
                {meals[activeMealTab].items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
              <Apple className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Dica do método:</strong> Inicie a refeição pelas fibras e proteínas para evitar picos de glicemia e aumentar a saciedade em até 4 horas.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section id="metodo" className="py-16 sm:py-24 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Metodologia Comprovada
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Os 3 Pilares do Emagrecimento Sustentável
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Sem fórmulas mirabolantes ou remédios perigosos. Seu corpo responde à nutrição certa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Déficit Sem Passar Fome</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Consumir menos calorias priorizando alimentos de alta densidade nutricional que enchem o prato
              e mantêm sua saciedade por muito mais tempo.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Preservação Muscular</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Estímulo adequado para garantir que o peso eliminado seja gordura pura e não massa magra,
              mantendo a taxa metabólica sempre acelerada.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Sono e Equilíbrio Hormonal</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Regulação dos hormônios da fome e redução do cortisol, o principal vilão do acúmulo de
              gordura na região abdominal.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-16 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Histórias Reais
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Pessoas reais, resultados permanentes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Mariana Silveira',
                age: '34 anos',
                lost: '-14 kg em 4 meses',
                quote: 'Eu achava que precisava parar de comer arroz e pão. Com o método bem calculado, continuei comendo o que gosto e perdi 14 quilos sem sofrer.',
                rating: 5
              },
              {
                name: 'Carlos Eduardo',
                age: '42 anos',
                lost: '-18 kg em 5 meses',
                quote: 'Minha pressão arterial normalizou e voltei a jogar futebol com meus filhos. O segredo foi entender o déficit e o suporte na Cakto foi nota 10.',
                rating: 5
              },
              {
                name: 'Patrícia Gomes',
                age: '28 anos',
                lost: '-9 kg em 2 meses',
                quote: 'Acabou a compulsão alimentar da noite! O plano me ajudou a distribuir a comida ao longo do dia para não chegar desesperada na janta.',
                rating: 5
              }
            ].map((dep, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: dep.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm italic mb-4 leading-relaxed">"{dep.quote}"</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{dep.name}</h4>
                    <span className="text-xs text-slate-400">{dep.age}</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {dep.lost}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSIVE PRICING & CAKTO CHECKOUT SECTION */}
      <section id="oferta" className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <CaktoLogo className="w-3.5 h-3.5" />
              Acesso Imediato pelo Checkout Oficial Cakto
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Comece Sua Transformação Hoje
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Acesso completo ao plano passo a passo com garantia total de {config.guaranteeDays} dias.
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border-2 border-emerald-500/40 shadow-2xl relative">
            <div className="absolute -top-4 right-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <CaktoLogo className="w-3.5 h-3.5" />
              Melhor Oferta
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Left Column: What you get */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-2xl font-black text-white">{config.productName}</h3>
                <p className="text-xs text-slate-300">Tudo o que você precisa em um só lugar:</p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                  {config.featuresList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Bonus Section */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Gift className="w-4 h-4" /> Bônus Exclusivos de Hoje:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {config.bonusList.map((bonus, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{bonus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Price & Button */}
              <div className="md:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 text-center space-y-5">
                <div>
                  <span className="text-xs text-slate-400 line-through block">De R$ {config.originalPrice}</span>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mt-1">
                    Por apenas
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-1">
                    R$ {config.currentPrice}
                  </div>
                  <span className="text-xs text-slate-300 font-medium block">
                    {config.installments}
                  </span>
                </div>

                <a
                  href={config.cakitoCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:scale-102 cursor-pointer"
                >
                  <CaktoLogo className="w-5 h-5" />
                  <span>COMPRAR AGORA PELA CAKTO (R$ {config.currentPrice})</span>
                </a>

                {/* Badges */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Garantia incondicional de {config.guaranteeDays} dias</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-teal-400" />
                    <span>Pix imediato ou Cartão de Crédito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee banner */}
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Garantia Blindada de {config.guaranteeDays} Dias</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Adquira o protocolo com tranquilidade. Se dentro de {config.guaranteeDays} dias você não notar resultados
                ou achar que o método não é para você, basta solicitar e devolveremos 100% do seu dinheiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Perguntas Respondidas</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Como recebo o acesso após o pagamento na Cakto?',
              a: 'O envio é imediato e 100% automático! Assim que a compra for aprovada pela Cakto, você recebe em seu e-mail o link exclusivo de acesso aos cardápios, calculadoras e bônus.'
            },
            {
              q: 'Preciso cortar o carboidrato para emagrecer?',
              a: 'Não! O segredo é o déficit calórico inteligente e a proporção equilibrada de macronutrientes. Você continuará comendo alimentos do seu dia a dia.'
            },
            {
              q: 'O pagamento pela Cakto é seguro?',
              a: 'Sim, a Cakto utiliza criptografia de ponta a ponta (SSL 256 bits), o mesmo padrão de segurança dos maiores bancos do Brasil.'
            },
            {
              q: 'E se eu não gostar ou não conseguir seguir?',
              a: `Você tem garantia incondicional de ${config.guaranteeDays} dias. Se por qualquer motivo quiser cancelar, você recebe 100% do valor de volta.`
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                {item.q}
              </h4>
              <p className="text-slate-600 text-sm pl-6 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <span className="text-white font-bold tracking-tight">VidaLeve</span>
            <span className="text-xs text-slate-500">© {new Date().getFullYear()} - Todos os direitos reservados</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              Painel do Administrador
            </button>
            <a href="#calculadora" className="hover:text-white transition-colors">Calculadora</a>
            <a href="#cardapio" className="hover:text-white transition-colors">Cardápios</a>
            <a href="#oferta" className="hover:text-white transition-colors">Garantir Vaga (R$ {config.currentPrice})</a>
          </div>
        </div>
      </footer>

      {/* POPUP DE DIAGNÓSTICO E COMPRA OBRIGATÓRIA NA CAKTO APÓS A CALCULADORA */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white p-6 sm:p-7 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Diagnóstico Calculado com Sucesso!
              </div>
              <h3 className="text-2xl font-black tracking-tight">Seu Plano Está Pronto</h3>
              <p className="text-xs text-slate-300 mt-1">
                Para eliminar {weightToLose.toFixed(1)} kg no prazo de ~{weeksToGoal} semanas de forma segura
              </p>
            </div>

            {/* Diagnostic Snapshot */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Meta Calórica</span>
                  <span className="text-base font-black text-emerald-600">{targetCalories}</span>
                  <span className="text-[10px] text-slate-400 block">kcal/dia</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Peso a Perder</span>
                  <span className="text-base font-black text-emerald-600">-{weightToLose.toFixed(1)}</span>
                  <span className="text-[10px] text-slate-400 block">kg</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Prazo Estimado</span>
                  <span className="text-base font-black text-emerald-600">~{weeksToGoal}</span>
                  <span className="text-[10px] text-slate-400 block">semanas</span>
                </div>
              </div>

              {/* Pitch */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 text-xs">
                <p className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Próximo passo obrigatório:
                </p>
                <p className="leading-relaxed">
                  Para queimar essa gordura sem passar fome e sem flacidez, libere agora o seu <strong>cardápio completo passo a passo</strong>,
                  lista de compras e guia de substituições no checkout seguro da Cakto!
                </p>
              </div>

              {/* Price Highlight */}
              <div className="text-center pt-1">
                <span className="text-xs text-slate-400 line-through">De R$ {config.originalPrice}</span>
                <div className="text-3xl font-black text-slate-900">
                  Por apenas <span className="text-emerald-600">R$ {config.currentPrice}</span>
                </div>
                <span className="text-xs text-slate-500">{config.installments}</span>
              </div>

              {/* Direct Cakto Buy Button */}
              <a
                href={config.cakitoCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowResultModal(false)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:scale-102 cursor-pointer"
              >
                <CaktoLogo className="w-5 h-5" />
                <span>LIBERAR MEU PROTOCOLO NA CAKTO (R$ {config.currentPrice})</span>
              </a>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Garantia de 7 dias
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  Acesso imediato no e-mail
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Recent Sale Toast */}
      {currentSale && (
        <div className="fixed bottom-20 left-4 z-40 bg-white rounded-2xl shadow-xl p-3 border border-slate-200 flex items-center gap-3 animate-slide-up max-w-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <CaktoLogo className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-900">{currentSale.name}</p>
            <p className="text-slate-500 text-[11px]">Comprou pela Cakto ({currentSale.city})</p>
            <span className="text-[10px] text-emerald-600 font-semibold">{currentSale.time}</span>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Support Button */}
      {config.whatsappNumber && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white"
          title="Tirar dúvidas no WhatsApp"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.419-.101.824z" />
          </svg>
        </a>
      )}

      {/* Admin Panel Modal (With Username & Password Gate) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
