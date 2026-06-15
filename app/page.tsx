"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: number;
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
      if (error) {
        setError(error.message);
      } else {
        setMessages(data || []);
        console.log('data berhasil di load:')
        console.log(data) 
        console.log('Supabase Client:',supabase)
      }
    }

    loadMessages();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Hello World</h1>

      <h2 className="mt-6 text-xl font-semibold">
        Data dari Supabase:
      </h2>

      {error && <p>Error: {error}</p>}

      <ul className="mt-4 list-disc pl-6">
        {messages.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href="/page2"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Mama go go go!
        </Link>
      </div>

    </main>
  );
}