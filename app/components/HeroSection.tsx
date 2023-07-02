import Head from 'next/head';
import {
    Box,
    Flex,
    Image,
    Text,
    createIcon,
} from '@chakra-ui/react';

export default function HeroSection() {
    const doneImage = "https://img.uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/done-icon.svg";
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Box
                borderRadius="12px"
                margin={{ base: "20px", md: "120px" }}
                backgroundColor="white"
                boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                padding="24px"
                position="relative"
                overflow="hidden"
                textAlign="center"

            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
                >
                    <path
                        fill="#E1E8FF"
                        d="M0,96L60,122.7C120,149,240,203,360,202.7C480,203,600,149,720,144C840,139,960,181,1080,165.3C1200,149,1320,75,1380,37.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>

                <Flex alignItems="center" marginBottom="20px" justifyContent="center">
                    <Image src={doneImage} alt="Checklist" width="60px" marginRight="10px" />

                </Flex>
                <Text fontSize="lg" fontWeight="bold" color="blue.500" marginBottom="10px" alignItems="center" justifyContent="center">
                    Verified
                </Text>
                <Text fontSize="md" color="gray.700" marginBottom="70px" alignItems="center" justifyContent="center">
                    You have successfully verified your account.
                </Text>

                <Text fontSize="sm" color="gray.500" marginTop="20px" alignItems="center" justifyContent="center">
                    © 2023 Essemu Coffee & Kitchen. All rights reserved.
                </Text>
            </Box>
        </>
    );
}

