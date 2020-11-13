import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
export default function modal() {
  return (
    <View>
      {fotoCapturada && (
        <Modal animationType="slide" transparent={false} visible={abrir}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <View style={{ margin: 10, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => setAbrir(false)}
              >
                <FontAwesome name="window-close" size={50} color="#FF0000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => savePicture()}
              >
                <FontAwesome name="upload" size={50} color="#121212" />
              </TouchableOpacity>
            </View>
            <Video
              source={{ uri: fotoCapturada }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping
              useNativeControls
              style={{ width: "100%", height: "80%", flex: 1, zIndex: 1 }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}
