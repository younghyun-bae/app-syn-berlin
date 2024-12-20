import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { 
    DMSans_400Regular, 
    DMSans_400Regular_Italic, 
    DMSans_500Medium, 
    DMSans_500Medium_Italic, 
    DMSans_700Bold, 
    DMSans_700Bold_Italic 
} from '@expo-google-fonts/dm-sans';
import styled, { ThemeProvider } from 'styled-components/native';

import Logo from './Logo';
import IntroTextSection from './IntroTextSection';
import SubmitBtn from './SubmitBtn';

SplashScreen.preventAutoHideAsync();

const IntroScreen = () => {
    const [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_400Regular_Italic,
        DMSans_500Medium,
        DMSans_500Medium_Italic,
        DMSans_700Bold,
        DMSans_700Bold_Italic,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider theme={{ fontFamily: 'DMSans_400Regular' }}>
            <Container onLayout={onLayoutRootView}>
                <Logo />
                <StartContainer>
                    <IntroTextSection />
                    <SubmitBtn />
                </StartContainer>
            </Container>
        </ThemeProvider>
    );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #CDDC52;
`;

const StartContainer = styled.View`
    width: 320px;
    align-items: center;
`;

export default IntroScreen;
