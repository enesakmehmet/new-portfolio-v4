import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaYoutube, FaGlobe } from 'react-icons/fa';

const SocialMediaManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    platform: 'instagram',
    postUrl: '',
    imageUrl: '',
    content: '',
    likes: 0,
    comments: 0,
    isVisible: true
  });
  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const { platform, postUrl, imageUrl, content, likes, comments, isVisible } = formData;

  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return <FaInstagram className="text-pink-500" />;
      case 'twitter':
        return <FaTwitter className="text-blue-400" />;
      case 'linkedin':
        return <FaLinkedin className="text-blue-700" />;
      case 'github':
        return <FaGithub className="text-gray-800" />;
      case 'facebook':
        return <FaFacebook className="text-blue-600" />;
      case 'youtube':
        return <FaYoutube className="text-red-600" />;
      default:
        return <FaGlobe className="text-green-500" />;
    }
  };

  // Load all social media posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/social-media/all');
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Sosyal medya gönderileri yüklenemedi');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle form input changes
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox changes
  const onCheckboxChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // Handle image file selection
  const onFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      platform: 'instagram',
      postUrl: '',
      imageUrl: '',
      content: '',
      likes: 0,
      comments: 0,
      isVisible: true
    });
    setCurrentId(null);
    setIsEditing(false);
    setImageFile(null);
    setPreviewUrl('');
  };

  // Load post data for editing
  const onEdit = post => {
    setFormData({
      platform: post.platform,
      postUrl: post.postUrl,
      imageUrl: post.imageUrl,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      isVisible: post.isVisible
    });
    setCurrentId(post._id);
    setIsEditing(true);
    setPreviewUrl(post.imageUrl);
  };

  // Handle form submission
  const onSubmit = async e => {
    e.preventDefault();
    
    try {
      let finalImageUrl = imageUrl;
      
      // If there's a new image file, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        
        const uploadRes = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        finalImageUrl = uploadRes.data.fileUrl;
      }
      
      const postData = {
        ...formData,
        imageUrl: finalImageUrl
      };
      
      let res;
      
      if (isEditing) {
        // Update existing post
        res = await axios.put(`/api/social-media/${currentId}`, postData);
        
        // Update posts array
        setPosts(posts.map(post => 
          post._id === currentId ? res.data : post
        ));
        
        toast.success('Sosyal medya gönderisi güncellendi');
      } else {
        // Create new post
        res = await axios.post('/api/social-media', postData);
        
        // Add to posts array
        setPosts([res.data, ...posts]);
        
        toast.success('Sosyal medya gönderisi eklendi');
      }
      
      // Reset form
      resetForm();
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || 'Bir hata oluştu');
    }
  };

  // Delete a post
  const onDelete = async id => {
    if (window.confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`/api/social-media/${id}`);
        
        // Remove from posts array
        setPosts(posts.filter(post => post._id !== id));
        
        toast.success('Sosyal medya gönderisi silindi');
      } catch (err) {
        console.error(err);
        toast.error('Gönderi silinemedi');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Sosyal Medya Yönetimi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {isEditing ? 'Gönderiyi Düzenle' : 'Yeni Gönderi Ekle'}
          </h3>
          
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Platform</label>
              <select
                name="platform"
                value={platform}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="facebook">Facebook</option>
                <option value="youtube">YouTube</option>
                <option value="other">Diğer</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Gönderi URL</label>
              <input
                type="text"
                name="postUrl"
                value={postUrl}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Görsel</label>
              <input
                type="file"
                onChange={onFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}
              {!imageFile && isEditing && (
                <div className="mt-2">
                  <label className="block text-gray-700 mb-2">Mevcut Görsel URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">İçerik</label>
              <textarea
                name="content"
                value={content}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Gönderi içeriği..."
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Beğeni Sayısı</label>
                <input
                  type="number"
                  name="likes"
                  value={likes}
                  onChange={onChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Yorum Sayısı</label>
                <input
                  type="number"
                  name="comments"
                  value={comments}
                  onChange={onChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isVisible"
                  checked={isVisible}
                  onChange={onCheckboxChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Görünür</span>
              </label>
            </div>
            
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isEditing ? 'Güncelle' : 'Ekle'}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  İptal
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Posts List */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Sosyal Medya Gönderileri</h3>
          
          {loading ? (
            <div className="text-center py-4">Yükleniyor...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-4 bg-white rounded-lg shadow-md">
              Henüz sosyal medya gönderisi bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map(post => (
                <div
                  key={post._id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden ${!post.isVisible ? 'opacity-60' : ''}`}
                >
                  <div className="relative">
                    <img
                      src={post.imageUrl}
                      alt={post.content}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white p-2 rounded-full">
                      {getPlatformIcon(post.platform)}
                    </div>
                    {!post.isVisible && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Gizli
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-800 mb-2 line-clamp-3">{post.content}</p>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{post.likes} beğeni</span>
                      <span>{post.comments} yorum</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Gönderiye Git
                      </a>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(post)}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => onDelete(post._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaManager;
