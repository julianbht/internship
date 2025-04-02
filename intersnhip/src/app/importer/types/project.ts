export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  codeExamples: CodeExample[];
}
