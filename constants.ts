import { Merchant, Notice, Transaction, Gift, AppNotification } from "./types";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    date: '2024-05-20 12:30',
    merchantName: '전주 비빔밥 본점',
    amount: 12000,
    cashbackEarned: 1440,
    cashbackUsed: 0,
    type: 'PAYMENT'
  },
  {
    id: 't2',
    date: '2024-05-19 18:45',
    merchantName: '한옥마을 카페',
    amount: 5500,
    cashbackEarned: 660,
    cashbackUsed: 0,
    type: 'PAYMENT'
  },
  {
    id: 't3',
    date: '2024-05-01 09:00',
    merchantName: '농협은행 충전',
    amount: 100000,
    cashbackEarned: 0,
    cashbackUsed: 0,
    type: 'CHARGE'
  },
  {
    id: 't4',
    date: '2024-04-15 13:00',
    merchantName: 'PNB 풍년제과',
    amount: 25000,
    cashbackEarned: 0,
    cashbackUsed: 5000, // Used cashback case
    type: 'PAYMENT'
  },
  {
    id: 't5',
    date: '2024-03-10 11:20',
    merchantName: '전주 동물원',
    amount: 3000,
    cashbackEarned: 0,
    cashbackUsed: 0,
    type: 'PAYMENT'
  }
];

export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: '풍년제과 초코파이',
    category: '제과/카페',
    address: '전주시 완산구 팔달로 180',
    phone: '063-123-4567',
    lat: 35.8147,
    lng: 127.1526,
    isCashback: true,
    description: '전주 명물 수제 초코파이 전문점'
  },
  {
    id: 'm2',
    name: '베테랑 칼국수',
    category: '음식점',
    address: '전주시 완산구 경기전길 135',
    phone: '063-987-6543',
    lat: 35.8130,
    lng: 127.1500,
    isCashback: true,
    description: '진한 국물의 칼국수와 만두 맛집'
  },
  {
    id: 'm3',
    name: '전주 콩나물국밥',
    category: '음식점',
    address: '전주시 덕진구 기린대로 400',
    phone: '063-555-5555',
    lat: 35.8300,
    lng: 127.1300,
    isCashback: true,
    description: '24시간 운영하는 시원한 국밥집'
  },
  {
    id: 'm4',
    name: '하나로마트 전주점',
    category: '마트',
    address: '전주시 완산구',
    phone: '063-111-2222',
    lat: 35.8200,
    lng: 127.1400,
    isCashback: false,
    description: '신선한 식재료'
  },
  {
    id: 'm5',
    name: '전주 사랑 병원',
    category: '병원/약국',
    address: '전주시 덕진구',
    phone: '063-333-4444',
    lat: 35.8400,
    lng: 127.1200,
    isCashback: true,
    description: '지역 주민을 위한 종합 병원'
  }
];

export const MOCK_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: '전주사랑상품권 앱이 새로워졌어요!',
    date: '2024.05.01',
    type: 'NOTICE'
  },
  {
    id: 'n2',
    title: '가정의 달 맞이 충전 한도 상향 이벤트',
    date: '2024.05.05',
    type: 'EVENT'
  },
  {
    id: 'n3',
    title: '5월 캐시백 12% 상향 지급 안내',
    date: '2024.04.28',
    type: 'NOTICE'
  }
];

export const MOCK_GIFTS: Gift[] = [
  {
    id: 'g1',
    type: 'RECEIVED',
    otherParty: '김철수',
    amount: 30000,
    date: '2024.05.21',
    status: 'PENDING',
    message: '생일 축하해! 맛있는거 사먹어 🎉'
  },
  {
    id: 'g2',
    type: 'RECEIVED',
    otherParty: '이영희',
    amount: 50000,
    date: '2024.05.15',
    status: 'ACCEPTED',
    message: '지난번에 고마웠어~'
  },
  {
    id: 'g3',
    type: 'SENT',
    otherParty: '박지성',
    amount: 100000,
    date: '2024.05.10',
    status: 'ACCEPTED',
    message: '부모님 용돈입니다. 건강하세요!'
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif1',
    title: '캐시백 적립 완료',
    message: '전주 비빔밥 본점 결제 건에 대한 캐시백 1,440원이 적립되었습니다.',
    date: '방금 전',
    read: false,
    type: 'TRANSACTION'
  },
  {
    id: 'notif2',
    title: '선물 도착',
    message: '김철수님이 30,000원을 선물했습니다. 선물함을 확인해보세요!',
    date: '1시간 전',
    read: false,
    type: 'TRANSACTION'
  },
  {
    id: 'notif3',
    title: '6월 이벤트 안내',
    message: '전주사랑상품권 6월 캐시백 혜택이 12%로 유지됩니다.',
    date: '어제',
    read: true,
    type: 'MARKETING'
  }
];
