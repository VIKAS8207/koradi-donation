type Language = "en" | "hi" | "mr";
type Option = { label: string; value: string };

// Universal State Values mapped to 3 languages
const stateTranslations: Record<string, Record<Language, string>> = {
  "Andhra Pradesh": { en: "Andhra Pradesh", hi: "आंध्र प्रदेश", mr: "आंध्र प्रदेश" },
  "Arunachal Pradesh": { en: "Arunachal Pradesh", hi: "अरुणाचल प्रदेश", mr: "अरुणाचल प्रदेश" },
  "Assam": { en: "Assam", hi: "असम", mr: "आसाम" },
  "Bihar": { en: "Bihar", hi: "बिहार", mr: "बिहार" },
  "Chhattisgarh": { en: "Chhattisgarh", hi: "छत्तीसगढ़", mr: "छत्तीसगड" },
  "Goa": { en: "Goa", hi: "गोवा", mr: "गोवा" },
  "Gujarat": { en: "Gujarat", hi: "गुजरात", mr: "गुजरात" },
  "Haryana": { en: "Haryana", hi: "हरियाणा", mr: "हरियाणा" },
  "Himachal Pradesh": { en: "Himachal Pradesh", hi: "हिमाचल प्रदेश", mr: "हिमाचल प्रदेश" },
  "Jharkhand": { en: "Jharkhand", hi: "झारखंड", mr: "झारखंड" },
  "Karnataka": { en: "Karnataka", hi: "कर्नाटक", mr: "कर्नाटक" },
  "Kerala": { en: "Kerala", hi: "केरल", mr: "केरळ" },
  "Madhya Pradesh": { en: "Madhya Pradesh", hi: "मध्य प्रदेश", mr: "मध्य प्रदेश" },
  "Maharashtra": { en: "Maharashtra", hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
  "Manipur": { en: "Manipur", hi: "मणिपुर", mr: "मणिपूर" },
  "Meghalaya": { en: "Meghalaya", hi: "मेघालय", mr: "मेघालय" },
  "Mizoram": { en: "Mizoram", hi: "मिजोरम", mr: "मिझोराम" },
  "Nagaland": { en: "Nagaland", hi: "नागालैंड", mr: "नागालँड" },
  "Odisha": { en: "Odisha", hi: "ओडिशा", mr: "ओडिशा" },
  "Punjab": { en: "Punjab", hi: "पंजाब", mr: "पंजाब" },
  "Rajasthan": { en: "Rajasthan", hi: "राजस्थान", mr: "राजस्थान" },
  "Sikkim": { en: "Sikkim", hi: "सिक्किम", mr: "सिक्कीम" },
  "Tamil Nadu": { en: "Tamil Nadu", hi: "तमिलनाडु", mr: "तामिळनाडू" },
  "Telangana": { en: "Telangana", hi: "तेलंगाना", mr: "तेलंगणा" },
  "Tripura": { en: "Tripura", hi: "त्रिपुरा", mr: "त्रिपुरा" },
  "Uttar Pradesh": { en: "Uttar Pradesh", hi: "उत्तर प्रदेश", mr: "उत्तर प्रदेश" },
  "Uttarakhand": { en: "Uttarakhand", hi: "उत्तराखंड", mr: "उत्तराखंड" },
  "West Bengal": { en: "West Bengal", hi: "पश्चिम बंगाल", mr: "पश्चिम बंगाल" }
};

// Universal City Values mapped to 3 languages
const cityTranslations: Record<string, Record<Language, string>> = {
  // Andhra Pradesh
  "Visakhapatnam": { en: "Visakhapatnam", hi: "विशाखापत्तनम", mr: "विशाखापट्टणम" },
  "Vijayawada": { en: "Vijayawada", hi: "विजयवाड़ा", mr: "विजयवाडा" },
  "Guntur": { en: "Guntur", hi: "गुंटूर", mr: "गुंटूर" },

  // Arunachal Pradesh
  "Itanagar": { en: "Itanagar", hi: "ईटानगर", mr: "इटानगर" },
  "Tawang": { en: "Tawang", hi: "तवांग", mr: "तवांग" },
  "Pasighat": { en: "Pasighat", hi: "पासीघाट", mr: "पासीघाट" },

  // Assam
  "Guwahati": { en: "Guwahati", hi: "गुवाहाटी", mr: "गुवाहाटी" },
  "Silchar": { en: "Silchar", hi: "सिलचर", mr: "सिलचर" },
  "Dibrugarh": { en: "Dibrugarh", hi: "डिब्रूगढ़", mr: "दिब्रुगढ" },

  // Bihar
  "Patna": { en: "Patna", hi: "पटना", mr: "पाटणा" },
  "Gaya": { en: "Gaya", hi: "गया", mr: "गया" },
  "Bhagalpur": { en: "Bhagalpur", hi: "भागलपुर", mr: "भागलपूर" },

  // Chhattisgarh
  "Raipur": { en: "Raipur", hi: "रायपुर", mr: "रायपूर" },
  "Bhilai": { en: "Bhilai", hi: "भिलाई", mr: "भिलाई" },
  "Bilaspur": { en: "Bilaspur", hi: "बिलासपुर", mr: "बिलासपूर" },

  // Goa
  "Panaji": { en: "Panaji", hi: "पणजी", mr: "पणजी" },
  "Margao": { en: "Margao", hi: "मडगांव", mr: "मडगाव" },
  "Vasco da Gama": { en: "Vasco da Gama", hi: "वास्को द गामा", mr: "वास्को द गामा" },

  // Gujarat
  "Ahmedabad": { en: "Ahmedabad", hi: "अहमदाबाद", mr: "अहमदाबाद" },
  "Surat": { en: "Surat", hi: "सूरत", mr: "सुरत" },
  "Vadodara": { en: "Vadodara", hi: "वडोदरा", mr: "वडोदरा" },

  // Haryana
  "Faridabad": { en: "Faridabad", hi: "फरीदाबाद", mr: "फरिदाबाद" },
  "Gurugram": { en: "Gurugram", hi: "गुरुग्राम", mr: "गुरुग्राम" },
  "Panipat": { en: "Panipat", hi: "पानीपत", mr: "पानिपत" },

  // Himachal Pradesh
  "Shimla": { en: "Shimla", hi: "शिमला", mr: "शिमला" },
  "Mandi": { en: "Mandi", hi: "मंडी", mr: "मंडी" },
  "Dharamshala": { en: "Dharamshala", hi: "धर्मशाला", mr: "धर्मशाला" },

  // Jharkhand
  "Ranchi": { en: "Ranchi", hi: "रांची", mr: "रांची" },
  "Jamshedpur": { en: "Jamshedpur", hi: "जमशेदपुर", mr: "जमशेदपूर" },
  "Dhanbad": { en: "Dhanbad", hi: "धनबाद", mr: "धनबाद" },

  // Karnataka
  "Bengaluru": { en: "Bengaluru", hi: "बेंगलुरु", mr: "बंगळुरू" },
  "Mysuru": { en: "Mysuru", hi: "मैसूर", mr: "म्हैसूर" },
  "Mangaluru": { en: "Mangaluru", hi: "मंगलुरु", mr: "मंगळूर" },

  // Kerala
  "Thiruvananthapuram": { en: "Thiruvananthapuram", hi: "तिरुवनंतपुरम", mr: "तिरुवनंतपुरम" },
  "Kochi": { en: "Kochi", hi: "कोच्चि", mr: "कोची" },
  "Kozhikode": { en: "Kozhikode", hi: "कोझिकोड", mr: "कोझिकोड" },

  // Madhya Pradesh
  "Indore": { en: "Indore", hi: "इंदौर", mr: "इंदूर" },
  "Bhopal": { en: "Bhopal", hi: "भोपाल", mr: "भोपाळ" },
  "Jabalpur": { en: "Jabalpur", hi: "जबलपुर", mr: "जबलपूर" },

  // Maharashtra
  "Mumbai": { en: "Mumbai", hi: "मुंबई", mr: "मुंबई" },
  "Pune": { en: "Pune", hi: "पुणे", mr: "पुणे" },
  "Nagpur": { en: "Nagpur", hi: "नागपुर", mr: "नागपूर" },

  // Manipur
  "Imphal": { en: "Imphal", hi: "इम्फाल", mr: "इंफाळ" },
  "Thoubal": { en: "Thoubal", hi: "थौबल", mr: "थौबल" },
  "Bishnupur": { en: "Bishnupur", hi: "बिष्णुपुर", mr: "बिष्णुपूर" },

  // Meghalaya
  "Shillong": { en: "Shillong", hi: "शिलांग", mr: "शिलाँग" },
  "Tura": { en: "Tura", hi: "तुरा", mr: "तुरा" },
  "Nongstoin": { en: "Nongstoin", hi: "नोंगस्टोइन", mr: "नोंगस्टोइन" },

  // Mizoram
  "Aizawl": { en: "Aizawl", hi: "आइजोल", mr: "ऐझॉल" },
  "Lunglei": { en: "Lunglei", hi: "लुंगलेई", mr: "लुंगलेई" },
  "Champhai": { en: "Champhai", hi: "चम्फाई", mr: "चंफाई" },

  // Nagaland
  "Dimapur": { en: "Dimapur", hi: "दीमापुर", mr: "दिमापूर" },
  "Kohima": { en: "Kohima", hi: "कोहिमा", mr: "कोहिमा" },
  "Mokokchung": { en: "Mokokchung", hi: "मोकोकचुंग", mr: "मोकोकचुंग" },

  // Odisha
  "Bhubaneswar": { en: "Bhubaneswar", hi: "भुवनेश्वर", mr: "भुवनेश्वर" },
  "Cuttack": { en: "Cuttack", hi: "कटक", mr: "कटक" },
  "Rourkela": { en: "Rourkela", hi: "राउरकेला", mr: "राउरकेला" },

  // Punjab
  "Ludhiana": { en: "Ludhiana", hi: "लुधियाना", mr: "लुधियाना" },
  "Amritsar": { en: "Amritsar", hi: "अमृतसर", mr: "अमृतसर" },
  "Jalandhar": { en: "Jalandhar", hi: "जालंधर", mr: "जालंधर" },

  // Rajasthan
  "Jaipur": { en: "Jaipur", hi: "जयपुर", mr: "जयपूर" },
  "Jodhpur": { en: "Jodhpur", hi: "जोधपुर", mr: "जोधपूर" },
  "Udaipur": { en: "Udaipur", hi: "उदयपुर", mr: "उदयपूर" },

  // Sikkim
  "Gangtok": { en: "Gangtok", hi: "गंगटोक", mr: "गंगटोक" },
  "Namchi": { en: "Namchi", hi: "नामची", mr: "नामची" },
  "Mangan": { en: "Mangan", hi: "मंगन", mr: "मंगन" },

  // Tamil Nadu
  "Chennai": { en: "Chennai", hi: "चेन्नई", mr: "चेन्नई" },
  "Coimbatore": { en: "Coimbatore", hi: "कोयंबटूर", mr: "कोईम्बतूर" },
  "Madurai": { en: "Madurai", hi: "मदुरै", mr: "मदुराई" },

  // Telangana
  "Hyderabad": { en: "Hyderabad", hi: "हैदराबाद", mr: "हैदराबाद" },
  "Warangal": { en: "Warangal", hi: "वारंगल", mr: "वारंगल" },
  "Nizamabad": { en: "Nizamabad", hi: "निजामाबाद", mr: "निजामाबाद" },

  // Tripura
  "Agartala": { en: "Agartala", hi: "अगरतला", mr: "आगरतळा" },
  "Udaipur(Tripura)": { en: "Udaipur", hi: "उदयपुर", mr: "उदयपूर" }, // Note: Tripura also has an Udaipur
  "Dharmanagar": { en: "Dharmanagar", hi: "धर्मनगर", mr: "धर्मनगर" },

  // Uttar Pradesh
  "Lucknow": { en: "Lucknow", hi: "लखनऊ", mr: "लखनौ" },
  "Kanpur": { en: "Kanpur", hi: "कानपुर", mr: "कानपूर" },
  "Varanasi": { en: "Varanasi", hi: "वाराणसी", mr: "वाराणसी" },

  // Uttarakhand
  "Dehradun": { en: "Dehradun", hi: "देहरादून", mr: "डेहराडून" },
  "Haridwar": { en: "Haridwar", hi: "हरिद्वार", mr: "हरिद्वार" },
  "Roorkee": { en: "Roorkee", hi: "रुड़की", mr: "रुरकी" },

  // West Bengal
  "Kolkata": { en: "Kolkata", hi: "कोलकाता", mr: "कोलकाता" },
  "Howrah": { en: "Howrah", hi: "हावड़ा", mr: "हावडा" },
  "Darjeeling": { en: "Darjeeling", hi: "दार्जिलिंग", mr: "दार्जिलिंग" }
};

// Map Universal State Values to Universal City Values
const stateCityMap: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Haryana": ["Faridabad", "Gurugram", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Dharamshala"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Dimapur", "Kohima", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
  "Sikkim": ["Gangtok", "Namchi", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling"]
};

// ==========================================
// Exported Helper Functions for the UI
// ==========================================

export const getTranslatedStates = (lang: Language): Option[] => {
  return Object.keys(stateTranslations).map((stateKey) => ({
    value: stateKey, 
    label: stateTranslations[stateKey][lang] || stateKey, 
  }));
};

export const getTranslatedCities = (stateKey: string, lang: Language): Option[] => {
  if (!stateKey || !stateCityMap[stateKey]) return [];
  
  return stateCityMap[stateKey].map((cityKey) => ({
    value: cityKey,
    label: cityTranslations[cityKey]?.[lang] || cityKey, 
  }));
};