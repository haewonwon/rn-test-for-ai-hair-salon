import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

export default function AIImageGenerationScreen() {
  const { id, customerId } = useLocalSearchParams();
  const [hasBeforePhoto, setHasBeforePhoto] = useState(false);
  const [beforePhotoUri, setBeforePhotoUri] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);

  const handleTakeBeforePhoto = () => {
    Alert.alert('Before 사진 촬영', '현재 헤어스타일을 촬영하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '촬영하기',
        onPress: () => {
          setHasBeforePhoto(true);
          setBeforePhotoUri('https://via.placeholder.com/200x250/FF6B9D/FFFFFF?text=Before+Photo');
        },
      },
    ]);
  };

  const handleGenerateImages = () => {
    if (!hasBeforePhoto) {
      Alert.alert('오류', 'Before 사진을 먼저 촬영해주세요.');
      return;
    }
    if (prompt.trim() === '') {
      Alert.alert('오류', '원하는 스타일을 설명해주세요.');
      return;
    }

    setIsGenerating(true);

    // AI 이미지 생성 시뮬레이션
    setTimeout(() => {
      setGeneratedImages([
        {
          id: 1,
          title: '자연스러운 웨이브',
          confidence: 95,
          image: 'https://via.placeholder.com/150x200/FF6B9D/FFFFFF?text=Style+1',
          description: '얼굴형에 맞는 자연스러운 웨이브',
        },
        {
          id: 2,
          title: '모던한 레이어드',
          confidence: 88,
          image: 'https://via.placeholder.com/150x200/4ECDC4/FFFFFF?text=Style+2',
          description: '트렌디한 레이어드 컷',
        },
        {
          id: 3,
          title: '시크한 스트레이트',
          confidence: 92,
          image: 'https://via.placeholder.com/150x200/45B7D1/FFFFFF?text=Style+3',
          description: '깔끔하고 세련된 스트레이트',
        },
      ]);
      setIsGenerating(false);
    }, 3000);
  };

  const handleSelectImage = (imageId: number) => {
    Alert.alert('스타일 선택', '선택하신 스타일로 시술을 진행하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: () => {
          console.log('선택된 스타일:', imageId);
          // 선택된 스타일 저장 로직
        },
      },
    ]);
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>AI 이미지 생성</Text>
        <Text style={tw`text-base text-center text-gray-600`}>
          Before 사진과 스타일 설명으로 AI가 추천해드립니다
        </Text>
      </View>

      <View style={tw`flex-1 px-6`}>
        {/* Before 사진 촬영 */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>Before 사진 촬영</Text>

          {hasBeforePhoto ? (
            <View style={tw`items-center`}>
              <Image
                source={{ uri: beforePhotoUri! }}
                style={tw`w-32 h-40 rounded-xl bg-gray-200 mb-4`}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={tw`bg-red-500 py-2 px-4 rounded-xl`}
                onPress={() => {
                  setHasBeforePhoto(false);
                  setBeforePhotoUri(null);
                }}
              >
                <Text style={tw`text-white font-semibold`}>다시 촬영하기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw`items-center`}>
              <View style={tw`w-32 h-40 rounded-xl bg-gray-200 items-center justify-center mb-4`}>
                <Text style={tw`text-4xl mb-2`}>📷</Text>
                <Text style={tw`text-gray-600 text-center`}>사진을 촬영해주세요</Text>
              </View>
              <TouchableOpacity
                style={tw`bg-pink-500 py-3 px-6 rounded-xl`}
                onPress={handleTakeBeforePhoto}
              >
                <Text style={tw`text-white font-semibold`}>사진 촬영하기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 스타일 설명 입력 */}
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>원하는 스타일 설명</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-xl px-4 py-4 text-base min-h-24`}
            placeholder="예: 자연스러운 웨이브로 어깨까지 길이의 레이어드 컷을 원해요"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* AI 이미지 생성 버튼 */}
        <TouchableOpacity
          style={tw`bg-blue-500 py-4 rounded-xl mb-6 ${
            !hasBeforePhoto || prompt.trim() === '' || isGenerating ? 'opacity-50' : 'opacity-100'
          }`}
          onPress={handleGenerateImages}
          disabled={!hasBeforePhoto || prompt.trim() === '' || isGenerating}
        >
          <Text style={tw`text-white text-lg font-semibold text-center`}>
            {isGenerating ? 'AI 이미지 생성 중...' : 'AI 이미지 생성하기'}
          </Text>
        </TouchableOpacity>

        {/* 생성된 이미지들 */}
        {generatedImages.length > 0 && (
          <View style={tw`bg-white rounded-2xl p-6 shadow-lg mb-6`}>
            <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>AI 추천 스타일</Text>
            <View style={tw`flex-row justify-between`}>
              {generatedImages.map((image) => (
                <TouchableOpacity
                  key={image.id}
                  style={tw`flex-1 items-center mx-1`}
                  onPress={() => handleSelectImage(image.id)}
                >
                  <Image
                    source={{ uri: image.image }}
                    style={tw`w-20 h-24 rounded-lg bg-gray-200 mb-2`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-xs font-semibold text-gray-800 text-center mb-1`}>
                    {image.title}
                  </Text>
                  <Text style={tw`text-xs text-green-600 font-semibold`}>{image.confidence}%</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* 하단 네비게이션 */}
      <View style={tw`p-6`}>
        <Link href={`/designer/${id}/customer/${customerId}/new-record`} asChild>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl`}>
            <Text style={tw`text-gray-600 text-center`}>새 기록으로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
