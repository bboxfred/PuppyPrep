/**
 * CALLOUT — Field Journal margin note
 *
 * Tips and cautions are first-class typographic blocks — not toasts.
 * Tinted bg (ochreBg / criticalBg / terracottaBg / mossBg), 1px border in the
 * matching full tone, eyebrow uppercase label, optional italic serif lede.
 */
import { View, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Fonts } from '@/constants/design-system';
import { Text } from './Text';

type Tone = 'caution' | 'tip' | 'note' | 'success';

interface CalloutProps {
  tone?: Tone;
  label?: string;       // eyebrow text (e.g. "TIP", "CAUTION")
  lede?: string;        // italic serif first sentence
  children?: React.ReactNode;
}

const toneConfig: Record<Tone, { bg: string; border: string; label: string }> = {
  caution: { bg: Colors.criticalBg, border: Colors.critical, label: 'CAUTION' },
  tip:     { bg: Colors.ochreBg,    border: Colors.ochre,    label: 'TIP'     },
  note:    { bg: Colors.terracottaBg, border: Colors.terracotta, label: 'NOTE' },
  success: { bg: Colors.mossBg,     border: Colors.moss,     label: 'NOTED'   },
};

export function Callout({ tone = 'tip', label, lede, children }: CalloutProps) {
  const cfg = toneConfig[tone];

  return (
    <View style={[styles.block, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text color={cfg.border} style={styles.eyebrow}>
        {label ?? cfg.label}
      </Text>
      {lede ? <Text style={styles.lede}>{lede}</Text> : null}
      {children ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  eyebrow: {
    fontFamily: Fonts.bodyBold,
    fontSize: 10.5,
    letterSpacing: 2.0,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  lede: {
    fontFamily: Fonts.display, // Young Serif
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.ink,
    marginBottom: 6,
  },
  body: {
    marginTop: 4,
  },
});
