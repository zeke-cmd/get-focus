export interface Quote {
  text: string;
  reference: string;
}

export type QuoteSource = 'gita' | 'stoic' | 'none';

export const GITA_QUOTES: Quote[] = [
  { text: "you have a right to perform your prescribed duty, but not to the fruits of action.", reference: "bhagavad gita 2.47" },
  { text: "the mind is restless and difficult to restrain, but it is subdued by practice.", reference: "bhagavad gita 6.35" },
  { text: "a person can rise through the efforts of his own mind; or draw himself down, in the same manner.", reference: "bhagavad gita 6.5" },
  { text: "when meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", reference: "bhagavad gita 6.19" },
  { text: "the self-controlled soul, who moves amongst sense objects, free from attachment and aversion, attains peace.", reference: "bhagavad gita 2.64" },
  { text: "better is one's own duty, though imperfectly performed, than the duty of another well performed.", reference: "bhagavad gita 3.35" },
  { text: "the wise sees knowledge and action as one; they see truly.", reference: "bhagavad gita 4.18" },
  { text: "whatever you do, whatever you eat, whatever you offer in sacrifice, give that as an offering.", reference: "bhagavad gita 9.27" },
  { text: "those who are free from anger and all material desires achieve self-realization.", reference: "bhagavad gita 5.26" },
  { text: "the mind acts like an enemy for those who do not control it.", reference: "bhagavad gita 6.6" },
  { text: "one who sees the same lord dwelling in all beings never harms himself or others.", reference: "bhagavad gita 13.28" },
  { text: "abandon all attachment to the results of action and attain supreme peace.", reference: "bhagavad gita 12.12" },
  { text: "perform your obligatory duty, because action is indeed better than inaction.", reference: "bhagavad gita 3.8" },
  { text: "the happiness which comes from long practice, which leads to the end of suffering, is like poison at first but nectar at the end.", reference: "bhagavad gita 18.37" },
  { text: "set thy heart upon thy work, but never on its reward.", reference: "bhagavad gita 2.47" },
  { text: "a gift is pure when it is given from the heart to the right person at the right time and at the right place.", reference: "bhagavad gita 17.20" },
  { text: "man is made by his belief. as he believes, so he is.", reference: "bhagavad gita 17.3" },
  { text: "those who surrender to god all selfish attachments are like the leaf of a lotus floating clean and dry in water.", reference: "bhagavad gita 5.10" },
  { text: "the wise work for the welfare of the world, without thought for themselves.", reference: "bhagavad gita 3.25" },
  { text: "change is the law of the universe.", reference: "bhagavad gita 2.14" },
  { text: "the key to happiness is the reduction of desires.", reference: "bhagavad gita 2.70" },
  { text: "there is neither this world nor the world beyond nor happiness for the one who doubts.", reference: "bhagavad gita 4.40" },
  { text: "whatever happened, happened for the good. whatever is happening, is happening for the good.", reference: "bhagavad gita" },
  { text: "no one who does good work will ever come to a bad end, either here or in the world to come.", reference: "bhagavad gita 6.40" },
  { text: "lust, anger and greed — these three are the gateways to self-destruction.", reference: "bhagavad gita 16.21" },
  { text: "for the soul there is neither birth nor death nor any change.", reference: "bhagavad gita 2.20" },
  { text: "the supreme goal of life is to know the true self and realize one's divine nature.", reference: "bhagavad gita 7.3" },
  { text: "yoga is a light, which once lit will never dim.", reference: "bhagavad gita 6.19" },
  { text: "the power of god is with you at all times; through the activities of mind, senses, breathing, and emotions.", reference: "bhagavad gita 15.15" },
  { text: "the soul can never be cut to pieces by any weapon, nor burned by fire.", reference: "bhagavad gita 2.23" },
];

export const STOIC_QUOTES: Quote[] = [
  { text: "you have power over your mind — not outside events. realize this, and you will find strength.", reference: "marcus aurelius" },
  { text: "the happiness of your life depends upon the quality of your thoughts.", reference: "marcus aurelius" },
  { text: "waste no more time arguing what a good man should be. be one.", reference: "marcus aurelius" },
  { text: "if it is not right, do not do it; if it is not true, do not say it.", reference: "marcus aurelius" },
  { text: "confine yourself to the present.", reference: "marcus aurelius" },
  { text: "the impediment to action advances action. what stands in the way becomes the way.", reference: "marcus aurelius" },
  { text: "we suffer more often in imagination than in reality.", reference: "seneca" },
  { text: "luck is what happens when preparation meets opportunity.", reference: "seneca" },
  { text: "it is not that we have a short time to live, but that we waste a lot of it.", reference: "seneca" },
  { text: "begin at once to live, and count each separate day as a separate life.", reference: "seneca" },
  { text: "difficulties strengthen the mind, as labor does the body.", reference: "seneca" },
  { text: "while we wait for life, life passes.", reference: "seneca" },
  { text: "it is not what happens to you, but how you react to it that matters.", reference: "epictetus" },
  { text: "no man is free who is not master of himself.", reference: "epictetus" },
  { text: "first say to yourself what you would be; and then do what you have to do.", reference: "epictetus" },
  { text: "wealth consists not in having great possessions, but in having few wants.", reference: "epictetus" },
  { text: "he who laughs at himself never runs out of things to laugh at.", reference: "epictetus" },
  { text: "freedom is the only worthy goal in life. it is won by disregarding things that lie beyond our control.", reference: "epictetus" },
  { text: "don't explain your philosophy. embody it.", reference: "epictetus" },
  { text: "every new beginning comes from some other beginning's end.", reference: "seneca" },
  { text: "man conquers the world by conquering himself.", reference: "zeno of citium" },
  { text: "the whole future lies in uncertainty: live immediately.", reference: "seneca" },
  { text: "he suffers more than necessary, who suffers before it is necessary.", reference: "seneca" },
  { text: "to bear trials with a calm mind robs misfortune of its strength and burden.", reference: "seneca" },
  { text: "the best revenge is to be unlike him who performed the injury.", reference: "marcus aurelius" },
  { text: "accept the things to which fate binds you, and love the people with whom fate brings you together.", reference: "marcus aurelius" },
  { text: "very little is needed to make a happy life; it is all within yourself, in your way of thinking.", reference: "marcus aurelius" },
  { text: "dwell on the beauty of life. watch the stars, and see yourself running with them.", reference: "marcus aurelius" },
  { text: "how ridiculous and how strange to be surprised at anything which happens in life.", reference: "marcus aurelius" },
  { text: "we are more often frightened than hurt; and we suffer more in imagination than reality.", reference: "seneca" },
];

export function pickDailyQuote(quotes: Quote[]): Quote {
  if (quotes.length === 0) return { text: '', reference: '' };
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return quotes[dayOfYear % quotes.length];
}

export function getQuotesForSource(source: QuoteSource): Quote[] {
  switch (source) {
    case 'gita': return GITA_QUOTES;
    case 'stoic': return STOIC_QUOTES;
    case 'none':
    default: return [];
  }
}
