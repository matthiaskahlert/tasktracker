/* 
Entwickle eine Webanwendung, die es Benutzern ermöglicht, eine einfache Aufgabe zu planen und zu speichern. 
Die Anwendung soll ein Formular enthalten, in dem Benutzer 
eine Aufgabenbeschreibung, ein Fälligkeitsdatum und 
eine Priorität (hoch, mittel, niedrig) angeben können. 
Nach dem Absenden des Formulars soll die Anwendung die Aufgabe in einer Liste anzeigen. 
Verwende die Fetch-API, um die Aufgabendaten asynchron an einen Server zu senden 
(du kannst https://jsonplaceholder.typicode.com/posts als Test-API verwenden, um POST-Anfragen zu simulieren). 
Implementiere zusätzlich eine Validierung, die sicherstellt, dass alle Formularfelder ausgefüllt wurden, bevor die Daten gesendet werden. 
Wenn ein Feld leer ist, soll eine entsprechende Fehlermeldung angezeigt werden. 
Nutze async/await für die asynchrone Logik.   
*/

//HTML-Elemente ziehen
const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskName");
const taskDate = document.getElementById("taskDate");
const prioInput = document.getElementById("prio");

// const aufgaben = []; // tasks werden in diesem array gespeichert
let aufgaben = JSON.parse(localStorage.getItem('tasks')) || []; // tasks werden in diesem array gespeichert

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // verhindert neuladen der seite

    const beschreibung = taskInput.value.trim();
    const priorität = prioInput.value;
    const duedate = new Date(taskDate.value).toLocaleDateString("de-DE"); //lokales datumsformat

    const neueAufgabe = {
        id: Date.now(), // eindeutige id für jede aufgabe
        beschreibung: beschreibung,
        priorität: priorität,
        duedate: duedate
    };


    aufgaben.push(neueAufgabe);
    console.log("Aufgabe gespeichert:", neueAufgabe);
    console.log("Aktuelles Aufgaben-Array:", aufgaben);
    saveToLocalStorage(); // nach jeder änderung speichern
    aufgabenAusgeben(); // direkt nach dem Speichern anzeigen
    form.reset();

    //fetch-API
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  //sagt dem server: ich sende ein JSON
            },
            body: JSON.stringify({
                title: beschreibung,
                body: duedate,
                userId: 1,
                prio: priorität
            })
        });

        // prüfen, ob die antwort ok war (status 200–299)
        if (!response.ok) {
            throw new Error("Server-Fehler: " + response.status);
        }

        const data = await response.json(); // antwort als JSON auslesen
        console.log("Fetch-Daten:", data);

    } catch (error) {
        console.error("Fetch-Fehler:", error);
        const errorMsg = document.createElement('p');
        errorMsg.style.color = 'red';
        errorMsg.textContent = '⚠️ Aufgabe gespeichert, aber API-Verbindung fehlgeschlagen.';
        form.appendChild(errorMsg);
    
        setTimeout(() => errorMsg.remove(), 5000); // Nach 5 Sek. entfernen
    }
});

function aufgabenAusgeben() {
    const listElement = document.getElementById("taskList");
    listElement.innerHTML = ""; //alte einträge löschen

    // Wenn keine Aufgaben vorhanden
    if (aufgaben.length === 0) {
        listElement.innerHTML = '<li class="empty-state">📝 Noch keine Aufgaben vorhanden</li>';
        return;
    }

    // sortieren
    const sortiert = [...aufgaben].sort((a, b) => { //ich möchte das orginal array nicht verändern, daher spread operator
        const order = { hoch: 1, mittel: 2, niedrig: 3 };
        return order[a.priorität] - order[b.priorität];
    });

    for (const k of sortiert) { //aufgaben durchlaufen und ausgeben
        let li = document.createElement("li");                
        li.classList.add(k.priorität); //klasse entsprechend der prio

        // task-content container
        let taskContent = document.createElement("div");
        taskContent.classList.add("task-content");
        taskContent.textContent = `Priorität: ${k.priorität} – ${k.beschreibung} (Deadline: ${k.duedate})`;

        // delete-button erstellen
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "🗑️";
        deleteBtn.title = "Aufgabe löschen";
        deleteBtn.onclick = () => deleteTask(k.id);

        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        listElement.appendChild(li);
    }
}

// Aufgabe löschen
function deleteTask(id) {
    aufgaben = aufgaben.filter(task => task.id !== id);
    saveToLocalStorage();
    aufgabenAusgeben();
}

// Nach änderungen werden die aufgeben im localstorage gespeichert
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(aufgaben));
}

// Initial beim Laden der Seite rendern, um Platzhalter anzuzeigen oder gespeicherte aufgaben anzuzeigen
document.addEventListener('DOMContentLoaded', () => {
    aufgabenAusgeben();
});

