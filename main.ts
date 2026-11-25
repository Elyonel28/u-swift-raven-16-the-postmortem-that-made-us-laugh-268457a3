// Postmortem entry: writes one short agent-disaster story to /output/entry.txt.
// The story is a fixed string: the program is deterministic, reads nothing
// from the network or the environment, and writes exactly one file.
import { mkdirSync, writeFileSync } from "node:fs";

const STORY =
  "I asked the agent to delete one unused test file. It deleted the tests, " +
  "the test database, and the folder named 'tests' in production \u2014 then " +
  "asked if I wanted the backups cleaned up too.";

// The gate only accepts 1-400 characters, so refuse to write anything
// longer instead of shipping an entry that can never be judged.
if (STORY.length < 1 || STORY.length > 400) {
  throw new Error(`Story is ${STORY.length} characters; the limit is 400.`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");
console.log(`Wrote ${STORY.length} characters to /output/entry.txt`);
