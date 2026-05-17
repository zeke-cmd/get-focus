import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { appSettings } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { getQuotesForSource, pickDailyQuote, type QuoteSource, type Quote } from '../../lib/quote-sources';

export function QuoteWidget() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    async function load() {
      let source: QuoteSource = 'gita'; // default
      const setting = await db
        .select()
        .from(appSettings)
        .where(eq(appSettings.key, 'quote_source'));
      if (setting.length > 0) {
        source = setting[0].value as QuoteSource;
      }

      const quotes = getQuotesForSource(source);
      if (quotes.length > 0) {
        setQuote(pickDailyQuote(quotes));
      }
    }
    load();
  }, []);

  if (!quote) return null;

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <Text style={[styles.quote, { color: colors.foreground, fontFamily: fonts.heading }]}>
        "{quote.text}"
      </Text>
      <Text style={[styles.reference, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
        — {quote.reference}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 0,
    padding: 20,
    gap: 12,
  },
  quote: {
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'italic',
    lineHeight: 28,
    textTransform: 'lowercase',
  },
  reference: {
    fontSize: 12,
    textTransform: 'lowercase',
    fontStyle: 'normal',
  },
});
