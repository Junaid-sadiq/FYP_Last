import React from "react";
import { View, Text, ScrollView } from "react-native";

//import styles and assets
import styled from "styled-components";
import * as Typography from "../../config/Typography";

const Description = () => {
  return (
    <Container>
      <ScrollView>
        <Typography.H1>Accommodation description</Typography.H1>
        <Spacing />
        <Typography.P>
          Located in the western part of Jeju, it is a quiet and Jeju-style
          stone wall in a stylish area. A small hotel in front of Gwideok-ri
          Beach, where you can see the sea from the hotel. Accommodation. 30
          minutes by car from Jeju Airport, 8 minutes on foot There is a bus
          stop on the street and a convenience store is a 10-minute walk away.
        </Typography.P>
        <Spacing />
        <Typography.P>
          Located in the western part of Jeju, it is a quiet and Jeju-style
          stone wall in a stylish area. A small hotel in front of Gwideok-ri
          Beach, where you can see the sea from the hotel. Accommodation. 30
          minutes by car from Jeju Airport, 8 minutes on foot There is a bus
          stop on the street and a convenience store is a 10-minute walk away.
        </Typography.P>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
`;

const Spacing = styled.View`
  padding: 10px 0;
`;

export default Description;
