/**
 * מודול אימות משתמשים וסנכרון דאטה בענן (Firebase DB & Auth Integration)
 * תומך בהרשמה והתחברות לפי שם משתמש (כינוי) + סיסמה.
 */
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';

// תצורת Firebase
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

const DB_USERS_COLLECTION = 'tagalog_hebrew_users_db';

/**
 * הרשמת משתמש חדש במערכת לפי שם משתמש וסיסמה
 */
export async function registerUser(username, password) {
  const cleanUsername = (username || '').trim();
  if (!cleanUsername || !password) {
    return { success: false, error: 'אנא הזן שם משתמש וסיסמה' };
  }

  // 1. בדיקה האם שם המשתמש כבר תפוס ב-DB המקומי
  const allUsers = getAllUsersFromStorage();
  const isTaken = Object.values(allUsers).some(
    u => (u.username && u.username.toLowerCase() === cleanUsername.toLowerCase()) ||
         (u.displayName && u.displayName.toLowerCase() === cleanUsername.toLowerCase())
  );

  if (isTaken) {
    return { success: false, error: 'שם המשתמש כבר תפוס, אנא בחר שם אחר' };
  }

  // 2. יצירת אימייל סינתטי למנוע ה-Firebase Auth
  const syntheticEmail = `${cleanUsername.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase() || 'user'}@tagalogapp.internal`;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, syntheticEmail, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: cleanUsername });

    const userData = {
      uid: user.uid,
      username: cleanUsername,
      displayName: cleanUsername,
      xp: 10,
      streak: 1,
      lastActiveDate: new Date().toISOString(),
      avatar: '🐋',
      createdAt: new Date().toISOString()
    };

    await saveUserDataToCloud(user.uid, userData);
    return { success: true, user: userData };
  } catch (error) {
    // Fallback engine if offline/demo
    return registerUserFallback(cleanUsername, password);
  }
}

/**
 * התחברות משתמש קיים לפי שם משתמש וסיסמה
 */
export async function loginUser(username, password) {
  const cleanUsername = (username || '').trim();
  if (!cleanUsername || !password) {
    return { success: false, error: 'אנא הזן שם משתמש וסיסמה' };
  }

  const syntheticEmail = `${cleanUsername.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase() || 'user'}@tagalogapp.internal`;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, syntheticEmail, password);
    const user = userCredential.user;
    const userData = await getUserDataFromCloud(user.uid);
    return { 
      success: true, 
      user: userData || { uid: user.uid, username: cleanUsername, displayName: cleanUsername } 
    };
  } catch (error) {
    return loginUserFallback(cleanUsername, password);
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
 * שמירת נתוני משתמש ו-XP בענן ובמכשיר
 */
export async function saveUserDataToCloud(userId, data) {
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {}

  try {
    const allUsersData = getAllUsersFromStorage();
    allUsersData[userId] = { ...allUsersData[userId], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(DB_USERS_COLLECTION, JSON.stringify(allUsersData));
    localStorage.setItem('active_cloud_user', JSON.stringify(allUsersData[userId]));
  } catch (e) {}
}

/**
 * שליפת נתוני משתמש מהענן בעת הצורך
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

  try {
    const allUsersData = getAllUsersFromStorage();
    return allUsersData[userId] || null;
  } catch (e) {
    return null;
  }
}

// ----------------------------------------------------
// מנוע גיבוי מקומי (Local Storage Fallback Engine)
// ----------------------------------------------------

function getAllUsersFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(DB_USERS_COLLECTION) || '{}');
  } catch (e) {
    return {};
  }
}

function registerUserFallback(username, password) {
  try {
    const allUsers = getAllUsersFromStorage();
    const isTaken = Object.values(allUsers).some(
      u => (u.username && u.username.toLowerCase() === username.toLowerCase()) ||
           (u.displayName && u.displayName.toLowerCase() === username.toLowerCase())
    );

    if (isTaken) {
      return { success: false, error: 'שם המשתמש כבר תפוס, אנא בחר שם אחר' };
    }

    const uid = 'user_' + Date.now();
    const newUser = {
      uid,
      username,
      displayName: username,
      password,
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

function loginUserFallback(username, password) {
  try {
    const allUsers = getAllUsersFromStorage();
    const user = Object.values(allUsers).find(
      u => ((u.username && u.username.toLowerCase() === username.toLowerCase()) ||
            (u.displayName && u.displayName.toLowerCase() === username.toLowerCase())) &&
           (u.password === password || !u.password)
    );

    if (!user) {
      return { success: false, error: 'שם משתמש או סיסמה שגויים' };
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
