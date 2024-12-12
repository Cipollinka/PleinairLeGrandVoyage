export interface UserAccount {
  id: number;
  username: string;
  password: string;
}

export enum CampingItems {
  SleepingBag = 'sleeping_bag',
  Tent = 'tent',
  HikingBoots = 'hiking_boots',
  CompassAndMap = 'compass_and_map',
  FirstAidKit = 'first_aid_kit',
  CampingStoveWithGas = 'camping_stove_with_gas',
  BottledWater = 'bottled_water',
  WarmClothes = 'warm_clothes',
  Flashlight = 'flashlight',
  Sunscreen = 'sunscreen',
  Book = 'book',
  ThermosWithHotTea = 'thermos_with_hot_tea',
  BowlAndSpoon = 'bowl_and_spoon',
  Sunglasses = 'sunglasses',
  FishingRod = 'fishing_rod',
  FireStarters = 'fire_starters',
  Backpack = 'backpack',
  PocketKnife = 'pocket_knife',
  BoardGame = 'board_game',
  LargeFoodPack = 'large_food_pack',
  HandWarmers = 'hand_warmers',
  Gloves = 'gloves',
  Hat = 'hat',
  Swimwear = 'swimwear',
  HikingPoles = 'hiking_poles',
  TrashBag = 'trash_bag',
  Speaker = 'speaker',
  WinterTent = 'winter_tent',
  Skis = 'skis',

  PortableGrill = 'portable_grill',
  Hammock = 'hammock',
  Blanket = 'blanket',
  PortableFridge = 'portable_fridge',
  Snacks = 'snacks',
  BikeHelmet = 'bike_helmet',
  BikePump = 'bike_pump',
  EnergyBar = 'energy_bar',
  Toys = 'toys',
  BeachTowel = 'beach_towel',
  Raincoat = 'raincoat',
  WaterproofTent = 'waterproof_tent',
  Map = 'map',

  Towel = 'towel',
  InternationalCharger = 'international_charger',
  Guitar = 'guitar',
  KidsPlaysets = 'kids_playsets',
  BeachHat = 'beach_hat',
  WinterJacket = 'winter_jacket',
  Compass = 'compass',
}

