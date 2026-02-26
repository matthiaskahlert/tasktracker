# ✅ TaskTracker - Aufgabenverwaltung

Eine schlanke, intuitive Webanwendung zur Verwaltung von Aufgaben mit Prioritäten und Fälligkeitsdaten. Entwickelt mit reinem JavaScript, HTML und CSS.

## 📋 Features

🎯 **Kernfunktionalitäten:**
- ➕ Aufgaben mit Beschreibung erstellen
- 📅 Fälligkeitsdatum für jede Aufgabe festlegen
- 🔴🟡🟢 Drei Prioritätsstufen (hoch, mittel, niedrig)
- 📊 Automatische Sortierung nach Priorität
- ✅ Formular-Validierung (alle Felder erforderlich)
- 🔗 API-Integration (JSONPlaceholder für POST-Requests)
- 🎨 Farbliche Kennzeichnung nach Priorität
- 📱 Responsive Design

## 🚀 Verwendung

### Lokal starten:

```bash
# 1. index.html im Browser öffnen
# 2. Aufgabe beschreiben
# 3. Fälligkeitsdatum wählen
# 4. Priorität auswählen (hoch/mittel/niedrig)
# 5. "Aufgabe speichern" klicken
# 6. Aufgabe erscheint automatisch in sortierter Liste
```

### Mit Live Server (VS Code):
```bash
# Rechtsklick auf index.html
# → "Open with Live Server"
```

**Tipp:** Browser-Konsole (F12) öffnen, um API-Responses zu sehen!

## 📁 Projektstruktur

```
TaskTracker/
├── index.html      # HTML-Struktur & Formular
├── styles.css      # Styling & Layout
├── main.js         # Logik, Validierung & API-Calls
└── README.md       # Diese Datei
```

## 💻 Technologien

| Technologie | Verwendung |
|-------------|-----------|
| **HTML5** | Semantische Struktur, Formular |
| **CSS3** | Styling, Flexbox, Responsive Design |
| **JavaScript ES6+** | Async/Await, Fetch API, DOM-Manipulation |
| **JSONPlaceholder API** | Mock-Backend für POST-Requests |

## 🔍 Code-Übersicht

### Formular-Validierung & Speicherung

```javascript
// Aufgabe speichern
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const neueAufgabe = {
        beschreibung: taskInput.value.trim(),
        priorität: prioInput.value,
        duedate: new Date(taskDate.value).toLocaleDateString("de-DE")
    };
    
    aufgaben.push(neueAufgabe);
    aufgabenAusgeben();
    
    // API-Call
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(neueAufgabe)
    });
});
```

### Sortierung nach Priorität

```javascript
function aufgabenAusgeben() {
    // Nach Priorität sortieren (hoch → mittel → niedrig)
    const sortiert = [...aufgaben].sort((a, b) => {
        const order = { hoch: 1, mittel: 2, niedrig: 3 };
        return order[a.priorität] - order[b.priorität];
    });
    
    // Liste rendern
    sortiert.forEach(task => {
        const li = document.createElement("li");
        li.classList.add(task.priorität); // CSS-Klasse für Farbe
        li.textContent = `Priorität: ${task.priorität} – ${task.beschreibung} (Deadline: ${task.duedate})`;
        listElement.appendChild(li);
    });
}
```

## 🎓 Lernziele

Dieses Projekt demonstriert:

| Konzept | Umsetzung |
|---------|-----------|
| **Async/Await** | Asynchrone API-Calls mit Fehlerbehandlung |
| **Fetch API** | POST-Requests an JSONPlaceholder |
| **Form-Handling** | Submit-Event, preventDefault() |
| **Validierung** | HTML5 `required` Attribute |
| **Array-Methoden** | sort(), spread operator |
| **DOM-Manipulation** | createElement(), appendChild() |
| **CSS-Classes** | Dynamisches Hinzufügen von Klassen |
| **Datums-Formatierung** | `toLocaleDateString()` für DE-Format |

## 🎨 Prioritäts-Farbschema

```css
🔴 Hoch:     color: red
🟡 Mittel:   color: orange
🟢 Niedrig:  color: green
```

## 📊 Browser-Kompatibilität

| Browser | Support |
|---------|---------|
| Chrome | ✅ Ab v55 |
| Firefox | ✅ Ab v52 |
| Safari | ✅ Ab v11 |
| Edge | ✅ Ab v15 |

## 🔒 Datenschutz & API

- Die App sendet Aufgaben an **JSONPlaceholder** (Test-API)
- JSONPlaceholder speichert keine Daten dauerhaft
- Alle Daten bleiben lokal im Browser (Array im Speicher)
- Keine Backend-Persistierung implementiert

## 🛠️ Zukünftige Features (Ideen)

- [x] LocalStorage für dauerhafte Speicherung
- [x] Aufgaben bearbeiten & löschen
- [ ] "Erledigt"-Status mit Checkbox
- [ ] Filter nach Priorität
- [ ] Suchfunktion
- [ ] Export als CSV/JSON
- [ ] Überfällige Aufgaben markieren
- [ ] Drag & Drop zum Sortieren
- [ ] Dark Mode

## 🧪 Testen

### Testfälle:

1. **Normale Eingabe:**
   - Beschreibung: "Projekt fertigstellen"
   - Datum: Zukünftiges Datum
   - Priorität: hoch
   - ✅ Aufgabe erscheint rot oben in Liste

2. **Validierung:**
   - Leeres Feld → Browser zeigt Warnung
   - Alle Felder erforderlich

3. **Sortierung:**
   - Mehrere Aufgaben mit verschiedenen Prioritäten anlegen
   - ✅ Liste sortiert: hoch → mittel → niedrig

4. **API-Call:**
   - Browser-Konsole öffnen (F12)
   - Aufgabe speichern
   - ✅ "Fetch-Daten:" Log mit Response

## ⚠️ Bekannte Einschränkungen

- Keine Backend-Datenbank
- JSONPlaceholder ist nur für Tests (keine echte Speicherung)
- Keine Authentifizierung

## 📝 Lizenz

MIT - Gerne zum Lernen und Weiterentwickeln verwenden!

## 👤 Autor

Entwickelt als JavaScript-Prüfungsprojekt (Teilprüfung 6)  
von Matthias Kahlert

---

**Happy Task-Tracking! 📝✅**
