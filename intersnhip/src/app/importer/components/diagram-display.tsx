"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

interface DiagramDisplayProps {
  diagram: {
    type: "mermaid"
    content: string
  }
}

export function DiagramDisplay({ diagram }: DiagramDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (diagram.type === "mermaid" && containerRef.current) {
      import("mermaid").then((mermaid) => {
        mermaid.default.initialize({
          startOnLoad: true,
          theme: "neutral",
          securityLevel: "loose",
        })

        // Clear previous renders
        if (containerRef.current) {
          containerRef.current.innerHTML = ""

          // Create a unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`
          const div = document.createElement("div")
          div.id = id
          div.className = "flex justify-center"
          div.textContent = diagram.content
          containerRef.current.appendChild(div)

          mermaid.default.run({
            nodes: [containerRef.current.querySelector(`#${id}`)!],
          })
        }
      })
    }
  }, [diagram])

  return (
    <Card className="p-4 overflow-x-auto">
      <div ref={containerRef} className="flex justify-center min-h-[200px]">
        Loading diagram...
      </div>
    </Card>
  )
}

