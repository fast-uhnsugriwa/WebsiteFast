import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { InstitutionalBrandLockup } from './Logos';
import { NAVIGATION_MENUS } from '../data/navigationData';
import { NavDropdownItem } from '../types';

interface HeaderProps {
  onSelectNavItem: (item: NavDropdownItem) => void;
  onNavigateHome: () => void;
  onNavigateSainsInformasi: () => void;
  currentPage: 'home' | 'sains-informasi';
}

export const Header: React.FC<HeaderProps> = ({
  onSelectNavItem,
  onNavigateHome,
  onNavigateSainsInformasi,
  currentPage
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDropdownToggle = (slug: string) => {
    setOpenDropdown(openDropdown === slug ? null : slug);
  };

  const handleSelectMenuItem = (item: NavDropdownItem) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onSelectNavItem(item);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Academic Utility Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] font-medium tracking-wide">
            <span className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              Kampus Bangli & Denpasar, Bali
            </span>
            <span className="hidden md:inline text-stone-600">•</span>
            <a
              href="mailto:fast@uhnsugriwa.ac.id"
              className="hidden md:flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              fast@uhnsugriwa.ac.id
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/fastsugriwa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors font-semibold"
              title="Kunjungi Instagram Resmi @fastsugriwa"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@fastsugriwa</span>
            </a>
            <span className="text-stone-700">|</span>
            <a
              href="https://taplink.cc/uhnmaba2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 transition-colors font-semibold"
            >
              <span>Portal PMB 2026</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Brand Lockup */}
          <InstitutionalBrandLockup onHomeClick={onNavigateHome} />

          {/* Desktop Navigation Links with Interactive Dropdowns */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Navigasi Utama Fakultas"
          >
            {/* Beranda Link */}
            <button
              id="nav-home-button"
              onClick={onNavigateHome}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'text-orange-600 bg-orange-50/80 font-bold'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
              }`}
            >
              Beranda
            </button>

            {/* Dynamic Dropdown Menus */}
            {NAVIGATION_MENUS.map((menu) => {
              const isOpen = openDropdown === menu.slug;
              return (
                <div key={menu.slug} className="relative">
                  <button
                    id={`nav-menu-${menu.slug}`}
                    type="button"
                    onClick={() => handleDropdownToggle(menu.slug)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                      isOpen
                        ? 'text-orange-600 bg-orange-50/90'
                        : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-stone-400 ${
                        isOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  {isOpen && (
                    <div
                      role="menu"
                      aria-labelledby={`nav-menu-${menu.slug}`}
                      className="absolute left-0 mt-2 w-80 rounded-2xl bg-white border border-stone-200/90 shadow-xl shadow-stone-900/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-3 py-2 mb-1 border-b border-stone-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                          {menu.title} FAST
                        </span>
                        <span className="text-[10px] text-stone-400">Pilih Layanan</span>
                      </div>

                      <div className="space-y-1">
                        {menu.items.map((item) => (
                          <button
                            key={item.id}
                            id={`dropdown-item-${item.id}`}
                            onClick={() => handleSelectMenuItem(item)}
                            role="menuitem"
                            className="w-full text-left group p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-colors flex items-start gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 group-hover:scale-125 group-hover:bg-orange-500 transition-all" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 group-hover:bg-orange-100 group-hover:text-orange-800">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500 line-clamp-2 mt-0.5 font-normal leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action: CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://taplink.cc/uhnmaba2026"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-header-pmb"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-orange-600/20 hover:shadow-lg hover:shadow-orange-600/30 hover:brightness-105 active:scale-95 transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Daftar PMB 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu Navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-orange-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 bg-stone-950/40 backdrop-blur-sm z-50 flex flex-col justify-start animate-in fade-in duration-200"
        >
          <div className="bg-white max-h-[85vh] overflow-y-auto border-b border-stone-200 shadow-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                Menu Utama Fakultas
              </span>
              <span className="text-xs text-stone-400">UHN IGB Sugriwa</span>
            </div>

            {/* Home Link */}
            <button
              id="mobile-nav-home"
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentPage === 'home'
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              <span>Beranda Fakultas</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* Accordion Menus */}
            {NAVIGATION_MENUS.map((menu) => {
              const isExpanded = mobileExpandedGroup === menu.slug;
              return (
                <div key={menu.slug} className="border border-stone-100 rounded-xl overflow-hidden">
                  <button
                    id={`mobile-accordion-${menu.slug}`}
                    onClick={() =>
                      setMobileExpandedGroup(isExpanded ? null : menu.slug)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 bg-stone-50/70 text-sm font-bold text-stone-800 text-left hover:bg-stone-100 transition-colors"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 transition-transform ${
                        isExpanded ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="p-2 space-y-1 bg-white border-t border-stone-100">
                      {menu.items.map((item) => (
                        <button
                          key={item.id}
                          id={`mobile-item-${item.id}`}
                          onClick={() => handleSelectMenuItem(item)}
                          className="w-full text-left p-2.5 rounded-lg hover:bg-amber-50/70 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-stone-800">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Links to Other 2 External Programs */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-1">
                Portal Program Studi Mitra
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://informatika.uhnsugriwa.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-orange-50 border border-stone-200 text-xs font-semibold text-stone-800"
                >
                  <span>S1 Informatika</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                </a>
                <a
                  href="https://dkvsugriwa.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-orange-50 border border-stone-200 text-xs font-semibold text-stone-800"
                >
                  <span>S1 DKV</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                </a>
              </div>
            </div>

            {/* Mobile PMB Button */}
            <div className="pt-2">
              <a
                href="https://taplink.cc/uhnmaba2026"
                target="_blank"
                rel="noopener noreferrer"
                id="cta-mobile-pmb"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm shadow-md"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Penerimaan Mahasiswa Baru (PMB)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
