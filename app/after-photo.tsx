import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';

export default function AfterPhotoScreen() {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleTakePhoto = () => {
    Alert.alert('After 사진 촬영', '시술 완료 후 사진을 촬영하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '촬영하기',
        onPress: () => {
          setHasPhoto(true);
          setPhotoUri('https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=After+Photo');
        },
      },
    ]);
  };

  const handleRetakePhoto = () => {
    setHasPhoto(false);
    setPhotoUri(null);
  };

  const handleSaveAndComplete = () => {
    setIsSaving(true);

    // 저장 시뮬레이션
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        '저장 완료',
        '시술 기록이 성공적으로 저장되었습니다!\n고객님의 헤어스타일이 완성되었습니다.',
        [{ text: '확인', onPress: () => console.log('시술 완료') }]
      );
    }, 2000);
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>시술 완료</Text>
        <Text style={tw`text-base text-center text-gray-600`}>
          완성된 헤어스타일을 촬영해주세요
        </Text>
      </View>

      {/* 사진 촬영 영역 */}
      <View style={tw`flex-1 px-6`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4 text-center`}>
            After 사진 촬영
          </Text>

          {hasPhoto ? (
            <View>
              <Image
                source={{ uri: photoUri! }}
                style={tw`w-64 h-80 rounded-xl bg-gray-200 mb-6 self-center`}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={tw`bg-red-500 py-3 px-6 rounded-xl mb-4`}
                onPress={handleRetakePhoto}
              >
                <Text style={tw`text-white font-semibold text-center`}>다시 촬영하기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw`items-center`}>
              <View style={tw`w-48 h-60 rounded-xl bg-gray-200 items-center justify-center mb-6`}>
                <Text style={tw`text-6xl mb-4`}>📷</Text>
                <Text style={tw`text-gray-600 text-center`}>완성된 스타일을{'\n'}촬영해주세요</Text>
              </View>
              <TouchableOpacity
                style={tw`bg-pink-500 py-4 px-8 rounded-xl`}
                onPress={handleTakePhoto}
              >
                <Text style={tw`text-white text-lg font-semibold`}>사진 촬영하기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 시술 정보 */}
        <View style={tw`px-6 mb-6`}>
          <View style={tw`bg-blue-50 rounded-2xl p-4`}>
            <Text style={tw`text-blue-800 font-semibold mb-2`}>📋 시술 정보</Text>
            <Text style={tw`text-blue-700 text-sm`}>
              • 디자이너: 김민지{'\n'}• 스타일: 자연스러운 웨이브{'\n'}• 소요시간: 2시간 30분{'\n'}•
              비용: 80,000원
            </Text>
          </View>
        </View>

        {/* 저장 버튼 */}
        {hasPhoto && (
          <View style={tw`px-6`}>
            <TouchableOpacity
              style={tw`bg-green-500 py-4 rounded-xl ${isSaving ? 'opacity-50' : 'opacity-100'}`}
              onPress={handleSaveAndComplete}
              disabled={isSaving}
            >
              <Text style={tw`text-white text-lg font-semibold text-center`}>
                {isSaving ? '저장 중...' : '저장하고 완료하기'}
              </Text>
            </TouchableOpacity>

            {isSaving && (
              <View style={tw`mt-4`}>
                <Text style={tw`text-center text-gray-600`}>시술 기록을 저장하고 있습니다...</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* 하단 네비게이션 */}
      <View style={tw`p-6`}>
        <Link href="/" asChild>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl`}>
            <Text style={tw`text-gray-600 text-center`}>홈으로 돌아가기 (테스트)</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
