import { Metadata } from 'next';

interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    // Fetch blog post data
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog-posts/${id}`);
    const data = await response.json();
    
    if (data.post) {
      const post = data.post;
      const imageUrl = post.image_url 
        ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${post.image_url}`
        : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/default-blog.svg`;
      
      return {
        title: `${post.title} - Celestial Calendar`,
        description: post.excerpt,
        keywords: post.tags.join(', '),
        authors: [{ name: post.author }],
        openGraph: {
          title: post.title,
          description: post.excerpt,
          url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${id}`,
          siteName: 'Celestial Calendar',
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
          locale: 'en_US',
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt,
          images: [imageUrl],
          creator: '@celestialcalendar',
        },
        other: {
          'article:published_time': post.published_at,
          'article:author': post.author,
          'article:section': post.category,
          'article:tag': post.tags.join(', '),
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  // Fallback metadata
  return {
    title: 'Cosmic Wisdom - Celestial Calendar',
    description: 'Discover mystical insights and spiritual practices for your cosmic journey.',
    openGraph: {
      title: 'Cosmic Wisdom - Celestial Calendar',
      description: 'Discover mystical insights and spiritual practices for your cosmic journey.',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${id}`,
      siteName: 'Celestial Calendar',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/default-blog.svg`,
          width: 1200,
          height: 630,
          alt: 'Celestial Calendar Blog',
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
  };
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children;
} 