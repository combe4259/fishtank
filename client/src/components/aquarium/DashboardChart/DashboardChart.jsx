import React from 'react';
import Card from '../../common/Card/Card';
import { CheckCircle2, Circle, Target } from 'lucide-react';
import { styles } from './dashboardChart-styles';

const DashboardChart = () => {
    const todayTasks = {
        completed: 6,
        total: 8,
        percentage: 75,
        tasks: [
            { id: 1, name: 'React 컴포넌트 개발', completed: true },
            { id: 2, name: 'API 연동 작업', completed: true },
            { id: 3, name: 'UI 디자인 수정', completed: true },
            { id: 4, name: '코드 리뷰', completed: true },
            { id: 5, name: '테스트 작성', completed: true },
            { id: 6, name: '문서 업데이트', completed: true },
            { id: 7, name: '배포 준비', completed: false },
            { id: 8, name: '미팅 참석', completed: false },
        ]
    };

    return (
        <Card style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>
                    <Target style={{ width: '18px', height: '18px', color: '#3b82f6' }} />
                    오늘의 할일
                </h3>
                <span style={styles.date}>{new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</span>
            </div>

            <div style={styles.chartSection}>
                <div style={styles.chartWrapper}>
                    <svg style={styles.svg} viewBox="0 0 120 120">
                        {/* 배경 원 */}
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                        />
                        {/* 진행률 원 */}
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="10"
                            strokeDasharray={`${2 * Math.PI * 50}`}
                            strokeDashoffset={`${2 * Math.PI * 50 * (1 - todayTasks.percentage / 100)}`}
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                        />
                        {/* 그라디언트 정의 */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div style={styles.chartCenter}>
                        <div style={styles.percentage}>{todayTasks.percentage}%</div>
                        <div style={styles.label}>완료율</div>
                    </div>
                </div>

                <div style={styles.statsInfo}>
                    <div style={styles.statItem}>
                        <CheckCircle2 style={{ width: '16px', height: '16px', color: '#10b981' }} />
                        <span style={styles.statText}>완료: {todayTasks.completed}개</span>
                    </div>
                    <div style={styles.statItem}>
                        <Circle style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                        <span style={styles.statText}>대기: {todayTasks.total - todayTasks.completed}개</span>
                    </div>
                </div>
            </div>

            <div style={styles.footer}>
                <div style={styles.progressBar}>
                    <div
                        style={{
                            ...styles.progressFill,
                            width: `${todayTasks.percentage}%`
                        }}
                    >
                        <div style={styles.progressGlow}></div>
                    </div>
                </div>
                <p style={styles.motivationText}>
                    {todayTasks.percentage >= 80 ? '🎉 훌륭해요! 거의 다 완료했어요!' : '💪 조금만 더 힘내세요!'}
                </p>
            </div>
        </Card>
    );
};

export default DashboardChart;