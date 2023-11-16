"use client";
import { signIn } from "next-auth/react";

export default function BottomNav() {
    return (
        <button className="btn btn-primary"
            onClick={async () => { await signIn("google", { callbackUrl: "/admin/tasks" }) }}
        >Sign in</button>
    );
}
