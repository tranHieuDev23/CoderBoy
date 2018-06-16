export class Author {
    constructor (
        private slug: string,
        private first_name: string,
        private last_name: string,
        private email: string,
        private bio: string,
        private title: string,
        private linkedin_url: string,
        private facebook_url: string,
        private pinterest_url: string,
        private instagram_url: string,
        private twitter_handle: string,
        private profile_image: string
    ) {}
}