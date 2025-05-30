import app from "@/app/utils/firebaseConfig";
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

const db = getFirestore(app);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Expecting: { items, user, total }
    const { items, user, total } = body;

    if (!items || !user || !total) {
      return NextResponse.json({ success: false, error: "Missing order data" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "orders"), {
      items,
      user,
      total,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}
