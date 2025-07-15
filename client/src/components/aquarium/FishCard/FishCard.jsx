import React, { useState } from 'react';
import { Gem, Plus, Heart } from 'lucide-react';
import { styles } from './fishcard-styles';

const FishCard = ({ fish, onClick, showPrice = false, fishImage, isOwned = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const rarityColors = {
        common: { bg: '#e5e7eb', border: '#9ca3af', glow: 'rgba(156, 163, 175, 0.3)' },
        rare: { bg: '#dbeafe', border: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)' },
        epic: { bg: '#e9d5ff', border: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.3)' },
        legendary: { bg: '#fef3c7', border: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' }
    };

    const currentRarity = rarityColors[fish.rarity] || rarityColors.common;

    return (
        <div
            style={{
                ...styles.card,
                boxShadow: isHovered
                    ? `0 8px 24px ${currentRarity.glow}, inset 0 0 0 2px ${currentRarity.border}`
                    : styles.card.boxShadow,
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 희귀도 표시 */}
            <div style={{
                ...styles.rarityBadge,
                background: currentRarity.bg,
                color: currentRarity.border
            }}>
                {fish.rarity}
            </div>

            {/* 좋아요 버튼 (소유한 물고기만) */}
            {isOwned && (
                <button
                    style={styles.likeButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                    }}
                >
                    <Heart
                        style={{
                            width: '16px',
                            height: '16px',
                            fill: isLiked ? '#ef4444' : 'none',
                            color: '#ef4444'
                        }}
                    />
                </button>
            )}

            {/* 물고기 이미지 */}
            <div style={styles.imageContainer}>
                <div style={{
                    ...styles.imageBackground,
                    background: `linear-gradient(135deg, ${currentRarity.bg} 0%, white 100%)`
                }}>
                    <img
                        style={styles.fishImage}
                        alt={fish.name}
                        src={fishImage || "/default-fish.png"}
                    />
                </div>
            </div>

            {/* 물고기 정보 */}
            <div style={styles.infoSection}>
                <h4 style={styles.fishName}>{fish.name}</h4>
                <p style={styles.fishSpecies}>{fish.species}</p>

                {fish.level && (
                    <div style={styles.levelBadge}>
                        Lv.{fish.level}
                    </div>
                )}
            </div>

            {/* 액션 버튼 */}
            <button
                style={{
                    ...styles.actionButton,
                    background: showPrice
                        ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                        : 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)'
                }}
                onClick={() => onClick && onClick(fish)}
            >
                {showPrice ? (
                    <div style={styles.priceContent}>
                        <Gem style={{ width: '16px', height: '16px', color: '#92400e' }} />
                        <span style={styles.priceText}>{fish.price.toLocaleString()}</span>
                    </div>
                ) : (
                    <div style={styles.addContent}>
                        <Plus style={{ width: '16px', height: '16px', color: '#1e40af' }} />
                        <span style={styles.addText}>추가하기</span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default FishCard;
