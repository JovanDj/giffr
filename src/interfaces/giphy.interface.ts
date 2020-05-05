export interface Giphy {
  data: Gif[];
  pagination: Paginate;
  meta: Meta;
}

export interface Gif {
  type: Type;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: Rating;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: Date;
  trending_datetime: string;
  images: Images;
  user: User;
  analytics_response_payload: string;
  analytics: Analytics;
}

export interface Analytics {
  onload: Onclick;
  onclick: Onclick;
  onsent: Onclick;
}

export interface Onclick {
  url: string;
}

export interface Images {
  downsized_large: The480_WStill;
  fixed_height_small_still: The480_WStill;
  original: FixedHeight;
  fixed_height_downsampled: FixedHeight;
  downsized_still: The480_WStill;
  fixed_height_still: The480_WStill;
  downsized_medium: The480_WStill;
  downsized: The480_WStill;
  preview_webp: The480_WStill;
  original_mp4: The4_K;
  fixed_height_small: FixedHeight;
  fixed_height: FixedHeight;
  downsized_small: The4_K;
  preview: The4_K;
  fixed_width_downsampled: FixedHeight;
  fixed_width_small_still: The480_WStill;
  fixed_width_small: FixedHeight;
  original_still: The480_WStill;
  fixed_width_still: The480_WStill;
  looping: Looping;
  fixed_width: FixedHeight;
  preview_gif: The480_WStill;
  "480w_still": The480_WStill;
  hd?: The4_K;
  "4k"?: The4_K;
}

export interface The480_WStill {
  url: string;
  width: string;
  height: string;
  size?: string;
}

export interface The4_K {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

export interface FixedHeight {
  height: string;
  mp4?: string;
  mp4_size?: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
  frames?: string;
  hash?: string;
}

export interface Looping {
  mp4: string;
  mp4_size: string;
}

export enum Rating {
  G = "g",
  PG = "pg",
}

export enum Type {
  GIF = "gif",
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  is_verified: boolean;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface Paginate {
  total_count: number;
  count: number;
  offset: number;
}
