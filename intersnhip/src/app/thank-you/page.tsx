"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ThankYouPage() {
  const [hoveredPerson, setHoveredPerson] = useState<string | null>(null);

  const people = [
    {
      name: "Siamak",
      message:
        "Thank you for investing *a lot* of time in me and being such a patient teacher!",
      emoji: "🤠",
      color: "border-blue-400 hover:border-blue-500",
    },
    {
      name: "Michael",
      message:
        "Thank you for traveling all over Germany, taking care of business and bringing the enthusiasm everywhere you go!",
      emoji: "🏇",
      color: "border-green-400 hover:border-green-500",
    },
    {
      name: "Christoph",
      message:
        "Thank you for being a reliable colleague and making pair programming enjoyable.",
      emoji: "🏄‍♂️",
      color: "border-orange-400 hover:border-orange-500",
    },
  ];

  return (
    <main className="container relative mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight flex justify-center items-center gap-3">
          Thank You
        </h1>
        <p className="mx-auto max-w-2xl text-lg">
          to donista for offering me this amazing opportunity. Shout out to
          anyone I wasnt able to mention below - André, Semjon, the Enactus team
          and ChatGPT - you've been great to work with.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {people.map((person) => (
          <motion.div
            key={person.name}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card
              className={`h-full border-2 ${person.color} shadow-lg`}
              onMouseEnter={() => setHoveredPerson(person.name)}
              onMouseLeave={() => setHoveredPerson(null)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <span className="text-2xl">{person.emoji}</span> {person.name}
                  {hoveredPerson === person.name && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2"
                    >
                      <Star
                        className="h-5 w-5 text-yellow-500"
                        fill="#facc15"
                      />
                    </motion.span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-medium">
                  {person.message}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/release">
          <Button size="lg" variant="outline">
            Previous Project
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="default">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}
