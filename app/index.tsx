import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';

const designers = [
  {
    id: 1,
    name: '김민지',
    specialty: '커트 전문',
    experience: '8년',
    rating: 4.9,
    avatar: '👩‍💼',
    color: 'from-pink-500 to-rose-500',
    customers: 12,
    todayAppointments: 3,
  },
  {
    id: 2,
    name: '박서연',
    specialty: '컬러 전문',
    experience: '6년',
    rating: 4.8,
    avatar: '👩‍🎨',
    color: 'from-purple-500 to-indigo-500',
    customers: 8,
    todayAppointments: 2,
  },
  {
    id: 3,
    name: '이지은',
    specialty: '펌 전문',
    experience: '10년',
    rating: 5.0,
    avatar: '👩‍🦱',
    color: 'from-blue-500 to-cyan-500',
    customers: 15,
    todayAppointments: 4,
  },
];

export default function DashboardScreen() {
  const [selectedDesigner, setSelectedDesigner] = useState<number | null>(null);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-4xl font-bold text-center text-gray-800 mb-2`}>헤어테크</Text>
        <Text style={tw`text-lg text-center text-gray-600`}>미용실 대시보드</Text>
      </View>

      {/* 디자이너 선택 */}
      <View style={tw`px-6 mb-6`}>
        <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>디자이너를 선택하세요</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {designers.map((designer) => (
            <TouchableOpacity
              key={designer.id}
              style={tw`bg-white rounded-2xl p-6 mr-4 shadow-lg min-w-64 ${
                selectedDesigner === designer.id
                  ? 'border-2 border-pink-500'
                  : 'border border-gray-200'
              }`}
              onPress={() => setSelectedDesigner(designer.id)}
            >
              <View style={tw`items-center`}>
                <Text style={tw`text-4xl mb-3`}>{designer.avatar}</Text>
                <Text style={tw`text-xl font-bold text-gray-800 mb-1`}>{designer.name}</Text>
                <Text style={tw`text-pink-600 font-semibold mb-2`}>
                  {designer.specialty} • {designer.experience}
                </Text>
                <View style={tw`flex-row items-center mb-3`}>
                  <Text style={tw`text-yellow-500 mr-1`}>⭐</Text>
                  <Text style={tw`text-gray-600 font-medium`}>{designer.rating}</Text>
                </View>
                <View style={tw`flex-row justify-between w-full`}>
                  <View style={tw`items-center`}>
                    <Text style={tw`text-2xl font-bold text-gray-800`}>{designer.customers}</Text>
                    <Text style={tw`text-sm text-gray-600`}>고객</Text>
                  </View>
                  <View style={tw`items-center`}>
                    <Text style={tw`text-2xl font-bold text-pink-600`}>
                      {designer.todayAppointments}
                    </Text>
                    <Text style={tw`text-sm text-gray-600`}>오늘 예약</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 선택된 디자이너 액션 */}
      {selectedDesigner && (
        <View style={tw`px-6 mb-6`}>
          <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
            <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>
              {designers.find((d) => d.id === selectedDesigner)?.name} 디자이너
            </Text>
            <View style={tw`flex-row space-x-4`}>
              <Link href={`/designer/${selectedDesigner}/customer-login`} asChild>
                <TouchableOpacity style={tw`flex-1 bg-pink-500 py-4 rounded-xl`}>
                  <Text style={tw`text-white text-center font-semibold`}>고객 등록/조회</Text>
                </TouchableOpacity>
              </Link>
              <Link href={`/designer/${selectedDesigner}/customers`} asChild>
                <TouchableOpacity style={tw`flex-1 bg-gray-100 py-4 rounded-xl`}>
                  <Text style={tw`text-gray-700 text-center font-semibold`}>고객 목록</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      )}

      {/* 오늘의 통계 */}
      <View style={tw`px-6`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>오늘의 통계</Text>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-green-600`}>9</Text>
              <Text style={tw`text-sm text-gray-600`}>완료된 시술</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-blue-600`}>3</Text>
              <Text style={tw`text-sm text-gray-600`}>진행 중</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-purple-600`}>5</Text>
              <Text style={tw`text-sm text-gray-600`}>예약 대기</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
