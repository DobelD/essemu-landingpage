"use client"
import { useState } from 'react';
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://yccxlnodtgrnbcfdjqcg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljY3hsbm9kdGdybmJjZmRqcWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzczMDg1MTgsImV4cCI6MTk5Mjg4NDUxOH0.-NHr0UdUhoSZPOhXfEO6uYiUmsWpuYCXpYQrdzZppbs");
import Head from 'next/head';
import {
    Box,
    Text,
    Input,
    Button,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
export default function Home() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const handleResetPassword = async () => {

        try {
            if (newPassword === '' || confirmPassword === '') {
                setError('Password cannot be empty.');
                return;
            }
            if (newPassword.length < 6) {
                setError('Password must be at least 6 characters long.');
                return;
            }
            if (newPassword !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });
            useRouter().push("/success");
            if (error) {
                throw new Error(error.message);
            }

            setSuccess(true);
        } catch (error) {
            // setError(error!.message!);
        }
    };
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

                {error && (
                    <Alert status="error" marginBottom="20px">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <Text fontSize="lg" fontWeight="bold" color="blue.500" marginBottom="10px" alignItems="center" justifyContent="center">
                    Reset Password
                </Text>
                <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    marginBottom="10px"
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    marginBottom="20px"
                />
                <Button colorScheme="blue" onClick={handleResetPassword} marginBottom="70px">
                    Reset
                </Button>
                <Text fontSize="sm" color="gray.500" marginTop="20px" alignItems="center" justifyContent="center">
                    © 2023 Essemu Coffee & Kitchen. All rights reserved.
                </Text>
            </Box>
        </>
    )
}
