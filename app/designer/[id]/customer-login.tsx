import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

// 임시 고객 데이터 (실제로는 DB에서 조회)
const existingCustomers = [
  {
    id: 1,
    name: '김영희',
    phone: '010-1234-5678',
    lastVisit: '2024-01-15',
    totalVisits: 5,
    lastStyle: '자연스러운 웨이브',
    status: 'completed',
  },
  {
    id: 2,
    name: '박민수',
    phone: '010-9876-5432',
    lastVisit: '2024-01-10',
    totalVisits: 3,
    lastStyle: '모던한 레이어드',
    status: 'in-progress',
  },
];

const designers = [
  { id: 1, name: '김민지', specialty: '커트 전문' },
  { id: 2, name: '박서연', specialty: '컬러 전문' },
  { id: 3, name: '이지은', specialty: '펌 전문' },
];

export default function CustomerLoginScreen() {
  const { id } = useLocalSearchParams();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [foundCustomer, setFoundCustomer] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const designer = designers.find((d) => d.id === parseInt(id as string));

  const handleSearchCustomer = () => {
    if (phoneNumber.length < 10) {
      Alert.alert('오류', '올바른 전화번호를 입력해주세요.');
      return;
    }

    setIsSearching(true);

    // 실제로는 API 호출
    setTimeout(() => {
      const customer = existingCustomers.find((c) => c.phone === phoneNumber);
      setFoundCustomer(customer);
      setIsSearching(false);
    }, 1000);
  };

  const handleNewCustomer = () => {
    Alert.alert('신규 고객 등록', '새로운 고객으로 등록하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '등록',
        onPress: () => {
          // 신규 고객 등록 로직
          console.log('신규 고객 등록:', phoneNumber);
        },
      },
    ]);
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>
          {designer?.name} 디자이너
        </Text>
        <Text style={tw`text-base text-center text-gray-600`}>고객 전화번호를 입력해주세요</Text>
      </View>

      {/* 전화번호 입력 */}
      <View style={tw`px-6 mb-6`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>고객 조회</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-xl px-4 py-4 text-lg mb-4`}
            placeholder="010-1234-5678"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={13}
          />
          <TouchableOpacity
            style={tw`bg-pink-500 py-4 rounded-xl ${isSearching ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleSearchCustomer}
            disabled={isSearching}
          >
            <Text style={tw`text-white text-lg font-semibold text-center`}>
              {isSearching ? '조회 중...' : '고객 조회'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 조회 결과 */}
      {foundCustomer && (
        <View style={tw`px-6 mb-6`}>
          <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
            <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>고객 정보</Text>
            <View style={tw`mb-4`}>
              <Text style={tw`text-xl font-bold text-gray-800 mb-1`}>{foundCustomer.name}</Text>
              <Text style={tw`text-gray-600 mb-2`}>{foundCustomer.phone}</Text>
              <Text style={tw`text-sm text-gray-500`}>
                마지막 방문: {foundCustomer.lastVisit} • 총 {foundCustomer.totalVisits}회 방문
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                마지막 스타일: {foundCustomer.lastStyle}
              </Text>
            </View>

            <View style={tw`flex-row space-x-3`}>
              <Link href={`/designer/${id}/customer/${foundCustomer.id}/history`} asChild>
                <TouchableOpacity style={tw`flex-1 bg-blue-500 py-3 rounded-xl`}>
                  <Text style={tw`text-white text-center font-semibold`}>이전 기록 보기</Text>
                </TouchableOpacity>
              </Link>
              <Link href={`/designer/${id}/customer/${foundCustomer.id}/new-record`} asChild>
                <TouchableOpacity style={tw`flex-1 bg-green-500 py-3 rounded-xl`}>
                  <Text style={tw`text-white text-center font-semibold`}>새 기록 추가</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      )}

      {/* 고객을 찾을 수 없는 경우 */}
      {foundCustomer === false && (
        <View style={tw`px-6 mb-6`}>
          <View style={tw`bg-yellow-50 rounded-2xl p-6 shadow-lg`}>
            <Text style={tw`text-lg font-semibold text-yellow-800 mb-2`}>
              고객을 찾을 수 없습니다
            </Text>
            <Text style={tw`text-yellow-700 mb-4`}>
              입력하신 전화번호로 등록된 고객이 없습니다.
            </Text>
            <TouchableOpacity style={tw`bg-yellow-500 py-3 rounded-xl`} onPress={handleNewCustomer}>
              <Text style={tw`text-white text-center font-semibold`}>신규 고객으로 등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 하단 네비게이션 */}
      <View style={tw`px-6`}>
        <Link href="/" asChild>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl`}>
            <Text style={tw`text-gray-600 text-center`}>대시보드로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
