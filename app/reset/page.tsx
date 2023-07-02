"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@supabase/supabase-js";
import {
    Box,
    Text,
    Input,
    Button,
    Alert,
    AlertIcon,
    IconButton,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const supabase = createClient("https://yccxlnodtgrnbcfdjqcg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljY3hsbm9kdGdybmJjZmRqcWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzczMDg1MTgsImV4cCI6MTk5Mjg4NDUxOH0.-NHr0UdUhoSZPOhXfEO6uYiUmsWpuYCXpYQrdzZppbs");

export default function Home() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

            setIsLoading(true); // Set isLoading to true when the button is clicked

            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });
            if (error) {
                throw new Error(error.message);
            }

            setSuccess(true);
            router.push("/success");
        } catch (error) {
            // setError(error.message);
        } finally {
            setIsLoading(false); // Set isLoading back to false when the operation is complete
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
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
                    Reset Passwords
                </Text>
                <InputGroup marginBottom="10px">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputRightElement width="3rem">
                        <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            icon={showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            onClick={handleTogglePasswordVisibility}
                            variant="unstyled"
                        />
                    </InputRightElement>
                </InputGroup>
                <InputGroup marginBottom="20px">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="3rem">
                        <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            icon={showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            onClick={handleTogglePasswordVisibility}
                            variant="unstyled"
                        />
                    </InputRightElement>
                </InputGroup>
                <Button colorScheme="blue" onClick={handleResetPassword} isLoading={isLoading} marginBottom="70px">
                    {isLoading ? 'Loading...' : 'Reset'}
                </Button>
                <Text fontSize="sm" color="gray.500" marginTop="20px" alignItems="center" justifyContent="center">
                    © 2023 Essemu Coffee & Kitchen. All rights reserved.
                </Text>
            </Box>
        </>
    );
}
