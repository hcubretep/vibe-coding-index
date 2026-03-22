import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const faqs = [
  {
    q: "What is vibe coding?",
    a: "Vibe coding is a term for using AI tools to build software by describing what you want in natural language, rather than writing every line of code by hand. You guide the AI with prompts, iterate on the output, and ship faster. It ranges from no-code app builders to AI-powered IDEs that help experienced developers move faster.",
  },
  {
    q: "Are these tools for beginners or developers?",
    a: "Both. Tools like Lovable, Bolt.new, and Replit are designed for non-technical users and beginners. Cursor, Windsurf, and Claude Code are built for experienced developers. The right choice depends on your technical background and what you're building.",
  },
  {
    q: "Which tools are best for full-stack apps?",
    a: "For no-code full-stack: Lovable and Bolt.new are the leaders. For code-first full-stack: Cursor and Claude Code give you the most control. Firebase Studio is strong if you're in the Google ecosystem.",
  },
  {
    q: "Which tools are best for UI generation?",
    a: "v0 by Vercel is the gold standard for generating beautiful React UI components. Tempo Labs is a strong alternative with a visual editing approach. Same.new is great for quickly cloning existing website designs.",
  },
  {
    q: "Which tools give you the most control?",
    a: "Cursor, Aider, and Claude Code give you maximum control since you're working directly with code. Cline and OpenHands are open-source alternatives. The trade-off is that these tools require coding knowledge to use effectively.",
  },
  {
    q: "Which tools are best for teams?",
    a: "GitHub Copilot has the deepest team and enterprise features thanks to GitHub integration. Cursor and Windsurf both support team workflows. For enterprise compliance needs, Copilot and Claude Code lead the way.",
  },
  {
    q: "How should I choose between a vibe coding builder and an AI IDE?",
    a: "Use a vibe coding builder (Lovable, Bolt, Replit) if you want to describe what to build and get a working app fast, with minimal coding. Use an AI IDE (Cursor, Windsurf) if you already know how to code and want AI to accelerate your workflow while maintaining full control over architecture and code quality.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="py-16 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-1">FAQ</h2>
        <p className="text-sm text-muted-foreground mb-8">Common questions about vibe coding tools.</p>

        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
