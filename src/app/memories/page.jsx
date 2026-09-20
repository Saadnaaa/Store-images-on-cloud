import Navbar from "@/components/Navbar";
import Link from "next/link";
import MemoryList from "@/components/memories/MemoryList";

export default function MemoriesPage() {
  return (
    <div>
      <Navbar />

      <main>
        <MemoryList />
      </main>
    </div>
  );
}
