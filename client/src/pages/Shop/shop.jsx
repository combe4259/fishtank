import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import FishCard from '../../components/aquarium/FishCard/FishCard';
import { Gem, Filter, ShoppingBag, Lock, Check } from 'lucide-react';
import { styles } from './shop-styles';
const API_BASE_URL = import.meta.env.VITE_API_URL


const Shop = ({ user }) => {
  const [activeTab, setActiveTab] = useState('fish');
  const [shopFishes, setShopFishes] = useState([]);
  const [shopDecorations, setShopDecorations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userCoins, setUserCoins] = useState(user?.gameStats?.fishCoins || 0);
  const [sortBy, setSortBy] = useState('price_asc');

  const categories = [
    { value: 'all', label: '전체', color: '#6b7280' },
    { value: 'available', label: '구매 가능', color: '#10b981' },
    { value: 'locked', label: '잠금', color: '#ef4444' },
    { value: 'owned', label: '보유중', color: '#3b82f6' },
  ];

  // 물고기,장식품 목록 불러오기
  useEffect(() => {
    fetchFishList();
    fetchDecorationList();
  }, []);

  const fetchFishList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}api/shop/fish/list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setShopFishes(data.fishTypes);
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
      const response = await fetch(`${API_BASE_URL}api/shop/decorations/list`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) setShopDecorations(data.decorationTypes);
    } catch (error) {
      console.error('장식품 목록 조회 실패:', error);
    }
  };

  // 물고기 구매
  const handleBuyFish = async (fish) => {
    if (fish.is_owned) {
      alert('이미 보유중인 물고기입니다!');
      return;
    }

    if (!fish.is_unlocked) {
      alert(`레벨 ${fish.unlock_level}에 잠금 해제됩니다!`);
      return;
    }

    if (userCoins < fish.price) {
      alert('코인이 부족합니다!');
      return;
    }

    const confirmPurchase = window.confirm(
        `${fish.name}을(를) ${fish.price} 코인에 구매하시겠습니까?\n현재 코인: ${userCoins}`
    );

    if (!confirmPurchase) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}api/shop/fish/buy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fishTypeId: fish.id })
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setUserCoins(data.remainingCoins);

        // 사용자 정보 업데이트
        const updatedUser = JSON.parse(localStorage.getItem('user'));
        updatedUser.gameStats.fishCoins = data.remainingCoins;
        updatedUser.gameStats.experiencePoints += data.experienceGained;
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // 목록 새로고침
        fetchFishList();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('구매 실패:', error);
      alert('물고기 구매 중 오류가 발생했습니다.');
    }
  };
  const handleBuyDecoration = async (decoration) => {
    if (decoration.is_owned) return alert('이미 보유중인 장식품입니다!');
    if (!decoration.is_unlocked) return alert(`레벨 ${decoration.unlock_level}에 잠금 해제됩니다!`);
    if (userCoins < decoration.price) return alert('코인이 부족합니다!');
    const confirm = window.confirm(`${decoration.name}을(를) ${decoration.price} 코인에 구매하시겠습니까?\n현재 코인: ${userCoins}`);
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}api/shop/decorations/buy`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ decorationTypeId: decoration.id })
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setUserCoins(data.remainingCoins);
        fetchDecorationList();
      } else {
        alert(data.message);
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
            <h2 style={styles.title}><ShoppingBag style={{ width: '32px', height: '32px', color: '#3b82f6' }} /> FishTank 상점</h2>
            <p style={styles.subtitle}>물고기와 장식품을 구매해 어항을 꾸며보세요!</p>
          </div>
          <div style={styles.coinDisplay}>
            <Gem style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
            <span style={styles.coinAmount}>{userCoins.toLocaleString()}</span>
            <span style={styles.coinLabel}>코인</span>
          </div>
        </div>

        {/* 탭 추가 */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
              onClick={() => setActiveTab('fish')}
              style={{ padding: '10px 20px', background: activeTab === 'fish' ? '#3b82f6' : '#e5e7eb', color: activeTab === 'fish' ? 'white' : 'black' }}
          >
            물고기
          </button>
          <button
              onClick={() => {
                setActiveTab('decorations');
                if (activeTab !== 'decorations') {
                  fetchDecorationList(); // 장식품 탭 클릭시 데이터 로드
                }
              }}
              style={{ padding: '10px 20px', background: activeTab === 'decorations' ? '#3b82f6' : '#e5e7eb' }}
          >
            장식품
          </button>
        </div>
        <div style={styles.categoryBar}>
          <div style={styles.categoryLabel}><Filter style={{ width: '18px', height: '18px' }} /><span>필터</span></div>
          <div style={styles.categoryButtons}>
            {categories.map(category => (
                <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    style={{ ...styles.categoryButton, ...(selectedCategory === category.value ? styles.categoryButtonActive : {}) }}
                >
                  <div style={{ ...styles.categoryDot, background: category.color }}></div>{category.label}
                </button>
            ))}
          </div>
        </div>

        <Card style={styles.shopCard}>
          <div style={styles.shopHeader}>
            <h3 style={styles.shopTitle}>
              {activeTab === 'fish' ? '물고기 목록' : '장식품 목록'}
              <span style={styles.fishCount}>({activeTab === 'fish' ? filteredFishes.length : filteredDecorations.length}종)</span>
            </h3>
            <select style={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
                  {fish.is_owned && <div style={styles.ownedOverlay}><Check style={{ width: '32px', height: '32px', color: 'white' }} /><span>보유중</span></div>}
                  {!fish.is_unlocked && <div style={styles.lockedOverlay}><Lock style={{ width: '32px', height: '32px', color: 'white' }} /><span>Lv.{fish.unlock_level}</span></div>}
                </div>
            )) : filteredDecorations.map(decoration => (
                <div key={decoration.id} style={{ position: 'relative' }}>
                  <FishCard
                      fish={{ ...decoration, rarity: getRarityByPrice(decoration.price) }}
                      onClick={() => handleBuyDecoration(decoration)}
                      showPrice={true}
                      fishImage={decoration.image_url}
                  />
                  {decoration.is_owned && <div style={styles.ownedOverlay}><Check style={{ width: '32px', height: '32px', color: 'white' }} /><span>보유중</span></div>}
                  {!decoration.is_unlocked && <div style={styles.lockedOverlay}><Lock style={{ width: '32px', height: '32px', color: 'white' }} /><span>Lv.{decoration.unlock_level}</span></div>}
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