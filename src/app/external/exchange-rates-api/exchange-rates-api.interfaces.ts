export interface GetHistoricalExchangeRatesResponse {
  success: boolean;
  historical: true;
  base: ExtEchangeRatesCurrency;
  date: string;
  rates: Partial<Record<ExtEchangeRatesCurrency, number>>;
}

export enum ExtEchangeRatesCurrency {
  USD = 'USD',
  EUR = 'EUR',
}
