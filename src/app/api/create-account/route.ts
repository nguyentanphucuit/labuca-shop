import app from "@/app/utils/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const db = getFirestore(app);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, displayName, photoURL } = body;

    if (!uid || !email) {
      return NextResponse.json({ error: "UID và email là bắt buộc" }, { status: 400 });
    }

    // Create user document in Firestore
    const userRef = doc(db, "users", uid);
    const userData = {
      uid,
      email,
      displayName: displayName || "",
      photoURL: photoURL || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "customer", // Default role
      isActive: true,
    };

    await setDoc(userRef, userData);

    return NextResponse.json(
      {
        message: "Tài khoản được tạo thành công trong Firestore",
        user: userData,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Lỗi tạo tài khoản:", error);
    return NextResponse.json({ error: "Lỗi tạo tài khoản: " + error.message }, { status: 500 });
  }
}
