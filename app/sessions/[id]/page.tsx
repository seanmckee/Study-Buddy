import { getSession } from "@/lib/actions/user.actions";
import React from "react";

const page = async ({ params: { id } }: any) => {
  const session = await getSession(id);
  return (
    <div>
      <h1>{session.name}</h1>
      <p>{session.description}</p>
      <p>{session.document_text}</p>
    </div>
  );
};

export default page;
