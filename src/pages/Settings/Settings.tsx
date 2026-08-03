import { useState } from 'react';
import { Settings, Bell, Shield, Globe, Palette, Users, Zap, CreditCard, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    gymName: 'IronForge Fitness',
    email: 'hello@ironforge.fit',
    phone: '+91 98765 43210',
    location: 'Main Street, Mumbai',
    autoChurnOutreach: true,
    instantLeadResponse: true,
    aiVoiceReceptionist: true,
    classFillOptimize: false,
    noShowPredictions: true,
    dynamicPricing: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fadeIn space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Settings</h2>
          <p className="text-sm text-[#6E625D] mt-1">Manage your gym configuration, AI preferences, and integrations</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#F5F0EA] rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-[#E00026]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#231815]">Gym Profile</h3>
            <p className="text-[11px] text-[#6E625D]">Basic information about your gym</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Gym Name</label>
            <input type="text" value={settings.gymName} onChange={e => setSettings({...settings, gymName: e.target.value})} className="input-field" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Email</label>
            <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="input-field" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Phone</label>
            <input type="tel" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="input-field" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Location</label>
            <input type="text" value={settings.location} onChange={e => setSettings({...settings, location: e.target.value})} className="input-field" />
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#F5F0EA] rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#E00026]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#231815]">AI Automation Preferences</h3>
            <p className="text-[11px] text-[#6E625D]">Control how AI interacts with members and leads</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { key: 'autoChurnOutreach' as const, label: 'Auto-trigger churn outreach', desc: 'AI will automatically send retention messages to at-risk members (pending your approval)', defaultChecked: true },
            { key: 'instantLeadResponse' as const, label: 'Instant lead response', desc: 'AI contacts new leads within 60 seconds via SMS/call', defaultChecked: true },
            { key: 'aiVoiceReceptionist' as const, label: 'AI voice receptionist', desc: 'Enable 24/7 AI voice call handling for front desk', defaultChecked: true },
            { key: 'classFillOptimize' as const, label: 'Class fill optimization', desc: 'AI recommends scheduling changes to maximize occupancy', defaultChecked: false },
            { key: 'noShowPredictions' as const, label: 'No-show predictions', desc: 'AI sends preemptive reminders to likely no-shows', defaultChecked: true },
            { key: 'dynamicPricing' as const, label: 'Dynamic pricing suggestions', desc: 'AI recommends off-peak pricing adjustments', defaultChecked: false },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#DDD3CB] last:border-0">
              <div>
                <p className="text-sm font-semibold text-[#231815]">{setting.label}</p>
                <p className="text-[11px] text-[#6E625D] mt-0.5">{setting.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings[setting.key]} onChange={e => setSettings({...settings, [setting.key]: e.target.checked})} className="sr-only peer" />
                <div className="w-11 h-6 bg-[#DDD3CB] rounded-full peer peer-checked:bg-[#E00026] peer-focus:ring-2 peer-focus:ring-[#E00026]/20 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Settings */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#F5F0EA] rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#E00026]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#231815]">Integrations</h3>
            <p className="text-[11px] text-[#6E625D]">Connect third-party services via Open API</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'Razorpay (Payments)', connected: true },
            { name: 'Google Fit', connected: true },
            { name: 'Apple Health', connected: false },
            { name: 'Strava', connected: true },
            { name: 'MyFitnessPal', connected: false },
            { name: 'Mailchimp', connected: true },
          ].map((integration, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#F5F0EA] rounded-xl">
              <span className="text-xs font-medium text-[#231815]">{integration.name}</span>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${
                integration.connected ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-[#6E625D]/10 text-[#6E625D]'
              }`}>{integration.connected ? 'Connected' : 'Not Connected'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
