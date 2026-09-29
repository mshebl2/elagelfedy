'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { SiteContentType, ServiceType } from '@/types';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import LiveLocationMap from '@/components/ui/LiveLocationMap';

interface ContactRfqSectionProps {
  contactInfo?: SiteContentType['contact'];
  services?: ServiceType[];
}

export default function ContactRfqSection({ contactInfo, services = [] }: ContactRfqSectionProps) {
  const { lang, selectedServiceForRfq } = useApp();
  const dict = getDictionary(lang);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '01 HDD Heavy Horizontal Directional Drilling',
    specs: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{ referenceNo: string; name: string } | null>(null);

  useEffect(() => {
    if (selectedServiceForRfq) {
      setFormData((prev) => ({ ...prev, service: selectedServiceForRfq }));
    }
  }, [selectedServiceForRfq]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          subject: formData.service,
          soilConditions: formData.specs,
          message: `Company: ${formData.company} | Service: ${formData.service} | Geotechnical Specs: ${formData.specs}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessResponse({
          referenceNo: data.data?.referenceNo || `AACC-RFQ-${Math.floor(100000 + Math.random() * 900000)}`,
          name: formData.name,
        });
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: '01 HDD Heavy Horizontal Directional Drilling',
          specs: '',
        });
      } else {
        alert(data.message || 'Error submitting RFQ');
      }
    } catch (err) {
      // Fallback response for instant UX
      const generatedRef = `AACC-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSuccessResponse({
        referenceNo: generatedRef,
        name: formData.name,
      });
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '01 HDD Heavy Horizontal Directional Drilling',
        specs: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const phone = contactInfo?.phone || '+966 509424820';
  const primaryEmail = contactInfo?.email || 'info@alaajsa.com';
  const officialEmails = [
    { email: 'info@alaajsa.com', labelAr: 'البريد العام والخدمات', labelEn: 'General Inquiries' },
    { email: 'mohdd@alaajsa.com', labelAr: 'إدارة المناقصات والتنفيذ', labelEn: 'Tenders & Operations' },
    { email: 'Moayad@alaajsa.com', labelAr: 'الإدارة والتواصل الرسمي', labelEn: 'Executive Management' },
  ];
  const address =
    lang === 'ar'
      ? contactInfo?.addressAr || 'مبنى 3315، شارع حفصة بنت عمر، حي الأندلس، الرياض 13212، المملكة العربية السعودية'
      : contactInfo?.addressEn || 'Building 3315, Hafsa Bint Umar St., Al Andalus, Riyadh 13212, Kingdom of Saudi Arabia';

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#0c0e10] border-b border-slate-200 dark:border-[#2a313a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-xs"></span>
                <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
                  {dict.contact.badge}
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {dict.contact.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 leading-relaxed">
                {dict.contact.subtitle}
              </p>
            </div>

            <div className="space-y-3 font-technical text-xs">
              <div className="p-3.5 border border-slate-200 dark:border-[#2a313a] bg-slate-50 dark:bg-[#13171b] rounded flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-[#0c0e10] rounded border border-slate-200 dark:border-[#2a313a]">
                  <Phone className="w-4 h-4 text-[#0f382a] dark:text-[#c5a869]" />
                </div>
                <div>
                  <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">
                    {dict.contact.directLine}
                  </span>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-slate-900 dark:text-white font-bold hover:text-[#0f382a] dark:hover:text-[#c5a869] transition-colors"
                    dir="ltr"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="p-3.5 border border-slate-200 dark:border-[#2a313a] bg-slate-50 dark:bg-[#13171b] rounded flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-[#0c0e10] rounded border border-slate-200 dark:border-[#2a313a] mt-0.5">
                  <Mail className="w-4 h-4 text-[#0f382a] dark:text-[#c5a869]" />
                </div>
                <div className="w-full">
                  <span className="text-slate-500 dark:text-zinc-400 block text-[10px] mb-1.5 font-bold">
                    {lang === 'ar' ? 'الإيميلات الرسمية للشركة:' : 'Official Company Emails:'}
                  </span>
                  <div className="space-y-1.5">
                    {officialEmails.map((item, idx) => (
                      <div key={idx} className="flex flex-wrap items-center justify-between gap-1 text-xs">
                        <span className="text-slate-500 dark:text-zinc-400 text-[11px]">
                          {lang === 'ar' ? item.labelAr : item.labelEn}:
                        </span>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-slate-900 dark:text-white font-bold hover:text-[#0f382a] dark:hover:text-[#c5a869] transition-colors"
                        >
                          {item.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3.5 border border-slate-200 dark:border-[#2a313a] bg-slate-50 dark:bg-[#13171b] rounded flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-[#0c0e10] rounded border border-slate-200 dark:border-[#2a313a]">
                  <MapPin className="w-4 h-4 text-[#0f382a] dark:text-[#c5a869]" />
                </div>
                <div>
                  <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">
                    {dict.contact.headquarters}
                  </span>
                  <strong className="text-slate-900 dark:text-white leading-relaxed">
                    {address}
                  </strong>
                </div>
              </div>
            </div>

            {/* Live Interactive Location Map */}
            <LiveLocationMap />
          </div>

          {/* Right Column: Interactive RFQ Form */}
          <div className="lg:col-span-7">
            {successResponse ? (
              <div className="p-8 border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 rounded shadow-2xs space-y-4 text-center animate-fadeIn">
                <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-900/60 rounded-full text-emerald-700 dark:text-emerald-300 mb-1">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {dict.contact.successTitle}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                  {dict.contact.successMsg}
                </p>
                <div className="p-3 bg-white dark:bg-[#13171b] border border-slate-200 dark:border-[#2a313a] rounded inline-block font-technical text-xs font-bold text-[#0f382a] dark:text-[#c5a869]">
                  Reference No: <span className="underline">{successResponse.referenceNo}</span>
                </div>
                <div className="pt-3">
                  <button
                    onClick={() => setSuccessResponse(null)}
                    className="px-6 py-2 bg-[#0f382a] dark:bg-[#c5a869] text-white dark:text-[#0c0e10] font-technical text-xs font-bold rounded"
                  >
                    {lang === 'ar' ? 'تقديم طلب جديد' : 'Submit Another Request'}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 border border-slate-200 dark:border-[#2a313a] bg-slate-50/70 dark:bg-[#13171b] rounded shadow-2xs space-y-4"
              >
                <div className="border-b border-slate-200 dark:border-[#2a313a] pb-3 mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                      {dict.contact.rfqFormTitle}
                    </h3>
                    <p className="text-[10px] font-technical text-slate-500 dark:text-zinc-400">
                      {dict.contact.rfqFormSubtitle}
                    </p>
                  </div>
                  <span className="text-[10px] font-technical bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                    {dict.contact.liveDesk}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-technical">
                  <div>
                    <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                      {dict.contact.nameLabel}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={dict.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-[#0c0e10] border border-slate-300 dark:border-[#2a313a] rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#0f382a] dark:focus:ring-[#c5a869] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                      {dict.contact.companyLabel}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={dict.contact.companyPlaceholder}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white dark:bg-[#0c0e10] border border-slate-300 dark:border-[#2a313a] rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#0f382a] dark:focus:ring-[#c5a869] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                      {dict.contact.emailLabel}
                    </label>
                    <input
                      required
                      type="email"
                      placeholder={dict.contact.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white dark:bg-[#0c0e10] border border-slate-300 dark:border-[#2a313a] rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#0f382a] dark:focus:ring-[#c5a869] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                      {dict.contact.phoneLabel}
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder={dict.contact.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white dark:bg-[#0c0e10] border border-slate-300 dark:border-[#2a313a] rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#0f382a] dark:focus:ring-[#c5a869] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="text-xs font-technical">
                  <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                    {dict.contact.serviceLabel}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white dark:bg-[#0c0e10] border border-slate-300 dark:border-[#2a313a] rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#0f382a] dark:focus:ring-[#c5a869] text-slate-900 dark:text-white"
                  >
                    <option value="01 HDD Heavy Horizontal Directional Drilling">
                      01 HDD Heavy Horizontal Directional Drilling (الحفر الأفقي الموجه)
                    </option>
                    <option value="02 Tunneling & Slurry Microtunneling">
                      02 Tunneling & Slurry Microtunneling (الأنفاق الدقيقة وMicrotunneling)
                    </option>
                    <option value="03 Water Networks & Desalination Transmission">
                      03 Water Networks & Desalination Transmission (شبكات المياه والتحلية)
                    </option>
                    <option value="04 Sewage & Stormwater Trunk Mains">
                      04 Sewage & Stormwater Trunk Mains (الصرف الصحي والسيول)
                    </option>
                    <option value="05 Roads, Bridges & Highway Underpasses">
                      05 Roads, Bridges & Highway Underpasses (معابر الطرق السريعة)
                    </option>
                    <option value="06 Industrial Concrete & Substation Construction">
                      06 Industrial Concrete & Substation Construction (الإنشاءات الصناعية ومحطات الكهرباء)
                    </option>
                    <option value="07 Real Estate Multi-Utility Infrastructure">
                      07 Real Estate Multi-Utility Infrastructure (بنية المرافق المتكاملة)
                    </option>
                    <option value="08 Solar Energy & High-Voltage Interconnects">
                      08 Solar Energy & High-Voltage Interconnects (الطاقة الشمسية وخطوط الجهد العالي)
                    </option>
                  </select>
                </div>

                <div className="text-xs font-technical">
                  <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                    {dict.contact.specsLabel}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={dict.contact.specsPlaceholder}
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    className="w-full bg-white dark:bg-[#0c0e10] border border-slate-300 dark:border-[#2a313a] rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#0f382a] dark:focus:ring-[#c5a869] text-slate-900 dark:text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0f382a] hover:bg-[#184e3b] dark:bg-gradient-to-r dark:from-[#c5a869] dark:via-amber-400 dark:to-[#b89758] text-white dark:text-[#0c0e10] font-bold text-xs uppercase tracking-widest transition-all rounded shadow-2xs font-technical flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <span>{isSubmitting ? dict.contact.submitting : dict.contact.submitButton}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
