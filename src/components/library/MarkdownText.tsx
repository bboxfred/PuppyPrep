/**
 * MARKDOWN TEXT — minimal markdown renderer for library articles.
 *
 * Handles the subset of markdown we actually use in the library:
 *   - `## Heading` → section heading
 *   - `**bold**` → bold inline
 *   - `*italic*` → italic inline (single asterisk)
 *   - `---` on its own line → horizontal rule
 *   - `• ` or `- ` at line start → bullet list item (indented)
 *   - `1. ` / `2. ` at line start → numbered list item
 *   - Blank line → paragraph break
 *
 * Why custom: React Native Text has no built-in markdown. A full markdown
 * library (`react-native-markdown-display`) pulls in ~50KB plus parser deps.
 * For our limited subset, a 60-line walker is simpler and stays inside the
 * design system.
 */
import { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Fonts } from '@/constants/design-system';

interface MarkdownTextProps {
  source: string;
}

// Parse a line of text into an array of {text, bold, italic} segments.
// Walks the string, picks up **…** and *…* runs.
type Segment = { text: string; bold?: boolean; italic?: boolean };
function parseInline(input: string): Segment[] {
  const out: Segment[] = [];
  let i = 0;
  let cursor = '';
  const flush = (extra: Partial<Segment> = {}) => {
    if (cursor) {
      out.push({ text: cursor, ...extra });
      cursor = '';
    }
  };
  while (i < input.length) {
    // **bold** — greedy match
    if (input[i] === '*' && input[i + 1] === '*') {
      const end = input.indexOf('**', i + 2);
      if (end > i) {
        flush();
        out.push({ text: input.slice(i + 2, end), bold: true });
        i = end + 2;
        continue;
      }
    }
    // *italic* — single asterisk
    if (input[i] === '*') {
      const end = input.indexOf('*', i + 1);
      if (end > i) {
        flush();
        out.push({ text: input.slice(i + 1, end), italic: true });
        i = end + 1;
        continue;
      }
    }
    cursor += input[i];
    i++;
  }
  flush();
  return out;
}

function InlineText({ segments, style }: { segments: Segment[]; style?: any }) {
  return (
    <Text style={style}>
      {segments.map((s, i) => {
        const segStyle: any = {};
        if (s.bold) {
          segStyle.fontFamily = Fonts.bodyBold;
          segStyle.fontWeight = '700';
        }
        if (s.italic) segStyle.fontStyle = 'italic';
        return (
          <Text key={i} style={segStyle}>
            {s.text}
          </Text>
        );
      })}
    </Text>
  );
}

export function MarkdownText({ source }: MarkdownTextProps) {
  // Split into "blocks" separated by blank lines so each paragraph is its own
  // Text element. Within a block, single \n is preserved so lists render
  // correctly.
  const blocks = source.split(/\n{2,}/);

  return (
    <View>
      {blocks.map((block, blockIdx) => {
        const trimmed = block.trim();

        // Horizontal rule
        if (/^-{3,}$/.test(trimmed)) {
          return <View key={blockIdx} style={styles.hr} />;
        }

        // Heading — `## ...`
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.slice(3);
          return (
            <InlineText
              key={blockIdx}
              segments={parseInline(headingText)}
              style={styles.h2}
            />
          );
        }

        // Single-line heading — `# ...` (we don't use these but handle gracefully)
        if (trimmed.startsWith('# ')) {
          return (
            <InlineText
              key={blockIdx}
              segments={parseInline(trimmed.slice(2))}
              style={styles.h1}
            />
          );
        }

        // Multi-line block — could be a list, a paragraph with line breaks,
        // or a mix. Walk line-by-line.
        const lines = block.split('\n');
        const isList = lines.every(
          l => /^\s*(?:[•\-]|\d+\.)\s+/.test(l) || l.trim() === ''
        );

        if (isList) {
          return (
            <View key={blockIdx} style={styles.list}>
              {lines
                .filter(l => l.trim() !== '')
                .map((line, i) => {
                  const match = line.match(/^\s*(?:([•\-])|(\d+)\.)\s+(.*)$/);
                  if (!match) return null;
                  const bullet = match[1] ? '•' : `${match[2]}.`;
                  const body = match[3];
                  return (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>{bullet}</Text>
                      <InlineText
                        segments={parseInline(body)}
                        style={styles.listItemText}
                      />
                    </View>
                  );
                })}
            </View>
          );
        }

        // Paragraph with possibly multiple lines — join with a space so single
        // \n inside a paragraph doesn't force a hard break.
        const paragraphText = lines.map(l => l.trim()).filter(Boolean).join(' ');
        return (
          <InlineText
            key={blockIdx}
            segments={parseInline(paragraphText)}
            style={styles.paragraph}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: Fonts.display,
    fontSize: 26,
    lineHeight: 32,
    color: Colors.ink,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  h2: {
    fontFamily: Fonts.display,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.ink,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  paragraph: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  hr: {
    height: 1,
    backgroundColor: Colors.rule,
    marginVertical: Spacing.lg,
    opacity: 0.5,
  },
  list: {
    marginBottom: Spacing.md,
    gap: 6,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  bullet: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.inkSoft,
    width: 20,
    flexShrink: 0,
  },
  listItemText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.ink,
  },
});
