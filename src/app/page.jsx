import Navbar from "@/components/Navbar";
import HomeContent from "@/components/HomeContent";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <HomeContent />
      </main>
    </div>
  );
}
