export function getRequiredFaqAnalyticsId(ids: readonly string[], index: number, scope: string) {
  const faqId = ids[index];

  if (!faqId) {
    throw new Error(`Missing FAQ analytics id for ${scope} FAQ item ${index + 1}.`);
  }

  return faqId;
}

export function normalizeFaqAnalyticsId(value: string) {
  return value.replace(/_/g, '-');
}
