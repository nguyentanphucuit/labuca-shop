import app from "@/app/utils/firebaseConfig";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const db = getFirestore(app);

// Define admin emails
const ADMIN_EMAILS = [
  "nguyentanphucuit1@gmail.com",
  "hoaithuong0500@gmail.com",
  "admin@gmail.com",
  // Add more admin emails here
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, displayName, photoURL, loginMethod } = body;

    if (!uid || !email) {
      return NextResponse.json({ error: "UID và email là bắt buộc" }, { status: 400 });
    }

    // Check if user already exists
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    // Determine role based on email and login method
    // Only allow admin role for Google login
    const isAdmin = loginMethod === "google" && ADMIN_EMAILS.includes(email.toLowerCase());
    const role = isAdmin ? "admin" : "customer";

    // Create or update user document in Firestore
    const userData = {
      uid,
      email,
      displayName: displayName || "",
      photoURL: photoURL || "",
      role,
      loginMethod: loginMethod || "email", // Store login method
      isActive: true,
      updatedAt: new Date(),
      // Only set createdAt if user doesn't exist
      ...(userDoc.exists() ? {} : { createdAt: new Date() }),
    };

    await setDoc(userRef, userData, { merge: true });

    return NextResponse.json(
      {
        message: "Tài khoản được tạo/cập nhật thành công trong Firestore",
        user: userData,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Lỗi tạo tài khoản:", error);
    return NextResponse.json({ error: "Lỗi tạo tài khoản: " + error.message }, { status: 500 });
  }
}
