import React from 'react';
import { Fish, Droplets, Sparkles } from 'lucide-react';
import Card from '../../components/common/Card/Card';
import DashboardChart from '../../components/aquarium/DashboardChart/DashboardChart';
import { styles } from './MyAquarium-styles';

const MyAquarium = () => {
  const myFishes = [
    { id: 1, name: '코딩이', species: 'JavaScript 문어', level: 5 },
    { id: 2, name: '파이썬이', species: 'Python 뱀물고기', level: 3 },
  ];

  return (
      <div style={styles.container}>
        <div style={styles.mainGrid}>
          {/* 왼쪽 사이드바 */}
          <div style={styles.leftSidebar}>
            {/* 프로필 카드 */}
            <Card style={styles.profileCard}>
              <div style={styles.profileAvatar}>
                <span style={styles.avatarEmoji}>🐠</span>
              </div>
              <h3 style={styles.profileName}>SpongeBob</h3>
              <p style={styles.profileLevel}>Level 15</p>
              <div style={styles.profileStats}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>12</div>
                  <div style={styles.statLabel}>물고기</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>5</div>
                  <div style={styles.statLabel}>친구</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>8</div>
                  <div style={styles.statLabel}>업적</div>
                </div>
              </div>
            </Card>

            {/* 오늘의 할일 차트 */}
            <DashboardChart />
          </div>

          {/* 메인 아쿠아리움 */}
          <div style={styles.aquariumWrapper}>
            <div style={styles.aquariumContainer}>
              <div style={styles.aquariumOverlay}></div>
              <div style={styles.waterEffect}></div>

              {/* 물고기들 */}
              <div style={styles.fishContainer}>
                <div style={{ ...styles.fish, top: '30%', left: '20%' }}>
                  <div style={styles.fishIcon}>
                    <Fish style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  <div style={styles.fishName}>코딩이</div>
                </div>

                <div style={{ ...styles.fish, top: '50%', left: '60%', animationDelay: '2s' }}>
                  <div style={{ ...styles.fishIcon, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                    <Fish style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  <div style={styles.fishName}>파이썬이</div>
                </div>
              </div>

              {/* 해초 */}
              <div style={{ ...styles.seaweed, left: '10%' }}></div>
              <div style={{ ...styles.seaweed, right: '15%', height: '80px' }}></div>
              <div style={{ ...styles.seaweed, left: '40%', height: '100px', opacity: 0.6 }}></div>

              {/* 물방울 효과 */}
              <div style={styles.bubbles}>
                <div style={{ ...styles.bubble, animationDelay: '0s' }}></div>
                <div style={{ ...styles.bubble, animationDelay: '1s' }}></div>
                <div style={{ ...styles.bubble, animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드바 */}
          <div style={styles.rightSidebar}>
            {/* 나의 물고기 목록 */}
            <Card style={styles.fishListCard}>
              <h3 style={styles.fishListTitle}>
                <Fish style={{ width: '20px', height: '20px', color: '#3B82F6' }} />
                나의 물고기
              </h3>
              <div style={styles.fishList}>
                {myFishes.map(fish => (
                    <div key={fish.id} style={styles.fishListItem}>
                      <div style={styles.fishItemIcon}>
                        <Fish style={{ width: '24px', height: '24px', color: 'white' }} />
                      </div>
                      <div style={styles.fishItemInfo}>
                        <div style={styles.fishItemName}>{fish.name}</div>
                        <div style={styles.fishItemLevel}>Lv.{fish.level} • {fish.species}</div>
                      </div>
                    </div>
                ))}
              </div>
            </Card>

            {/* 수족관 상태 */}
            <Card style={styles.aquariumStatus}>
              <h3 style={styles.statusTitle}>
                <Droplets style={{ width: '20px', height: '20px', color: '#3B82F6' }} />
                수족관 상태
              </h3>
              <div style={styles.statusList}>
                <div style={styles.statusItem}>
                  <div style={styles.statusLabel}>청결도</div>
                  <div style={styles.statusBar}>
                    <div style={{ ...styles.statusFill, width: '85%' }}></div>
                  </div>
                  <div style={styles.statusValue}>85%</div>
                </div>
                <div style={styles.statusItem}>
                  <div style={styles.statusLabel}>수온</div>
                  <div style={styles.statusBar}>
                    <div style={{ ...styles.statusFill, width: '92%', background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)' }}></div>
                  </div>
                  <div style={styles.statusValue}>24.5°C</div>
                </div>
                <div style={styles.statusItem}>
                  <div style={styles.statusLabel}>산소량</div>
                  <div style={styles.statusBar}>
                    <div style={{ ...styles.statusFill, width: '78%', background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)' }}></div>
                  </div>
                  <div style={styles.statusValue}>78%</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default MyAquarium;