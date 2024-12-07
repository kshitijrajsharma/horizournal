export type Image = {
    src: string;
    alt?: string;
};

export type Link = {
    href: string;
    text: string;
};

export type SocialLink = Link & {
    icon: 'codepen' | 'dev' | 'facebook' | 'github' | 'instagram' | 'linkedin' | 'medium' | 'mastodon';
};

export type Hero = {
    title?: string;
    text?: string;
    avatar?: Image;
    backgroundImage?: Image;
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    description: string;
    image?: Image;
    primaryNavLinks?: Link[];
    secondaryNavLinks?: Link[];
    socialLinks?: SocialLink[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
};

const siteConfig: SiteConfig = {
    logo: {
        src: '/logo.png',
        alt: 'Horizournal logo'
    },
    title: 'Horizournal',
    description: 'Personal Blogs and Thoughts',
    image: {
        src: '/earth.webp',
        alt: 'Horizournal - Personal Blogs and Thoughts'
    },
    primaryNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
    ],
    secondaryNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Terms of Service',
            href: '/terms'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
    ],
    socialLinks: [
        {
            text: 'Go to GitHub repo',
            href: 'https://github.com/kshitijrajsharma',
            icon: 'github'
        },
        {
            text: 'Follow on Linkedin',
            href: 'https://linkedin.com/in/kshitijrajsharma',
            icon: 'linkedin'
        },
        {
            text: 'Follow on Mastodon',
            href: 'https://mastodon.social/@kshitijrajsharma',
            icon: 'mastodon'
        },
        {
            text: 'Follow on Dev',
            href: 'https://dev.to/krschap',
            icon: 'dev'
        }

    ],
    hero: {
        title: 'Hi there!',
        text: "I'm Kshitij Raj Sharma, geospatial developer from the mountains of Nepal, now based in Austria. I’m a mapper and open-source advocate, passionate about promoting FOSS and empowering communities.",
        avatar: {
            src: '/avatar.jpg',
            alt: 'Kshitij Sharma'
        },
        backgroundImage: {
            src: '/earth.webp'
        }
    },
    subscribe: {
        title: 'Subscribe to My Newsletter',
        text: 'One update per month. All the latest news directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 5
};

export default siteConfig;
