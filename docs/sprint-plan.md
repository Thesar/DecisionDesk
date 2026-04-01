# Sprint 2 Plan — Thesar Habibaj  
Data: 1 Prill 2026  

## Gjendja Aktuale  

- Funksionon:  
  - Listimi i vendimeve (Read)  
  - Shtimi i vendimeve (Create)  
  - Kërkimi sipas ID  
  - Përditësimi i vendimeve (Update)  
  - Fshirja e vendimeve (Delete)  
  - Ruajtja dhe leximi nga CSV  
  - Arkitektura me shtresa (UI → Service → Repository)  

- Nuk funksionon / probleme:  
  - Nuk ka filtrim sipas emrit ose tipit  
  - Nuk ka validim të plotë për input gabim në UI  
  - Nuk ka trajtim të gabimeve (mund të crashojë në disa raste)  

- Programi kompajlohet dhe ekzekutohet: Po  

---

## Plani i Sprintit  

### Feature e Re  
Do të implementoj kërkim/filtrim të vendimeve sipas emrit.  

- Useri shkruan një emër (p.sh. "Marketing")  
- Programi shfaq vetëm vendimet që përmbajnë atë emër  
- Feature kalon nëpër:  
  - UI → merr input  
  - Service → filtron listën  
  - Repository → jep të dhënat  

---

### Error Handling  

Do të trajtoj këto raste:  

1. Input jo valid (p.sh. tekst në vend të numrit)  
   - Mesazh: "Ju lutem shkruani numër valid"  

2. ID që nuk ekziston  
   - Mesazh: "Itemi nuk u gjet"  

3. File mungon ose nuk lexohet  
   - Mesazh: "File nuk u gjet, po krijoj file të ri..."  

---

### Teste  

Do të testoj:  

- Metodën e kërkimit (Search)  
- Metodën Add (validim i inputit)  

Raste kufitare:  
- Kërkim për item që ekziston  
- Kërkim për item që nuk ekziston  
- Shtim me emër bosh (duhet të dështojë)  

---

## Afati  

- Deadline: Martë, 8 Prill 2026, ora 08:30