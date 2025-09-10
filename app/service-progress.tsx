import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';

const serviceSteps = [
  { id: 1, name: '상담 및 분석', duration: '15분', completed: true },
  { id: 2, name: '세정 및 준비', duration: '10분', completed: true },
  { id: 3, name: '커트 진행', duration: '30분', completed: false },
  { id: 4, name: '펌/컬러 진행', duration: '45분', completed: false },
  { id: 5, name: '스타일링', duration: '20분', completed: false },
  { id: 6, name: '완성 및 체크', duration: '10분', completed: false },
];

export default function ServiceProgressScreen() {
  const [currentStep, setCurrentStep] = useState(3);
  const [isServiceActive, setIsServiceActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isServiceActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isServiceActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStep < serviceSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteService = () => {
    Alert.alert('시술 완료', '시술이 완료되었습니다. After 사진을 촬영하시겠습니까?', [
      { text: '나중에', style: 'cancel' },
      { text: '지금 촬영', onPress: () => console.log('After 사진 촬영으로 이동') },
    ]);
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* 헤더 */}
      <View style={tw`pt-16 pb-6 px-6`}>
        <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>시술 진행 상황</Text>
        <Text style={tw`text-base text-center text-gray-600`}>현재 시술이 진행 중입니다</Text>
      </View>

      {/* 진행 시간 */}
      <View style={tw`px-6 mb-6`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-2 text-center`}>경과 시간</Text>
          <Text style={tw`text-3xl font-bold text-center text-pink-600 mb-2`}>
            {formatTime(elapsedTime)}
          </Text>
          <Text style={tw`text-sm text-gray-600 text-center`}>시술 시작: 14:30</Text>
        </View>
      </View>

      {/* 현재 진행 중인 단계 */}
      <View style={tw`px-6 mb-6`}>
        <View style={tw`bg-pink-100 rounded-2xl p-6`}>
          <Text style={tw`text-lg font-semibold text-pink-800 mb-2`}>현재 진행 중</Text>
          <Text style={tw`text-xl font-bold text-pink-900 mb-1`}>
            {serviceSteps[currentStep - 1]?.name}
          </Text>
          <Text style={tw`text-pink-700`}>
            예상 소요시간: {serviceSteps[currentStep - 1]?.duration}
          </Text>
        </View>
      </View>

      {/* 시술 단계 목록 */}
      <View style={tw`flex-1 px-6`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
          <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>시술 단계</Text>
          {serviceSteps.map((step, index) => (
            <View key={step.id} style={tw`flex-row items-center py-3`}>
              {/* 단계 번호 */}
              <View
                style={tw`w-8 h-8 rounded-full items-center justify-center mr-4 ${
                  step.completed
                    ? 'bg-green-500'
                    : step.id === currentStep
                    ? 'bg-pink-500'
                    : 'bg-gray-300'
                }`}
              >
                <Text style={tw`text-white font-bold text-sm`}>
                  {step.completed ? '✓' : step.id}
                </Text>
              </View>

              {/* 단계 정보 */}
              <View style={tw`flex-1`}>
                <Text
                  style={tw`text-base font-medium text-gray-800 ${
                    step.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {step.name}
                </Text>
                <Text style={tw`text-sm text-gray-600`}>{step.duration}</Text>
              </View>

              {/* 상태 표시 */}
              {step.completed && <Text style={tw`text-green-600 font-semibold text-sm`}>완료</Text>}
              {step.id === currentStep && !step.completed && (
                <Text style={tw`text-pink-600 font-semibold text-sm`}>진행중</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={tw`p-6`}>
        {currentStep < serviceSteps.length ? (
          <TouchableOpacity style={tw`bg-pink-500 py-4 rounded-xl`} onPress={handleNextStep}>
            <Text style={tw`text-white text-lg font-semibold text-center`}>다음 단계로</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw`bg-green-500 py-4 rounded-xl`}
            onPress={handleCompleteService}
          >
            <Text style={tw`text-white text-lg font-semibold text-center`}>시술 완료</Text>
          </TouchableOpacity>
        )}

        {/* 테스트용 링크 */}
        <Link href="/after-photo" asChild>
          <TouchableOpacity style={tw`bg-gray-100 py-3 rounded-xl mt-3`}>
            <Text style={tw`text-gray-600 text-center`}>After 사진 촬영으로 이동 (테스트)</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
