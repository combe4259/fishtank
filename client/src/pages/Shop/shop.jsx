import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import FishCard from '../../components/aquarium/FishCard/FishCard';
import { Gem, Filter, ShoppingBag } from 'lucide-react';
import { styles } from './shop-styles';

const Shop = () => {

  const shopFishes = [
    { id: 1, name: '청어', species: 'React Fish', price: 100, rarity: 'common', image: '/fish1.png' },
    { id: 2, name: '금붕어', species: 'Vue Fish', price: 250, rarity: 'rare', image: '/fish2.png' },
    { id: 3, name: '상어', species: 'Angular Shark', price: 500, rarity: 'epic', image: '/fish3.png' },
    { id: 4, name: '문어', species: 'Node Octopus', price: 800, rarity: 'legendary', image: '/fish4.png' },
    { id: 5, name: '연어', species: 'TypeScript Salmon', price: 300, rarity: 'rare', image: '/fish5.png' },
    { id: 6, name: '복어', species: 'Next.js Puffer', price: 600, rarity: 'epic', image: '/fish6.png' },
    { id: 7, name: '열대어', species: 'CSS Tropical', price: 150, rarity: 'common', image: '/fish7.png' },
    { id: 8, name: '돌고래', species: 'Docker Dolphin', price: 1000, rarity: 'legendary', image: '/fish8.png' },
  ];

  const categories = [
    { value: 'all', label: '전체', color: '#6b7280' },
    { value: 'common', label: '일반', color: '#10b981' },
    { value: 'rare', label: '희귀', color: '#3b82f6' },
    { value: 'epic', label: '영웅', color: '#8b5cf6' },
    { value: 'legendary', label: '전설', color: '#f59e0b' },
  ];

  const filteredFishes = shopFishes;


  const handleBuyFish = (fish) => {
    alert(`${fish.name}을(를) 구매하시겠습니까? 가격: ${fish.price} 코인`);
  };

  return (
      <div style={styles.container}>
        {/* 헤더 영역 */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h2 style={styles.title}>
              <ShoppingBag style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
              FishTank 상점
            </h2>
            <p style={styles.subtitle}>다양한 물고기들을 구매하고 어항을 꾸며보세요!</p>
          </div>

          {/* 내 코인 표시 */}
          <div style={styles.coinDisplay}>
            <Gem style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
            <span style={styles.coinAmount}>5,000</span>
            <span style={styles.coinLabel}>코인</span>
          </div>
        </div>



        {/* 상점 카드 */}
        <Card style={styles.shopCard}>
          <div style={styles.shopHeader}>
            <h3 style={styles.shopTitle}>
              물고기 목록
              <span style={styles.fishCount}>({filteredFishes.length}종)</span>
            </h3>

            {/* 정렬 옵션 */}
            <select style={styles.sortSelect}>
              <option>가격 낮은순</option>
              <option>가격 높은순</option>
              <option>이름순</option>
              <option>희귀도순</option>
            </select>
          </div>

          {/* 물고기 그리드 */}
          <div style={styles.fishGrid}>
            {filteredFishes.map(fish => (
                <FishCard
                    key={fish.id}
                    fish={fish}
                    onClick={handleBuyFish}
                    showPrice={true}
                    fishImage={fish.image}
                />
            ))}
          </div>
        </Card>

        {/* 하단 정보 */}
        <div style={styles.bottomInfo}>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>💡 구매 팁</h4>
            <p style={styles.infoText}>희귀한 물고기일수록 더 많은 경험치를 제공합니다!</p>
          </div>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>🎁 이벤트</h4>
            <p style={styles.infoText}>이번 주 전설 물고기 20% 할인 중!</p>
          </div>
        </div>
      </div>
  );
};

export default Shop;