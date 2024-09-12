// types.ts

// Describes the weather condition including the text, icon URL, and code
export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Day {
  maxtemp_f: number;
  mintemp_f: number;
  avgtemp_f: number;
  condition: Condition;
}

export interface ForecastDay {
  date: string;
  day: Day;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface Location {
  name: string;
  region: string;
  country: string;
}

export interface Current {
  temp_f: number;
  feelslike_f: number;
  condition: Condition;
}

export interface ForecastWeatherData {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export type RootStackParamList = {
  ScannerScreen: undefined;
  ProductDetail: { product: Product };
  FavoritesScreen: undefined;
  CurrentWeatherScreen: undefined;
  ForecastScreen: undefined;
};

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];  // This must match how you are using `images` in the product
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
}

export type ScannerStackParamList = {
  Scanner: undefined;
  ProductDetail: { product: Product };
};