import { Author } from "./author";
import { Category } from "./category";
import { Tag } from "./tag";

export class Post {
    constructor(
        private slug: string,
        private url: string,
        private published: Date,
        private created: string,
        private status: string,
        private title: string,
        private body: string,
        private summary: string,
        private seo_title: string,
        private meta_description: string,
        private author: Author,
        private categories: Category[],
        private tags: Tag[],
        private featured_image: string
    ) {}
}