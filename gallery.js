import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js"; // ייבוא הפונקציה לאתחול אפליקציית Firebase
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"; // ייבוא פונקציות לעבודה עם Realtime Database

const firebaseConfig = { // הגדרות החיבור ל-Firebase
    apiKey: "AIzaSyBOv8D1r6BurKfIgkh3_cyKHHCPXo4EgnY", // מפתח API עבור Firebase
    authDomain: "test-779d8.firebaseapp.com", // דומיין ההרשאה של הפרויקט
    databaseURL: "https://test-779d8-default-rtdb.firebaseio.com", // כתובת ה-URL של מסד הנתונים
    projectId: "test-779d8", // מזהה הפרויקט
    storageBucket: "test-779d8.firebasestorage.app", // דומיין אחסון הקבצים
    messagingSenderId: "289248450399", // מזהה שליחת הודעות
    appId: "1:289248450399:web:f95529f54164f29667c8ea" // מזהה האפליקציה
};

const app = initializeApp(firebaseConfig); // אתחול אפליקציית Firebase באמצעות ההגדרות
const database = getDatabase(app); // יצירת חיבור למסד הנתונים של Firebase

const Aelement = document.querySelector('.text-1'); // בחירת אלמנט בדף להצגת הטמפרטורה
const Belement = document.querySelector('.text-2');
const Celement = document.querySelector('.text-3');

// עדכון הטמפרטורה בזמן אמת
onValue(ref(database, "Sensors/TX/A"), (snapshot) => { // מאזין לשינויים בנתיב "Sensors/TX/temperature" במסד הנתונים
    const light = snapshot.val(); // קבלת ערך הטמפרטורה מהנתונים
    Aelement.textContent = `כמות האור שעל הצמח: ${light}`; // עדכון תוכן האלמנט בטמפרטורה הנוכחית
});

onValue(ref(database, "Sensors/TX/C"), (snapshot) => { // מאזין לשינויים בנתיב "Sensors/TX/temperature" במסד הנתונים
    const soile = snapshot.val(); // קבלת ערך הטמפרטורה מהנתונים
    Celement.textContent = `לחות האדמה של הצמח: ${soile}`; // עדכון תוכן האלמנט בטמפרטורה הנוכחית
});

onValue(ref(database, "Sensors/TX/B"), (snapshot) => { // מאזין לשינויים בנתיב "Sensors/TX/temperature" במסד הנתונים
    const leveW = snapshot.val(); // קבלת ערך הטמפרטורה מהנתונים
    Belement.textContent = `גובה המים במכל ההשקיה: ${leveW}`; // עדכון תוכן האלמנט בטמפרטורה הנוכחית
});

// פונקציה לשליחת פקודות
function sendCommandToFirebase(commandValue) { // פונקציה לשליחת פקודה למסד הנתונים
    set(ref(database, "Sensors/RX"), // הגדרת ערך חדש בנתיב "plant_system/commands"
     commandValue // שליחת ערך הפקודה
    );
}

// כפתורים
const LoffButton = document.querySelector('.btn-light-off'); // בחירת כפתור הפעלת המשאבה
const LlowButton = document.querySelector('.btn-light-low'); // בחירת כפתור הפעלת המנורה
const LmidButton = document.querySelector('.btn-light-mid'); // בחירת כפתור הפעלת המאוורר
const LhighButton = document.querySelector('.btn-light-high');
const openButton = document.querySelector('.btn-open');
const closedButton = document.querySelector('.btn-closed');
const stopButton = document.querySelector('.btn-stop');
const FonButton = document.querySelector('.btn-fan-on');
const FoffButton = document.querySelector('.btn-fan-off');

LoffButton.addEventListener("click", () => sendCommandToFirebase(1));
LlowButton.addEventListener("click", () => sendCommandToFirebase(2));
LmidButton.addEventListener("click", () => sendCommandToFirebase(3));
LhighButton.addEventListener("click", () => sendCommandToFirebase(4));
openButton.addEventListener("click", () => sendCommandToFirebase(5));
closedButton.addEventListener("click", () => sendCommandToFirebase(6));
stopButton.addEventListener("click", () => sendCommandToFirebase(7));
FonButton.addEventListener("click", () => sendCommandToFirebase(8));
FoffButton.addEventListener("click", () => sendCommandToFirebase(9));