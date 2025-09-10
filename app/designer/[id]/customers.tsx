import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

// 임시 고객 데이터
const customers = [
  {
    id: 1,
    name: '김영희',
    phone: '010-1234-5678',
    lastVisit: '2024-01-15',
    status: 'completed',
    lastStyle: '자연스러운 웨이브',
    afterImage: 'https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=After',
    needsAfterPhoto: false,
  },
  {
    id: 2,
    name: '박민수',
    phone: '010-9876-5432',
    lastVisit: '2024-01-10',
    status: 'in-progress',
    lastStyle: '모던한 레이어드',
    afterImage: null,
    needsAfterPhoto: true,
  },
  {
    id: 3,
    name: '이지영',
    phone: '010-5555-1234',
    lastVisit: '2024-01-08',
    status: 'completed',
    lastStyle: '스트레이트 펌',
    afterImage: 'https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=After',
    needsAfterPhoto: false,
  },
  {
    id: 4,
    name: '최수진',
    phone: '010-7777-8888',
    lastVisit: '2024-01-05',
    status: 'in-progress',
    lastStyle: '컬링 펌',
    afterImage: null,
    needsAfterPhoto: true,
  },
];

const designers = [
  { id: 1, name: '김민지', specialty: '커트 전문' },
  { id: 2, name: '박서연', specialty: '컬러 전문' },
  { id: 3, name: '이지은', specialty: '펌 전문' },
];

export default function CustomersScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'in-progress' | 'completed'>('in-progress');

  const designer = designers.find((d) => d.id === parseInt(id as string));
  const filteredCustomers = customers.filter((customer) => customer.status === activeTab);

  const handleAfterPhoto = (customerId: number) => {
    // After 사진 촬영 로직
    console.log('After 사진 촬영:', customerId);
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>
          {designer?.name} 디자이너
        </Text>
        <Text style={tw`text-base text-center text-gray-600`}>고객 목록</Text>
      </View>

      {/* 탭 메뉴 */}
      <View style={tw`px-6 mb-6`}>
        <View style={tw`bg-white rounded-xl p-1 flex-row`}>
          <TouchableOpacity
            style={tw`flex-1 py-3 rounded-lg ${
              activeTab === 'in-progress' ? 'bg-pink-500' : 'bg-transparent'
            }`}
            onPress={() => setActiveTab('in-progress')}
          >
            <Text
              style={tw`text-center font-semibold ${
                activeTab === 'in-progress' ? 'text-white' : 'text-gray-600'
              }`}
            >
              진행 중 ({customers.filter((c) => c.status === 'in-progress').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 py-3 rounded-lg ${
              activeTab === 'completed' ? 'bg-pink-500' : 'bg-transparent'
            }`}
            onPress={() => setActiveTab('completed')}
          >
            <Text
              style={tw`text-center font-semibold ${
                activeTab === 'completed' ? 'text-white' : 'text-gray-600'
              }`}
            >
              완료 ({customers.filter((c) => c.status === 'completed').length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 고객 목록 */}
      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {filteredCustomers.map((customer) => (
          <View key={customer.id} style={tw`bg-white rounded-2xl p-6 mb-4 shadow-lg`}>
            <View style={tw`flex-row items-center`}>
              {/* 고객 아바타 */}
              <View style={tw`w-16 h-16 rounded-full bg-pink-100 items-center justify-center mr-4`}>
                <Text style={tw`text-2xl`}>👩</Text>
              </View>

              {/* 고객 정보 */}
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-gray-800 mb-1`}>{customer.name}</Text>
                <Text style={tw`text-gray-600 text-sm mb-1`}>{customer.phone}</Text>
                <Text style={tw`text-gray-500 text-xs`}>마지막 방문: {customer.lastVisit}</Text>
                <Text style={tw`text-pink-600 text-sm font-medium`}>{customer.lastStyle}</Text>
              </View>

              {/* 상태 및 액션 */}
              <View style={tw`items-end`}>
                <View style={tw`mb-2`}>
                  {customer.status === 'in-progress' ? (
                    <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
                      <Text style={tw`text-blue-800 text-sm font-semibold`}>진행 중</Text>
                    </View>
                  ) : (
                    <View style={tw`bg-green-100 px-3 py-1 rounded-full`}>
                      <Text style={tw`text-green-800 text-sm font-semibold`}>완료</Text>
                    </View>
                  )}
                </View>

                {/* After 이미지 또는 촬영 버튼 */}
                {customer.needsAfterPhoto ? (
                  <TouchableOpacity
                    style={tw`bg-red-500 py-2 px-4 rounded-xl`}
                    onPress={() => handleAfterPhoto(customer.id)}
                  >
                    <Text style={tw`text-white text-sm font-semibold`}>After 촬영</Text>
                  </TouchableOpacity>
                ) : customer.afterImage ? (
                  <Image
                    source={{ uri: customer.afterImage }}
                    style={tw`w-12 h-12 rounded-lg`}
                    resizeMode="cover"
                  />
                ) : null}
              </View>
            </View>

            {/* 액션 버튼들 */}
            <View style={tw`flex-row mt-4 space-x-2`}>
              <Link href={`/designer/${id}/customer/${customer.id}/history`} asChild>
                <TouchableOpacity style={tw`flex-1 bg-gray-100 py-2 rounded-xl`}>
                  <Text style={tw`text-gray-700 text-center font-medium`}>기록 보기</Text>
                </TouchableOpacity>
              </Link>
              <Link href={`/designer/${id}/customer/${customer.id}/new-record`} asChild>
                <TouchableOpacity style={tw`flex-1 bg-pink-500 py-2 rounded-xl`}>
                  <Text style={tw`text-white text-center font-medium`}>새 기록</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}

        {filteredCustomers.length === 0 && (
          <View style={tw`bg-white rounded-2xl p-8 items-center`}>
            <Text style={tw`text-4xl mb-4`}>📋</Text>
            <Text style={tw`text-gray-600 text-center`}>
              {activeTab === 'in-progress' ? '진행 중인 고객이 없습니다' : '완료된 고객이 없습니다'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 하단 네비게이션 */}
      <View style={tw`p-6`}>
        <Link href="/" asChild>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl`}>
            <Text style={tw`text-gray-600 text-center`}>대시보드로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
