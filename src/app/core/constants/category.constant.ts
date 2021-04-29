import { environment } from 'src/environments/environment';

// URLs
const baseUrl = environment.apiUrl;
export const URL_GET_CATEGORIES = `${baseUrl}/Category`;

// Models
export class Category {
  id: number;
  categoryName: string;
}
