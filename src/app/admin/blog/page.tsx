"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'moon-phases' | 'astrology' | 'rituals' | 'crystals' | 'meditation';
  read_time: string;
  image: string;
  image_url?: string;
  tags: string[];
  published: boolean;
  published_at?: string;
}

const categories = [
  { id: 'moon-phases', name: 'Moon Phases', icon: '🌙' },
  { id: 'astrology', name: 'Astrology', icon: '⭐' },
  { id: 'rituals', name: 'Rituals', icon: '🕯️' },
  { id: 'crystals', name: 'Crystals', icon: '💎' },
  { id: 'meditation', name: 'Meditation', icon: '🧘' }
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'moon-phases' as 'moon-phases' | 'astrology' | 'rituals' | 'crystals' | 'meditation',
    read_time: '5 min read',
    image: '🌕',
    image_url: '',
    tags: [] as string[],
    published: false
  });

  // Fetch blog posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog-posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingPost ? `/api/blog-posts/${editingPost.id}` : '/api/blog-posts';
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowForm(false);
        setEditingPost(null);
        resetForm();
        fetchPosts();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      read_time: post.read_time,
      image: post.image,
      image_url: post.image_url || '',
      tags: post.tags,
      published: post.published
    });
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const response = await fetch(`/api/blog-posts/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'moon-phases',
      read_time: '5 min read',
      image: '🌕',
      image_url: '',
      tags: [],
      published: false
    });
  };

  const addTag = () => {
    const tag = prompt('Enter a tag:');
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[#FFD700] font-bold">
            🌟 Blog Admin
          </h1>
          <div className="flex space-x-4">
            <a
              href="/admin/comments"
              className="bg-[#232946] text-[#FFD700] px-4 py-2 rounded-lg font-semibold hover:bg-[#191970] transition-colors border border-[#FFD700]/30"
            >
              💬 Manage Comments
            </a>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingPost(null);
                resetForm();
              }}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
            >
              ✨ New Post
            </button>
          </div>
        </div>

        {/* Blog Post Form */}
        {showForm && (
          <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20 mb-8">
            <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#FFD700] font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#FFD700] font-semibold mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#FFD700] font-semibold mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60 h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-[#FFD700] font-semibold mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60 h-48"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[#FFD700] font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#FFD700] font-semibold mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, read_time: e.target.value }))}
                    placeholder="e.g., 5 min read"
                    className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#FFD700] font-semibold mb-2">Image (Emoji)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="🌕"
                    className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#FFD700] font-semibold mb-2">Image URL (optional)</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg or /images/custom.svg"
                  className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] focus:outline-none focus:border-[#FFD700]/60"
                />
                <p className="text-xs text-[#C0C0C0]/60 mt-1">
                  Leave empty to use emoji icon only. Use relative paths like /images/custom.svg for local images.
                </p>
              </div>

              <div>
                <label className="block text-[#FFD700] font-semibold mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-[#FFD700]/20 text-[#FFD700] px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-[#FFD700] hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-[#232946]/60 border border-[#FFD700]/30 text-[#FFD700] px-4 py-2 rounded-lg hover:bg-[#232946]/80"
                >
                  + Add Tag
                </button>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-4 h-4 text-[#FFD700] bg-[#232946] border-[#FFD700]/30 rounded focus:ring-[#FFD700]/20"
                  />
                  <span className="text-[#C0C0C0]">Published</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPost(null);
                    resetForm();
                  }}
                  className="bg-[#232946]/60 border border-[#FFD700]/30 text-[#FFD700] px-6 py-3 rounded-lg hover:bg-[#232946]/80"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20">
          <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
            All Posts ({posts.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 animate-pulse">🌙</div>
              <p className="text-[#C0C0C0]">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-[#C0C0C0]">No posts yet. Create your first post!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <div
                  key={post.id}
                  className="bg-[#1b1b3a]/60 border border-[#FFD700]/20 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{post.image}</div>
                    <div>
                      <h3 className="text-[#FFD700] font-semibold">{post.title}</h3>
                      <p className="text-[#C0C0C0] text-sm">by {post.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 py-1 rounded">
                          {categories.find(cat => cat.id === post.category)?.name}
                        </span>
                        <span className="text-xs text-[#C0C0C0]">
                          {post.published ? '✅ Published' : '📝 Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-[#FFD700]/20 text-[#FFD700] px-3 py-1 rounded hover:bg-[#FFD700]/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 