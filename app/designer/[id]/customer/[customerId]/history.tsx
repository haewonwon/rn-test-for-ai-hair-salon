import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

// 임시 고객 기록 데이터
const customerHistory = [
  {
    id: 1,
    date: '2024-01-15',
    time: '14:30',
    style: '자연스러운 웨이브',
    designer: '김민지',
    status: 'completed',
    beforeImage: 'https://via.placeholder.com/100x120/FF6B9D/FFFFFF?text=Before',
    afterImage: 'https://via.placeholder.com/100x120/4ECDC4/FFFFFF?text=After',
    price: 80000,
    memo: '고객이 자연스러운 웨이브를 원함. 얼굴형에 잘 맞는 스타일로 완성.',
    rating: 5,
  },
  {
    id: 2,
    date: '2023-12-20',
    time: '10:00',
    style: '레이어드 컷',
    designer: '김민지',
    status: 'completed',
    beforeImage: 'https://via.placeholder.com/100x120/FF6B9D/FFFFFF?text=Before',
    afterImage: 'https://via.placeholder.com/100x120/4ECDC4/FFFFFF?text=After',
    price: 60000,
    memo: '볼륨감을 원하는 고객. 레이어드로 볼륨 업 효과.',
    rating: 4,
  },
  {
    id: 3,
    date: '2023-11-10',
    time: '16:00',
    style: '스트레이트 펌',
    designer: '김민지',
    status: 'completed',
    beforeImage: 'https://via.placeholder.com/100x120/FF6B9D/FFFFFF?text=Before',
    afterImage: 'https://via.placeholder.com/100x120/4ECDC4/FFFFFF?text=After',
    price: 120000,
    memo: '직모 고객. 스트레이트 펌으로 매끈한 스타일 완성.',
    rating: 5,
  },
];

export default function CustomerHistoryScreen() {
  const { id, customerId } = useLocalSearchParams();

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>고객 기록</Text>
        <Text style={tw`text-base text-center text-gray-600`}>김영희님의 이전 시술 기록</Text>
      </View>

      {/* 고객 정보 요약 */}
      <View style={tw`px-6 mb-6`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-16 h-16 rounded-full bg-pink-100 items-center justify-center mr-4`}>
              <Text style={tw`text-2xl`}>👩</Text>
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-xl font-bold text-gray-800`}>김영희</Text>
              <Text style={tw`text-gray-600`}>010-1234-5678</Text>
              <Text style={tw`text-sm text-gray-500`}>
                총 {customerHistory.length}회 방문 • 평균 별점 4.7
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 시술 기록 목록 */}
      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {customerHistory.map((record) => (
          <View key={record.id} style={tw`bg-white rounded-2xl p-6 mb-4 shadow-lg`}>
            {/* 날짜 및 상태 */}
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <View>
                <Text style={tw`text-lg font-bold text-gray-800`}>
                  {record.date} {record.time}
                </Text>
                <Text style={tw`text-pink-600 font-semibold`}>{record.style}</Text>
              </View>
              <View style={tw`items-end`}>
                <View style={tw`bg-green-100 px-3 py-1 rounded-full mb-1`}>
                  <Text style={tw`text-green-800 text-sm font-semibold`}>완료</Text>
                </View>
                <Text style={tw`text-gray-600 text-sm`}>{record.price.toLocaleString()}원</Text>
              </View>
            </View>

            {/* Before/After 이미지 */}
            <View style={tw`flex-row items-center mb-4`}>
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-sm text-gray-600 mb-2`}>Before</Text>
                <Image
                  source={{ uri: record.beforeImage }}
                  style={tw`w-20 h-24 rounded-lg bg-gray-200`}
                  resizeMode="cover"
                />
              </View>
              <Text style={tw`text-2xl mx-4`}>→</Text>
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-sm text-gray-600 mb-2`}>After</Text>
                <Image
                  source={{ uri: record.afterImage }}
                  style={tw`w-20 h-24 rounded-lg bg-gray-200`}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* 메모 */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-sm font-semibold text-gray-700 mb-1`}>디자이너 메모</Text>
              <Text style={tw`text-sm text-gray-600`}>{record.memo}</Text>
            </View>

            {/* 별점 */}
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-sm text-gray-700 mr-2`}>고객 만족도:</Text>
              <View style={tw`flex-row`}>
                {[...Array(5)].map((_, i) => (
                  <Text key={i} style={tw`text-yellow-500`}>
                    {i < record.rating ? '⭐' : '☆'}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={tw`p-6`}>
        <Link href={`/designer/${id}/customer/${customerId}/new-record`} asChild>
          <TouchableOpacity style={tw`bg-pink-500 py-4 rounded-xl`}>
            <Text style={tw`text-white text-lg font-semibold text-center`}>새 기록 추가하기</Text>
          </TouchableOpacity>
        </Link>

        <Link href={`/designer/${id}/customer-login`} asChild>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl mt-3`}>
            <Text style={tw`text-gray-600 text-center`}>고객 조회로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
