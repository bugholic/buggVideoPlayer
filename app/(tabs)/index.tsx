import VideoScreen from "@/components/VideoScreen";
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from "react";
import { Button, View } from "react-native";



export default function HomeScreen() {

  const [videos, setVideos] = useState<MediaLibrary.Asset[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);


  const getVideos = async () => {
    const videoAssets = await MediaLibrary.getAssetsAsync({
      mediaType: 'video',
      sortBy: ['creationTime'],
    });
  
    console.log(videoAssets.assets); // Array of video files
    setVideos(videoAssets.assets);
  };


  return (
    <View>
      <Button title="Get Videos" onPress={getVideos} />
      {videos.map((video) => (
        <VideoScreen key={video.id} videoSource={video.uri} />
      ))}
      </View>
  );
}
