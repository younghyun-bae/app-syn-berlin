import React, { useCallback } from 'react';
import { Link } from 'expo-router';
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
// import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/native';

SplashScreen.preventAutoHideAsync();

const IntroScreen = () => {

    const [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_400Regular_Italic,
        DMSans_500Medium,
        DMSans_500Medium_Italic,
        DMSans_700Bold,
        DMSans_700Bold_Italic,
    })

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
                <LogoImage source={require('../assets/images/SYN_black.png')} />
                <StartContainer>
                    <IntroText style={{ letterSpacing: -0.5 }}>
                        Unleash Potential, {"\n"}
                        Connect, and Create in Berlin
                    </IntroText>
                    <SubmitButton>
                        <LinkText href="/login"  style={{ letterSpacing: -0.5 }}>
                            Get Started
                        </LinkText>
                    </SubmitButton>
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

const LogoImage = styled.Image`
    width: 240px;
    height: 144px;
    margin-bottom: 10px;
`;

const StartContainer = styled.View`
    width: 320px;
    align-items: center;
`;

const IntroText = styled.Text`
    font-size: 20px;
    font-family: 'DMSans_500Medium';
    text-align: center;
    margin-bottom: 80px;
    color: #232323;
`;

const SubmitButton = styled.TouchableOpacity`
        background-color: #212121;
        padding: 12px;
        align-items: center;
        border-radius: 30px;
        margin-top: 20px;
        width: 100%;
`;

const LinkText = styled(Link)`
    font-family: 'DMSans_700Bold';
    font-size: 18px;
    color: #ffffff;
`;

export default IntroScreen;