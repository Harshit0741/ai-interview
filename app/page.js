import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p className="text-lg">
        This is a simple Next.js application.
      </p>
      <Button>hey</Button>
      <p className="text-lg">
        This is a simple Next.js application with Tailwind CSS and Radix UI.
      </p>
      <Button variant="secondary">Click me</Button>
   </div>
  );
}
