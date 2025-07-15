import React from 'react';
import { Gem } from 'lucide-react';
import { styles } from './Navbar.styles.js';

const Navbar = ({ activeTab, onTabChange, userCoins = 5000 }) => {
    return (
        <div style={styles.navbar}>
            {/* 네비게이션 버튼들 */}
            <div style={styles.navButtonsContainer}>
                <button
                    onClick={() => onTabChange('myAquarium')}
                    style={{
                        ...styles.navButton,
                        ...(activeTab === 'myAquarium' ? styles.navButtonActive : {})
                    }}
                >
                    내 어항 보기
                </button>

                <button
                    onClick={() => onTabChange('shop')}
                    style={{
                        ...styles.navButton,
                        ...(activeTab === 'shop' ? styles.navButtonActive : {})
                    }}
                >
                    상점
                </button>

                <button
                    onClick={() => onTabChange('friends')}
                    style={{
                        ...styles.navButton,
                        ...(activeTab === 'friends' ? styles.navButtonActive : {})
                    }}
                >
                    친구 어항 보기
                </button>

                <button
                    onClick={() => onTabChange('profile')}
                    style={{
                        ...styles.navButton,
                        ...(activeTab === 'profile' ? styles.navButtonActive : {})
                    }}
                >
                    프로필 상세
                </button>
            </div>

            {/* 코인 표시 */}
            <div style={styles.coinDisplay}>
                <Gem style={{ width: '20px', height: '20px', color: '#2563EB' }} />
                <span style={styles.coinText}>{userCoins.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default Navbar;