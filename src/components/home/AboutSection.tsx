import React from 'react';
import styled from 'styled-components/native';

const AboutSection = () => {
    return (
        <Container>
            <AboutText>
                SYN BERLIN is a platform for talents based in Berlin to network and collaborate easily. Freelancers, artists, developers, and designers can register their profiles and connect with one another. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis excepturi culpa officiis vitae perspiciatis iusto architecto amet, hic numquam accusantium placeat cum explicabo sit dolores quam sapiente eum alias? Harum.
            </AboutText>
        </Container>
    );
};

const Container = styled.View`
    margin-horizontal: 24px;
    margin-bottom: 30px;
`;

const AboutText = styled.Text`
    font-size: 14px;
    color: #5A5A5F;
`;

export default AboutSection;
