export interface Food {
  id: string;
  name: string;
  price?: number | undefined;
  restaurant?: string | undefined;
  user_id: string;
  category_id: string;
}
