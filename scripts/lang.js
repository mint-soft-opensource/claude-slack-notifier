/**
 * Language pack for Claude Slack Notifier
 * Supports 50 languages
 */

const languages = {
  // English (Default)
  en: {
    project: 'Project',
    time: 'Time',
    customerRequest: 'Customer Request',
    taskSummary: 'Claude Code Work Summary',
    taskCompleted: 'Task Completed',
    waitingForInput: 'Waiting for Input',
    errorOccurred: 'Error Occurred',
    notification: 'Notification'
  },

  // Korean
  ko: {
    project: '프로젝트',
    time: '시간',
    customerRequest: '고객 요청',
    taskSummary: '클로드 코드 작업 내용',
    taskCompleted: '작업 완료',
    waitingForInput: '입력 대기중',
    errorOccurred: '오류 발생',
    notification: '알림'
  },

  // Japanese
  ja: {
    project: 'プロジェクト',
    time: '時間',
    customerRequest: '顧客リクエスト',
    taskSummary: 'Claude Code作業内容',
    taskCompleted: 'タスク完了',
    waitingForInput: '入力待ち',
    errorOccurred: 'エラー発生',
    notification: '通知'
  },

  // Chinese (Simplified)
  zh: {
    project: '项目',
    time: '时间',
    customerRequest: '客户请求',
    taskSummary: 'Claude Code工作内容',
    taskCompleted: '任务完成',
    waitingForInput: '等待输入',
    errorOccurred: '发生错误',
    notification: '通知'
  },

  // Chinese (Traditional)
  'zh-tw': {
    project: '專案',
    time: '時間',
    customerRequest: '客戶請求',
    taskSummary: 'Claude Code工作內容',
    taskCompleted: '任務完成',
    waitingForInput: '等待輸入',
    errorOccurred: '發生錯誤',
    notification: '通知'
  },

  // Spanish
  es: {
    project: 'Proyecto',
    time: 'Hora',
    customerRequest: 'Solicitud del Cliente',
    taskSummary: 'Resumen del Trabajo de Claude Code',
    taskCompleted: 'Tarea Completada',
    waitingForInput: 'Esperando Entrada',
    errorOccurred: 'Error Ocurrido',
    notification: 'Notificación'
  },

  // French
  fr: {
    project: 'Projet',
    time: 'Heure',
    customerRequest: 'Demande Client',
    taskSummary: 'Résumé du Travail Claude Code',
    taskCompleted: 'Tâche Terminée',
    waitingForInput: 'En Attente de Saisie',
    errorOccurred: 'Erreur Survenue',
    notification: 'Notification'
  },

  // German
  de: {
    project: 'Projekt',
    time: 'Zeit',
    customerRequest: 'Kundenanfrage',
    taskSummary: 'Claude Code Arbeitszusammenfassung',
    taskCompleted: 'Aufgabe Abgeschlossen',
    waitingForInput: 'Warten auf Eingabe',
    errorOccurred: 'Fehler Aufgetreten',
    notification: 'Benachrichtigung'
  },

  // Italian
  it: {
    project: 'Progetto',
    time: 'Ora',
    customerRequest: 'Richiesta Cliente',
    taskSummary: 'Riepilogo Lavoro Claude Code',
    taskCompleted: 'Attività Completata',
    waitingForInput: 'In Attesa di Input',
    errorOccurred: 'Errore Verificato',
    notification: 'Notifica'
  },

  // Portuguese
  pt: {
    project: 'Projeto',
    time: 'Hora',
    customerRequest: 'Solicitação do Cliente',
    taskSummary: 'Resumo do Trabalho Claude Code',
    taskCompleted: 'Tarefa Concluída',
    waitingForInput: 'Aguardando Entrada',
    errorOccurred: 'Erro Ocorrido',
    notification: 'Notificação'
  },

  // Russian
  ru: {
    project: 'Проект',
    time: 'Время',
    customerRequest: 'Запрос клиента',
    taskSummary: 'Сводка работы Claude Code',
    taskCompleted: 'Задача выполнена',
    waitingForInput: 'Ожидание ввода',
    errorOccurred: 'Произошла ошибка',
    notification: 'Уведомление'
  },

  // Arabic
  ar: {
    project: 'المشروع',
    time: 'الوقت',
    customerRequest: 'طلب العميل',
    taskSummary: 'ملخص عمل Claude Code',
    taskCompleted: 'اكتملت المهمة',
    waitingForInput: 'في انتظار الإدخال',
    errorOccurred: 'حدث خطأ',
    notification: 'إشعار'
  },

  // Hindi
  hi: {
    project: 'प्रोजेक्ट',
    time: 'समय',
    customerRequest: 'ग्राहक अनुरोध',
    taskSummary: 'Claude Code कार्य सारांश',
    taskCompleted: 'कार्य पूर्ण',
    waitingForInput: 'इनपुट की प्रतीक्षा',
    errorOccurred: 'त्रुटि हुई',
    notification: 'सूचना'
  },

  // Bengali
  bn: {
    project: 'প্রকল্প',
    time: 'সময়',
    customerRequest: 'গ্রাহক অনুরোধ',
    taskSummary: 'Claude Code কাজের সারাংশ',
    taskCompleted: 'কাজ সম্পন্ন',
    waitingForInput: 'ইনপুটের জন্য অপেক্ষা',
    errorOccurred: 'ত্রুটি ঘটেছে',
    notification: 'বিজ্ঞপ্তি'
  },

  // Indonesian
  id: {
    project: 'Proyek',
    time: 'Waktu',
    customerRequest: 'Permintaan Pelanggan',
    taskSummary: 'Ringkasan Kerja Claude Code',
    taskCompleted: 'Tugas Selesai',
    waitingForInput: 'Menunggu Input',
    errorOccurred: 'Terjadi Kesalahan',
    notification: 'Notifikasi'
  },

  // Malay
  ms: {
    project: 'Projek',
    time: 'Masa',
    customerRequest: 'Permintaan Pelanggan',
    taskSummary: 'Ringkasan Kerja Claude Code',
    taskCompleted: 'Tugas Selesai',
    waitingForInput: 'Menunggu Input',
    errorOccurred: 'Ralat Berlaku',
    notification: 'Pemberitahuan'
  },

  // Thai
  th: {
    project: 'โปรเจกต์',
    time: 'เวลา',
    customerRequest: 'คำขอของลูกค้า',
    taskSummary: 'สรุปงาน Claude Code',
    taskCompleted: 'งานเสร็จสิ้น',
    waitingForInput: 'รอการป้อนข้อมูล',
    errorOccurred: 'เกิดข้อผิดพลาด',
    notification: 'การแจ้งเตือน'
  },

  // Vietnamese
  vi: {
    project: 'Dự án',
    time: 'Thời gian',
    customerRequest: 'Yêu cầu khách hàng',
    taskSummary: 'Tóm tắt công việc Claude Code',
    taskCompleted: 'Hoàn thành tác vụ',
    waitingForInput: 'Đang chờ nhập liệu',
    errorOccurred: 'Đã xảy ra lỗi',
    notification: 'Thông báo'
  },

  // Turkish
  tr: {
    project: 'Proje',
    time: 'Zaman',
    customerRequest: 'Müşteri Talebi',
    taskSummary: 'Claude Code Çalışma Özeti',
    taskCompleted: 'Görev Tamamlandı',
    waitingForInput: 'Giriş Bekleniyor',
    errorOccurred: 'Hata Oluştu',
    notification: 'Bildirim'
  },

  // Polish
  pl: {
    project: 'Projekt',
    time: 'Czas',
    customerRequest: 'Żądanie Klienta',
    taskSummary: 'Podsumowanie Pracy Claude Code',
    taskCompleted: 'Zadanie Ukończone',
    waitingForInput: 'Oczekiwanie na Dane',
    errorOccurred: 'Wystąpił Błąd',
    notification: 'Powiadomienie'
  },

  // Dutch
  nl: {
    project: 'Project',
    time: 'Tijd',
    customerRequest: 'Klantverzoek',
    taskSummary: 'Claude Code Werkoverzicht',
    taskCompleted: 'Taak Voltooid',
    waitingForInput: 'Wachten op Invoer',
    errorOccurred: 'Fout Opgetreden',
    notification: 'Melding'
  },

  // Greek
  el: {
    project: 'Έργο',
    time: 'Ώρα',
    customerRequest: 'Αίτημα Πελάτη',
    taskSummary: 'Σύνοψη Εργασίας Claude Code',
    taskCompleted: 'Εργασία Ολοκληρώθηκε',
    waitingForInput: 'Αναμονή για Είσοδο',
    errorOccurred: 'Προέκυψε Σφάλμα',
    notification: 'Ειδοποίηση'
  },

  // Czech
  cs: {
    project: 'Projekt',
    time: 'Čas',
    customerRequest: 'Požadavek Zákazníka',
    taskSummary: 'Shrnutí Práce Claude Code',
    taskCompleted: 'Úkol Dokončen',
    waitingForInput: 'Čekání na Vstup',
    errorOccurred: 'Došlo k Chybě',
    notification: 'Oznámení'
  },

  // Romanian
  ro: {
    project: 'Proiect',
    time: 'Ora',
    customerRequest: 'Cerere Client',
    taskSummary: 'Rezumat Lucru Claude Code',
    taskCompleted: 'Sarcină Finalizată',
    waitingForInput: 'Așteptare Introducere',
    errorOccurred: 'A Apărut o Eroare',
    notification: 'Notificare'
  },

  // Hungarian
  hu: {
    project: 'Projekt',
    time: 'Idő',
    customerRequest: 'Ügyfél Kérése',
    taskSummary: 'Claude Code Munka Összefoglaló',
    taskCompleted: 'Feladat Befejezve',
    waitingForInput: 'Bemenet Várakozás',
    errorOccurred: 'Hiba Történt',
    notification: 'Értesítés'
  },

  // Swedish
  sv: {
    project: 'Projekt',
    time: 'Tid',
    customerRequest: 'Kundförfrågan',
    taskSummary: 'Claude Code Arbetssammanfattning',
    taskCompleted: 'Uppgift Slutförd',
    waitingForInput: 'Väntar på Inmatning',
    errorOccurred: 'Fel Uppstod',
    notification: 'Avisering'
  },

  // Danish
  da: {
    project: 'Projekt',
    time: 'Tid',
    customerRequest: 'Kundeforespørgsel',
    taskSummary: 'Claude Code Arbejdsoversigt',
    taskCompleted: 'Opgave Fuldført',
    waitingForInput: 'Venter på Input',
    errorOccurred: 'Fejl Opstod',
    notification: 'Notifikation'
  },

  // Norwegian
  no: {
    project: 'Prosjekt',
    time: 'Tid',
    customerRequest: 'Kundeforespørsel',
    taskSummary: 'Claude Code Arbeidssammendrag',
    taskCompleted: 'Oppgave Fullført',
    waitingForInput: 'Venter på Inndata',
    errorOccurred: 'Feil Oppstod',
    notification: 'Varsling'
  },

  // Finnish
  fi: {
    project: 'Projekti',
    time: 'Aika',
    customerRequest: 'Asiakaspyyntö',
    taskSummary: 'Claude Code Työyhteenveto',
    taskCompleted: 'Tehtävä Valmis',
    waitingForInput: 'Odotetaan Syötettä',
    errorOccurred: 'Virhe Tapahtui',
    notification: 'Ilmoitus'
  },

  // Ukrainian
  uk: {
    project: 'Проект',
    time: 'Час',
    customerRequest: 'Запит клієнта',
    taskSummary: 'Підсумок роботи Claude Code',
    taskCompleted: 'Завдання виконано',
    waitingForInput: 'Очікування введення',
    errorOccurred: 'Сталася помилка',
    notification: 'Сповіщення'
  },

  // Hebrew
  he: {
    project: 'פרויקט',
    time: 'זמן',
    customerRequest: 'בקשת לקוח',
    taskSummary: 'סיכום עבודת Claude Code',
    taskCompleted: 'המשימה הושלמה',
    waitingForInput: 'ממתין לקלט',
    errorOccurred: 'אירעה שגיאה',
    notification: 'התראה'
  },

  // Persian/Farsi
  fa: {
    project: 'پروژه',
    time: 'زمان',
    customerRequest: 'درخواست مشتری',
    taskSummary: 'خلاصه کار Claude Code',
    taskCompleted: 'وظیفه تکمیل شد',
    waitingForInput: 'در انتظار ورودی',
    errorOccurred: 'خطا رخ داد',
    notification: 'اعلان'
  },

  // Swahili
  sw: {
    project: 'Mradi',
    time: 'Wakati',
    customerRequest: 'Ombi la Mteja',
    taskSummary: 'Muhtasari wa Kazi ya Claude Code',
    taskCompleted: 'Kazi Imekamilika',
    waitingForInput: 'Inasubiri Uingizaji',
    errorOccurred: 'Hitilafu Imetokea',
    notification: 'Arifa'
  },

  // Filipino/Tagalog
  tl: {
    project: 'Proyekto',
    time: 'Oras',
    customerRequest: 'Kahilingan ng Customer',
    taskSummary: 'Buod ng Trabaho ng Claude Code',
    taskCompleted: 'Natapos ang Gawain',
    waitingForInput: 'Naghihintay ng Input',
    errorOccurred: 'May Naganap na Error',
    notification: 'Abiso'
  },

  // Catalan
  ca: {
    project: 'Projecte',
    time: 'Hora',
    customerRequest: 'Sol·licitud del Client',
    taskSummary: 'Resum del Treball de Claude Code',
    taskCompleted: 'Tasca Completada',
    waitingForInput: 'Esperant Entrada',
    errorOccurred: 'S\'ha Produït un Error',
    notification: 'Notificació'
  },

  // Slovak
  sk: {
    project: 'Projekt',
    time: 'Čas',
    customerRequest: 'Požiadavka Zákazníka',
    taskSummary: 'Súhrn Práce Claude Code',
    taskCompleted: 'Úloha Dokončená',
    waitingForInput: 'Čakanie na Vstup',
    errorOccurred: 'Vyskytla sa Chyba',
    notification: 'Oznámenie'
  },

  // Bulgarian
  bg: {
    project: 'Проект',
    time: 'Време',
    customerRequest: 'Заявка на клиент',
    taskSummary: 'Резюме на работата на Claude Code',
    taskCompleted: 'Задачата е завършена',
    waitingForInput: 'Изчакване на въвеждане',
    errorOccurred: 'Възникна грешка',
    notification: 'Известие'
  },

  // Croatian
  hr: {
    project: 'Projekt',
    time: 'Vrijeme',
    customerRequest: 'Zahtjev Klijenta',
    taskSummary: 'Sažetak Rada Claude Code',
    taskCompleted: 'Zadatak Završen',
    waitingForInput: 'Čekanje Unosa',
    errorOccurred: 'Došlo je do Greške',
    notification: 'Obavijest'
  },

  // Serbian
  sr: {
    project: 'Пројекат',
    time: 'Време',
    customerRequest: 'Захтев клијента',
    taskSummary: 'Резиме рада Claude Code',
    taskCompleted: 'Задатак завршен',
    waitingForInput: 'Чекање уноса',
    errorOccurred: 'Дошло је до грешке',
    notification: 'Обавештење'
  },

  // Slovenian
  sl: {
    project: 'Projekt',
    time: 'Čas',
    customerRequest: 'Zahteva Stranke',
    taskSummary: 'Povzetek Dela Claude Code',
    taskCompleted: 'Naloga Končana',
    waitingForInput: 'Čakanje na Vnos',
    errorOccurred: 'Prišlo je do Napake',
    notification: 'Obvestilo'
  },

  // Estonian
  et: {
    project: 'Projekt',
    time: 'Aeg',
    customerRequest: 'Kliendi Taotlus',
    taskSummary: 'Claude Code Töö Kokkuvõte',
    taskCompleted: 'Ülesanne Lõpetatud',
    waitingForInput: 'Ootan Sisendit',
    errorOccurred: 'Tekkis Viga',
    notification: 'Teade'
  },

  // Latvian
  lv: {
    project: 'Projekts',
    time: 'Laiks',
    customerRequest: 'Klienta Pieprasījums',
    taskSummary: 'Claude Code Darba Kopsavilkums',
    taskCompleted: 'Uzdevums Pabeigts',
    waitingForInput: 'Gaida Ievadi',
    errorOccurred: 'Radās Kļūda',
    notification: 'Paziņojums'
  },

  // Lithuanian
  lt: {
    project: 'Projektas',
    time: 'Laikas',
    customerRequest: 'Kliento Užklausa',
    taskSummary: 'Claude Code Darbo Santrauka',
    taskCompleted: 'Užduotis Baigta',
    waitingForInput: 'Laukiama Įvesties',
    errorOccurred: 'Įvyko Klaida',
    notification: 'Pranešimas'
  },

  // Icelandic
  is: {
    project: 'Verkefni',
    time: 'Tími',
    customerRequest: 'Beiðni Viðskiptavinar',
    taskSummary: 'Claude Code Verksamantekt',
    taskCompleted: 'Verkefni Lokið',
    waitingForInput: 'Bíður eftir Inntaki',
    errorOccurred: 'Villa Kom Upp',
    notification: 'Tilkynning'
  },

  // Maltese
  mt: {
    project: 'Proġett',
    time: 'Ħin',
    customerRequest: 'Talba tal-Klijent',
    taskSummary: 'Sommarju tax-Xogħol ta\' Claude Code',
    taskCompleted: 'Kompitu Lest',
    waitingForInput: 'Jistenna Input',
    errorOccurred: 'Seħħ Żball',
    notification: 'Notifika'
  },

  // Welsh
  cy: {
    project: 'Prosiect',
    time: 'Amser',
    customerRequest: 'Cais Cwsmer',
    taskSummary: 'Crynodeb Gwaith Claude Code',
    taskCompleted: 'Tasg Wedi\'i Chwblhau',
    waitingForInput: 'Yn Aros am Fewnbwn',
    errorOccurred: 'Digwyddodd Gwall',
    notification: 'Hysbysiad'
  },

  // Irish
  ga: {
    project: 'Tionscadal',
    time: 'Am',
    customerRequest: 'Iarratas Custaiméara',
    taskSummary: 'Achoimre Oibre Claude Code',
    taskCompleted: 'Tasc Críochnaithe',
    waitingForInput: 'Ag Fanacht le hIonchur',
    errorOccurred: 'Tharla Earráid',
    notification: 'Fógra'
  },

  // Afrikaans
  af: {
    project: 'Projek',
    time: 'Tyd',
    customerRequest: 'Kliëntversoek',
    taskSummary: 'Claude Code Werkopsomming',
    taskCompleted: 'Taak Voltooi',
    waitingForInput: 'Wag vir Invoer',
    errorOccurred: 'Fout het Voorgekom',
    notification: 'Kennisgewing'
  },

  // Basque
  eu: {
    project: 'Proiektua',
    time: 'Ordua',
    customerRequest: 'Bezeroaren Eskaera',
    taskSummary: 'Claude Code Lan Laburpena',
    taskCompleted: 'Zeregina Osatua',
    waitingForInput: 'Sarreraren Zain',
    errorOccurred: 'Errorea Gertatu da',
    notification: 'Jakinarazpena'
  }
};

/**
 * Get language pack
 * @param {string} lang - Language code (e.g., 'en', 'ko', 'ja')
 * @returns {object} Language strings
 */
function getLang(lang) {
  return languages[lang] || languages['en'];
}

/**
 * Get list of supported languages
 * @returns {string[]} Array of language codes
 */
function getSupportedLanguages() {
  return Object.keys(languages);
}

module.exports = { getLang, getSupportedLanguages, languages };
