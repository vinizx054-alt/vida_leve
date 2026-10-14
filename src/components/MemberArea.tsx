import React, { useState } from 'react';
import {
  Flame,
  Scale,
  Apple,
  Dumbbell,
  Clock,
  Heart,
  Droplets,
  CheckCircle2,
  Sparkles,
  Download,
  BookOpen,
  Users,
  CheckSquare,
  Square,
  Printer,
  ChevronRight,
  ArrowLeft,
  Coffee,
  Utensils,
  Moon,
  MessageCircle,
  ShieldCheck,
  Award,
  Zap,
  Info,
  Lock,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { SiteConfig } from '../types';

interface MemberAreaProps {
  config: SiteConfig;
  onBackToSales: () => void;
  onOpenAdmin: () => void;
}

export const MemberArea: React.FC<MemberAreaProps> = ({ config, onBackToSales, onOpenAdmin }) => {
  // Personalized Calculator State for the Member
  const [memberGender, setMemberGender] = useState<'female' | 'male'>('female');
  const [memberAge, setMemberAge] = useState<number>(32);
  const [memberWeight, setMemberWeight] = useState<number>(75);
  const [memberHeight, setMemberHeight] = useState<number>(165);
  const [memberTarget, setMemberTarget] = useState<number>(64);
  const [memberActivity, setMemberActivity] = useState<number>(1.375);
  const [cupsDrank, setCupsDrank] = useState<number>(3);
  const [copiedVipUrl, setCopiedVipUrl] = useState(false);

  // Active view tab in member area
  const [activeTab, setActiveTab] = useState<'protocolo' | 'cardapios' | 'substituicoes' | 'mercado' | 'bonus'>('protocolo');
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  // Grocery checklist state
  const [checkedGroceries, setCheckedGroceries] = useState<Record<string, boolean>>({
    'Ovos caipiras (2 dúzias)': true,
    'Peito de frango (1.5 kg)': true,
    'Aveia em flocos finos': false,
    'Rúcula e alface americana': true,
    'Tomate e pepino': false,
    'Mamão e morangos': false,
    'Azeite extra virgem': true,
    'Gengibre e açafrão em pó': false
  });

  const toggleGrocery = (item: string) => {
    setCheckedGroceries((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  // Calculations for member
  const imc = +(memberWeight / ((memberHeight / 100) * (memberHeight / 100))).toFixed(1);
  const bmr = Math.round(
    memberGender === 'female'
      ? 10 * memberWeight + 6.25 * memberHeight - 5 * memberAge - 161
      : 10 * memberWeight + 6.25 * memberHeight - 5 * memberAge + 5
  );
  const tdee = Math.round(bmr * memberActivity);
  const dailyCalories = Math.max(1250, tdee - 500);
  const weightToLose = Math.max(0, memberWeight - memberTarget);
  const weeksEstimated = weightToLose > 0 ? Math.ceil((weightToLose * 7700) / (500 * 7)) : 0;
  const waterTargetLiters = (memberWeight * 0.035).toFixed(1);
  const waterCupsTarget = Math.round((Number(waterTargetLiters) * 1000) / 250);

  // Macros in grams
  const proteinGrams = Math.round(memberWeight * 1.8);
  const fatGrams = Math.round((dailyCalories * 0.25) / 9);
  const carbsGrams = Math.round((dailyCalories - proteinGrams * 4 - fatGrams * 9) / 4);

  // Copy VIP link
  const copyCurrentVipLink = () => {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/area-vip`
      : 'https://seusite.com/area-vip';
    navigator.clipboard.writeText(url);
    setCopiedVipUrl(true);
    setTimeout(() => setCopiedVipUrl(false), 2000);
  };

  // Phase Menus
  const phases = [
    {
      id: 1,
      title: 'Fase 1: Desintoxicação & Seca Barriga (Dias 1 a 7)',
      desc: 'Foco em eliminar retenção hídrica profunda, desinflamar o intestino e destravar a queima inicial (-2 a 4 kg nesta semana).',
      badge: 'Semana 1',
      meals: [
        {
          time: 'Ao Acordar (Jejum)',
          icon: Droplets,
          name: 'Shot Matinal Anti-Inchaço',
          desc: '100ml de água morna + suco de meio limão + 1 pitada de açafrão (cúrcuma) e pimenta-do-reino.'
        },
        {
          time: '08:00 - Café da Manhã',
          icon: Coffee,
          name: 'Ovos Dourados & Fruta com Fibras',
          desc: '2 ovos mexidos com orégano e fio de azeite + 1 fatia média de mamão com 1 colher de sobremesa de sementes de chia + café sem açúcar.'
        },
        {
          time: '12:30 - Almoço Secativo',
          icon: Utensils,
          name: 'Prato Colorido Sacietógeno',
          desc: '140g de filé de frango grelhado + 3 colheres de sopa de arroz integral com lentilha + prato fundo de salada de folhas verdes à vontade temperada com azeite e limão.'
        },
        {
          time: '16:30 - Lanche da Tarde',
          icon: Apple,
          name: 'Iogurte Proteico Anti-Doces',
          desc: '1 pote de iogurte natural desnatado + 1 colher de aveia em flocos + 5 morangos picados com canela em pó por cima.'
        },
        {
          time: '19:30 - Jantar Leve',
          icon: Moon,
          name: 'Creme Rústico de Abóbora com Frango',
          desc: '250ml de sopa cremosa de abóbora cabotiá com 100g de peito de frango desfiado, cheiro verde e raspas de gengibre.'
        }
      ]
    },
    {
      id: 2,
      title: 'Fase 2: Aceleração Metabólica (Dias 8 a 15)',
      desc: 'Aumento estratégico de proteínas magras e estímulo térmico para acelerar o gasto calórico de repouso.',
      badge: 'Semana 2',
      meals: [
        {
          time: 'Ao Acordar',
          icon: Droplets,
          name: 'Infusão Termogênica',
          desc: '200ml de chá verde gelado com fatias de gengibre e hortelã fresca.'
        },
        {
          time: '08:00 - Café da Manhã',
          icon: Coffee,
          name: 'Panqueca de Banana Proteica',
          desc: '1 banana madura amassada + 2 ovos inteiros + 2 colheres de sopa de farelo de aveia. Grelhe na frigideira antiaderente.'
        },
        {
          time: '12:30 - Almoço',
          icon: Utensils,
          name: 'Filé de Tilápia ou Salmão com Legumes',
          desc: '150g de peixe grelhado + 1 batata doce média assada em rodelas + brócolis e cenoura cozidos no vapor.'
        },
        {
          time: '16:30 - Lanche',
          icon: Apple,
          name: 'Mix de Castanhas & Fruta',
          desc: '1 maçã com casca + 4 castanhas-do-pará ou 8 amêndoas torradas sem sal.'
        },
        {
          time: '20:00 - Jantar',
          icon: Moon,
          name: 'Omelete Recheada de Espinafre e Ricota',
          desc: '2 ovos + 1 clara batida com espinafre fresco e 2 colheres de sopa de ricota esfarelada com orégano.'
        }
      ]
    },
    {
      id: 3,
      title: 'Fase 3: Queima Profunda de Gordura Resistente (Dias 16 a 23)',
      desc: 'Otimização da sensibilidade à insulina com foco na perda da gordura abdominal persistente.',
      badge: 'Semana 3',
      meals: [
        {
          time: '08:00 - Café',
          icon: Coffee,
          name: 'Ovos Cozidos & Pão Low-Carb ou Tapioca',
          desc: '2 ovos cozidos com azeite + 1 tapioca fina com queijo cottage ou ricota + café puro.'
        },
        {
          time: '12:30 - Almoço',
          icon: Utensils,
          name: 'Carne Magra Grelhada & Purê de Couve-Flor',
          desc: '140g de patinho moído refogado com cebola e tomate + purê cremoso de couve-flor + salada de rúcula.'
        },
        {
          time: '16:30 - Lanche',
          icon: Apple,
          name: 'Vitamina de Frutas Vermelhas',
          desc: '200ml de leite desnatado ou vegetal + 1 xícara de amoras/morangos congelados + 1 colher de chia.'
        },
        {
          time: '19:30 - Jantar',
          icon: Moon,
          name: 'Salada Morna Proteica',
          desc: 'Mix de folhas verdes com 120g de atum em água ou peito de peru em cubos + tomate cereja e pepino.'
        }
      ]
    },
    {
      id: 4,
      title: 'Fase 4: Consolidação & Estilo de Vida (Dias 24 a 30+)',
      desc: 'Equilíbrio definitivo para manter o peso alcançado comendo socialmente sem engordar.',
      badge: 'Semana 4+',
      meals: [
        {
          time: 'Rotina Diária Equilibrada',
          icon: Utensils,
          name: 'Método 80/20',
          desc: '80% de refeições limpas ricas em nutrientes e 20% livres para saborear suas comidas favoritas aos fins de semana com a família sem culpas.'
        }
      ]
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const memberWhatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Olá! Sou aluna do Método VidaLeve e gostaria de tirar uma dúvida sobre o meu protocolo liberado.'
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20">
      {/* Top Banner: Member Access Confirmation & Links */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-3 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse" />
            <span className="font-extrabold text-emerald-100 uppercase tracking-wide">Link Oficial da Área VIP (/area-vip):</span>
            <span className="hidden sm:inline">Acesso Vitalício Liberado</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy direct link button */}
            <button
              onClick={copyCurrentVipLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer border border-white/20"
              title="Copiar link exclusivo da Área VIP para colocar na Cakto"
            >
              {copiedVipUrl ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedVipUrl ? 'Link Copiado!' : 'Copiar Link /area-vip'}</span>
            </button>

            {/* Admin Panel button directly inside Member Area */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-900 text-emerald-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-emerald-400/30"
              title="Abrir Painel Admin"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>

            {/* Back to Sales button */}
            <button
              onClick={onBackToSales}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              title="Ir para a página de vendas"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Página de Vendas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Member Navbar */}
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
              <span className="ml-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Área VIP Exclusiva
              </span>
            </div>
          </div>

          {/* Member Tabs Navigation */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-bold">
            {[
              { id: 'protocolo', label: 'Meu Protocolo Diário' },
              { id: 'cardapios', label: 'Cardápios das 4 Fases' },
              { id: 'substituicoes', label: 'Guia de Substituições' },
              { id: 'mercado', label: 'Lista de Compras' },
              { id: 'bonus', label: 'Bônus & Grupo VIP' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Painel Admin</span>
            </button>

            <a
              href={memberWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Suporte da Aluna</span>
            </a>
          </div>
        </div>

        {/* Mobile Submenu */}
        <div className="lg:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-100 gap-1.5 bg-slate-50 text-xs font-semibold">
          {[
            { id: 'protocolo', label: 'Meu Protocolo' },
            { id: 'cardapios', label: 'Cardápios 4 Fases' },
            { id: 'substituicoes', label: 'Substituições' },
            { id: 'mercado', label: 'Lista Mercado' },
            { id: 'bonus', label: 'Bônus Liberados' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
                activeTab === t.id ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Member Content */}
      <main className="max-w-6xl mx-auto px-4 pt-8">
        {/* Welcome Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              Acesso Confirmado • Pagamento Processado com Sucesso
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Bem-vinda ao seu novo estilo de vida!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {config.memberWelcomeMessage}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('protocolo')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                Configurar Meu Protocolo Hoje
              </button>
              {config.vipGroupUrl && (
                <a
                  href={config.vipGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  Entrar no Grupo VIP de Alunas
                </a>
              )}
            </div>
          </div>
        </div>

        {/* TAB 1: PROTOCOLO PERSONALIZADO (100% UNLOCKED CALCULATOR & MEAL BUILDER) */}
        {activeTab === 'protocolo' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-emerald-600" />
                  Seu Protocolo Calórico & Metabólico Individual
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ajuste seus dados a qualquer momento para recalcular suas calorias à medida que for perdendo peso.
                </p>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4 text-emerald-600" />
                Imprimir Meu Protocolo
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
                <h3 className="text-base font-bold text-slate-900">Atualizar Meus Dados Atuais</h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMemberGender('female')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      memberGender === 'female'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Feminino
                  </button>
                  <button
                    type="button"
                    onClick={() => setMemberGender('male')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      memberGender === 'male'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Masculino
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Idade</label>
                    <input
                      type="number"
                      value={memberAge}
                      onChange={(e) => setMemberAge(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Altura (cm)</label>
                    <input
                      type="number"
                      value={memberHeight}
                      onChange={(e) => setMemberHeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Peso Atual (kg)</label>
                    <input
                      type="number"
                      value={memberWeight}
                      onChange={(e) => setMemberWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Meta (kg)</label>
                    <input
                      type="number"
                      value={memberTarget}
                      onChange={(e) => setMemberTarget(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nível de Atividade</label>
                  <select
                    value={memberActivity}
                    onChange={(e) => setMemberActivity(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50"
                  >
                    <option value={1.2}>Sedentário (pouco exercício)</option>
                    <option value={1.375}>Leve (caminhadas ou treino 1-3x/sem)</option>
                    <option value={1.55}>Moderado (treinos 3-5x/sem)</option>
                    <option value={1.725}>Intenso (treinos pesados quase diários)</option>
                  </select>
                </div>

                {/* Water tracker */}
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-teal-600" />
                      Meta Diária de Água: {waterTargetLiters} Litros
                    </span>
                    <span className="text-xs font-bold text-teal-700">
                      {cupsDrank} de {waterCupsTarget} copos de 250ml
                    </span>
                  </div>

                  <div className="flex gap-1.5 flex-wrap">
                    {Array.from({ length: Math.min(12, waterCupsTarget) }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCupsDrank(i + 1)}
                        className={`w-7 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                          i < cupsDrank
                            ? 'bg-teal-600 text-white shadow-sm'
                            : 'bg-teal-100/70 text-teal-700 hover:bg-teal-200'
                        }`}
                        title={`Marcar ${i + 1}º copo`}
                      >
                        💧
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Results Card */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Seu Alvo Nutricional
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    IMC {imc}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <span className="text-xs text-slate-500 block">Consumo Diário Alvo</span>
                    <span className="text-2xl font-black text-emerald-700">{dailyCalories}</span>
                    <span className="text-xs text-slate-500 block">kcal/dia</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Previsão Para a Meta</span>
                    <span className="text-2xl font-black text-slate-900">{weeksEstimated}</span>
                    <span className="text-xs text-slate-500 block">semanas (-{weightToLose.toFixed(1)}kg)</span>
                  </div>
                </div>

                {/* Macros breakdown */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Distribuição Diária de Macros:
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                      <span className="text-slate-500 block">Proteínas</span>
                      <strong className="text-sm text-blue-900">{proteinGrams}g</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                      <span className="text-slate-500 block">Carboidratos</span>
                      <strong className="text-sm text-amber-900">{carbsGrams}g</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
                      <span className="text-slate-500 block">Gorduras</span>
                      <strong className="text-sm text-rose-900">{fatGrams}g</strong>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Com essas quantidades calculadas, você queima gordura contínua sem passar fome e sem flacidez.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CARDÁPIOS DAS 4 FASES */}
        {activeTab === 'cardapios' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Cardápios Semanais Completos</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Navegue entre as 4 fases do método. Cada fase tem uma função metabólica diferente.
                </p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPhase(p)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedPhase === p
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Fase {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Phase Info */}
            {phases
              .filter((p) => p.id === selectedPhase)
              .map((phase) => (
                <div key={phase.id} className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                        {phase.badge}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{phase.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{phase.desc}</p>
                  </div>

                  <div className="space-y-3">
                    {phase.meals.map((meal, idx) => {
                      const Icon = meal.icon;
                      return (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                                {meal.time}
                              </span>
                              <h4 className="text-base font-bold text-slate-900">{meal.name}</h4>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">{meal.desc}</p>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold">
                              Fase {selectedPhase}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* TAB 3: GUIA DE SUBSTITUIÇÕES */}
        {activeTab === 'substituicoes' && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-slate-200">
              <h2 className="text-2xl font-black text-slate-900">Guia Inteligente de Substituições</h2>
              <p className="text-xs text-slate-500 mt-1">
                Nunca fique sem saber o que comer se faltar algum ingrediente na geladeira.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  base: 'Peito de Frango (120g)',
                  category: 'Proteínas Magras',
                  options: [
                    '140g de filé de tilápia ou pescada',
                    '120g de patinho moído ou coxão mole',
                    '3 ovos médios cozidos ou mexidos',
                    '1 lata de atum em água (escorrido)',
                    '120g de carne de porco magra (lombo ou filé mignon suíno)'
                  ]
                },
                {
                  base: 'Arroz Integral (3 colheres)',
                  category: 'Carboidratos Complexos',
                  options: [
                    '1 batata doce média (100g) assada',
                    '1 mandioca ou aipim médio cozido',
                    '3 colheres de sopa de quinoa cozida',
                    '1 espiga média de milho cozido',
                    '1 fatia grossa de pão 100% integral'
                  ]
                },
                {
                  base: 'Mamão Papaya (1 fatia)',
                  category: 'Frutas Sacietógenas',
                  options: [
                    '8 morangos frescos picados',
                    '1 maçã pequena com casca',
                    '1 fatia média de melão ou melancia',
                    '1 kiwi maduro fatiado',
                    '1 xícara de amoras ou mirtilos'
                  ]
                },
                {
                  base: 'Azeite de Oliva (1 colher)',
                  category: 'Gorduras Boas',
                  options: [
                    '1/4 de abacate maduro',
                    '4 castanhas-do-pará ou 10 amendoins torrados',
                    '1 colher de sopa de semente de chia ou linhaça',
                    '1 colher de sobremesa de pasta de amendoim 100%'
                  ]
                }
              ].map((sub, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{sub.category}</span>
                    <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-full font-bold text-slate-700">
                      Se não tiver {sub.base}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Você pode substituir por:</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {sub.options.map((opt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LISTA DE COMPRAS INTERATIVA */}
        {activeTab === 'mercado' && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Checklist de Mercado Econômico</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Marque os itens que você já tem ou já comprou para levar no celular ao supermercado.
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir Lista
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(checkedGroceries).map(([item, isChecked]) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleGrocery(item)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-slate-400 line-through'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-emerald-400'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BÔNUS & GRUPO VIP */}
        {activeTab === 'bonus' && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-slate-200">
              <h2 className="text-2xl font-black text-slate-900">Seus Bônus Exclusivos Liberados</h2>
              <p className="text-xs text-slate-500 mt-1">
                Todos os materiais extras incluídos no seu pacote vitalício estão disponíveis abaixo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Bônus 1: Doces e Sobremesas Fit',
                  desc: '30 receitas deliciosas de mousses, bolos de caneca e brigadeiros funcionais sem açúcar para não furar a dieta quando bater vontade de doces.',
                  icon: Apple,
                  action: 'Visualizar Receitas'
                },
                {
                  title: 'Bônus 2: Manual de Marmitas Rápidas',
                  desc: 'Como cozinhar em apenas 2 horas no domingo e ter a alimentação da semana inteira congelada e organizada.',
                  icon: Utensils,
                  action: 'Abrir Guia'
                },
                {
                  title: 'Bônus 3: Protocolo Detox Anti-Inchaço',
                  desc: 'Rotina de 7 dias com shots matinais anti-inflamatórios e chás termogênicos para combater a retenção hídrica.',
                  icon: Droplets,
                  action: 'Acessar Protocolo'
                },
                {
                  title: 'Bônus 4: Grupo VIP de Alunas',
                  desc: 'Comunidade exclusiva no WhatsApp para troca de receitas diárias, motivação e acompanhamento de evolução.',
                  icon: Users,
                  action: 'Entrar no Grupo',
                  url: config.vipGroupUrl
                }
              ].map((bonus, idx) => {
                const Icon = bonus.icon;
                return (
                  <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{bonus.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{bonus.desc}</p>
                    </div>

                    <div>
                      {bonus.url ? (
                        <a
                          href={bonus.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          {bonus.action}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => alert(`Material '${bonus.title}' carregado com sucesso!`)}
                          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                          {bonus.action}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer in Member Area */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} VidaLeve • Área Exclusiva de Alunas</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              Painel Admin da Área VIP
            </button>
            <button
              onClick={onBackToSales}
              className="text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Ir para Página de Vendas
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
