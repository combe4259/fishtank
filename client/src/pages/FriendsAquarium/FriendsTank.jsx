import React from 'react';
import { styles } from '../Myaquarium/MyAquarium-styles.js';

const FriendsTank = ({ fishes = [], decorations = [] }) => {
  // 어항에 실제 배치된 물고기·장식만 골라냄
  const aquariumFishes = fishes.filter(f => f.is_in_aquarium);
  const aquariumDecorations = decorations.filter(d => d.is_placed);

  // 물고기 위치 계산
  const getFishPosition = (index) => {
    const positions = [
      { top: 20, left: 15 }, { top: 40, left: 45 },
      { top: 25, left: 75 }, { top: 55, left: 25 },
      { top: 35, left: 55 }, { top: 60, left: 10 },
      { top: 15, left: 65 }, { top: 45, left: 35 },
      { top: 30, left: 80 }, { top: 50, left: 60 },
    ];
    return positions[index] || {
      top: 20 + Math.random() * 40,
      left: 10 + Math.random() * 70,
    };
  };

  // 장식품 위치 계산
  const getDecorationPosition = (index) => {
    const positions = [
      { top: 70, left: 20 },
      { top: 75, left: 50 },
      { top: 80, left: 15 },
      { top: 65, left: 75 },
      { top: 70, left: 40 },
    ];
    return positions[index] || {
      top: 65 + Math.random() * 15,
      left: 15 + Math.random() * 60,
    };
  };

  return (
    <div style={styles.aquariumWrapper}>
      <div style={styles.aquariumContainer}>
        <div style={styles.aquariumOverlay} />
        <div style={styles.waterEffect} />
        <div style={styles.fishContainer}>
          {aquariumFishes.map((fish, i) => {
            const pos = getFishPosition(i);
            return (
              <div
                key={fish.id}
                style={{
                  ...styles.fish,
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  zIndex: 10,
                }}
              >
                <div style={styles.fishIcon}>
                  {fish.image_url ? (
                    <img
                      src={fish.image_url}
                      alt={fish.nickname || fish.original_name}
                      style={{ width: 32, height: 32 }}
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span
                    style={{
                      fontSize: 32,
                      display: fish.image_url ? 'none' : 'block',
                    }}
                  >
                    🐠
                  </span>
                </div>
                <div style={styles.fishName}>
                  {fish.nickname || fish.original_name}
                </div>
              </div>
            );
          })}

          {aquariumDecorations.map((dec, i) => {
            const pos = getDecorationPosition(i);
            return (
              <div
                key={dec.id}
                style={{
                  position: 'absolute',
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))',
                  }}
                >
                  {dec.image_url ? (
                    <img
                      src={dec.image_url}
                      alt={dec.name}
                      style={{ width: 28, height: 28 }}
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span
                    style={{
                      fontSize: 28,
                      display: dec.image_url ? 'none' : 'block',
                    }}
                  >
                    🪸
                  </span>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.8)',
                      marginTop: 2,
                      textShadow: '0 0 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {dec.name}
                  </div>
                </div>
              </div>
            );
          })}

          {aquariumFishes.length === 0 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.8)',
                fontSize: 16,
                zIndex: 20,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 10 }}>🐠</div>
              <div>물고기를 추가해보세요!</div>
            </div>
          )}
        </div>

        {/* 해초와 기포 */}
        <div style={{ ...styles.seaweed, left: '10%' }} />
        <div style={{ ...styles.seaweed, right: '15%', height: 80 }} />
        <div style={{ ...styles.seaweed, left: '40%', height: 100, opacity: 0.6 }} />
        <div style={styles.bubbles}>
          <div style={{ ...styles.bubble, animationDelay: '0s' }} />
          <div style={{ ...styles.bubble, animationDelay: '1s' }} />
          <div style={{ ...styles.bubble, animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};

export default FriendsTank;



