import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  X,
  ExternalLink,
  Download,
  Mail,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Share2
} from 'lucide-react';
import { DETAIL_CONTENTS } from '../data/navigationData';
import { NavDropdownItem, DetailContent } from '../types';
import { FacultyLogo } from './Logos';

interface AcademicModalProps {
  item: NavDropdownItem | null;
  onClose: () => void;
}

export const AcademicModal: React.FC<AcademicModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const content: DetailContent = DETAIL_CONTENTS[item.id] || {
    id: item.id,
    title: item.title,
    categoryName: item.category.toUpperCase(),
    subtitle: item.description,
    summary: item.description,
    keyPoints: [
      {
        heading: 'Informasi Layanan & Prosedur',
        points: [
          'Layanan ini diselenggarakan oleh Fakultas Sains dan Teknologi UHN IGB Sugriwa.',
          'Silakan menghubungi sekretariat fakultas untuk berkas dan jadwal resmi.',
          'Pembaruan berkala diumumkan melalui akun Instagram @fastsugriwa.'
        ]
      }
    ],
    requirements: [],
    actionLink: {
      label: 'Hubungi Layanan Terkait',
      url: 'mailto:fast@uhnsugriwa.ac.id',
      isExternal: true
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="academic-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <FacultyLogo size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-full">
                  {content.categoryName}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-semibold text-stone-500">
                    • {item.badge}
                  </span>
                )}
              </div>
              <h2
                id="academic-modal-title"
                className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight mt-0.5"
              >
                {content.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 transition-colors"
            aria-label="Tutup jendela informasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Subtitle & Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
            <p className="font-semibold text-orange-800 mb-1">{content.subtitle}</p>
            <p className="text-stone-700 text-xs sm:text-sm">{content.summary}</p>
          </div>

          {/* Key Points */}
          <div className="space-y-4">
            {content.keyPoints.map((block, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  {block.heading}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 pl-1">
                  {block.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Requirements if available */}
          {content.requirements && content.requirements.length > 0 && (
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Dokumen & Persyaratan Terkait:
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {content.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Person */}
          {content.contactPerson && (
            <div className="p-4 rounded-xl bg-orange-50/40 border border-orange-200/60 flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] uppercase font-bold text-orange-800">
                  {content.contactPerson.role}
                </div>
                <div className="font-bold text-stone-900 mt-0.5">
                  {content.contactPerson.name}
                </div>
              </div>
              <a
                href={`mailto:${content.contactPerson.email}`}
                className="inline-flex items-center gap-1 text-orange-700 hover:text-orange-900 font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{content.contactPerson.email}</span>
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-100 transition-colors"
          >
            Tutup
          </button>

          {content.actionLink && (
            <a
              href={content.actionLink.url}
              target={content.actionLink.isExternal ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs tracking-wide shadow-md shadow-orange-600/20 transition-all active:scale-95"
            >
              <span>{content.actionLink.label}</span>
              {content.actionLink.isExternal ? (
                <ExternalLink className="w-3.5 h-3.5" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
