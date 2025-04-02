"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeDisplayProps {
  code: string;
  language: string;
}

export function CodeDisplay({ code, language }: CodeDisplayProps) {
  return (
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
  );
}
