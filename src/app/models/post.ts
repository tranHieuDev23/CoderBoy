import { Author } from "./author";
import { Category } from "./category";
import { Tag } from "./tag";

export class Post {
    constructor(
        public slug: string,
        public url: string,
        public published: Date,
        public created: string,
        public status: string,
        public title: string,
        public body: string,
        public summary: string,
        public seo_title: string,
        public meta_description: string,
        public author: Author,
        public categories: Category[],
        public tags: Tag[],
        public featured_image: string
    ) {}
}