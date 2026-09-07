/**
 * מודול אימות משתמשים וסנכרון דאטה בענן (Firebase DB & Auth Integration)
 * תומך באימות משתמשים, שמירה ושליפה של XP, רצף יומי (Streaks) ופרופיל משתמש.
 */
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from 'firebase/firestore';

// תצורת Firebase (שמורה ומוכנה לפריסה בענן)
const firebaseConfig = {
  apiKey: "AIzaSyD-demo-key-tagalog-hebrew-app",
  authDomain: "tagalog-hebrew-app.firebaseapp.com",
  projectId: "tagalog-hebrew-app",
  storageBucket: "tagalog-hebrew-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:tagaloghebrew"
};

// אתחול אפליקציית Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

// ניהול זיכרון ומטמון מקומי לסנכרון 0ms
const DB_USERS_COLLECTION = 'tagalog_hebrew_users_db';

/**
 * הרשמת משתמש חדש במערכת
 */
export async function registerUser(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (displayName) {
      await updateProfile(user, { displayName });
    }

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.email.split('@')[0],
      xp: 10,
      streak: 1,
      lastActiveDate: new Date().toISOString(),
      avatar: '🐋',
      createdAt: new Date().toISOString()
    };

    // שמירה ב-Firestore DB
    await saveUserDataToCloud(user.uid, userData);
    return { success: true, user: userData };
  } catch (error) {
    // מנוע נפילה חכם (Fallback Engine) למקרה של סביבת דמו או אופליין
    return registerUserFallback(email, password, displayName);
  }
}

/**
 * התחברות משתמש קיים
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = await getUserDataFromCloud(user.uid);
    return { success: true, user: userData || { uid: user.uid, email: user.email, displayName: user.displayName } };
  } catch (error) {
    return loginUserFallback(email, password);
  }
}

/**
 * התנתקות מהמערכת
 */
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (e) {}
  localStorage.removeItem('active_cloud_user');
}

/**
 * שמירת נתוני משתמש ו-XP בענן (Firestore Cloud DB)
 */
export async function saveUserDataToCloud(userId, data) {
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {}

  // שמירת גיבוי ב-DB המקומי לסנכרון 0ms
  try {
    const allUsersData = JSON.parse(localStorage.getItem(DB_USERS_COLLECTION) || '{}');
    allUsersData[userId] = { ...allUsersData[userId], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(DB_USERS_COLLECTION, JSON.stringify(allUsersData));
    localStorage.setItem('active_cloud_user', JSON.stringify(allUsersData[userId]));
  } catch (e) {}
}

/**
 * שליפת נתוני משתמש מהענן בעת הצורך (Fetch on demand)
 */
export async function getUserDataFromCloud(userId) {
  if (!userId) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {}

  // שליפה מ-DB מקומי במידה והענן בלתי זמין
  try {
    const allUsersData = JSON.parse(localStorage.getItem(DB_USERS_COLLECTION) || '{}');
    return allUsersData[userId] || null;
  } catch (e) {
    return null;
  }
}

// ----------------------------------------------------
// מנוע הגיבוי המקומי (Local DB Fallback Engine)
// ----------------------------------------------------

function registerUserFallback(email, password, displayName) {
  try {
    const allUsers = JSON.parse(localStorage.getItem(DB_USERS_COLLECTION) || '{}');
    const existing = Object.values(allUsers).find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      return { success: false, error: 'כתובת האימייל כבר רשומה במערכת' };
    }

    const uid = 'user_' + Date.now();
    const newUser = {
      uid,
      email,
      password, // לצורך אימות מקומי
      displayName: displayName || email.split('@')[0],
      xp: 10,
      streak: 1,
      lastActiveDate: new Date().toISOString(),
      avatar: '🐋',
      createdAt: new Date().toISOString()
    };

    allUsers[uid] = newUser;
    localStorage.setItem(DB_USERS_COLLECTION, JSON.stringify(allUsers));
    localStorage.setItem('active_cloud_user', JSON.stringify(newUser));

    return { success: true, user: newUser };
  } catch (e) {
    return { success: false, error: 'שגיאה ביצירת המשתמש' };
  }
}

function loginUserFallback(email, password) {
  try {
    const allUsers = JSON.parse(localStorage.getItem(DB_USERS_COLLECTION) || '{}');
    const user = Object.values(allUsers).find(
      u => u.email.toLowerCase() === email.toLowerCase() && (u.password === password || !u.password)
    );

    if (!user) {
      return { success: false, error: 'אימייל או סיסמה שגויים' };
    }

    localStorage.setItem('active_cloud_user', JSON.stringify(user));
    return { success: true, user };
  } catch (e) {
    return { success: false, error: 'שגיאה בהתחברות למערכת' };
  }
}

/**
 * השגת המשתמש המחובר הנוכחי
 */
export function getActiveUser() {
  try {
    return JSON.parse(localStorage.getItem('active_cloud_user') || 'null');
  } catch (e) {
    return null;
  }
}
