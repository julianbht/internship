import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeExamplesSectionProps {
  codeExamples: CodeExample[];
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export function CodeExamplesSection({
  codeExamples,
}: CodeExamplesSectionProps) {
  if (codeExamples.length === 0) return null;

  return (
    <div className="my-6 mx-auto">
      <h3 className="text-lg font-medium mb-3">Implementation</h3>
      <Tabs defaultValue={codeExamples[0].id} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {codeExamples.map((example) => (
            <TabsTrigger key={example.id} value={example.id}>
              {example.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {codeExamples.map((example) => (
          <TabsContent key={example.id} value={example.id} className="mt-4">
            <div className="mb-2 text-sm text-muted-foreground">
              {example.description}
            </div>
            <SyntaxHighlighter
              language={example.language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                lineHeight: 1.5,
              }}
              showLineNumbers
            >
              {example.code}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
