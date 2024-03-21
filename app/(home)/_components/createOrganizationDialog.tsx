"use client";

import { useUser } from "@clerk/nextjs";
import { Box, Button, Input, Text } from "@yamada-ui/react";
import { useState } from "react";

const CreateOrganizationDialog = () => {
  const [name, setName] = useState("");
  const user = useUser();
  console.log(user);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("組織名:", name);
    //ここでsupabaseに組織名を保存
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} boxShadow="md" rounded="md">
      <Text mb={2}>組織の作成</Text>
      <Input
        placeholder="組織名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={5}
      />
      <Text mb={2}>作成者</Text>
      <Text
        w="full"
        fontSize="xl"
        fontWeight="bold"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        border="solid"
        borderColor="#dcdcde"
        borderRadius={5}
        borderWidth={1}
        textAlign="center"
        mb={2}
      >
        {user.user?.fullName}
      </Text>
      <Button type="submit">作成</Button>
    </Box>
  );
};

export default CreateOrganizationDialog;
