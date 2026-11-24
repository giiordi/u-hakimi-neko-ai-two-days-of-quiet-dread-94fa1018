// Two Days of Quiet Dread — one-line code review comment.
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), with no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Approved. This code will outlive the team, the company, and eventually the sun.";

// The gate: UTF-8 text of 1 to 140 characters, a single line,
// not only white space, no leading or trailing whitespace.
// Count code points, not UTF-16 units, so astral characters
// are charged once each, the way the sealed scorer counts them.
function validate(line) {
  const chars = [...line].length;
  if (typeof line !== "string" || chars === 0) {
    throw new Error("entry must not be empty");
  }
  if (chars > 140) {
    throw new Error(`entry is ${chars} characters, over the 140 limit`);
  }
  if (line.trim() !== line) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${[...ENTRY].length} characters to ${outPath}`);
