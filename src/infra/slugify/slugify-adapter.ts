import { Slug } from '../../data/protocols/remodulate/slug'
import slug from 'slug'

export class SlugIfyadapter implements Slug {
    transform(value: string): string {
        return slug(value, '-')
    }
}
