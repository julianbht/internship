"use client";

import { Card } from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeDisplayProps {
  code: string;
  language: string;
}

export function CodeDisplay({ code, language }: CodeDisplayProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
            lineHeight: 1.5,
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </Card>
  );
}
