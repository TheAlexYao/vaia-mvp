// file: azureVoices.ts

export interface AzureVoiceOption {
    name: string;     // e.g. "af-ZA-AdriNeural"
    gender: "Male" | "Female" | "Neutral";
  }
  
  export interface AzureLocaleData {
    displayName: string;
    voices: AzureVoiceOption[];
  }
  
  // The dictionary from locale -> array of voices
  export const azureVoiceMap: Record<string, AzureLocaleData> = {
    "af-ZA": {
      displayName: "Afrikaans (South Africa)",
      voices: [
        { name: "af-ZA-AdriNeural", gender: "Female" },
        { name: "af-ZA-WillemNeural", gender: "Male" },
      ]
    },
    "am-ET": {
      displayName: "Amharic (Ethiopia)", 
      voices: [
        { name: "am-ET-MekdesNeural", gender: "Female" },
        { name: "am-ET-AmehaNeural", gender: "Male" },
      ]
    },
    "ar-AE": {
      displayName: "Arabic (United Arab Emirates)",
      voices: [
        { name: "ar-AE-FatimaNeural", gender: "Female" },
        { name: "ar-AE-HamdanNeural", gender: "Male" },
      ]
    },
    "ar-BH": {
      displayName: "Arabic (Bahrain)",
      voices: [
        { name: "ar-BH-LailaNeural", gender: "Female" },
        { name: "ar-BH-AliNeural", gender: "Male" },
      ]
    },
    "ar-DZ": {
      displayName: "Arabic (Algeria)",
      voices: [
        { name: "ar-DZ-AminaNeural", gender: "Female" },
        { name: "ar-DZ-IsmaelNeural", gender: "Male" },
      ]
    },
    "ar-EG": {
      displayName: "Arabic (Egypt)",
      voices: [
        { name: "ar-EG-SalmaNeural", gender: "Female" },
        { name: "ar-EG-ShakirNeural", gender: "Male" },
      ]
    },
    "ar-IQ": {
      displayName: "Arabic (Iraq)",
      voices: [
        { name: "ar-IQ-RanaNeural", gender: "Female" },
        { name: "ar-IQ-BasselNeural", gender: "Male" },
      ]
    },
    "ar-JO": {
      displayName: "Arabic (Jordan)",
      voices: [
        { name: "ar-JO-SanaNeural", gender: "Female" },
        { name: "ar-JO-TaimNeural", gender: "Male" },
      ]
    },
    "ar-KW": {
      displayName: "Arabic (Kuwait)",
      voices: [
        { name: "ar-KW-NouraNeural", gender: "Female" },
        { name: "ar-KW-FahedNeural", gender: "Male" },
      ]
    },
    "ar-LB": {
      displayName: "Arabic (Lebanon)",
      voices: [
        { name: "ar-LB-LaylaNeural", gender: "Female" },
        { name: "ar-LB-RamiNeural", gender: "Male" },
      ]
    },
    "ar-LY": {
      displayName: "Arabic (Libya)",
      voices: [
        { name: "ar-LY-ImanNeural", gender: "Female" },
        { name: "ar-LY-OmarNeural", gender: "Male" },
      ]
    },
    "ar-MA": {
      displayName: "Arabic (Morocco)",
      voices: [
        { name: "ar-MA-MounaNeural", gender: "Female" },
        { name: "ar-MA-JamalNeural", gender: "Male" },
      ]
    },
    "ar-OM": {
      displayName: "Arabic (Oman)",
      voices: [
        { name: "ar-OM-AyshaNeural", gender: "Female" },
        { name: "ar-OM-AbdullahNeural", gender: "Male" },
      ]
    },
    "ar-QA": {
      displayName: "Arabic (Qatar)",
      voices: [
        { name: "ar-QA-AmalNeural", gender: "Female" },
        { name: "ar-QA-MoazNeural", gender: "Male" },
      ]
    },
    "ar-SA": {
      displayName: "Arabic (Saudi Arabia)",
      voices: [
        { name: "ar-SA-ZariyahNeural", gender: "Female" },
        { name: "ar-SA-HamedNeural", gender: "Male" },
      ]
    },
    "ar-SY": {
      displayName: "Arabic (Syria)",
      voices: [
        { name: "ar-SY-AmanyNeural", gender: "Female" },
        { name: "ar-SY-LaithNeural", gender: "Male" },
      ]
    },
    "ar-TN": {
      displayName: "Arabic (Tunisia)",
      voices: [
        { name: "ar-TN-ReemNeural", gender: "Female" },
        { name: "ar-TN-HediNeural", gender: "Male" },
      ]
    },
    "ar-YE": {
      displayName: "Arabic (Yemen)",
      voices: [
        { name: "ar-YE-MaryamNeural", gender: "Female" },
        { name: "ar-YE-SalehNeural", gender: "Male" },
      ]
    },
    "as-IN": {
      displayName: "Assamese (India)",
      voices: [
        { name: "as-IN-YashicaNeural", gender: "Female" },
        { name: "as-IN-PriyomNeural", gender: "Male" },
      ]
    },
    "az-AZ": {
      displayName: "Azerbaijani (Latin, Azerbaijan)",
      voices: [
        { name: "az-AZ-BanuNeural", gender: "Female" },
        { name: "az-AZ-BabekNeural", gender: "Male" },
      ]
    },
    "bg-BG": {
      displayName: "Bulgarian (Bulgaria)",
      voices: [
        { name: "bg-BG-KalinaNeural", gender: "Female" },
        { name: "bg-BG-BorislavNeural", gender: "Male" },
      ]
    },
    "bn-BD": {
      displayName: "Bangla (Bangladesh)",
      voices: [
        { name: "bn-BD-NabanitaNeural", gender: "Female" },
        { name: "bn-BD-PradeepNeural", gender: "Male" },
      ]
    },
    "bn-IN": {
      displayName: "Bengali (India)",
      voices: [
        { name: "bn-IN-TanishaaNeural", gender: "Female" },
        { name: "bn-IN-BashkarNeural", gender: "Male" },
      ]
    },
    "bs-BA": {
      displayName: "Bosnian (Bosnia and Herzegovina)",
      voices: [
        { name: "bs-BA-VesnaNeural", gender: "Female" },
        { name: "bs-BA-GoranNeural", gender: "Male" },
      ]
    },
    "ca-ES": {
      displayName: "Catalan",
      voices: [
        { name: "ca-ES-JoanaNeural", gender: "Female" },
        { name: "ca-ES-EnricNeural", gender: "Male" },
        { name: "ca-ES-AlbaNeural", gender: "Female" },
      ]
    },
    "cs-CZ": {
      displayName: "Czech (Czechia)",
      voices: [
        { name: "cs-CZ-VlastaNeural", gender: "Female" },
        { name: "cs-CZ-AntoninNeural", gender: "Male" },
      ]
    },
    "cy-GB": {
      displayName: "Welsh (United Kingdom)",
      voices: [
        { name: "cy-GB-NiaNeural", gender: "Female" },
        { name: "cy-GB-AledNeural", gender: "Male" },
      ]
    },
    "da-DK": {
      displayName: "Danish (Denmark)",
      voices: [
        { name: "da-DK-ChristelNeural", gender: "Female" },
        { name: "da-DK-JeppeNeural", gender: "Male" },
      ]
    },
    "de-AT": {
      displayName: "German (Austria)",
      voices: [
        { name: "de-AT-IngridNeural", gender: "Female" },
        { name: "de-AT-JonasNeural", gender: "Male" },
      ]
    },
    "de-CH": {
      displayName: "German (Switzerland)",
      voices: [
        { name: "de-CH-LeniNeural", gender: "Female" },
        { name: "de-CH-JanNeural", gender: "Male" },
      ]
    },
    "de-DE": {
      displayName: "German (Germany)",
      voices: [
        { name: "de-DE-KatjaNeural", gender: "Female" },
        { name: "de-DE-ConradNeural", gender: "Male" },
        { name: "de-DE-SeraphinaMultilingualNeural", gender: "Female" },
        { name: "de-DE-FlorianMultilingualNeural", gender: "Male" },
        { name: "de-DE-AmalaNeural", gender: "Female" },
        { name: "de-DE-BerndNeural", gender: "Male" },
        { name: "de-DE-ChristophNeural", gender: "Male" },
        { name: "de-DE-ElkeNeural", gender: "Female" },
        { name: "de-DE-GiselaNeural", gender: "Female" },
        { name: "de-DE-KasperNeural", gender: "Male" },
        { name: "de-DE-KillianNeural", gender: "Male" },
        { name: "de-DE-KlarissaNeural", gender: "Female" },
        { name: "de-DE-KlausNeural", gender: "Male" },
        { name: "de-DE-LouisaNeural", gender: "Female" },
        { name: "de-DE-MajaNeural", gender: "Female" },
        { name: "de-DE-RalfNeural", gender: "Male" },
        { name: "de-DE-TanjaNeural", gender: "Female" },
        { name: "de-DE-Seraphina:DragonHDLatestNeural", gender: "Female" },
      ]
    },
    "el-GR": {
      displayName: "Greek (Greece)",
      voices: [
        { name: "el-GR-AthinaNeural", gender: "Female" },
        { name: "el-GR-NestorasNeural", gender: "Male" },
      ]
    },
    "en-AU": {
      displayName: "English (Australia)",
      voices: [
        { name: "en-AU-NatashaNeural", gender: "Female" },
        { name: "en-AU-WilliamNeural", gender: "Male" },
        { name: "en-AU-AnnetteNeural", gender: "Female" },
        { name: "en-AU-CarlyNeural", gender: "Female" },
        { name: "en-AU-DarrenNeural", gender: "Male" },
        { name: "en-AU-DuncanNeural", gender: "Male" },
        { name: "en-AU-ElsieNeural", gender: "Female" },
        { name: "en-AU-FreyaNeural", gender: "Female" },
        { name: "en-AU-JoanneNeural", gender: "Female" },
        { name: "en-AU-KenNeural", gender: "Male" },
        { name: "en-AU-KimNeural", gender: "Female" },
        { name: "en-AU-NeilNeural", gender: "Male" },
        { name: "en-AU-TimNeural", gender: "Male" },
        { name: "en-AU-TinaNeural", gender: "Female" },
      ]
    },
    "en-CA": {
      displayName: "English (Canada)",
      voices: [
        { name: "en-CA-ClaraNeural", gender: "Female" },
        { name: "en-CA-LiamNeural", gender: "Male" },
      ]
    },
    "en-GB": {
      displayName: "English (United Kingdom)",
      voices: [
        { name: "en-GB-SoniaNeural", gender: "Female" },
        { name: "en-GB-RyanNeural", gender: "Male" },
        { name: "en-GB-LibbyNeural", gender: "Female" },
        { name: "en-GB-AdaMultilingualNeural", gender: "Female" },
        { name: "en-GB-OllieMultilingualNeural", gender: "Male" },
        { name: "en-GB-AbbiNeural", gender: "Female" },
        { name: "en-GB-AlfieNeural", gender: "Male" },
        { name: "en-GB-BellaNeural", gender: "Female" },
        { name: "en-GB-ElliotNeural", gender: "Male" },
        { name: "en-GB-EthanNeural", gender: "Male" },
        { name: "en-GB-HollieNeural", gender: "Female" },
        { name: "en-GB-MaisieNeural", gender: "Female" },
        { name: "en-GB-NoahNeural", gender: "Male" },
        { name: "en-GB-OliverNeural", gender: "Male" },
        { name: "en-GB-OliviaNeural", gender: "Female" },
        { name: "en-GB-ThomasNeural", gender: "Male" },
      ]
    },
    "en-HK": {
      displayName: "English (Hong Kong SAR)",
      voices: [
        { name: "en-HK-YanNeural", gender: "Female" },
        { name: "en-HK-SamNeural", gender: "Male" },
      ]
    },
    "en-IE": {
      displayName: "English (Ireland)",
      voices: [
        { name: "en-IE-EmilyNeural", gender: "Female" },
        { name: "en-IE-ConnorNeural", gender: "Male" },
      ]
    },
    "en-IN": {
      displayName: "English (India)",
      voices: [
        { name: "en-IN-AaravNeural", gender: "Male" },
        { name: "en-IN-AashiNeural", gender: "Female" },
        { name: "en-IN-AnanyaNeural", gender: "Female" },
        { name: "en-IN-KavyaNeural", gender: "Female" },
        { name: "en-IN-KunalNeural", gender: "Male" },
        { name: "en-IN-NeerjaNeural", gender: "Female" },
        { name: "en-IN-PrabhatNeural", gender: "Male" },
        { name: "en-IN-RehaanNeural", gender: "Male" },
        { name: "en-IN-AartiNeural", gender: "Female" },
        { name: "en-IN-ArjunNeural", gender: "Male" },
      ]
    },
    "en-KE": {
      displayName: "English (Kenya)",
      voices: [
        { name: "en-KE-AsiliaNeural", gender: "Female" },
        { name: "en-KE-ChilembaNeural", gender: "Male" },
      ]
    },
    "en-NG": {
      displayName: "English (Nigeria)",
      voices: [
        { name: "en-NG-EzinneNeural", gender: "Female" },
        { name: "en-NG-AbeoNeural", gender: "Male" },
      ]
    },
    "en-NZ": {
      displayName: "English (New Zealand)",
      voices: [
        { name: "en-NZ-MollyNeural", gender: "Female" },
        { name: "en-NZ-MitchellNeural", gender: "Male" },
      ]
    },
    "en-PH": {
      displayName: "English (Philippines)",
      voices: [
        { name: "en-PH-RosaNeural", gender: "Female" },
        { name: "en-PH-JamesNeural", gender: "Male" },
      ]
    },
    "en-SG": {
      displayName: "English (Singapore)",
      voices: [
        { name: "en-SG-LunaNeural", gender: "Female" },
        { name: "en-SG-WayneNeural", gender: "Male" },
      ]
    },
    "en-TZ": {
      displayName: "English (Tanzania)",
      voices: [
        { name: "en-TZ-ImaniNeural", gender: "Female" },
        { name: "en-TZ-ElimuNeural", gender: "Male" },
      ]
    },
    "en-US": {
      displayName: "English (United States)",
      voices: [
        { name: "en-US-AvaMultilingualNeural", gender: "Female" },
        { name: "en-US-AndrewMultilingualNeural", gender: "Male" },
        { name: "en-US-EmmaMultilingualNeural", gender: "Female" },
        { name: "en-US-BrianMultilingualNeural", gender: "Male" },
        { name: "en-US-AvaNeural", gender: "Female" },
        { name: "en-US-AndrewNeural", gender: "Male" },
        { name: "en-US-EmmaNeural", gender: "Female" },
        { name: "en-US-BrianNeural", gender: "Male" },
        { name: "en-US-JennyNeural", gender: "Female" },
        { name: "en-US-GuyNeural", gender: "Male" },
        { name: "en-US-AriaNeural", gender: "Female" },
        { name: "en-US-DavisNeural", gender: "Male" },
        { name: "en-US-JaneNeural", gender: "Female" },
        { name: "en-US-JasonNeural", gender: "Male" },
        { name: "en-US-KaiNeural", gender: "Male" },
        { name: "en-US-LunaNeural", gender: "Female" },
        { name: "en-US-SaraNeural", gender: "Female" },
        { name: "en-US-TonyNeural", gender: "Male" },
        { name: "en-US-NancyNeural", gender: "Female" },
        { name: "en-US-CoraMultilingualNeural", gender: "Female" },
        { name: "en-US-ChristopherMultilingualNeural", gender: "Male" },
        { name: "en-US-BrandonMultilingualNeural", gender: "Male" },
        { name: "en-US-AmberNeural", gender: "Female" },
        { name: "en-US-AnaNeural", gender: "Female" },
        { name: "en-US-AshleyNeural", gender: "Female" },
        { name: "en-US-BrandonNeural", gender: "Male" },
        { name: "en-US-ChristopherNeural", gender: "Male" },
        { name: "en-US-CoraNeural", gender: "Female" },
        { name: "en-US-ElizabethNeural", gender: "Female" },
        { name: "en-US-EricNeural", gender: "Male" },
        { name: "en-US-JacobNeural", gender: "Male" },
        { name: "en-US-JennyMultilingualNeural", gender: "Female" },
        { name: "en-US-MichelleNeural", gender: "Female" },
        { name: "en-US-MonicaNeural", gender: "Female" },
        { name: "en-US-RogerNeural", gender: "Male" },
        { name: "en-US-RyanMultilingualNeural", gender: "Male" },
        { name: "en-US-SteffanNeural", gender: "Male" },
        { name: "en-US-AdamMultilingualNeural", gender: "Male" },
        { name: "en-US-AlloyTurboMultilingualNeural", gender: "Male" },
        { name: "en-US-AmandaMultilingualNeural", gender: "Female" },
        { name: "en-US-BlueNeural", gender: "Neutral" },
        { name: "en-US-DavisMultilingualNeural", gender: "Male" },
        { name: "en-US-DerekMultilingualNeural", gender: "Male" },
        { name: "en-US-DustinMultilingualNeural", gender: "Male" },
        { name: "en-US-EchoTurboMultilingualNeural", gender: "Male" },
        { name: "en-US-EvelynMultilingualNeural", gender: "Female" },
        { name: "en-US-FableTurboMultilingualNeural", gender: "Neutral" },
        { name: "en-US-LewisMultilingualNeural", gender: "Male" },
        { name: "en-US-LolaMultilingualNeural", gender: "Female" },
        { name: "en-US-NancyMultilingualNeural", gender: "Female" },
        { name: "en-US-NovaTurboMultilingualNeural", gender: "Female" },
        { name: "en-US-OnyxTurboMultilingualNeural", gender: "Male" },
        { name: "en-US-PhoebeMultilingualNeural", gender: "Female" },
        { name: "en-US-SamuelMultilingualNeural", gender: "Male" },
        { name: "en-US-SerenaMultilingualNeural", gender: "Female" },
        { name: "en-US-ShimmerTurboMultilingualNeural", gender: "Female" },
        { name: "en-US-SteffanMultilingualNeural", gender: "Male" },
        { name: "en-US-Aria:DragonHDLatestNeural", gender: "Female" },
        { name: "en-US-Ava:DragonHDLatestNeural", gender: "Female" },
        { name: "en-US-Brian:DragonHDLatestNeural", gender: "Male" },
        { name: "en-US-Davis:DragonHDLatestNeural", gender: "Male" },
        { name: "en-US-Jenny:DragonHDLatestNeural", gender: "Female" },
        { name: "en-US-Steffan:DragonHDLatestNeural", gender: "Male" },
      ]
    },
    "en-ZA": {
      displayName: "English (South Africa)",
      voices: [
        { name: "en-ZA-LeahNeural", gender: "Female" },
        { name: "en-ZA-LukeNeural", gender: "Male" },
      ]
    },
    "es-AR": {
      displayName: "Spanish (Argentina)",
      voices: [
        { name: "es-AR-ElenaNeural", gender: "Female" },
        { name: "es-AR-TomasNeural", gender: "Male" },
      ]
    },
    "es-BO": {
      displayName: "Spanish (Bolivia)",
      voices: [
        { name: "es-BO-SofiaNeural", gender: "Female" },
        { name: "es-BO-MarceloNeural", gender: "Male" },
      ]
    },
    "es-CL": {
      displayName: "Spanish (Chile)",
      voices: [
        { name: "es-CL-CatalinaNeural", gender: "Female" },
        { name: "es-CL-LorenzoNeural", gender: "Male" },
      ]
    },
    "es-CO": {
      displayName: "Spanish (Colombia)",
      voices: [
        { name: "es-CO-SalomeNeural", gender: "Female" },
        { name: "es-CO-GonzaloNeural", gender: "Male" },
      ]
    },
    "es-CR": {
      displayName: "Spanish (Costa Rica)",
      voices: [
        { name: "es-CR-MariaNeural", gender: "Female" },
        { name: "es-CR-JuanNeural", gender: "Male" },
      ]
    },
    "es-CU": {
      displayName: "Spanish (Cuba)",
      voices: [
        { name: "es-CU-BelkysNeural", gender: "Female" },
        { name: "es-CU-ManuelNeural", gender: "Male" },
      ]
    },
    "es-DO": {
      displayName: "Spanish (Dominican Republic)",
      voices: [
        { name: "es-DO-RamonaNeural", gender: "Female" },
        { name: "es-DO-EmilioNeural", gender: "Male" },
      ]
    },
    "es-EC": {
      displayName: "Spanish (Ecuador)",
      voices: [
        { name: "es-EC-AndreaNeural", gender: "Female" },
        { name: "es-EC-LuisNeural", gender: "Male" },
      ]
    },
    "es-ES": {
      displayName: "Spanish (Spain)",
      voices: [
        { name: "es-ES-ElviraNeural", gender: "Female" },
        { name: "es-ES-AlvaroNeural", gender: "Male" },
        { name: "es-ES-ArabellaMultilingualNeural", gender: "Female" },
        { name: "es-ES-IsidoraMultilingualNeural", gender: "Female" },
        { name: "es-ES-TristanMultilingualNeural", gender: "Male" },
        { name: "es-ES-XimenaMultilingualNeural", gender: "Female" },
        { name: "es-ES-AbrilNeural", gender: "Female" },
        { name: "es-ES-ArnauNeural", gender: "Male" },
        { name: "es-ES-DarioNeural", gender: "Male" },
        { name: "es-ES-EliasNeural", gender: "Male" },
        { name: "es-ES-EstrellaNeural", gender: "Female" },
        { name: "es-ES-IreneNeural", gender: "Female" },
        { name: "es-ES-LaiaNeural", gender: "Female" },
        { name: "es-ES-LiaNeural", gender: "Female" },
        { name: "es-ES-NilNeural", gender: "Male" },
        { name: "es-ES-SaulNeural", gender: "Male" },
        { name: "es-ES-TeoNeural", gender: "Male" },
        { name: "es-ES-TrianaNeural", gender: "Female" },
        { name: "es-ES-VeraNeural", gender: "Female" },
        { name: "es-ES-XimenaNeural", gender: "Female" },
      ]
    },
    "es-GQ": {
      displayName: "Spanish (Equatorial Guinea)",
      voices: [
        { name: "es-GQ-TeresaNeural", gender: "Female" },
        { name: "es-GQ-JavierNeural", gender: "Male" },
      ]
    },
    "es-GT": {
      displayName: "Spanish (Guatemala)",
      voices: [
        { name: "es-GT-MartaNeural", gender: "Female" },
        { name: "es-GT-AndresNeural", gender: "Male" },
      ]
    },
    "es-HN": {
      displayName: "Spanish (Honduras)",
      voices: [
        { name: "es-HN-KarlaNeural", gender: "Female" },
        { name: "es-HN-CarlosNeural", gender: "Male" },
      ]
    },
    "es-MX": {
      displayName: "Spanish (Mexico)",
      voices: [
        { name: "es-MX-DaliaNeural", gender: "Female" },
        { name: "es-MX-JorgeNeural", gender: "Male" },
        { name: "es-MX-BeatrizNeural", gender: "Female" },
        { name: "es-MX-CandelaNeural", gender: "Female" },
        { name: "es-MX-CarlotaNeural", gender: "Female" },
        { name: "es-MX-CecilioNeural", gender: "Male" },
        { name: "es-MX-GerardoNeural", gender: "Male" },
        { name: "es-MX-LarissaNeural", gender: "Female" },
        { name: "es-MX-LibertoNeural", gender: "Male" },
        { name: "es-MX-LucianoNeural", gender: "Male" },
        { name: "es-MX-MarinaNeural", gender: "Female" },
        { name: "es-MX-NuriaNeural", gender: "Female" },
        { name: "es-MX-PelayoNeural", gender: "Male" },
        { name: "es-MX-RenataNeural", gender: "Female" },
        { name: "es-MX-YagoNeural", gender: "Male" },
      ]
    },
    "es-NI": {
      displayName: "Spanish (Nicaragua)",
      voices: [
        { name: "es-NI-YolandaNeural", gender: "Female" },
        { name: "es-NI-FedericoNeural", gender: "Male" },
      ]
    },
    "es-PA": {
      displayName: "Spanish (Panama)",
      voices: [
        { name: "es-PA-MargaritaNeural", gender: "Female" },
        { name: "es-PA-RobertoNeural", gender: "Male" },
      ]
    },
    "es-PE": {
      displayName: "Spanish (Peru)",
      voices: [
        { name: "es-PE-CamilaNeural", gender: "Female" },
        { name: "es-PE-AlexNeural", gender: "Male" },
      ]
    },
    "es-PR": {
      displayName: "Spanish (Puerto Rico)",
      voices: [
        { name: "es-PR-KarinaNeural", gender: "Female" },
        { name: "es-PR-VictorNeural", gender: "Male" },
      ]
    },
    "es-PY": {
      displayName: "Spanish (Paraguay)",
      voices: [
        { name: "es-PY-TaniaNeural", gender: "Female" },
        { name: "es-PY-MarioNeural", gender: "Male" },
      ]
    },
    "es-SV": {
      displayName: "Spanish (El Salvador)",
      voices: [
        { name: "es-SV-LorenaNeural", gender: "Female" },
        { name: "es-SV-RodrigoNeural", gender: "Male" },
      ]
    },
    "es-US": {
      displayName: "Spanish (United States)",
      voices: [
        { name: "es-US-PalomaNeural", gender: "Female" },
        { name: "es-US-AlonsoNeural", gender: "Male" },
      ]
    },
    "es-UY": {
      displayName: "Spanish (Uruguay)",
      voices: [
        { name: "es-UY-ValentinaNeural", gender: "Female" },
        { name: "es-UY-MateoNeural", gender: "Male" },
      ]
    },
    "es-VE": {
      displayName: "Spanish (Venezuela)",
      voices: [
        { name: "es-VE-PaolaNeural", gender: "Female" },
        { name: "es-VE-SebastianNeural", gender: "Male" },
      ]
    },
    "et-EE": {
      displayName: "Estonian (Estonia)",
      voices: [
        { name: "et-EE-AnuNeural", gender: "Female" },
        { name: "et-EE-KertNeural", gender: "Male" },
      ]
    },
    "eu-ES": {
      displayName: "Basque",
      voices: [
        { name: "eu-ES-AinhoaNeural", gender: "Female" },
        { name: "eu-ES-AnderNeural", gender: "Male" },
      ]
    },
    "fa-IR": {
      displayName: "Persian (Iran)",
      voices: [
        { name: "fa-IR-DilaraNeural", gender: "Female" },
        { name: "fa-IR-FaridNeural", gender: "Male" },
      ]
    },
    "fi-FI": {
      displayName: "Finnish (Finland)",
      voices: [
        { name: "fi-FI-SelmaNeural", gender: "Female" },
        { name: "fi-FI-HarriNeural", gender: "Male" },
        { name: "fi-FI-NooraNeural", gender: "Female" },
      ]
    },
    "fil-PH": {
      displayName: "Filipino (Philippines)",
      voices: [
        { name: "fil-PH-BlessicaNeural", gender: "Female" },
        { name: "fil-PH-AngeloNeural", gender: "Male" },
      ]
    },
    "fr-BE": {
      displayName: "French (Belgium)",
      voices: [
        { name: "fr-BE-CharlineNeural", gender: "Female" },
        { name: "fr-BE-GerardNeural", gender: "Male" },
      ]
    },
    "fr-CA": {
      displayName: "French (Canada)",
      voices: [
        { name: "fr-CA-SylvieNeural", gender: "Female" },
        { name: "fr-CA-JeanNeural", gender: "Male" },
        { name: "fr-CA-AntoineNeural", gender: "Male" },
        { name: "fr-CA-ThierryNeural", gender: "Male" },
      ]
    },
    "fr-CH": {
      displayName: "French (Switzerland)",
      voices: [
        { name: "fr-CH-ArianeNeural", gender: "Female" },
        { name: "fr-CH-FabriceNeural", gender: "Male" },
      ]
    },
    "fr-FR": {
      displayName: "French (France)",
      voices: [
        { name: "fr-FR-DeniseNeural", gender: "Female" },
        { name: "fr-FR-HenriNeural", gender: "Male" },
        { name: "fr-FR-VivienneMultilingualNeural", gender: "Female" },
        { name: "fr-FR-RemyMultilingualNeural", gender: "Male" },
        { name: "fr-FR-LucienMultilingualNeural", gender: "Male" },
        { name: "fr-FR-AlainNeural", gender: "Male" },
        { name: "fr-FR-BrigitteNeural", gender: "Female" },
        { name: "fr-FR-CelesteNeural", gender: "Female" },
        { name: "fr-FR-ClaudeNeural", gender: "Male" },
        { name: "fr-FR-CoralieNeural", gender: "Female" },
        { name: "fr-FR-EloiseNeural", gender: "Female" },
        { name: "fr-FR-JacquelineNeural", gender: "Female" },
        { name: "fr-FR-JeromeNeural", gender: "Male" },
        { name: "fr-FR-JosephineNeural", gender: "Female" },
        { name: "fr-FR-MauriceNeural", gender: "Male" },
        { name: "fr-FR-YvesNeural", gender: "Male" },
        { name: "fr-FR-YvetteNeural", gender: "Female" },
      ]
    },
    "ga-IE": {
      displayName: "Irish (Ireland)",
      voices: [
        { name: "ga-IE-OrlaNeural", gender: "Female" },
        { name: "ga-IE-ColmNeural", gender: "Male" },
      ]
    },
    "gl-ES": {
      displayName: "Galician (Spain)",
      voices: [
        { name: "gl-ES-SabelaNeural", gender: "Female" },
        { name: "gl-ES-RoiNeural", gender: "Male" },
      ]
    },
    "gu-IN": {
      displayName: "Gujarati (India)",
      voices: [
        { name: "gu-IN-DhwaniNeural", gender: "Female" },
        { name: "gu-IN-NiranjanNeural", gender: "Male" },
      ]
    },
    "he-IL": {
      displayName: "Hebrew (Israel)",
      voices: [
        { name: "he-IL-HilaNeural", gender: "Female" },
        { name: "he-IL-AvriNeural", gender: "Male" },
      ]
    },
    "hi-IN": {
      displayName: "Hindi (India)",
      voices: [
        { name: "hi-IN-AaravNeural", gender: "Male" },
        { name: "hi-IN-AnanyaNeural", gender: "Female" },
        { name: "hi-IN-KavyaNeural", gender: "Female" },
        { name: "hi-IN-KunalNeural", gender: "Male" },
        { name: "hi-IN-RehaanNeural", gender: "Male" },
        { name: "hi-IN-SwaraNeural", gender: "Female" },
        { name: "hi-IN-MadhurNeural", gender: "Male" },
        { name: "hi-IN-AartiNeural", gender: "Female" },
        { name: "hi-IN-ArjunNeural", gender: "Male" },
      ]
    },
    "hr-HR": {
      displayName: "Croatian (Croatia)",
      voices: [
        { name: "hr-HR-GabrijelaNeural", gender: "Female" },
        { name: "hr-HR-SreckoNeural", gender: "Male" },
      ]
    },
    "hu-HU": {
      displayName: "Hungarian (Hungary)",
      voices: [
        { name: "hu-HU-NoemiNeural", gender: "Female" },
        { name: "hu-HU-TamasNeural", gender: "Male" },
      ]
    },
    "hy-AM": {
      displayName: "Armenian (Armenia)",
      voices: [
        { name: "hy-AM-AnahitNeural", gender: "Female" },
        { name: "hy-AM-HaykNeural", gender: "Male" },
      ]
    },
    "id-ID": {
      displayName: "Indonesian (Indonesia)",
      voices: [
        { name: "id-ID-GadisNeural", gender: "Female" },
        { name: "id-ID-ArdiNeural", gender: "Male" },
      ]
    },
    "is-IS": {
      displayName: "Icelandic (Iceland)",
      voices: [
        { name: "is-IS-GudrunNeural", gender: "Female" },
        { name: "is-IS-GunnarNeural", gender: "Male" },
      ]
    },
    "it-IT": {
      displayName: "Italian (Italy)",
      voices: [
        { name: "it-IT-ElsaNeural", gender: "Female" },
        { name: "it-IT-IsabellaNeural", gender: "Female" },
        { name: "it-IT-DiegoNeural", gender: "Male" },
        { name: "it-IT-AlessioMultilingualNeural", gender: "Male" },
        { name: "it-IT-IsabellaMultilingualNeural", gender: "Female" },
        { name: "it-IT-GiuseppeMultilingualNeural", gender: "Male" },
        { name: "it-IT-MarcelloMultilingualNeural", gender: "Male" },
        { name: "it-IT-BenignoNeural", gender: "Male" },
        { name: "it-IT-CalimeroNeural", gender: "Male" },
        { name: "it-IT-CataldoNeural", gender: "Male" },
        { name: "it-IT-FabiolaNeural", gender: "Female" },
        { name: "it-IT-FiammaNeural", gender: "Female" },
        { name: "it-IT-GianniNeural", gender: "Male" },
        { name: "it-IT-GiuseppeNeural", gender: "Male" },
        { name: "it-IT-ImeldaNeural", gender: "Female" },
        { name: "it-IT-IrmaNeural", gender: "Female" },
        { name: "it-IT-LisandroNeural", gender: "Male" },
        { name: "it-IT-PalmiraNeural", gender: "Female" },
        { name: "it-IT-PierinaNeural", gender: "Female" },
        { name: "it-IT-RinaldoNeural", gender: "Male" },
      ]
    },
    "iu-CANS-CA": {
      displayName: "Inuktitut (Syllabics, Canada)",
      voices: [
        { name: "iu-Cans-CA-SiqiniqNeural", gender: "Female" },
        { name: "iu-Cans-CA-TaqqiqNeural", gender: "Male" },
      ]
    },
    "iu-LATN-CA": {
      displayName: "Inuktitut (Latin, Canada)",
      voices: [
        { name: "iu-Latn-CA-SiqiniqNeural", gender: "Female" },
        { name: "iu-Latn-CA-TaqqiqNeural", gender: "Male" },
      ]
    },
    "ja-JP": {
      displayName: "Japanese (Japan)",
      voices: [
        { name: "ja-JP-NanamiNeural", gender: "Female" },
        { name: "ja-JP-KeitaNeural", gender: "Male" },
        { name: "ja-JP-AoiNeural", gender: "Female" },
        { name: "ja-JP-DaichiNeural", gender: "Male" },
        { name: "ja-JP-MayuNeural", gender: "Female" },
        { name: "ja-JP-NaokiNeural", gender: "Male" },
        { name: "ja-JP-ShioriNeural", gender: "Female" },
        { name: "ja-JP-MasaruMultilingualNeural", gender: "Male" },
        { name: "ja-JP-Masaru:DragonHDLatestNeural", gender: "Male" },
      ]
    },
    "jv-ID": {
      displayName: "Javanese (Indonesia)",
      voices: [
        { name: "jv-ID-SitiNeural", gender: "Female" },
        { name: "jv-ID-DimasNeural", gender: "Male" },
      ]
    },
    "ka-GE": {
      displayName: "Georgian (Georgia)",
      voices: [
        { name: "ka-GE-EkaNeural", gender: "Female" },
        { name: "ka-GE-GiorgiNeural", gender: "Male" },
      ]
    },
    "kk-KZ": {
      displayName: "Kazakh (Kazakhstan)",
      voices: [
        { name: "kk-KZ-AigulNeural", gender: "Female" },
        { name: "kk-KZ-DauletNeural", gender: "Male" },
      ]
    },
    "km-KH": {
      displayName: "Khmer (Cambodia)",
      voices: [
        { name: "km-KH-SreymomNeural", gender: "Female" },
        { name: "km-KH-PisethNeural", gender: "Male" },
      ]
    },
    "kn-IN": {
      displayName: "Kannada (India)",
      voices: [
        { name: "kn-IN-SapnaNeural", gender: "Female" },
        { name: "kn-IN-GaganNeural", gender: "Male" },
      ]
    },
    "ko-KR": {
      displayName: "Korean (Korea)",
      voices: [
        { name: "ko-KR-SunHiNeural", gender: "Female" },
        { name: "ko-KR-InJoonNeural", gender: "Male" },
        { name: "ko-KR-HyunsuMultilingualNeural", gender: "Male" },
        { name: "ko-KR-BongJinNeural", gender: "Male" },
        { name: "ko-KR-GookMinNeural", gender: "Male" },
        { name: "ko-KR-HyunsuNeural", gender: "Male" },
        { name: "ko-KR-JiMinNeural", gender: "Female" },
        { name: "ko-KR-SeoHyeonNeural", gender: "Female" },
        { name: "ko-KR-SoonBokNeural", gender: "Female" },
        { name: "ko-KR-YuJinNeural", gender: "Female" },
      ]
    },
    "lo-LA": {
      displayName: "Lao (Laos)",
      voices: [
        { name: "lo-LA-KeomanyNeural", gender: "Female" },
        { name: "lo-LA-ChanthavongNeural", gender: "Male" },
      ]
    },
    "lt-LT": {
      displayName: "Lithuanian (Lithuania)",
      voices: [
        { name: "lt-LT-OnaNeural", gender: "Female" },
        { name: "lt-LT-LeonasNeural", gender: "Male" },
      ]
    },
    "lv-LV": {
      displayName: "Latvian (Latvia)",
      voices: [
        { name: "lv-LV-EveritaNeural", gender: "Female" },
        { name: "lv-LV-NilsNeural", gender: "Male" },
      ]
    },
    "mk-MK": {
      displayName: "Macedonian (North Macedonia)",
      voices: [
        { name: "mk-MK-MarijaNeural", gender: "Female" },
        { name: "mk-MK-AleksandarNeural", gender: "Male" },
      ]
    },
    "ml-IN": {
      displayName: "Malayalam (India)",
      voices: [
        { name: "ml-IN-SobhanaNeural", gender: "Female" },
        { name: "ml-IN-MidhunNeural", gender: "Male" },
      ]
    },
    "mn-MN": {
      displayName: "Mongolian (Mongolia)",
      voices: [
        { name: "mn-MN-YesuiNeural", gender: "Female" },
        { name: "mn-MN-BataaNeural", gender: "Male" },
      ]
    },
    "mr-IN": {
      displayName: "Marathi (India)",
      voices: [
        { name: "mr-IN-AarohiNeural", gender: "Female" },
        { name: "mr-IN-ManoharNeural", gender: "Male" },
      ]
    },
    "ms-MY": {
      displayName: "Malay (Malaysia)",
      voices: [
        { name: "ms-MY-YasminNeural", gender: "Female" },
        { name: "ms-MY-OsmanNeural", gender: "Male" },
      ]
    },
    "mt-MT": {
      displayName: "Maltese (Malta)",
      voices: [
        { name: "mt-MT-GraceNeural", gender: "Female" },
        { name: "mt-MT-JosephNeural", gender: "Male" },
      ]
    },
    "my-MM": {
      displayName: "Burmese (Myanmar)",
      voices: [
        { name: "my-MM-NilarNeural", gender: "Female" },
        { name: "my-MM-ThihaNeural", gender: "Male" },
      ]
    },
    "nb-NO": {
      displayName: "Norwegian Bokmål (Norway)",
      voices: [
        { name: "nb-NO-PernilleNeural", gender: "Female" },
        { name: "nb-NO-FinnNeural", gender: "Male" },
        { name: "nb-NO-IselinNeural", gender: "Female" },
      ]
    },
    "ne-NP": {
      displayName: "Nepali (Nepal)",
      voices: [
        { name: "ne-NP-HemkalaNeural", gender: "Female" },
        { name: "ne-NP-SagarNeural", gender: "Male" },
      ]
    },
    "nl-BE": {
      displayName: "Dutch (Belgium)",
      voices: [
        { name: "nl-BE-DenaNeural", gender: "Female" },
        { name: "nl-BE-ArnaudNeural", gender: "Male" },
      ]
    },
    "nl-NL": {
      displayName: "Dutch (Netherlands)",
      voices: [
        { name: "nl-NL-FennaNeural", gender: "Female" },
        { name: "nl-NL-MaartenNeural", gender: "Male" },
        { name: "nl-NL-ColetteNeural", gender: "Female" },
      ]
    },
    "or-IN": {
      displayName: "Odia (India)",
      voices: [
        { name: "or-IN-SubhasiniNeural", gender: "Female" },
        { name: "or-IN-SukantNeural", gender: "Male" },
      ]
    },
    "pa-IN": {
      displayName: "Punjabi (India)",
      voices: [
        { name: "pa-IN-OjasNeural", gender: "Male" },
        { name: "pa-IN-VaaniNeural", gender: "Female" },
      ]
    },
    "pl-PL": {
      displayName: "Polish (Poland)",
      voices: [
        { name: "pl-PL-AgnieszkaNeural", gender: "Female" },
        { name: "pl-PL-MarekNeural", gender: "Male" },
        { name: "pl-PL-ZofiaNeural", gender: "Female" },
      ]
    },
    "ps-AF": {
      displayName: "Pashto (Afghanistan)",
      voices: [
        { name: "ps-AF-LatifaNeural", gender: "Female" },
        { name: "ps-AF-GulNawazNeural", gender: "Male" },
      ]
    },
    "pt-BR": {
      displayName: "Portuguese (Brazil)",
      voices: [
        { name: "pt-BR-FranciscaNeural", gender: "Female" },
        { name: "pt-BR-AntonioNeural", gender: "Male" },
        { name: "pt-BR-MacerioMultilingualNeural", gender: "Male" },
        { name: "pt-BR-ThalitaMultilingualNeural", gender: "Female" },
        { name: "pt-BR-BrendaNeural", gender: "Female" },
        { name: "pt-BR-DonatoNeural", gender: "Male" },
        { name: "pt-BR-ElzaNeural", gender: "Female" },
        { name: "pt-BR-FabioNeural", gender: "Male" },
        { name: "pt-BR-GiovannaNeural", gender: "Female" },
        { name: "pt-BR-HumbertoNeural", gender: "Male" },
        { name: "pt-BR-JulioNeural", gender: "Male" },
        { name: "pt-BR-LeilaNeural", gender: "Female" },
        { name: "pt-BR-LeticiaNeural", gender: "Female" },
        { name: "pt-BR-ManuelaNeural", gender: "Female" },
        { name: "pt-BR-NicolauNeural", gender: "Male" },
        { name: "pt-BR-ThalitaNeural", gender: "Female" },
        { name: "pt-BR-ValerioNeural", gender: "Male" },
        { name: "pt-BR-YaraNeural", gender: "Female" },
      ]
    },
    "pt-PT": {
      displayName: "Portuguese (Portugal)",
      voices: [
        { name: "pt-PT-RaquelNeural", gender: "Female" },
        { name: "pt-PT-DuarteNeural", gender: "Male" },
        { name: "pt-PT-FernandaNeural", gender: "Female" },
      ]
    },
    "ro-RO": {
      displayName: "Romanian (Romania)",
      voices: [
        { name: "ro-RO-AlinaNeural", gender: "Female" },
        { name: "ro-RO-EmilNeural", gender: "Male" },
      ]
    },
    "ru-RU": {
      displayName: "Russian (Russia)",
      voices: [
        { name: "ru-RU-SvetlanaNeural", gender: "Female" },
        { name: "ru-RU-DmitryNeural", gender: "Male" },
        { name: "ru-RU-DariyaNeural", gender: "Female" },
      ]
    },
    "si-LK": {
      displayName: "Sinhala (Sri Lanka)",
      voices: [
        { name: "si-LK-ThiliniNeural", gender: "Female" },
        { name: "si-LK-SameeraNeural", gender: "Male" },
      ]
    },
    "sk-SK": {
      displayName: "Slovak (Slovakia)",
      voices: [
        { name: "sk-SK-ViktoriaNeural", gender: "Female" },
        { name: "sk-SK-LukasNeural", gender: "Male" },
      ]
    },
    "sl-SI": {
      displayName: "Slovenian (Slovenia)",
      voices: [
        { name: "sl-SI-PetraNeural", gender: "Female" },
        { name: "sl-SI-RokNeural", gender: "Male" },
      ]
    },
    "so-SO": {
      displayName: "Somali (Somalia)",
      voices: [
        { name: "so-SO-UbaxNeural", gender: "Female" },
        { name: "so-SO-MuuseNeural", gender: "Male" },
      ]
    },
    "sq-AL": {
      displayName: "Albanian (Albania)",
      voices: [
        { name: "sq-AL-AnilaNeural", gender: "Female" },
        { name: "sq-AL-IlirNeural", gender: "Male" },
      ]
    },
    "sr-LATN-RS": {
      displayName: "Serbian (Latin, Serbia)",
      voices: [
        { name: "sr-Latn-RS-NicholasNeural", gender: "Male" },
        { name: "sr-Latn-RS-SophieNeural", gender: "Female" },
      ]
    },
    "sr-RS": {
      displayName: "Serbian (Cyrillic, Serbia)",
      voices: [
        { name: "sr-RS-SophieNeural", gender: "Female" },
        { name: "sr-RS-NicholasNeural", gender: "Male" },
      ]
    },
    "su-ID": {
      displayName: "Sundanese (Indonesia)",
      voices: [
        { name: "su-ID-TutiNeural", gender: "Female" },
        { name: "su-ID-JajangNeural", gender: "Male" },
      ]
    },
    "sv-SE": {
      displayName: "Swedish (Sweden)",
      voices: [
        { name: "sv-SE-SofieNeural", gender: "Female" },
        { name: "sv-SE-MattiasNeural", gender: "Male" },
        { name: "sv-SE-HilleviNeural", gender: "Female" },
      ]
    },
    "sw-KE": {
      displayName: "Swahili (Kenya)",
      voices: [
        { name: "sw-KE-ZuriNeural", gender: "Female" },
        { name: "sw-KE-RafikiNeural", gender: "Male" },
      ]
    },
    "sw-TZ": {
      displayName: "Swahili (Tanzania)",
      voices: [
        { name: "sw-TZ-RehemaNeural", gender: "Female" },
        { name: "sw-TZ-DaudiNeural", gender: "Male" },
      ]
    },
    "ta-IN": {
      displayName: "Tamil (India)",
      voices: [
        { name: "ta-IN-PallaviNeural", gender: "Female" },
        { name: "ta-IN-ValluvarNeural", gender: "Male" },
      ]
    },
    "ta-LK": {
      displayName: "Tamil (Sri Lanka)",
      voices: [
        { name: "ta-LK-SaranyaNeural", gender: "Female" },
        { name: "ta-LK-KumarNeural", gender: "Male" },
      ]
    },
    "ta-MY": {
      displayName: "Tamil (Malaysia)",
      voices: [
        { name: "ta-MY-KaniNeural", gender: "Female" },
        { name: "ta-MY-SuryaNeural", gender: "Male" },
      ]
    },
    "ta-SG": {
      displayName: "Tamil (Singapore)",
      voices: [
        { name: "ta-SG-VenbaNeural", gender: "Female" },
        { name: "ta-SG-AnbuNeural", gender: "Male" },
      ]
    },
    "te-IN": {
      displayName: "Telugu (India)",
      voices: [
        { name: "te-IN-ShrutiNeural", gender: "Female" },
        { name: "te-IN-MohanNeural", gender: "Male" },
      ]
    },
    "th-TH": {
      displayName: "Thai (Thailand)",
      voices: [
        { name: "th-TH-PremwadeeNeural", gender: "Female" },
        { name: "th-TH-NiwatNeural", gender: "Male" },
        { name: "th-TH-AcharaNeural", gender: "Female" },
      ]
    },
    "tr-TR": {
      displayName: "Turkish (Türkiye)",
      voices: [
        { name: "tr-TR-EmelNeural", gender: "Female" },
        { name: "tr-TR-AhmetNeural", gender: "Male" },
      ]
    },
    "uk-UA": {
      displayName: "Ukrainian (Ukraine)",
      voices: [
        { name: "uk-UA-PolinaNeural", gender: "Female" },
        { name: "uk-UA-OstapNeural", gender: "Male" },
      ]
    },
    "ur-IN": {
      displayName: "Urdu (India)",
      voices: [
        { name: "ur-IN-GulNeural", gender: "Female" },
        { name: "ur-IN-SalmanNeural", gender: "Male" },
      ]
    },
    "ur-PK": {
      displayName: "Urdu (Pakistan)",
      voices: [
        { name: "ur-PK-UzmaNeural", gender: "Female" },
        { name: "ur-PK-AsadNeural", gender: "Male" },
      ]
    },
    "uz-UZ": {
      displayName: "Uzbek (Uzbekistan)",
      voices: [
        { name: "uz-UZ-MadinaNeural", gender: "Female" },
        { name: "uz-UZ-SardorNeural", gender: "Male" },
      ]
    },
    "vi-VN": {
      displayName: "Vietnamese (Vietnam)",
      voices: [
        { name: "vi-VN-HoaiMyNeural", gender: "Female" },
        { name: "vi-VN-NamMinhNeural", gender: "Male" },
      ]
    },
    "wuu-CN": {
      displayName: "Chinese (Wu, China)",
      voices: [
        { name: "wuu-CN-XiaotongNeural", gender: "Female" },
        { name: "wuu-CN-YunzheNeural", gender: "Male" },
      ]
    },
    "yue-CN": {
      displayName: "Chinese (Cantonese, China)",
      voices: [
        { name: "yue-CN-XiaoMinNeural", gender: "Female" },
        { name: "yue-CN-YunSongNeural", gender: "Male" },
      ]
    },
    "zh-CN": {
      displayName: "Chinese (Mandarin, China)",
      voices: [
        { name: "zh-CN-XiaoxiaoNeural", gender: "Female" },
        { name: "zh-CN-YunxiNeural", gender: "Male" },
        { name: "zh-CN-YunjianNeural", gender: "Male" },
        { name: "zh-CN-XiaoyiNeural", gender: "Female" },
        { name: "zh-CN-YunyangNeural", gender: "Male" },
        { name: "zh-CN-XiaochenNeural", gender: "Female" },
        { name: "zh-CN-XiaochenMultilingualNeural", gender: "Female" },
        { name: "zh-CN-XiaohanNeural", gender: "Female" },
        { name: "zh-CN-XiaomengNeural", gender: "Female" },
        { name: "zh-CN-XiaomoNeural", gender: "Female" },
        { name: "zh-CN-XiaoqiuNeural", gender: "Female" },
        { name: "zh-CN-XiaorouNeural", gender: "Female" },
        { name: "zh-CN-XiaoruiNeural", gender: "Female" },
        { name: "zh-CN-XiaoshuangNeural", gender: "Female" },
        { name: "zh-CN-XiaoxiaoDialectsNeural", gender: "Female" },
        { name: "zh-CN-XiaoxiaoMultilingualNeural", gender: "Female" },
        { name: "zh-CN-XiaoyanNeural", gender: "Female" },
        { name: "zh-CN-XiaoyouNeural", gender: "Female" },
        { name: "zh-CN-XiaoyuMultilingualNeural", gender: "Female" },
        { name: "zh-CN-XiaozhenNeural", gender: "Female" },
        { name: "zh-CN-YunfengNeural", gender: "Male" },
        { name: "zh-CN-YunhaoNeural", gender: "Male" },
        { name: "zh-CN-YunjieNeural", gender: "Male" },
        { name: "zh-CN-YunxiaNeural", gender: "Male" },
        { name: "zh-CN-YunyeNeural", gender: "Male" },
        { name: "zh-CN-YunyiMultilingualNeural", gender: "Male" },
        { name: "zh-CN-YunzeNeural", gender: "Male" },
        { name: "zh-CN-YunfanMultilingualNeural", gender: "Male" },
        { name: "zh-CN-YunxiaoMultilingualNeural", gender: "Male" },
        { name: "zh-CN-Xiaochen:DragonHDLatestNeural", gender: "Female" },
        { name: "zh-CN-GUANGXI", gender: "Male" },
        { name: "zh-CN-henan", gender: "Male" },
        { name: "zh-CN-liaoning", gender: "Female" },
        { name: "zh-CN-liaoning-YunbiaoNeural", gender: "Male" },
        { name: "zh-CN-shaanxi", gender: "Female" },
        { name: "zh-CN-shandong", gender: "Male" },
        { name: "zh-CN-sichuan", gender: "Male" },
      ]
    },
    "zh-HK": {
      displayName: "Chinese (Cantonese, Hong Kong)",
      voices: [
        { name: "zh-HK-HiuMaanNeural", gender: "Female" },
        { name: "zh-HK-WanLungNeural", gender: "Male" },
        { name: "zh-HK-HiuGaaiNeural", gender: "Female" },
      ]
    },
    "zh-TW": {
      displayName: "Chinese (Taiwanese Mandarin, Taiwan)",
      voices: [
        { name: "zh-TW-HsiaoChenNeural", gender: "Female" },
        { name: "zh-TW-YunJheNeural", gender: "Male" },
        { name: "zh-TW-HsiaoYuNeural", gender: "Female" },
      ]
    },
    "zu-ZA": {
      displayName: "Zulu (South Africa)",
      voices: [
        { name: "zu-ZA-ThandoNeural", gender: "Female" },
        { name: "zu-ZA-ThembaNeural", gender: "Male" },
      ]
    },
  };