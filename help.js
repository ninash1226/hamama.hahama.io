function askForHelp() { // פונקציה להצגת חלונית העזרה
    document.getElementById("help-container").style.display = "flex"; // משנה את התצוגה של חלונית העזרה ל-"flex" כדי להציג אותה
}

function closeHelp() { // פונקציה לסגירת חלונית העזרה
    document.getElementById("help-container").style.display = "none"; // משנה את התצוגה של חלונית העזרה ל-"none" כדי להסתיר אותה
}

function submitHelp() { // פונקציה לשליחת הבקשה לעזרה
    const helpText = document.getElementById("help-text").value; // שואב את הערך מתוך שדה הטקסט של חלונית העזרה
    if (helpText.trim() === "") { // בודק אם השדה ריק או מכיל רק רווחים
        alert("אנא כתבו את הבעיה שלכם."); // מציג הודעה למשתמש אם השדה ריק
    } else { // אם השדה אינו ריק
        alert("הבעיה נשלחה בהצלחה! ניצור איתכם קשר בקרוב."); // מציג הודעה שהבקשה נשלחה בהצלחה
        document.getElementById("help-text").value = ""; // מנקה את תוכן שדה הטקסט לאחר השליחה
        closeHelp(); // סוגר את חלונית העזרה
    }
}
