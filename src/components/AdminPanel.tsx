import React, { useState } from 'react';
import {
  Link as LinkIcon,
  DollarSign,
  Type,
  Save,
  RotateCcw,
  ExternalLink,
  MessageSquare,
  Shield,
  Clock,
  CheckCircle,
  X,
  Gift,
  Lock,
  User,
  KeyRound,
  LogOut,
  AlertCircle,
  GraduationCap,
  Copy,
  Check,
  Eye
} from 'lucide-react';
import { SiteConfig } from '../types';
import { CaktoLogo } from './CaktoLogo';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSave: (newConfig: SiteConfig) => void;
  onReset: () => void;
  onPreviewMemberArea?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
  onPreviewMemberArea
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form State
  const [formData, setFormData] = useState<SiteConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'checkout' | 'pricing' | 'content' | 'bonus' | 'member' | 'security'>('checkout');
  const [showToast, setShowToast] = useState(false);
  const [copiedMemberUrl, setCopiedMemberUrl] = useState(false);

  // Sync formData when config changes
  React.useEffect(() => {
    setFormData({ ...config });
  }, [config]);

  if (!isOpen) return null;

  const validUsername = config.adminUsername || 'admin';
  const validPassword = config.adminPassword || '123';

  // Compute the direct link to the VIP Member Area
  const postPurchaseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/area-vip`
    : 'https://seu-site.com/area-vip';

  const salesPageUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/`
    : 'https://seu-site.com/';

  const copyPostPurchaseUrl = () => {
    navigator.clipboard.writeText(postPurchaseUrl);
    setCopiedMemberUrl(true);
    setTimeout(() => setCopiedMemberUrl(false), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === validUsername && passwordInput === validPassword) {
      setIsAuthenticated(true);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('Usuário ou senha incorretos. Verifique suas credenciais.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onClose();
  };

  const handleChange = (field: keyof SiteConfig, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1200);
  };

  // If NOT authenticated, render the secure Login Gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-scale-in">
          {/* Login Header */}
          <div className="bg-slate-900 text-white p-6 text-center relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Acesso Restrito</h3>
            <p className="text-xs text-slate-400 mt-1">Painel Administrativo do Proprietário</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Usuário
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Seu usuário de acesso"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Senha
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Quick credentials note for initial access */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700 block mb-0.5">Acesso Padrão Inicial:</span>
              <span>Usuário: <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded font-mono font-bold">admin</code> • Senha: <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded font-mono font-bold">123</code></span>
              <span className="block text-[10px] text-slate-400 mt-1">(Você pode alterar seu usuário e senha na aba Segurança)</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                Entrar no Painel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Once authenticated, render full admin dashboard
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Painel Administrativo do Site</h2>
                <CaktoLogo className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-400">Logado como: <strong>{validUsername}</strong></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
              title="Encerrar sessão"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-2 overflow-x-auto">
          {[
            { id: 'checkout', label: 'Link Cakto & Contato', icon: LinkIcon },
            { id: 'pricing', label: 'Preços & Oferta', icon: DollarSign },
            { id: 'member', label: 'Área Pós-Venda (Alunos)', icon: GraduationCap },
            { id: 'content', label: 'Textos & Chamadas', icon: Type },
            { id: 'bonus', label: 'Bônus & Gatilhos', icon: Gift },
            { id: 'security', label: 'Senha & Segurança', icon: KeyRound }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'checkout' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <CaktoLogo className="w-6 h-6" />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm">Integração Direta com a Plataforma Cakto</p>
                    <p>
                      Quando o visitante clicar em qualquer botão de compra ("Quero Começar Agora", "Comprar na Cakto com desconto"),
                      ele será redirecionado imediatamente para o seu link de checkout oficial da Cakto!
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Seu Link de Checkout da Cakto *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      required
                      value={formData.cakitoCheckoutUrl}
                      onChange={(e) => handleChange('cakitoCheckoutUrl', e.target.value)}
                      placeholder="https://checkout.cakto.com.br/pay/seu-codigo"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <a
                    href={formData.cakitoCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Testar Link
                  </a>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Exemplo: https://checkout.cakto.com.br/pay/abc123xyz
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Suporte / Botão de WhatsApp (Dúvidas de Clientes)
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Número do WhatsApp (com DDI e DDD)</label>
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                      placeholder="5511999999999"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Apenas números (Ex: 5511999998888)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Mensagem Inicial Padrão</label>
                    <input
                      type="text"
                      value={formData.whatsappMessage}
                      onChange={(e) => handleChange('whatsappMessage', e.target.value)}
                      placeholder="Olá! Gostaria de tirar uma dúvida sobre o Método VidaLeve para emagrecer."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'member' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm">Site Final do Aluno (Pós-Pagamento na Cakto)</p>
                    <p>
                      Quando a pessoa pagar na Cakto, você configura na Cakto para redirecionar ela diretamente para o link abaixo!
                      Ela terá acesso aos cardápios, calculadora liberada sem bloqueio, lista de compras e downloads.
                    </p>
                  </div>
                </div>
              </div>

              {/* Links Box: Both Sales Page & VIP Member Area */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    1. Link da Área VIP de Alunas (Colocar na Cakto pós-compra):
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={postPurchaseUrl}
                      className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-xs font-mono text-emerald-300 outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={copyPostPurchaseUrl}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedMemberUrl ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedMemberUrl ? 'Copiado!' : 'Copiar /area-vip'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    👉 <strong>Na Cakto:</strong> Configure este link no campo <em>"URL de Obrigado / Redirecionamento da Compra"</em>.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                    2. Link da Página de Vendas (Onde a pessoa compra por R$ 29,90):
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={salesPageUrl}
                      className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(salesPageUrl);
                        alert('Link da Página de Vendas copiado!');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copiar Link Vendas</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onPreviewMemberArea?.();
                  }}
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Visualizar Agora Como a Aluna Vê o Site Final</span>
                </button>
              </div>

              {/* VIP Group URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Link de Convite do Grupo VIP no WhatsApp / Telegram
                </label>
                <input
                  type="url"
                  value={formData.vipGroupUrl || ''}
                  onChange={(e) => handleChange('vipGroupUrl', e.target.value)}
                  placeholder="https://chat.whatsapp.com/seu-grupo-vip"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Welcome message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Mensagem de Boas-Vindas da Aluna
                </label>
                <textarea
                  rows={3}
                  value={formData.memberWelcomeMessage || ''}
                  onChange={(e) => handleChange('memberWelcomeMessage', e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Produto / Oferta</label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleChange('productName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Dias de Garantia Incondicional</label>
                  <input
                    type="number"
                    value={formData.guaranteeDays}
                    onChange={(e) => handleChange('guaranteeDays', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Preço Original ("De")</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-400">R$</span>
                    <input
                      type="text"
                      value={formData.originalPrice}
                      onChange={(e) => handleChange('originalPrice', e.target.value)}
                      placeholder="69,90"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Preço Promocional ("Por")</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-emerald-600 font-bold">R$</span>
                    <input
                      type="text"
                      value={formData.currentPrice}
                      onChange={(e) => handleChange('currentPrice', e.target.value)}
                      placeholder="29,90"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-emerald-400 bg-emerald-50/40 text-xs font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Texto de Parcelamento</label>
                  <input
                    type="text"
                    value={formData.installments}
                    onChange={(e) => handleChange('installments', e.target.value)}
                    placeholder="ou 3x de R$ 10,48 no cartão ou Pix"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Texto da Faixa Superior (Aviso/Urgência)</label>
                <input
                  type="text"
                  value={formData.announcementText}
                  onChange={(e) => handleChange('announcementText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Início da Headline do Topo</label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => handleChange('heroHeadline', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Destaque Colorido da Headline</label>
                <input
                  type="text"
                  value={formData.heroHighlight}
                  onChange={(e) => handleChange('heroHighlight', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50/30 text-xs font-semibold text-emerald-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Subtítulo / Promessa Principal</label>
                <textarea
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Texto do Botão Principal de Compra (CTA)</label>
                <input
                  type="text"
                  value={formData.ctaButtonText}
                  onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                  placeholder="Quero Começar Agora"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'bonus' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" /> Gatilhos de Conversão
                </h4>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Exibir Cronômetro Regressivo</span>
                    <span className="text-[11px] text-slate-500">Cria urgência de preço promocional no topo da página</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.showCountdown}
                    onChange={(e) => handleChange('showCountdown', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Notificação Flutuante de Compras Recentes</span>
                    <span className="text-[11px] text-slate-500">Mostra balões periódicos com pessoas que acabaram de adquirir</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.showRecentSalesPopup}
                    onChange={(e) => handleChange('showRecentSalesPopup', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Bônus Inclusos na Oferta (um por linha)
                </label>
                <textarea
                  rows={4}
                  value={formData.bonusList.join('\n')}
                  onChange={(e) => handleChange('bonusList', e.target.value.split('\n').filter(Boolean))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 font-sans outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Bônus 1: ..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  O que está incluso no pacote (um por linha)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresList.join('\n')}
                  onChange={(e) => handleChange('featuresList', e.target.value.split('\n').filter(Boolean))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 font-sans outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Cardápios completos..."
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                <p className="font-bold text-sm mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  Credenciais de Administrador
                </p>
                <p>
                  Aqui você pode alterar o usuário e senha que dão acesso a este painel administrativo.
                  Guarde suas novas informações em um lugar seguro.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Novo Nome de Usuário
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.adminUsername || 'admin'}
                    onChange={(e) => handleChange('adminUsername', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nova Senha de Acesso
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.adminPassword || '123'}
                    onChange={(e) => handleChange('adminPassword', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Deseja restaurar as configurações originais padrão?')) {
                  onReset();
                  onClose();
                }
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Padrão
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>

        {/* Save Toast Notification */}
        {showToast && (
          <div className="absolute bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border border-emerald-500/50 animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Configurações salvas e aplicadas ao site!
          </div>
        )}
      </div>
    </div>
  );
};
