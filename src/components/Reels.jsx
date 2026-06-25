import React, { useState, useRef, useEffect } from 'react';
import { Heart, Share2, MessageCircle, Volume2, VolumeX, Eye } from 'lucide-react';
import './Reels.css';

const REELS_DATA = [
  {
    id: 1,
    title: 'Luxury Villa Tour in Thrissur',
    location: 'Victoria Tanima, Thrissur',
    price: '₹75 Lakhs',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-home-with-swimming-pool-and-garden-40241-large.mp4',
    likes: 342,
    views: '1.2k',
    description: 'Experience pure elegance in our traditional-modern fusion villas. 3 & 4 BHK units starting from 75L.'
  },
  {
    id: 2,
    title: 'Modern Apartment Living',
    location: 'Victoria Ushas, Palakkad',
    price: '₹55 Lakhs',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-apartment-40245-large.mp4',
    likes: 219,
    views: '940',
    description: 'Breathtaking views, premium fixtures, and a lush green gated environment. Ready to occupy.'
  },
  {
    id: 3,
    title: 'Beautiful Living Room Aesthetics',
    location: 'Victoria Ashirvaad, Ottapalam',
    price: '₹68 Lakhs',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-interior-40243-large.mp4',
    likes: 512,
    views: '2.1k',
    description: 'Natural light, spacious layouts, and traditional Kerala design touches. Your sanctuary awaits.'
  }
];

export default function Reels() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState({});
  const [copied, setCopied] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Play the first video on mount
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, []);

  const handleVideoClick = (idx) => {
    const video = videoRefs.current[idx];
    if (video) {
      if (video.paused) {
        video.play().catch(err => console.log(err));
      } else {
        video.pause();
      }
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPos = container.scrollTop;
    const height = container.clientHeight;
    const newIdx = Math.round(scrollPos / height);

    if (newIdx !== currentIdx && newIdx >= 0 && newIdx < REELS_DATA.length) {
      // Pause previous video
      if (videoRefs.current[currentIdx]) {
        videoRefs.current[currentIdx].pause();
      }
      
      // Play new video
      setCurrentIdx(newIdx);
      if (videoRefs.current[newIdx]) {
        videoRefs.current[newIdx].currentTime = 0;
        videoRefs.current[newIdx].play().catch(err => console.log(err));
      }
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach(v => {
      if (v) v.muted = !muted;
    });
  };

  const toggleLike = (id) => {
    const isNowLiked = !liked[id];
    setLiked(prev => ({
      ...prev,
      [id]: isNowLiked
    }));

    const reel = REELS_DATA.find(r => r.id === id);
    if (reel && isNowLiked) {
      import('../utils/tracking').then(({ trackEvent }) => {
        trackEvent('like_reel', {
          reelId: id,
          title: reel.title,
          location: reel.location,
          price: reel.price
        });
      });
    }
  };

  const handleShare = (reel) => {
    navigator.clipboard.writeText(`${window.location.origin}/#reels?id=${reel.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    import('../utils/tracking').then(({ trackEvent }) => {
      trackEvent('share_reel', {
        reelId: reel.id,
        title: reel.title
      });
    });
  };

  const handleWhatsAppEnquiry = (reel) => {
    const text = `Hi Victoria Realtors, I saw your Reel: "${reel.title}" (${reel.location}) for ${reel.price} on the website and would like to get more information.`;
    window.open(`https://wa.me/919159165893?text=${encodeURIComponent(text)}`, '_blank');

    import('../utils/tracking').then(({ trackEvent }) => {
      trackEvent('contact_form_submit', {
        source: 'Reels WA Click',
        projectName: reel.title,
        location: reel.location
      });
    });
  };

  return (
    <div className="reels-page">
      <div className="reels-header container">
        <span className="reels-subtitle font-accent">Reels on Web</span>
        <h2 className="reels-title">Experience Victoria Properties</h2>
        <p className="reels-desc">Swipe through short-form vertical tours of our signature projects.</p>
      </div>

      <div className="reels-container" onScroll={handleScroll}>
        {REELS_DATA.map((reel, idx) => {
          const isLiked = liked[reel.id];
          return (
            <div key={reel.id} className="reel-card glass-card">
              {/* Vertical Video Element */}
              <div className="video-wrapper" onClick={() => handleVideoClick(idx)}>
                <video
                  ref={el => videoRefs.current[idx] = el}
                  className="reel-video"
                  src={reel.videoUrl}
                  loop
                  muted={muted}
                  playsInline
                />
                
                {/* Overlay Mute Toggle */}
                <button className="mute-btn" onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {/* Sidebar Action Buttons */}
              <div className="reel-actions">
                <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(reel.id)}>
                  <Heart fill={isLiked ? 'var(--primary)' : 'none'} size={24} />
                  <span>{isLiked ? reel.likes + 1 : reel.likes}</span>
                </button>
                
                <button className="action-btn" onClick={() => handleWhatsAppEnquiry(reel)}>
                  <MessageCircle size={24} />
                  <span>Ask</span>
                </button>

                <button className="action-btn" onClick={() => handleShare(reel)}>
                  <Share2 size={24} />
                  <span>Share</span>
                </button>
              </div>

              {/* Bottom Info Details */}
              <div className="reel-details">
                <div className="details-header">
                  <h3 className="reel-details-title">{reel.title}</h3>
                  <span className="reel-badge">{reel.price}</span>
                </div>
                <p className="reel-location">{reel.location}</p>
                <p className="reel-description">{reel.description}</p>
                <div className="reel-views">
                  <Eye size={12} style={{ marginRight: '4px' }} />
                  {reel.views} Views
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {copied && (
        <div className="share-toast">
          Reel link copied to clipboard!
        </div>
      )}
    </div>
  );
}
