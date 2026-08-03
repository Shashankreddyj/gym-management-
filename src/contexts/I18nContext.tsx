import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
] as const;

export type LangCode = typeof languages[number]['code'];

const translations: Record<LangCode, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard', members: 'Members', schedule: 'Schedule', billing: 'Billing',
    checkin: 'Check-In', leads: 'Leads', retention: 'Retention', frontdesk: 'AI Front Desk',
    member360: 'Member 360°', settings: 'Settings', pos: 'POS / Inventory', staff: 'Staff & Trainers',
    aiInsights: 'AI Business Intelligence', revenue: 'Revenue Optimizer', dunning: 'Payment Recovery',
    campaigns: 'AI Campaigns', locations: 'Multi-Location', noshow: 'No-Show Prediction',
    nps: 'Member Feedback', audit: 'Audit Log', equipment: 'Equipment Heatmap',
    waitlist: 'Waitlist Priority', apikeys: 'API Keys & Webhooks', social: 'Social Content',
    nutrition: 'Nutrition & Meals', workoutPlanner: 'AI Workout Plan', leaderboard: 'Leaderboard',
    search: 'Search members, classes, leads...',
    coreOps: 'Core Operations', aiAuto: 'AI & Automation', growth: 'Growth & Scale', more: 'More',
  },
  hi: {
    dashboard: 'डैशबोर्ड', members: 'सदस्य', schedule: 'अनुसूची', billing: 'बिलिंग',
    checkin: 'चेक-इन', leads: 'लीड्स', retention: 'प्रतिधारण', frontdesk: 'AI फ्रंट डेस्क',
    member360: 'सदस्य 360°', settings: 'सेटिंग्स', pos: 'POS / इन्वेंटरी', staff: 'स्टाफ और ट्रेनर',
    aiInsights: 'AI बिज़नेस इंटेलिजेंस', revenue: 'राजस्व ऑप्टिमाइज़र', dunning: 'भुगतान रिकवरी',
    campaigns: 'AI अभियान', locations: 'मल्टी-लोकेशन', noshow: 'नो-शो प्रेडिक्शन',
    nps: 'सदस्य प्रतिक्रिया', audit: 'ऑडिट लॉग', equipment: 'उपकरण हीटमैप',
    waitlist: 'प्रतीक्षा प्राथमिकता', apikeys: 'API की और वेबहुक', social: 'सोशल कंटेंट',
    nutrition: 'पोषण और भोजन', search: 'सदस्य, क्लास, लीड खोजें...',
    coreOps: 'मुख्य संचालन', aiAuto: 'AI और ऑटोमेशन', growth: 'विकास और स्केल', more: 'अधिक',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு', members: 'உறுப்பினர்கள்', schedule: 'அட்டவணை', billing: 'பில்லிங்',
    checkin: 'செக்-இன்', leads: 'லீட்ஸ்', retention: 'தக்கவைத்தல்', frontdesk: 'AI முன் மேசை',
    member360: 'உறுப்பினர் 360°', settings: 'அமைப்புகள்', pos: 'POS / சரக்கு', staff: 'ஊழியர்கள்',
    aiInsights: 'AI வணிக நுண்ணறிவு', revenue: 'வருவாய் மேம்படுத்தி', dunning: 'கட்டண மீட்பு',
    campaigns: 'AI பிரச்சாரங்கள்', locations: 'பல இடம்', noshow: 'வராத முன்கணிப்பு',
    nps: 'உறுப்பினர் கருத்து', audit: 'தணிக்கை பதிவு', equipment: 'உபகரண வெப்ப வரைபடம்',
    waitlist: 'காத்திருப்பு முன்னுரிமை', apikeys: 'API விசைகள்', social: 'சமூக உள்ளடக்கம்',
    nutrition: 'ஊட்டச்சத்து', search: 'உறுப்பினர்களைத் தேடுங்கள்...',
    coreOps: 'முக்கிய செயல்பாடுகள்', aiAuto: 'AI & ஆட்டோமேஷன்', growth: 'வளர்ச்சி', more: 'மேலும்',
  },
  te: {
    dashboard: 'డ్యాష్‌బోర్డ్', members: 'సభ్యులు', schedule: 'షెడ్యూల్', billing: 'బిల్లింగ్',
    checkin: 'చెక్-ఇన్', leads: 'లీడ్స్', retention: 'నిలుపుదల', frontdesk: 'AI ఫ్రంట్ డెస్క్',
    member360: 'సభ్యుడు 360°', settings: 'సెట్టింగ్స్', pos: 'POS / ఇన్వెంటరీ', staff: 'సిబ్బంది',
    aiInsights: 'AI వ్యాపార మేధస్సు', revenue: 'ఆదాయ ఆప్టిమైజర్', dunning: 'చెల్లింపు రికవరీ',
    campaigns: 'AI ప్రచారాలు', locations: 'బహుళ స్థానం', noshow: 'నో-షో అంచనా',
    nps: 'సభ్యుల అభిప్రాయం', audit: 'ఆడిట్ లాగ్', equipment: 'పరికరాల హీట్‌మ్యాప్',
    waitlist: 'వెయిట్‌లిస్ట్ ప్రాధాన్యత', apikeys: 'API కీలు', social: 'సోషల్ కంటెంట్',
    nutrition: 'పోషణ & భోజనం', search: 'సభ్యులు, తరగతులు శోధించండి...',
    coreOps: 'ప్రధాన కార్యకలాపాలు', aiAuto: 'AI & ఆటోమేషన్', growth: 'వృద్ధి', more: 'మరిన్ని',
  },
  mr: {
    dashboard: 'डॅशबोर्ड', members: 'सदस्य', schedule: 'वेळापत्रक', billing: 'बिलिंग',
    checkin: 'चेक-इन', leads: 'लीड्स', retention: 'धारणा', frontdesk: 'AI फ्रंट डेस्क',
    member360: 'सदस्य 360°', settings: 'सेटिंग्ज', pos: 'POS / इन्व्हेंटरी', staff: 'कर्मचारी',
    aiInsights: 'AI व्यवसाय बुद्धिमत्ता', revenue: 'महसूल ऑप्टिमायझर', dunning: 'पेमेंट रिकवरी',
    campaigns: 'AI मोहिमा', locations: 'मल्टी-लोकेशन', noshow: 'नो-शो अंदाज',
    nps: 'सदस्य अभिप्राय', audit: 'ऑडिट लॉग', equipment: 'उपकरणे हीटमॅप',
    waitlist: 'प्रतीक्षा प्राधान्य', apikeys: 'API कीज', social: 'सोशल कंटेंट',
    nutrition: 'पोषण आणि जेवण', search: 'सदस्य, वर्ग शोधा...',
    coreOps: 'मुख्य ऑपरेशन्स', aiAuto: 'AI आणि ऑटोमेशन', growth: 'वाढ', more: 'अधिक',
  },
};

interface I18nContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en', setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = localStorage.getItem('ironforge-lang');
    return (languages.find(l => l.code === saved)?.code || 'en') as LangCode;
  });

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem('ironforge-lang', l);
  };

  const t = (key: string): string => translations[lang]?.[key] || translations.en[key] || key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
