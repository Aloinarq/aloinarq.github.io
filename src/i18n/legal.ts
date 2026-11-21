import { service, site } from '../config';
import type { Lang } from '../config';

/** A legal page: a title, one intro sentence and sections of paragraphs or lists. */
export interface LegalPage {
  title: string;
  description: string;
  intro: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
}

const months = service.enquiryKeptMonths;
const linkMonths = service.linkOnlineMonths;
const reply = service.replyWorkingDays;

export const legal: Record<Lang, { privacy: LegalPage; terms: LegalPage }> = {
  en: {
    privacy: {
      title: 'Privacy policy',
      description: 'What personal data Plan 1:1 collects, why, how long it is kept and how to ask for deletion.',
      intro: 'This policy explains what personal data I collect through this website and in my work, why, how long I keep it, and how you can ask me to delete it.',
      sections: [
        { h: 'Who is responsible', p: [
          `The controller of your data is ${site.ownerFullName.en}, a private person who offers room scans under the name Plan 1:1 in ${site.city.en}, Romania. Email: ${site.email}. Phone: ${site.phone}. My postal address is written in the contract, and I give it on request.`,
          'I have no company and no data protection officer; write to me directly.',
        ] },
        { h: 'What I collect', list: [
          'From the enquiry form: your name, your email or phone, the property type, the number of rooms, the city and your message. The form sends nothing by itself: it opens your own email app with the enquiry written out, and it reaches me only when you send that email.',
          'If we sign a contract: the details the contract needs (name and address, and for a business its name and registration details), payment records and our correspondence.',
          'The scan: the geometry of the rooms captured with LiDAR (walls, doors, windows, furniture), reference photos of the rooms, and the 3D model and floor plan made from them. The photos can show what is in your rooms, so I ask that people step out while I scan.',
          `This website sets no cookies, uses no analytics and loads no fonts or scripts from other companies. It is hosted on ${site.host}, which logs visitors’ IP addresses for security purposes; GitHub’s privacy statement says how long it keeps them.`,
        ] },
        { h: 'Why, and on what legal basis', list: [
          'To answer your enquiry and prepare an offer: steps you asked for before a contract (GDPR, article 6(1)(b)).',
          'To do the work and deliver it: performing our contract (article 6(1)(b)).',
          'To keep the records the law requires, such as payment and income records: a legal obligation (article 6(1)(c)).',
          'I don’t use your data for advertising, I don’t sell it, and I don’t use your scan for anything but your project. I won’t show your rooms on this website or anywhere else without your written consent.',
        ] },
        { h: 'How long I keep it', list: [
          `Enquiries that don’t lead to a contract: ${months} months from my last reply, then deleted.`,
          `The scan, photos, model and plan: while the work lasts and while your private link is online (${linkMonths} months from delivery), then deleted, unless you ask me in writing to delete them sooner or to keep them longer.`,
          'Contract and payment records: as long as Romanian tax and accounting rules require.',
        ] },
        { h: 'Who else sees it', p: [
          `Only the services I need to do this work: ${site.emailProvider}, where your emails arrive and are kept; ${site.host}, which hosts this website; and the web host for the private model links, named in your contract. Google and GitHub are US companies; both state that they comply with the EU-U.S. Data Privacy Framework, and both also use the European Commission’s standard contractual clauses for data from the EU.`,
          'The private link to your model is shared only with you and with whoever you choose to send it to.',
        ] },
        { h: 'Your rights', p: [
          `You can ask me for a copy of your data, to correct it, to delete it, to restrict or object to its use, and to receive it in a portable format. Write to ${site.email}; I reply within one month.`,
          'You can also complain to the Romanian data protection authority, ANSPDCP (www.dataprotection.ro).',
        ] },
        { h: 'Deleting your scan', p: [
          `Write to ${site.email} with the address or the project name. I delete the scan, the photos, the model, the plan and the private link, and confirm by email. Records the law requires me to keep, such as the contract and the payment, stay until their period ends.`,
        ] },
        { h: 'Changes', p: ['If this policy changes, the new version is published on this page with its date.'] },
      ],
    },
    terms: {
      title: 'Terms for the enquiry form',
      description: 'What happens when you send an enquiry to Plan 1:1.',
      intro: 'These terms apply when you send an enquiry through the form on this website.',
      sections: [
        { h: 'What the form is for', p: ['The form is for asking about a room scan: which rooms, where, and what you want to decide. It opens your email app with your enquiry written out; nothing is sent until you send that email. Sending it is free and commits neither of us to anything.'] },
        { h: 'No contract until we both sign', p: ['An enquiry is not an order. My reply is an offer with a price and a date. Work starts only after we both sign a written contract; payment is by bank transfer under that contract.'] },
        { h: 'Prices', p: ['Prices on this website are starting prices in lei. The price for your rooms is the one written in the contract.'] },
        { h: 'What to send', p: ['Give me a way to reach you and describe the rooms as they are. Please don’t send passwords, identity documents, bank details or health information through the form. If photos would help, I will ask for them by email.'] },
        { h: 'Your data', p: [`I use what you send only to answer your enquiry, as the privacy policy explains. Enquiries that don’t lead to a contract are deleted after ${months} months.`] },
        { h: 'Replies', p: [`I aim to reply within ${reply} working days. If you don’t hear from me, write to ${site.email} or call ${site.phone}: your email may not have reached me.`] },
        { h: 'Who you are dealing with', p: [`Plan 1:1 is the service of ${site.ownerFullName.en}, a private person in ${site.city.en}, Romania, not a company. Contact: ${site.email}, ${site.phone}.`] },
      ],
    },
  },
  ro: {
    privacy: {
      title: 'Politica de confidențialitate',
      description: 'Ce date personale colectează Plan 1:1, de ce, cât timp le păstrează și cum cereți ștergerea lor.',
      intro: 'Această politică explică ce date personale colectez prin acest site și în munca mea, de ce, cât timp le păstrez și cum îmi puteți cere să le șterg.',
      sections: [
        { h: 'Cine răspunde de date', p: [
          `Operatorul datelor dumneavoastră este ${site.ownerFullName.ro}, persoană fizică ce oferă scanări de camere sub numele Plan 1:1, în ${site.city.ro}, România. E-mail: ${site.email}. Telefon: ${site.phone}. Adresa poștală este trecută în contract și o comunic la cerere.`,
          'Nu am firmă și nici responsabil cu protecția datelor; îmi puteți scrie direct.',
        ] },
        { h: 'Ce date colectez', list: [
          'Din formularul de cerere: numele, e-mailul sau telefonul, tipul proprietății, numărul de camere, localitatea și mesajul dumneavoastră. Formularul nu trimite nimic singur: deschide aplicația dumneavoastră de e-mail cu cererea scrisă și ajunge la mine doar când trimiteți acel e-mail.',
          'Dacă semnăm un contract: datele de care are nevoie contractul (nume și adresă, iar pentru o firmă denumirea și datele de înregistrare), evidența plăților și corespondența noastră.',
          'Scanarea: geometria camerelor surprinsă cu LiDAR (pereți, uși, ferestre, mobilier), fotografii de referință ale camerelor și modelul 3D și planul făcute pe baza lor. Fotografiile pot arăta ce se află în camere, de aceea rog ca persoanele să iasă din cameră cât timp scanez.',
          `Acest site nu folosește cookie-uri, nici instrumente de analiză și nu încarcă fonturi sau scripturi de la alte firme. Este găzduit pe ${site.host}, care înregistrează adresele IP ale vizitatorilor din motive de securitate; declarația de confidențialitate GitHub arată cât timp le păstrează.`,
        ] },
        { h: 'De ce și pe ce temei legal', list: [
          'Pentru a răspunde cererii și a pregăti o ofertă: demersuri făcute la cererea dumneavoastră înainte de contract (GDPR, art. 6 alin. (1) lit. b)).',
          'Pentru a face lucrarea și a o livra: executarea contractului nostru (art. 6 alin. (1) lit. b)).',
          'Pentru a păstra evidențele cerute de lege, cum sunt cele ale plăților și veniturilor: o obligație legală (art. 6 alin. (1) lit. c)).',
          'Nu folosesc datele pentru reclamă, nu le vând și nu folosesc scanarea dumneavoastră decât pentru proiectul dumneavoastră. Nu vă arăt camerele pe acest site sau altundeva fără acordul dumneavoastră scris.',
        ] },
        { h: 'Cât timp le păstrez', list: [
          `Cererile care nu ajung la un contract: ${months} luni de la ultimul meu răspuns, apoi le șterg.`,
          `Scanarea, fotografiile, modelul și planul: cât durează lucrarea și cât timp linkul privat este online (${linkMonths} luni de la livrare), apoi le șterg, dacă nu îmi cereți în scris să le șterg mai devreme sau să le păstrez mai mult.`,
          'Contractul și evidența plăților: atât cât cer regulile fiscale și contabile din România.',
        ] },
        { h: 'Cine le mai vede', p: [
          `Doar serviciile de care am nevoie pentru această muncă: ${site.emailProvider}, unde sosesc și se păstrează e-mailurile dumneavoastră; ${site.host}, care găzduiește acest site; și găzduirea linkurilor private către modele, numită în contract. Google și GitHub sunt firme din SUA; ambele declară că respectă Cadrul UE-SUA privind confidențialitatea datelor (EU-U.S. Data Privacy Framework) și folosesc și clauzele contractuale standard ale Comisiei Europene pentru datele din UE.`,
          'Linkul privat către model îl primiți doar dumneavoastră și cei cărora alegeți să-l trimiteți.',
        ] },
        { h: 'Drepturile dumneavoastră', p: [
          `Îmi puteți cere o copie a datelor, corectarea sau ștergerea lor, restricționarea prelucrării, vă puteți opune prelucrării și le puteți primi într-un format portabil. Scrieți-mi la ${site.email}; răspund în cel mult o lună.`,
          'Puteți depune și o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal, ANSPDCP (www.dataprotection.ro).',
        ] },
        { h: 'Ștergerea scanării', p: [
          `Scrieți-mi la ${site.email}, cu adresa sau numele proiectului. Șterg scanarea, fotografiile, modelul, planul și linkul privat și vă confirm pe e-mail. Evidențele pe care legea mă obligă să le păstrez, cum sunt contractul și plata, rămân până la sfârșitul termenului lor.`,
        ] },
        { h: 'Modificări', p: ['Dacă această politică se schimbă, noua versiune apare pe această pagină, cu data ei.'] },
      ],
    },
    terms: {
      title: 'Termenii formularului de cerere',
      description: 'Ce se întâmplă când trimiteți o cerere către Plan 1:1.',
      intro: 'Acești termeni se aplică atunci când trimiteți o cerere prin formularul de pe acest site.',
      sections: [
        { h: 'La ce folosește formularul', p: ['Formularul servește pentru întrebări despre o scanare: ce camere, unde și ce vreți să decideți. El deschide aplicația dumneavoastră de e-mail cu cererea scrisă; nu se trimite nimic până nu trimiteți acel e-mail. Trimiterea este gratuită și nu ne obligă la nimic pe niciunul dintre noi.'] },
        { h: 'Niciun contract până nu semnăm amândoi', p: ['O cerere nu este o comandă. Răspunsul meu este o ofertă, cu un preț și o dată. Lucrarea începe doar după ce semnăm amândoi un contract scris; plata se face prin transfer bancar, pe baza acelui contract.'] },
        { h: 'Prețuri', p: ['Prețurile de pe acest site sunt prețuri de pornire, în lei. Prețul pentru camerele dumneavoastră este cel scris în contract.'] },
        { h: 'Ce să trimiteți', p: ['Lăsați-mi o modalitate de contact și descrieți camerele așa cum sunt. Vă rog să nu trimiteți prin formular parole, acte de identitate, date bancare sau informații despre sănătate. Dacă fotografiile ar ajuta, vi le cer pe e-mail.'] },
        { h: 'Datele dumneavoastră', p: [`Folosesc ce îmi trimiteți doar pentru a vă răspunde, așa cum explică politica de confidențialitate. Cererile care nu ajung la un contract sunt șterse după ${months} luni.`] },
        { h: 'Răspunsuri', p: [`Încerc să răspund în ${reply} zile lucrătoare. Dacă nu primiți răspuns, scrieți-mi la ${site.email} sau sunați la ${site.phone}: e posibil ca e-mailul să nu fi ajuns la mine.`] },
        { h: 'Cu cine aveți de-a face', p: [`Plan 1:1 este serviciul lui ${site.ownerFullName.ro}, persoană fizică din ${site.city.ro}, România, nu o firmă. Contact: ${site.email}, ${site.phone}.`] },
      ],
    },
  },
  hu: {
    privacy: {
      title: 'Adatvédelmi tájékoztató',
      description: 'Milyen személyes adatokat gyűjt a Plan 1:1, miért, meddig őrzi, és hogyan kérheti a törlésüket.',
      intro: 'Ez a tájékoztató elmondja, milyen személyes adatokat gyűjtök ezen a weboldalon és a munkám során, miért, meddig őrzöm őket, és hogyan kérheti a törlésüket.',
      sections: [
        { h: 'Ki felel az adatokért', p: [
          `Az adatkezelő ${site.ownerFullName.hu}, magánszemély (${site.city.hu}, Románia), aki Plan 1:1 néven kínál szobaszkennelést. E-mail: ${site.email}. Telefon: ${site.phone}. A postai címemet a szerződés tartalmazza, és kérésre megadom.`,
          'Nincs cégem és adatvédelmi tisztviselőm sem; írjon közvetlenül nekem.',
        ] },
        { h: 'Milyen adatokat gyűjtök', list: [
          'Az ajánlatkérő űrlapról: az Ön nevét, e-mail-címét vagy telefonszámát, az ingatlan típusát, a szobák számát, a települést és az üzenetét. Az űrlap magától nem küld semmit: megnyitja az Ön levelezőprogramját a megírt ajánlatkéréssel, és csak akkor jut el hozzám, amikor Ön elküldi azt az e-mailt.',
          'Ha szerződést kötünk: a szerződéshez szükséges adatokat (név és cím, cég esetén a cégnév és a nyilvántartási adatok), a fizetések nyilvántartását és a levelezésünket.',
          'A szkennelést: a szobák LiDAR-ral rögzített geometriáját (falak, ajtók, ablakok, bútorok), a szobákról készült referenciafotókat, valamint az ezekből készült 3D modellt és alaprajzot. A fotókon látszhat, mi van a szobákban, ezért arra kérem a jelenlévőket, hogy szkennelés közben menjenek ki a szobából.',
          `Ez a weboldal nem használ sütiket, sem látogatottságmérést, és nem tölt be betűtípust vagy szkriptet más cégektől. A tárhelye a ${site.host}, amely biztonsági okokból naplózza a látogatók IP-címét; hogy meddig őrzi, azt a GitHub adatvédelmi nyilatkozata írja le.`,
        ] },
        { h: 'Miért és milyen jogalapon', list: [
          'Az ajánlatkérés megválaszolására és ajánlat készítésére: a szerződés előtt, az Ön kérésére tett lépések (GDPR 6. cikk (1) bekezdés b) pont).',
          'A munka elvégzésére és átadására: a szerződésünk teljesítése (6. cikk (1) bekezdés b) pont).',
          'A jogszabály által előírt nyilvántartások, például a fizetések és bevételek megőrzésére: jogi kötelezettség (6. cikk (1) bekezdés c) pont).',
          'Az adatait nem használom reklámra, nem adom el, és a szkennelést kizárólag az Ön projektjéhez használom. Az Ön szobáit az írásos hozzájárulása nélkül sem ezen az oldalon, sem máshol nem mutatom meg.',
        ] },
        { h: 'Meddig őrzöm', list: [
          `Szerződéshez nem vezető ajánlatkérések: az utolsó válaszomtól számított ${months} hónapig, utána törlöm őket.`,
          `A szkennelés, a fotók, a modell és az alaprajz: a munka idejére és amíg a privát link online van (az átadástól számított ${linkMonths} hónapig), utána törlöm őket, hacsak írásban nem kéri, hogy korábban töröljem vagy tovább őrizzem.`,
          'A szerződés és a fizetések nyilvántartása: ameddig a romániai adó- és számviteli szabályok előírják.',
        ] },
        { h: 'Ki látja még', p: [
          `Csak azok a szolgáltatások, amelyekre ehhez a munkához szükségem van: a ${site.emailProvider}, ahová az Ön levelei érkeznek és ahol tárolódnak; a ${site.host}, amely ezt a weboldalt kiszolgálja; és a privát modell-linkek tárhelye, amelyet a szerződés megnevez. A Google és a GitHub amerikai cégek; mindkettő kijelenti, hogy megfelel az EU–USA adatvédelmi keretrendszernek (EU-U.S. Data Privacy Framework), és az unióból érkező adatokra az Európai Bizottság általános adatvédelmi kikötéseit is alkalmazza.`,
          'A modellhez vezető privát linket csak Ön kapja meg, és azok, akiknek Ön továbbküldi.',
        ] },
        { h: 'Az Ön jogai', p: [
          `Kérhet másolatot az adatairól, kérheti a helyesbítésüket, törlésüket, a kezelésük korlátozását, tiltakozhat a kezelésük ellen, és hordozható formában is megkaphatja őket. Írjon a ${site.email} címre; legfeljebb egy hónapon belül válaszolok.`,
          'Panaszt tehet a román adatvédelmi hatóságnál is (ANSPDCP, www.dataprotection.ro).',
        ] },
        { h: 'A szkennelés törlése', p: [
          `Írjon a ${site.email} címre, és adja meg a címet vagy a projekt nevét. Törlöm a szkennelést, a fotókat, a modellt, az alaprajzot és a privát linket, majd e-mailben megerősítem. A jogszabály által előírt nyilvántartások, például a szerződés és a fizetés, az előírt idő végéig megmaradnak.`,
        ] },
        { h: 'Változások', p: ['Ha ez a tájékoztató megváltozik, az új változat ezen az oldalon jelenik meg, a dátumával együtt.'] },
      ],
    },
    terms: {
      title: 'Az ajánlatkérő űrlap feltételei',
      description: 'Mi történik, ha ajánlatot kér a Plan 1:1-től.',
      intro: 'Ezek a feltételek akkor érvényesek, ha a weboldal űrlapján keresztül küld ajánlatkérést.',
      sections: [
        { h: 'Mire való az űrlap', p: ['Az űrlapon szkennelésről érdeklődhet: mely szobákról van szó, hol, és miről szeretne dönteni. Az űrlap megnyitja a levelezőprogramját a megírt ajánlatkéréssel; semmi sem megy el, amíg Ön el nem küldi azt az e-mailt. A küldés ingyenes, és egyikünket sem kötelezi semmire.'] },
        { h: 'Nincs szerződés, amíg mindketten alá nem írjuk', p: ['Az ajánlatkérés nem megrendelés. A válaszom ajánlat, árral és időponttal. A munka csak azután kezdődik, hogy mindketten aláírtunk egy írásos szerződést; a fizetés banki átutalással történik, e szerződés alapján.'] },
        { h: 'Árak', p: ['Az oldalon szereplő árak kezdő árak, lejben. Az Ön szobáinak ára az, amely a szerződésben szerepel.'] },
        { h: 'Mit küldjön', p: ['Adjon meg egy elérhetőséget, és írja le a szobákat úgy, ahogy vannak. Kérem, ne küldjön az űrlapon jelszót, személyi iratot, bankadatot vagy egészségügyi információt. Ha a fotók segítenének, e-mailben kérem el őket.'] },
        { h: 'Az Ön adatai', p: [`Amit küld, azt csak a válaszhoz használom, ahogy az adatvédelmi tájékoztató leírja. A szerződéshez nem vezető ajánlatkéréseket ${months} hónap után törlöm.`] },
        { h: 'Válaszok', p: [`Igyekszem ${reply} munkanapon belül válaszolni. Ha nem kap választ, írjon a ${site.email} címre, vagy hívjon a ${site.phone} számon: lehet, hogy az e-mail nem érkezett meg hozzám.`] },
        { h: 'Kivel áll kapcsolatban', p: [`A Plan 1:1 ${site.ownerFullName.hu} szolgáltatása, aki magánszemélyként dolgozik (${site.city.hu}, Románia), nem cégként. Elérhetőség: ${site.email}, ${site.phone}.`] },
      ],
    },
  },
};
