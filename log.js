<script src="https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js"></script>
// Firebase configuration
const firebaseConfig = { // קונפיגורציה לחיבור לפרויקט פיירבייס
    apiKey: "AIzaSyBOv8D1r6BurKfIgkh3_cyKHHCPXo4EgnY", // מפתח ה-API של הפרויקט
    authDomain: "test-779d8.firebaseapp.com", // הדומיין של האימות
    projectId: "test-779d8", // מזהה הפרויקט בפיירבייס
    storageBucket: "test-779d8.firebasestorage.app", // כתובת אחסון הקבצים
    messagingSenderId: "289248450399", // מזהה שליחת הודעות
    appId: "1:289248450399:web:f95529f54164f29667c8ea" // מזהה האפליקציה
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig); // אתחול פיירבייס עם הקונפיגורציה שסיפקנו
const store = firebase.firestore(); // יצירת חיבור למסד הנתונים Firestore
// הוספת מאזינים ללחצנים
document.getElementById('id_bth_signup').addEventListener('click', showSignupForm); // מאזין ללחיצה על כפתור ההרשמה ומפעיל את הפונקציה showSignupForm
document.getElementById('id_bth_login').addEventListener('click', showLoginForm); // מאזין ללחיצה על כפתור הכניסה ומפעיל את הפונקציה showLoginForm

// Show/Hide Login Form
function showLoginForm() { // פונקציה להצגת טופס הכניסה
    document.getElementById("id_login").style.display = "block"; // מציג את טופס הכניסה
    document.getElementById("id_signup").style.display = "none"; // מסתיר את טופס ההרשמה
}

// Show/Hide Signup Form
function showSignupForm() { // פונקציה להצגת טופס ההרשמה
    document.getElementById("id_signup").style.display = "block"; // מציג את טופס ההרשמה
    document.getElementById("id_login").style.display = "none"; // מסתיר את טופס הכניסה
}

// Save User (Sign Up)
function saveUser() { // פונקציה לשמירת משתמש חדש
    const username = document.getElementById("username").value; // שואב את הערך משדה "שם משתמש"
    const email = document.getElementById("email").value; // שואב את הערך משדה "אימייל"
    const password = document.getElementById("password").value; // שואב את הערך משדה "סיסמה"
    const confirmPassword = document.getElementById("confirm-password").value; // שואב את הערך משדה "אישור סיסמה"

    // Validate passwords match
    if (password !== confirmPassword) { // בודק אם הסיסמאות אינן תואמות
        document.getElementById("alert-signup").innerText = "Passwords do not match."; // מציג הודעה שמשתמשת בשדות הסיסמה
        document.getElementById("alert-signup").style.display = "block"; // מציג את הודעת השגיאה
        return; // עוצר את הפונקציה אם הסיסמאות אינן תואמות
    }

    firebase.auth().createUserWithEmailAndPassword(email, password) // יוצר משתמש חדש עם אימייל וסיסמה בפיירבייס
        .then((userCredential) => { // במקרה של הצלחה
            const user = userCredential.user; // שומר את פרטי המשתמש שיצרנו
            const userData = { username, email, uid: user.uid }; // יוצר אובייקט עם פרטי המשתמש
            firebase.database().ref("users/" + user.uid).set(userData); // שומר את פרטי המשתמש ב-Database של פיירבייס
            alert("Account created successfully!"); // מציג הודעת הצלחה
            showLoginForm(); // עובר לטופס הכניסה לאחר ההרשמה
        })
        .catch((error) => { // במקרה של שגיאה
            document.getElementById("alert-signup").innerText = error.message; // מציג את הודעת השגיאה
            document.getElementById("alert-signup").style.display = "block"; // מציג את הודעת השגיאה על המסך
        });
}

// Log User In
function logUser() { // פונקציה לחיבור משתמש קיים
    const email = document.getElementById("logemail").value; // שואב את הערך משדה "אימייל" בטופס הכניסה
    const password = document.getElementById("logpassword").value; // שואב את הערך משדה "סיסמה" בטופס הכניסה

    firebase.auth().signInWithEmailAndPassword(email, password) // מנסה להיכנס עם אימייל וסיסמה בפיירבייס
        .then((userCredential) => { // במקרה של הצלחה
            alert("Login successful!"); // מציג הודעת הצלחה
            window.location.href = "homeA.html"; // מעביר את המשתמש לעמוד הבית לאחר ההתחברות
        })
        .catch((error) => { // במקרה של שגיאה
            document.getElementById("alert-login").innerText = error.message; // מציג את הודעת השגיאה
            document.getElementById("alert-login").style.display = "block"; // מציג את הודעת השגיאה על המסך
        });
}
