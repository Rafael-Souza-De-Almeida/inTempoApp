"use client";

import { useIsLoggedIn } from "../login/LoginContext";
import { SplittedContainer } from "../post/SplittedContainer";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CreateComment {
  profile_pic: string | null | undefined;
  name: string | undefined;
}

export function CreateComment({ profile_pic, name }: CreateComment) {
  const { isLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn) {
    return <p>Faça login para adicionar um comentário</p>;
  }

  return (
    <SplittedContainer
      profile_pic={profile_pic}
      name={name}
      classname="space-y-2 w-full"
    >
      <Textarea className="pb-12" placeholder="Diga algo sobre esse post..." />
      <Button className="w-full">Adicionar comentário</Button>
    </SplittedContainer>
  );
}
