import { type ReactElement } from "react";

import { Button, TextInput } from "@space-metaverse-ag/space-ui";
import Layout from "layouts/profile";
import Head from "next/head";
import styled from "styled-components";

import type { NextPageWithLayout } from "../../types";

const Form = styled.div`
  gap: 1rem;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 4rem;
  flex-direction: column;

  .is-grid {
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Actions = styled.div`
  gap: 0.75rem;
  padding: 1.25rem 0;
  display: flex;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 37.5rem;
  flex-direction: column;
`;

const Label = styled.label`
  text-transform: uppercase;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #111114;
`;

const Security: NextPageWithLayout = () => {
  return (
    <>
      <Container>
        <Label>Change Password</Label>

        <Form>
          <div className="is-grid">
            <TextInput
              label="Current Password"
              placeholder="Enter your current password"
              type="password"
            />
          </div>

          <div className="is-grid">
            <TextInput
              label="New Password"
              placeholder="Enter new password"
              type="password"
            />

            <TextInput
              label="Confirm New Password"
              placeholder="Re-enter new password"
              type="password"
            />
          </div>
        </Form>
        <Actions>
          <Button size="medium" color="blue" label="Update password" />

          <Button size="medium" color="white-red" label="Discard" />
        </Actions>
      </Container>
    </>
  );
};

Security.getLayout = (page: ReactElement) => (
  <Layout title="Security Settings">
    <Head>
      <title>Security Settings | SPACE</title>
      <meta name="description" content="SPACE Accounts" />
    </Head>

    {page}
  </Layout>
);

export default Security;