export const ITEMS_IMAGES: Record<CampingItems, any> = {
  [CampingItems.SleepingBag]: require('@/assets/images/items/sleaping-bag.webp'),
  [CampingItems.Tent]: require('@/assets/images/items/tent.png'),
  [CampingItems.HikingBoots]: require('@/assets/images/items/boots.webp'),
  [CampingItems.CompassAndMap]: require('@/assets/images/items/compass.webp'),
  [CampingItems.Compass]: require('@/assets/images/items/compass.webp'),
  [CampingItems.FirstAidKit]: require('@/assets/images/items/first-aid.webp'),
  [CampingItems.CampingStoveWithGas]: require('@/assets/images/items/camping-stolve.webp'),
  [CampingItems.BottledWater]: require('@/assets/images/items/water.webp'),
  [CampingItems.WarmClothes]: require('@/assets/images/items/windbreaker.webp'),
  [CampingItems.Flashlight]: require('@/assets/images/items/flashlight.webp'),
  [CampingItems.Sunscreen]: require('@/assets/images/items/sun-cream.webp'),

  [CampingItems.Book]: require('@/assets/images/items/book.png'),
  [CampingItems.ThermosWithHotTea]: require('@/assets/images/items/thermos.webp'),
  [CampingItems.BowlAndSpoon]: require('@/assets/images/items/bowl.webp'),
  [CampingItems.Sunglasses]: require('@/assets/images/items/sunglasses.webp'),
  [CampingItems.FishingRod]: require('@/assets/images/items/fishing.webp'),
  [CampingItems.FireStarters]: require('@/assets/images/items/fire-starter.png'),
  [CampingItems.Backpack]: require('@/assets/images/items/backpack.png'),
  [CampingItems.PocketKnife]: require('@/assets/images/items/pocket_knife.png'),
  [CampingItems.BoardGame]: require('@/assets/images/items/board_game.png'),
  [CampingItems.LargeFoodPack]: require('@/assets/images/items/food.webp'),

  [CampingItems.PortableGrill]: require('@/assets/images/items/portable_grill.webp'),

  [CampingItems.Hammock]: require('@/assets/images/items/hamak.png'),
  [CampingItems.Blanket]: require('@/assets/images/items/coat.png'),
  [CampingItems.PortableFridge]: require('@/assets/images/items/fridge.png'),
  [CampingItems.Snacks]: require('@/assets/images/items/snack.webp'),
  [CampingItems.BikeHelmet]: require('@/assets/images/items/helmet.png'),
  [CampingItems.BikePump]: require('@/assets/images/items/pump.webp'),
  [CampingItems.EnergyBar]: require('@/assets/images/items/energy-bar.png'),
  [CampingItems.Toys]: require('@/assets/images/items/toy.webp'),
  [CampingItems.BeachTowel]: require('@/assets/images/items/towel.png'),
  [CampingItems.Raincoat]: require('@/assets/images/items/raincoat.png'),
  [CampingItems.WaterproofTent]: require('@/assets/images/items/tent.png'),
  [CampingItems.Map]: require('@/assets/images/items/map.webp'),
  [CampingItems.Towel]: require('@/assets/images/items/towel.png'),

  [CampingItems.InternationalCharger]: require('@/assets/images/items/international_charger.webp'),
  [CampingItems.Guitar]: require('@/assets/images/items/guitar.webp'),
  [CampingItems.KidsPlaysets]: require('@/assets/images/items/kids_playsets.png'),
  [CampingItems.BeachHat]: require('@/assets/images/items/beach_hat.png'),
  [CampingItems.WinterJacket]: require('@/assets/images/items/winter_jacket.png'),

  [CampingItems.HandWarmers]: require('@/assets/images/items/hand_warmers.png'),

  [CampingItems.Gloves]: require('@/assets/images/items/gloves.png'),
  [CampingItems.Hat]: require('@/assets/images/items/beach_hat.png'),
  [CampingItems.Swimwear]: require('@/assets/images/items/underwater.webp'),
  [CampingItems.HikingPoles]: require('@/assets/images/items/hiking_poles.png'),
  [CampingItems.TrashBag]: require('@/assets/images/items/trashbag.png'),
  [CampingItems.Speaker]: require('@/assets/images/items/speakers.webp'),
  [CampingItems.WinterTent]: require('@/assets/images/items/tent.png'),
  [CampingItems.Skis]: require('@/assets/images/items/skis.png'),
};

export interface Article {
  title: string;
  descriptionShort: string;
  descriptionLong: string;
  image: string;
  id: number;
}

export interface Place {
  id: number;
  name: string;
  region: string;
  image: string;
  rating: string;
  interesting_fact: string;
  description: string;
  famous_for: string;
  position: {top: number | string; left: number | string};
}

export enum PlanningTripKeys {
  HISTORY = 'history_and_architecture',
  GASTRONOMIC = 'gastronomic_tours',
  NATURAL = 'natural_landscapes',
  CULTURE = 'culture',
  RECREATION = 'active_recreation',
}

export interface Trip {
  id: number;
  name: string;
  location: string;
  description: string;
  highlights: string[] | Highlight[];
  image: string;
}

export interface Highlight {
  name: string;
  features: string[];
  activities?: string[];
}

export interface JournalNotes {
  id: number;
  image: string;
  description: string;
}

export interface Quiz {
  question: string;
  options: {
    answer: string;
    isCorrect: boolean;
  }[];
}

export interface DailyGame {
  id: number;
  task: string;
  itemsToCollectCount: number;
  allItems: CampingItems[];
  perfectItems: CampingItems[];
  goodItems: CampingItems[];
  wrongItems: CampingItems[];
}
