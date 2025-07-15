import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import FishCard from '../../components/aquarium/FishCard/FishCard';
import { Gem, Filter, ShoppingBag, Lock, Check } from 'lucide-react';
import { styles } from './shop-styles';
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

const Shop = ({ user }) => {
  const [activeTab, setActiveTab] = useState('fish');
  const [shopFishes, setShopFishes] = useState([]);
  const [shopDecorations, setShopDecorations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userCoins, setUserCoins] = useState(0); // 초기값을 0으로 설정
  const [sortBy, setSortBy] = useState('price_asc');

  const categories = [
    { value: 'all', label: '전체', color: '#6b7280' },
    { value: 'available', label: '구매 가능', color: '#10b981' },
    { value: 'locked', label: '잠금', color: '#ef4444' },
    { value: 'owned', label: '보유중', color: '#3b82f6' },
  ];

  // 컴포넌트 마운트 시 사용자 코인 정보 초기화
  useEffect(() => {
    initializeUserCoins();
    fetchFishList();
    fetchDecorationList();
  }, [user]);

  // 사용자 코인 정보 초기화 함수
  const initializeUserCoins = () => {
    console.log('사용자 정보 확인:', user);

    // 여러 경로에서 코인 정보 찾기
    let coins = 0;

    if (user?.gameStats?.fishCoins) {
      coins = user.gameStats.fishCoins;
    } else if (user?.fish_coins) {
      coins = user.fish_coins;
    } else if (user?.coins) {
      coins = user.coins;
    } else {
      // localStorage에서 사용자 정보 다시 확인
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('저장된 사용자 정보:', parsedUser);

          if (parsedUser?.gameStats?.fishCoins) {
            coins = parsedUser.gameStats.fishCoins;
          } else if (parsedUser?.fish_coins) {
            coins = parsedUser.fish_coins;
          } else if (parsedUser?.coins) {
            coins = parsedUser.coins;
          }
        } catch (error) {
          console.error('사용자 정보 파싱 오류:', error);
        }
      }

      // 여전히 코인 정보가 없으면 API에서 다시 가져오기
      if (coins === 0) {
        fetchUserCoins();
      }
    }

    console.log('초기화된 코인:', coins);
    setUserCoins(coins);
  };

  // API에서 사용자 코인 정보 가져오기
  const fetchUserCoins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success && data.user) {
        const coins = data.user.fish_coins || data.user.gameStats?.fishCoins || 0;
        console.log('API에서 가져온 코인:', coins);
        setUserCoins(coins);

        // localStorage 업데이트
        const updatedUser = { ...data.user };
        if (!updatedUser.gameStats) {
          updatedUser.gameStats = {};
        }
        updatedUser.gameStats.fishCoins = coins;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('사용자 코인 정보 조회 실패:', error);
    }
  };

  const fetchFishList = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('물고기 목록 요청 토큰:', token ? '존재함' : '없음');

      const response = await fetch(`${API_BASE_URL}/api/shop/fish/list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('물고기 목록 응답 상태:', response.status);
      const data = await response.json();
      console.log('물고기 목록 응답:', data);

      if (data.success) {
        setShopFishes(data.fishTypes);
      } else {
        console.error('물고기 목록 조회 실패:', data.message);
      }
    } catch (error) {
      console.error('물고기 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDecorationList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/shop/decorations/list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('장식품 목록 응답:', data);

      if (data.success) {
        setShopDecorations(data.decorationTypes);
      } else {
        console.error('장식품 목록 조회 실패:', data.message);
      }
    } catch (error) {
      console.error('장식품 목록 조회 실패:', error);
    }
  };

  // 물고기 구매
  const handleBuyFish = async (fish) => {
    console.log('구매 시도:', fish);
    console.log('현재 코인:', userCoins);

    if (fish.is_owned) {
      alert('이미 보유중인 물고기입니다!');
      return;
    }

    if (!fish.is_unlocked) {
      alert(`레벨 ${fish.unlock_level}에 잠금 해제됩니다!`);
      return;
    }

    if (userCoins < fish.price) {
      alert(`코인이 부족합니다!\n필요: ${fish.price} 코인\n보유: ${userCoins} 코인`);
      return;
    }

    const confirmPurchase = window.confirm(
        `${fish.name}을(를) ${fish.price} 코인에 구매하시겠습니까?\n현재 코인: ${userCoins}`
    );

    if (!confirmPurchase) return;

    try {
      const token = localStorage.getItem('token');
      console.log('구매 요청 전송...');

      const response = await fetch(`${API_BASE_URL}/api/shop/fish/buy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fishTypeId: fish.id })
      });

      console.log('구매 응답 상태:', response.status);
      const data = await response.json();
      console.log('구매 응답:', data);

      if (data.success) {
        alert(data.message);
        setUserCoins(data.remainingCoins);

        // localStorage 사용자 정보 업데이트
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const updatedUser = JSON.parse(storedUser);
            if (!updatedUser.gameStats) {
              updatedUser.gameStats = {};
            }
            updatedUser.gameStats.fishCoins = data.remainingCoins;
            updatedUser.fish_coins = data.remainingCoins; // 백업용
            localStorage.setItem('user', JSON.stringify(updatedUser));
          } catch (error) {
            console.error('사용자 정보 업데이트 오류:', error);
          }
        }

        // 목록 새로고침
        fetchFishList();
      } else {
        alert(data.message || '구매에 실패했습니다.');
      }
    } catch (error) {
      console.error('구매 실패:', error);
      alert('물고기 구매 중 오류가 발생했습니다.');
    }
  };

  const handleBuyDecoration = async (decoration) => {
    console.log('장식품 구매 시도:', decoration);
    console.log('현재 코인:', userCoins);

    if (decoration.is_owned) {
      alert('이미 보유중인 장식품입니다!');
      return;
    }

    if (!decoration.is_unlocked) {
      alert(`레벨 ${decoration.unlock_level}에 잠금 해제됩니다!`);
      return;
    }

    if (userCoins < decoration.price) {
      alert(`코인이 부족합니다!\n필요: ${decoration.price} 코인\n보유: ${userCoins} 코인`);
      return;
    }

    const confirm = window.confirm(
        `${decoration.name}을(를) ${decoration.price} 코인에 구매하시겠습니까?\n현재 코인: ${userCoins}`
    );

    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/shop/decorations/buy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ decorationTypeId: decoration.id })
      });

      const data = await response.json();
      console.log('장식품 구매 응답:', data);

      if (data.success) {
        alert(data.message);
        setUserCoins(data.remainingCoins);

        // localStorage 업데이트
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const updatedUser = JSON.parse(storedUser);
            if (!updatedUser.gameStats) {
              updatedUser.gameStats = {};
            }
            updatedUser.gameStats.fishCoins = data.remainingCoins;
            updatedUser.fish_coins = data.remainingCoins;
            localStorage.setItem('user', JSON.stringify(updatedUser));
          } catch (error) {
            console.error('사용자 정보 업데이트 오류:', error);
          }
        }

        fetchDecorationList();
      } else {
        alert(data.message || '구매에 실패했습니다.');
      }
    } catch (error) {
      console.error('구매 실패:', error);
      alert('장식품 구매 중 오류가 발생했습니다.');
    }
  };

  // 필터링 및 정렬
  const getFilteredAndSortedItems = (items) => {
    let filtered = [...items];
    switch (selectedCategory) {
      case 'available': filtered = filtered.filter(i => i.is_unlocked && !i.is_owned); break;
      case 'locked': filtered = filtered.filter(i => !i.is_unlocked); break;
      case 'owned': filtered = filtered.filter(i => i.is_owned); break;
    }
    switch (sortBy) {
      case 'price_asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price_desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'level': filtered.sort((a, b) => a.unlock_level - b.unlock_level); break;
    }
    return filtered;
  };

  const filteredFishes = getFilteredAndSortedItems(shopFishes);
  const filteredDecorations = getFilteredAndSortedItems(shopDecorations);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;
  }

  return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h2 style={styles.title}>
              <ShoppingBag style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
              FishTank 상점
            </h2>
            <p style={styles.subtitle}>물고기와 장식품을 구매해 어항을 꾸며보세요!</p>
          </div>
          <div style={styles.coinDisplay}>
            <Gem style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
            <span style={styles.coinAmount}>{userCoins.toLocaleString()}</span>
            <span style={styles.coinLabel}>코인</span>
            {/* 디버깅용 새로고침 버튼 */}
            <button
                onClick={() => {
                  console.log('코인 새로고침 클릭');
                  fetchUserCoins();
                }}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  background: '#e5e7eb',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
            >
              🔄
            </button>
          </div>
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
              onClick={() => setActiveTab('fish')}
              style={{
                padding: '10px 20px',
                background: activeTab === 'fish' ? '#3b82f6' : '#e5e7eb',
                color: activeTab === 'fish' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
          >
            물고기
          </button>
          <button
              onClick={() => {
                setActiveTab('decorations');
                if (activeTab !== 'decorations') {
                  fetchDecorationList();
                }
              }}
              style={{
                padding: '10px 20px',
                background: activeTab === 'decorations' ? '#3b82f6' : '#e5e7eb',
                color: activeTab === 'decorations' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
          >
            장식품
          </button>
        </div>

        <div style={styles.categoryBar}>
          <div style={styles.categoryLabel}>
            <Filter style={{ width: '18px', height: '18px' }} />
            <span>필터</span>
          </div>
          <div style={styles.categoryButtons}>
            {categories.map(category => (
                <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    style={{
                      ...styles.categoryButton,
                      ...(selectedCategory === category.value ? styles.categoryButtonActive : {})
                    }}
                >
                  <div style={{ ...styles.categoryDot, background: category.color }}></div>
                  {category.label}
                </button>
            ))}
          </div>
        </div>

        <Card style={styles.shopCard}>
          <div style={styles.shopHeader}>
            <h3 style={styles.shopTitle}>
              {activeTab === 'fish' ? '물고기 목록' : '장식품 목록'}
              <span style={styles.fishCount}>
                ({activeTab === 'fish' ? filteredFishes.length : filteredDecorations.length}종)
              </span>
            </h3>
            <select
                style={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price_asc">가격 낮은순</option>
              <option value="price_desc">가격 높은순</option>
              <option value="name">이름순</option>
              <option value="level">레벨순</option>
            </select>
          </div>

          <div style={styles.fishGrid}>
            {activeTab === 'fish' ? filteredFishes.map(fish => (
                <div key={fish.id} style={{ position: 'relative' }}>
                  <FishCard
                      fish={{ ...fish, rarity: getRarityByPrice(fish.price) }}
                      onClick={() => handleBuyFish(fish)}
                      showPrice={true}
                      fishImage={fish.image_url}
                  />
                  {fish.is_owned && (
                      <div style={styles.ownedOverlay}>
                        <Check style={{ width: '32px', height: '32px', color: 'white' }} />
                        <span>보유중</span>
                      </div>
                  )}
                  {!fish.is_unlocked && (
                      <div style={styles.lockedOverlay}>
                        <Lock style={{ width: '32px', height: '32px', color: 'white' }} />
                        <span>Lv.{fish.unlock_level}</span>
                      </div>
                  )}
                </div>
            )) : filteredDecorations.map(decoration => (
                <div key={decoration.id} style={{ position: 'relative' }}>
                  <FishCard
                      fish={{ ...decoration, rarity: getRarityByPrice(decoration.price) }}
                      onClick={() => handleBuyDecoration(decoration)}
                      showPrice={true}
                      fishImage={decoration.image_url}
                  />
                  {decoration.is_owned && (
                      <div style={styles.ownedOverlay}>
                        <Check style={{ width: '32px', height: '32px', color: 'white' }} />
                        <span>보유중</span>
                      </div>
                  )}
                  {!decoration.is_unlocked && (
                      <div style={styles.lockedOverlay}>
                        <Lock style={{ width: '32px', height: '32px', color: 'white' }} />
                        <span>Lv.{decoration.unlock_level}</span>
                      </div>
                  )}
                </div>
            ))}
          </div>
        </Card>

        <div style={styles.bottomInfo}>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>💡 구매 팁</h4>
            <p style={styles.infoText}>높은 가격의 아이템일수록 더 멋진 효과를 제공합니다!</p>
          </div>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>🎁 보유 현황</h4>
            <p style={styles.infoText}>
              {activeTab === 'fish' ?
                  `물고기: ${shopFishes.length}종 중 ${shopFishes.filter(f => f.is_owned).length}종 보유` :
                  `장식품: ${shopDecorations.length}종 중 ${shopDecorations.filter(d => d.is_owned).length}종 보유`}
            </p>
          </div>
        </div>
      </div>
  );
};

// 가격에 따른 희귀도 결정 함수
const getRarityByPrice = (price) => {
  if (price >= 800) return 'legendary';
  if (price >= 500) return 'epic';
  if (price >= 250) return 'rare';
  return 'common';
};

export default Shop;