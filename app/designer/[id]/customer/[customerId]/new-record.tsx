import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

export default function NewRecordScreen() {
  const { id, customerId } = useLocalSearchParams();
  const [memo, setMemo] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRecord = () => {
    if (memo.trim() === '') {
      Alert.alert('오류', '상담 내용을 입력해주세요.');
      return;
    }

    setIsSaving(true);

    // 실제로는 API 호출
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('저장 완료', '새로운 기록이 저장되었습니다.', [
        {
          text: '확인',
          onPress: () => console.log('기록 저장 완료'),
        },
      ]);
    }, 1500);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  const formattedTime = currentDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>새 기록 추가</Text>
        <Text style={tw`text-base text-center text-gray-600`}>
          고객과의 상담 내용을 기록해주세요
        </Text>
      </View>

      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {/* 고객 정보 */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>고객 정보</Text>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-12 h-12 rounded-full bg-pink-100 items-center justify-center mr-4`}>
              <Text style={tw`text-xl`}>👩</Text>
            </View>
            <View>
              <Text style={tw`text-lg font-bold text-gray-800`}>김영희</Text>
              <Text style={tw`text-gray-600`}>010-1234-5678</Text>
            </View>
          </View>
        </View>

        {/* 시술 정보 */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>시술 정보</Text>
          <View style={tw`space-y-3`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-700`}>날짜</Text>
              <Text style={tw`text-gray-800 font-medium`}>{formattedDate}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-700`}>시간</Text>
              <Text style={tw`text-gray-800 font-medium`}>{formattedTime}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-700`}>디자이너</Text>
              <Text style={tw`text-gray-800 font-medium`}>김민지</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-700`}>상태</Text>
              <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
                <Text style={tw`text-blue-800 text-sm font-semibold`}>상담 중</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 상담 내용 입력 */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>상담 내용</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-xl px-4 py-4 text-base min-h-32`}
            placeholder="고객이 원하는 스타일, 상담 내용, 특이사항 등을 기록해주세요..."
            value={memo}
            onChangeText={setMemo}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* AI 이미지 생성 안내 */}
        <View style={tw`bg-blue-50 rounded-2xl p-6 shadow-lg mb-6`}>
          <Text style={tw`text-blue-800 font-semibold mb-2`}>🤖 AI 이미지 생성</Text>
          <Text style={tw`text-blue-700 text-sm leading-5 mb-4`}>
            Before 사진을 촬영하고 원하는 스타일을 설명하면, AI가 3가지 스타일 후보를
            생성해드립니다.
          </Text>
          <Link href={`/designer/${id}/customer/${customerId}/ai-image-generation`} asChild>
            <TouchableOpacity style={tw`bg-blue-500 py-3 rounded-xl`}>
              <Text style={tw`text-white text-center font-semibold`}>AI 이미지 생성하기</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={tw`p-6`}>
        <TouchableOpacity
          style={tw`bg-pink-500 py-4 rounded-xl ${isSaving ? 'opacity-50' : 'opacity-100'}`}
          onPress={handleSaveRecord}
          disabled={isSaving}
        >
          <Text style={tw`text-white text-lg font-semibold text-center`}>
            {isSaving ? '저장 중...' : '기록 저장하기'}
          </Text>
        </TouchableOpacity>

        <Link href={`/designer/${id}/customer/${customerId}/history`} asChild>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl mt-3`}>
            <Text style={tw`text-gray-600 text-center`}>이전 기록으로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
